#!/bin/bash
# resize-images.sh
# Downscales images in full_images/ to fit within ~300x420px (parallax rectangle
# size) while preserving their full content and aspect ratio — no cropping.
# Uses macOS sips (built-in) for HEIC support, then cwebp or sips for WebP output.
# Output goes to public/images/

set -e

INPUT_DIR="full_images"
OUTPUT_DIR="public/images"
# Bounding box the output must fit within — the actual output keeps the
# source aspect ratio, so it will be smaller than this on one axis unless
# the source is exactly this ratio.
TARGET_WIDTH=300
TARGET_HEIGHT=420
# Max dimension for the orientation-normalization pass (well above target so
# the later resize/crop still has plenty of resolution to work with).
ORIENT_MAX_DIM=1600

mkdir -p "$OUTPUT_DIR"

TMP_DIR=$(mktemp -d)
trap 'rm -rf "$TMP_DIR"' EXIT

# Check for cwebp (better quality WebP encoder)
USE_CWEBP=false
if command -v cwebp &>/dev/null; then
  USE_CWEBP=true
  echo "Using cwebp for WebP encoding"
else
  echo "cwebp not found — using sips (outputs JPEG). Install via: brew install webp"
fi

shopt -s nullglob nocaseglob
files=("$INPUT_DIR"/*.{jpg,jpeg,heic,png})
shopt -u nullglob nocaseglob

if [ ${#files[@]} -eq 0 ]; then
  echo "No images found in $INPUT_DIR"
  exit 1
fi

echo "Processing ${#files[@]} images..."

for src in "${files[@]}"; do
  filename=$(basename "$src")
  base="${filename%.*}"
  tmp_jpeg="$TMP_DIR/resize_tmp_${base}.jpg"

  echo "  → $filename"

  # Step 0: Normalize orientation. sips reports/resamples on the raw sensor
  # pixel grid and ignores the EXIF orientation tag (e.g. a portrait iPhone
  # photo stored as a landscape grid + "rotate 90°" tag), and that tag is
  # lost once we re-encode to WebP. If we don't bake the rotation into the
  # pixel data first, our own crop math operates on the wrong-shaped image
  # and the final image comes out rotated/mis-cropped. qlmanage (QuickLook,
  # built into macOS) renders through the same path as Preview/Finder, so
  # its thumbnail is always correctly oriented — use that as our source.
  oriented="$TMP_DIR/${filename}.png"
  rm -f "$oriented"
  qlmanage -t -s "$ORIENT_MAX_DIM" -o "$TMP_DIR" "$src" > /dev/null 2>&1

  if [ ! -f "$oriented" ]; then
    echo "     ⚠ orientation normalization failed, using original file"
    oriented="$src"
  fi

  # Step 1: Scale the whole image down to fit within TARGET_WIDTH x TARGET_HEIGHT,
  # preserving aspect ratio — no cropping. Whichever axis is the tighter
  # constraint determines the scale factor; the other axis ends up smaller
  # than the target. Never upscale.

  # Get oriented-source dimensions
  src_w=$(sips -g pixelWidth  "$oriented" 2>/dev/null | awk '/pixelWidth/{print $2}')
  src_h=$(sips -g pixelHeight "$oriented" 2>/dev/null | awk '/pixelHeight/{print $2}')

  # Compare src_w/TARGET_WIDTH vs src_h/TARGET_HEIGHT (as cross-multiplication,
  # to stay in integer arithmetic) to find which axis is the binding constraint.
  if [ $(( src_w * TARGET_HEIGHT )) -gt $(( src_h * TARGET_WIDTH )) ]; then
    fit_w=$TARGET_WIDTH
  else
    fit_w=$(( src_w * TARGET_HEIGHT / src_h ))
  fi
  # Don't upscale images smaller than the target box
  if [ "$fit_w" -gt "$src_w" ]; then
    fit_w=$src_w
  fi

  sips \
    --resampleWidth "$fit_w" \
    --setProperty formatOptions best \
    -s format jpeg \
    "$oriented" \
    --out "$tmp_jpeg" \
    > /dev/null 2>&1

  # Step 2: Encode to WebP (or keep as JPEG if cwebp unavailable)
  if $USE_CWEBP; then
    out_file="$OUTPUT_DIR/${base}.webp"
    cwebp -q 82 "$tmp_jpeg" -o "$out_file" > /dev/null 2>&1
    rm -f "$tmp_jpeg"
  else
    out_file="$OUTPUT_DIR/${base}.jpg"
    mv "$tmp_jpeg" "$out_file"
  fi

  # Print final dimensions
  dims=$(sips -g pixelWidth -g pixelHeight "$out_file" 2>/dev/null | awk '/pixel/{printf $2" "}')
  echo "     saved: $out_file  (${dims}px)"
done

echo ""
echo "Done. ${#files[@]} images → $OUTPUT_DIR"
