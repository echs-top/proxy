#!/bin/bash
set -e

MIHOMO_OWNER="MetaCubeX"
MIHOMO_REPO="mihomo"

if [ "$1" == "get_tag" ]; then
  echo "=> Fetching latest Mihomo version..."
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
  # 传递给 GitHub Actions 环境变量
  echo "LATEST_TAG=$LATEST_TAG" >> "$GITHUB_ENV"

elif [ "$1" == "download" ]; then
  echo "=> Downloading Mihomo $LATEST_TAG..."
  FILE_NAME="mihomo-linux-amd64-${LATEST_TAG}.gz"
  curl -fsSL -o "mihomo.gz" \
    "https://github.com/${MIHOMO_OWNER}/${MIHOMO_REPO}/releases/download/${LATEST_TAG}/${FILE_NAME}"
  
  gunzip "mihomo.gz"
  chmod +x mihomo
  sudo mv mihomo /usr/local/bin/mihomo
  echo "✅ Mihomo downloaded and installed."
else
  echo "❌ Missing command. Use 'get_tag' or 'download'."
  exit 1
fi