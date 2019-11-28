#!/usr/bin/env bash

ENV_SPECIFIC_CONFIG_FILE="$1"

if [ ! -e "$ENV_SPECIFIC_CONFIG_FILE" ]
then
  echo "Please provide an existing environment-specific file!"
  echo "Received: \"$ENV_SPECIFIC_CONFIG_FILE\""
  echo
  exit 1
fi

set -v

bundle exec jekyll build --config=./_config.yml,"$ENV_SPECIFIC_CONFIG_FILE"
FILES_REGEX=".*\.\(html\|css\|js\|php\|ttf|\woff\|woff2\|eot\|svg\)"
find _site -regextype sed -regex "${FILES_REGEX}" -print0 | xargs -0 gzip -9 -kv
#mv _site site # looks like deploy phase doesn't like underscores
#echo www.cmlteam.com > site/CNAME # custom domain
rm -f _site/*.sh _site/*.enc
