#!/usr/bin/env bash

set -v

bundle exec jekyll build
FILES_REGEX=".*\.\(html\|css\|js\|mp4\|png\|ico\|jpeg\|jpg\|svg\|pdf\|php\)"
find _site -regextype sed -regex "${FILES_REGEX}" -print0 | xargs -0 gzip -9 -kv
#mv _site site # looks like deploy phase doesn't like underscores
#echo www.cmlteam.com > site/CNAME # custom domain
rm -f _site/*.sh _site/*.enc
