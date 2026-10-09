#!/usr/bin/env bash
# Builds the zip to upload to extensions.gnome.org (or install locally).
set -euo pipefail
cd "$(dirname "$0")"

python3 - << 'PY'
import json, re
m = json.load(open('metadata.json'))
assert re.fullmatch(r'[A-Za-z0-9._-]+@[A-Za-z0-9._-]+', m['uuid']), 'invalid uuid'
assert not m['uuid'].endswith('gnome.org'), 'uuid namespace must not be gnome.org'
assert re.fullmatch(r'(?!^[. ]+$)[a-zA-Z0-9 .]{1,16}', m['version-name']), 'invalid version-name'
assert 'version' not in m, 'remove "version": extensions.gnome.org sets it'
print('metadata.json OK:', m['uuid'], m['version-name'])
PY

UUID=$(python3 -c "import json;print(json.load(open('metadata.json'))['uuid'])")
OUT="${UUID}.shell-extension.zip"
rm -f "$OUT"
zip "$OUT" metadata.json extension.js prefs.js LICENSE schemas/*.gschema.xml
echo "Created $OUT"
