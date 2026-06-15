#!/bin/bash
set -e

echo "========================================="
echo "    Phase 3: MRS Rules Conversion        "
echo "========================================="

# --- 1. Mihomo 环境准备与沙盒缓存机制 ---
MIHOMO_OWNER="MetaCubeX"
MIHOMO_REPO="mihomo"
CACHE_DIR="$HOME/.cache/mihomo_core"
BIN_PATH="/usr/local/bin/mihomo"

mkdir -p "$CACHE_DIR"

echo "=> Fetching latest Mihomo version..."
# 借助 GITHUB_TOKEN 查询 API，突破请求频率限制
LATEST_TAG=$(curl -s -H "Authorization: Bearer ${GITHUB_TOKEN}" \
  "https://api.github.com/repos/${MIHOMO_OWNER}/${MIHOMO_REPO}/releases/latest" | jq -r .tag_name)

if [ "$LATEST_TAG" == "null" ] || [ -z "$LATEST_TAG" ]; then
  echo "⚠️ Fallback: fetching all releases..."
  LATEST_TAG=$(curl -s -H "Authorization: Bearer ${GITHUB_TOKEN}" \
    "https://api.github.com/repos/${MIHOMO_OWNER}/${MIHOMO_REPO}/releases" | jq -r '.[0].tag_name')
  if [ "$LATEST_TAG" == "null" ] || [ -z "$LATEST_TAG" ]; then
    echo "❌ Cannot fetch latest version"
    exit 1
  fi
fi
echo "✅ Latest version: $LATEST_TAG"

CACHED_VERSION=""
if [ -f "$CACHE_DIR/version.txt" ]; then
  CACHED_VERSION=$(cat "$CACHE_DIR/version.txt")
fi

# 如果版本一致且内核实体存在，则直接从缓存沙盒中提取
if [ "$CACHED_VERSION" == "$LATEST_TAG" ] && [ -f "$CACHE_DIR/mihomo" ]; then
  echo "✅ Mihomo $LATEST_TAG found in cache. Skipping download."
  sudo cp "$CACHE_DIR/mihomo" "$BIN_PATH"
  sudo chmod +x "$BIN_PATH"
else
  echo "=> Downloading Mihomo $LATEST_TAG..."
  FILE_NAME="mihomo-linux-amd64-${LATEST_TAG}.gz"
  curl -fsSL -o "mihomo.gz" "https://github.com/${MIHOMO_OWNER}/${MIHOMO_REPO}/releases/download/${LATEST_TAG}/${FILE_NAME}"
  gzip -d "mihomo.gz"
  
  echo "=> Updating cache..."
  cp mihomo "$CACHE_DIR/mihomo"
  echo "$LATEST_TAG" > "$CACHE_DIR/version.txt"
  
  echo "=> Installing Mihomo..."
  sudo mv mihomo "$BIN_PATH"
  sudo chmod +x "$BIN_PATH"
  echo "✅ Download and installation completed."
fi

# --- 2. MRS 核心转换逻辑 ---
echo "=> Starting MRS conversion..."
mkdir -p mrs/ip mrs/domain
TEMP_DIR=$(mktemp -d)

for dir in ip domain; do
  [ ! -d "list/$dir" ] && continue
  if [ "$dir" == "domain" ]; then
    BEHAVIOR="domain"
  else
    BEHAVIOR="ipcidr"
  fi
  mkdir -p "mrs/$dir"

  find "list/$dir" -type f | while read -r file; do
    filename=$(basename "$file")
    out_name="${filename%.*}.mrs"
    mrs_file="mrs/$dir/$out_name"
    
    # 状态对比：比对源文件与 MRS 产物的最新修改时间
    INPUT_TIME=$(git log -1 --format=%at -- "$file" 2>/dev/null || stat -c %Y "$file")
    MRS_TIME=$(git log -1 --format=%at -- "$mrs_file" 2>/dev/null || echo 0)

    if [ "$INPUT_TIME" -gt "$MRS_TIME" ] || [ ! -f "$mrs_file" ]; then
      echo "🔄 Converting: $file → $mrs_file (behavior: $BEHAVIOR)"
      temp_clean="${TEMP_DIR}/clean_input"
      # 清洗源文件中的注释与空行
      grep -v '^[[:space:]]*#' "$file" | sed 's/[[:space:]]*#.*$//' | grep -v '^[[:space:]]*$' > "$temp_clean"
      if [ -s "$temp_clean" ]; then
        mihomo convert-ruleset "$BEHAVIOR" text "$temp_clean" "$mrs_file"
      fi
    fi
  done
done

rm -rf "$TEMP_DIR"
echo "✅ MRS conversion finished."
