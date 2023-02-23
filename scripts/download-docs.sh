#!/bin/bash

set -euo pipefail

OUTPUT_DIR="${1:-''}"

if [[ ! -d "${OUTPUT_DIR}" ]]
then
  echo 'Usage: ./download-docs.sh dest-folder'
  exit 1
fi

declare -A sections

sections=(
  ['aspirational']='https://docs.google.com/document/d/196lc34oglHYc1olevXr7-dZvboUkHLEobRqDi_RMq3M'
  ['bacon']='https://docs.google.com/document/d/1-6bwszWuE9PFinHCk0x0QUCebNA9kpKRxXs3h6qPEQ8'
  ['cant']='https://docs.google.com/document/d/1-w8HdiHN2xWiWVgjeq5hm7-Ob3Qr89KEuSnGD8aTw8o'
  ['cheese']='https://docs.google.com/document/d/1ymB_2Q62bakJ_mfdSUJChktJQQCeY1zVcRjI5g1LVLY'
  ['cow']='https://docs.google.com/document/d/1ew5FQ46yob-gCc7Bqcmbc_jfkNCM6g8kwANU9v2i5lo'
  ['eat']='https://docs.google.com/document/d/1m1GydyB8HwR9NcNqwkXY43FKa1gjzwFjLB0TSjX4F2k'
  ['food']='https://docs.google.com/document/d/18MD9YFt5loATNneC3PBnymHPE1Hq3YS7B_ulBKw2_WM'
  ['hitler']='https://docs.google.com/document/d/1azmf2gQJSWicyK11VMbo0Jhm0qO4ic_Xc8UbQA2ab40'
  ['humane']='https://docs.google.com/document/d/1jHiGcCqMjw6sqO-IRFvJIfRxyXTBkKG7AfUEcJH1-bo'
  ['natural']='https://docs.google.com/document/d/1ytYS0H8kMYLJ_BGTURljmAWRCML0vN6jqojnalpBYR4'
  ['notmuch']='https://docs.google.com/document/d/1hkkgjJtb_olKFuwYFkDa5mY-ETrWpSZhH5_972cbNYk'
  ['plants']='https://docs.google.com/document/d/1qY0AYX-tssme1whQiAZUCeqLYlcxnKYKrx2zJCGagTc'
  ['preachy']='https://docs.google.com/document/d/14KlrBYa4zj-_xPIDZJgdKYAfm9ePqoCHCiMPId7u4Pg'
  ['protein']='https://docs.google.com/document/d/10cM08wtBxl4go5YsIGe583ki4gVKYxdpbM7T44DdRjo'
  ['teeth']='https://docs.google.com/document/d/1bKiqjpMpOolKqyiBtnTnFYpiLyRgNsFcG0GP6XaJTug'
  ['what']='https://docs.google.com/document/d/15UtzLUgmlHMUsPR2x15RXpf-0GEBQGJ096JCjMc2z68'
)

for section in "${!sections[@]}"; do
  curl -L "${sections[$section]}/export?format=txt" | sed -e 's///g' > "${OUTPUT_DIR}/$section.js"
done

# About page.
# curl -L "https://docs.google.com/document/d/1xT6jquARDUdF3h-RaePiRL3mdfQ3_h1bhtkj5Q3OlB0/export?format=txt" > src/About.js
