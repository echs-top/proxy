#!/bin/bash

# --- [ 1. 核心参数配置 ] ---
API_BASE="http://127.0.0.1:9090"
API_SECRET="echs"
# 若在在路由外，例如填socks5h://127.0.0.1:7890
PROXY_ADDR=""
PROXY_USER=""
PROXY_PASS=""
TEST_GROUP="SPEEDTEST"
WARM_SIZE_MB="0.5" 
DL_SIZE_MB=25  
UP_SIZE_MB=10  
SLEEP_INTERVAL=2.5
URL_WARM="https://speed.cloudflare.com/__down?bytes=$(echo "$WARM_SIZE_MB * 1024 * 1024" | bc | cut -d. -f1)"
URL_DL="https://speed.cloudflare.com/__down?bytes=$(echo "$DL_SIZE_MB * 1024 * 1024" | bc | cut -d. -f1)"
URL_UP="https://speed.cloudflare.com/__up"
FILE_OUT="speed_simple.txt"

# --- [ 2. 动态参数构建 ] ---
CURL_AUTH=()
[[ -n "$API_SECRET" ]] && CURL_AUTH=(-H "Authorization: Bearer $API_SECRET")
CURL_PROXY=()
if [[ -n "$PROXY_ADDR" ]]; then
    CURL_PROXY+=(--proxy "$PROXY_ADDR")
    [[ -n "$PROXY_USER" && -n "$PROXY_PASS" ]] && CURL_PROXY+=(--proxy-user "$PROXY_USER:$PROXY_PASS")
fi

# --- [ 3. 初始环境准备 ] ---
{
    printf "==========================================================\n"
    printf "测试时间: %(%Y-%m-%d %H:%M:%S)T\n" -1
    printf "下载%sMB：%s\n" "$DL_SIZE_MB" "$URL_DL"
    printf "上传%sMB：%s\n" "$UP_SIZE_MB" "$URL_UP"
    printf "==========================================================\n"
    printf "%-22s | %-6s | %-14s | %-14s\n" "节点名称" "协议" "下载速度" "上传速度"
} > "$FILE_OUT"

mapfile -t nodes < <(curl -s "${CURL_AUTH[@]}" "$API_BASE/proxies/$TEST_GROUP" | jq -r '.all[]?')

# --- [ 4. 循环测速逻辑 ] ---
for name in "${nodes[@]}"; do
    printf "测速中: [%-18s] " "$name"

    # A. 切换节点
    payload=$(jq -n --arg nm "$name" '{name: $nm}')
    curl -s -X PUT "${CURL_AUTH[@]}" -d "$payload" "$API_BASE/proxies/$TEST_GROUP" > /dev/null
    sleep $SLEEP_INTERVAL

    # B. 0.5MB 预热并锁定协议
    status_code="000"
    proto_raw=""
    for i in {1..3}; do
        warm_info=$(curl -s "${CURL_PROXY[@]}" --http3 --connect-timeout 5 -m 10 \
                    -w "%{http_version}|%{http_code}" -o /dev/null "$URL_WARM")
        
        proto_raw=$(echo "$warm_info" | cut -d'|' -f1)
        status_code=$(echo "$warm_info" | cut -d'|' -f2)

        if [[ "$status_code" == "200" ]]; then
            break
        fi
        sleep 1
    done

    if [[ "$status_code" != "200" ]]; then
        printf "→ [No]\n"
        printf "%-22s | %-6s | %-14s | %-14s\n" "$name" "FAIL" "No" "No" >> "$FILE_OUT"
        continue
    fi

    # 协议锁定
    PROTO_OPT="--http2"
    display_proto="H2"
    if [[ "$proto_raw" == "3" ]]; then
        PROTO_OPT="--http3-only"
        display_proto="H3"
    fi

    # C. 正式下载 (遵循小包锁定的协议)
    dl_raw=$(curl -s -L --no-buffer "${CURL_PROXY[@]}" $PROTO_OPT \
             --connect-timeout 5 -m 30 -w "%{speed_download}" -o /dev/null "$URL_DL")
    
    if [[ -z "$dl_raw" ]] || (( $(echo "$dl_raw < 1024" | bc -l) )); then
        dl_res="No"
    else
        dl_res=$(awk "BEGIN {printf \"%.2f Mbps\", $dl_raw * 8 / 1048576}")
    fi
    up_raw=$(dd if=/dev/urandom bs=1M count=$UP_SIZE_MB 2>/dev/null | \
             curl -s --no-buffer "${CURL_PROXY[@]}" $PROTO_OPT \
             -H "Expect:" \
             --connect-timeout 5 -m 25 -w "%{speed_upload}" -o /dev/null \
             -X POST -H "Content-Type: application/octet-stream" --data-binary @- "$URL_UP")
    
    if [[ -z "$up_raw" ]] || (( $(echo "$up_raw < 1024" | bc -l) )); then
        up_res="No"
    else
        up_res=$(awk "BEGIN {printf \"%.2f Mbps\", $up_raw * 8 / 1048576}")
    fi

    printf "→ %s | 下: %-10s | 上: %-10s\n" "$display_proto" "$dl_res" "$up_res"
    printf "%-22s | %-6s | %-14s | %-14s\n" "$name" "$display_proto" "$dl_res" "$up_res" >> "$FILE_OUT"
done

# --- [ 5. 结果展示 ] ---
printf "\n✅ 完成\n"
tail -n +8 "$FILE_OUT" | sort -t'|' -k3 -nr | head -n 10
