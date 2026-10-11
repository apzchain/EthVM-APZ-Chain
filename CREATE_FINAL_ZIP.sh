#!/bin/bash
# Script to create final ZIP package
set -e

echo "🚀 ایجاد فایل نهایی EthVM-APZ Chain Complete..."

FINAL_NAME="ethvm-apz-chain-complete"
VERSION="1.0.0"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
ZIP_FILE="${FINAL_NAME}-v${VERSION}-${TIMESTAMP}.zip"
TEMP_DIR="./final-package"

rm -rf "$TEMP_DIR"
mkdir -p "$TEMP_DIR"

log() {
    echo "📦 $1"
}

# Copy core directories (adjust as needed)
log "جمع‌آوری فایل‌های پروژه..."
for dir in core-system ai-support-system deployment monitoring-analytics documentation tools-utilities; do
    [ -d "$dir" ] && cp -r "$dir" "$TEMP_DIR/"
done

# Copy config files
[ -d "configs" ] && cp -r configs "$TEMP_DIR/"
[ -d "scripts" ] && cp -r scripts "$TEMP_DIR/"
[ -d "docker" ] && cp -r docker "$TEMP_DIR/"

# Copy launcher and docker-compose
cp LAUNCHER.sh "$TEMP_DIR/"
[ -f docker-compose.complete.yml ] && cp docker-compose.complete.yml "$TEMP_DIR/docker-compose.yml"
[ -f .env.example ] && cp .env.example "$TEMP_DIR/"
[ -f package.json ] && cp package.json "$TEMP_DIR/"

# Create installation guide
cat > "$TEMP_DIR/INSTALLATION_GUIDE.md" << 'EOF'
# راهنمای نصب EthVM-APZ Chain Complete

## پیش‌نیازها
- Docker
- Docker Compose
- Node.js 14+

## نصب سریع
```bash
./LAUNCHER.sh
