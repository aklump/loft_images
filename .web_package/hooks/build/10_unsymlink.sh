#!/bin/bash
#
# @file
# This will use grab to get the file copies (not symlinks)
#
grab=$(type grab >/dev/null 2>&1 && which grab)
if [ "$grab" ]; then
  test -e "$7/lib" || mkdir -p "$7/lib"
  cd "$7/lib"
  test -L loft_sass && grab -f loft_sass
fi
