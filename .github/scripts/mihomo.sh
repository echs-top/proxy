#!/bin/bash
set -e

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
    
    # 提取输入文件时间戳，如果 git log 为空则尝试通过 stat 获取系统修改时间，最终空值兜底为 0
    INPUT_TIME=$(git log -1 --format=%at -- "$file" 2>/dev/null || stat -c %Y "$file" 2>/dev/null || echo 0)
    if [ -z "$INPUT_TIME" ]; then
      INPUT_TIME=0
    fi
    
    # 提取已有 mrs 文件时间戳，空值兜底为 0
    MRS_TIME=$(git log -1 --format=%at -- "$mrs_file" 2>/dev/null || echo 0)
    if [ -z "$MRS_TIME" ]; then
      MRS_TIME=0
    fi

    # 此时 INPUT_TIME 和 MRS_TIME 均 100% 为安全整数，绝不会再触发表达式异常
    if [ "$INPUT_TIME" -gt "$MRS_TIME" ] || [ ! -f "$mrs_file" ]; then
      echo "🔄 Converting: $file → $mrs_file (behavior: $BEHAVIOR)"
      temp_clean="${TEMP_DIR}/clean_input"
      grep -v '^[[:space:]]*#' "$file" | sed 's/[[:space:]]*#.*$//' | grep -v '^[[:space:]]*$' > "$temp_clean"
      if [ -s "$temp_clean" ]; then
        mihomo convert-ruleset "$BEHAVIOR" text "$temp_clean" "$mrs_file"
      fi
    fi
  done
done

# 清理临时目录
rm -rf "$TEMP_DIR"
