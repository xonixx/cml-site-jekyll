#!/usr/bin/env bash

set -v

bundle exec jekyll build
#mv _site site # looks like deploy phase doesn't like underscores
#echo www.cmlteam.com > site/CNAME # custom domain
rm -f _site/*.sh _site/*.enc