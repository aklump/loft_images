#!/bin/bash
#
# @file
# This will use grab to get the file copies (not symlinks)
#
if test -e ~/bin/grab; then
  test -e $7/lib || mkdir -p $7/lib
  (cd $7/lib/ && grab -s -f loft_sass)
fi
