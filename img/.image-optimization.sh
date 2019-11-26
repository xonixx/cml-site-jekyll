#!/usr/bin/env bash

SCRIPT_DIR=$(dirname "$(readlink -f "$0")")
SOURCE_FOLDER="${SCRIPT_DIR}/"
IMG_FOLDER=$(readlink -f "${SCRIPT_DIR}/")

# Verify folder structure in img folder matches sources folder
find "$SOURCE_FOLDER" -type d ! -wholename "$SOURCE_FOLDER" -print0 | # list all dirs in source folder as abspaths
  xargs --null -L 1 -i realpath --relative-to="$SOURCE_FOLDER" {} | # turn all abspaths to relpaths
  xargs -i mkdir -p "$IMG_FOLDER"/{} # attempt to create all folders, if not present

# Copy over all images with conversion to WebP
find "$SOURCE_FOLDER" -regextype sed -regex ".*\.\(jpg\|png\|jpeg\)" -print0 | # list all images in source dir as abspaths
  xargs --null -L 1 -i realpath --relative-to="$SOURCE_FOLDER" {} | # turn all abspaths to relpaths
  # feed all relpaths to image-magick
  xargs -L 1 -i \
    sh -c \
      'echo "Converting $0/$2 to WebP..." &&
      convert "$0/$2" \
              -quality 100 \
              -define webp:lossless=true \
              "$1/${2%.*}.webp"' \
      "$SOURCE_FOLDER" \
      "$IMG_FOLDER" \
      {}
