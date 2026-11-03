#!/usr/bin/env bash
# Usage: scripts/smoke-test.sh https://xxxx.cloudfront.net  -> checks every page (clean URL), every image/file, and GitBook-style URLs.
BASE=${1:?base url}; D=.vitepress/dist; fail=0; total=0
check() { code=$(curl -s -o /dev/null -w '%{http_code}' -L --max-redirs 3 "$BASE$1"); total=$((total+1)); [ "$code" = 200 ] || { echo "FAIL $code $1"; fail=$((fail+1)); }; }
enc() { python3 -c 'import sys,urllib.parse;print(urllib.parse.quote(sys.argv[1]))' "$1"; }
while read -r f; do p=${f#$D}; p=${p%.html}; p=${p%index}; [ "$p" = /404 ] && continue; check "$(enc "$p")"; done < <(find $D -name '*.html')
pages=$total
while read -r f; do check "$(enc "${f#$D}")"; done < <(find $D -type f -iregex '.*\.\(png\|jpe?g\|gif\|svg\|webp\|pdf\)')
assets=$((total-pages))
# GitBook-style: dir without slash, README, .md
for u in /reference/actions-processor /getting-started/ide-quick-tour/README.md /getting-started/system-overview.md /getting-started/ide-quick-tour/first-app/README; do check "$u"; done
echo "pages=$pages assets=$assets total=$total failed=$fail"
