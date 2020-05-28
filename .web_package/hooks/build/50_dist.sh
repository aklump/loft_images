#!/bin/bash
#
# @file
# Copy distribution files to /dist
#

# Allow time for all CodeKit to minify.
wp_wait_for_exists "$7/LoftImages.min.js"

# First, wipe out the dist folder for a clean slate.
cd "$7" && (! test -e dist || rm -r dist) && mkdir dist

# Now copy of the necessary folders; don't check first because we want a loud failure.
rsync -a "$7/sass/" "$7/dist/sass/"
rsync -a "$7/lib/" "$7/dist/lib/"

# ... and files.
cp "$7/README.md" "$7/dist/"
cp "$7/CHANGELOG.md" "$7/dist/"
cp "$7/LoftImages.js" "$7/dist/"
cp "$7/LoftImages.min.js" "$7/dist/"
cp "$7/web_package.yml" "$7/dist/"
