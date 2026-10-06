#!/usr/bin/env bash
# Builds the zip to upload to extensions.gnome.org.
set -euo pipefail
cd "$(dirname "$0")"

python3 -m json.tool metadata.json > /dev/null
UUID=$(python3 -c "import json;print(json.load(open('metadata.json'))['uuid'])")
OUT="${UUID}.shell-extension.zip"
rm -f "$OUT"
zip -j "$OUT" metadata.json extension.js LICENSE
echo "Created $OUT"
