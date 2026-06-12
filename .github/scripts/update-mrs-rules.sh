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
    
    INPUT_TIME=$(git log -1 --format=%at -- "$file" 2>/dev/null || stat -c %Y "$file")
    MRS_TIME=$(git log -1 --format=%at -- "$mrs_file" 2>/dev/null || echo 0)

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
rm -rf "$TEMP_DIR"
