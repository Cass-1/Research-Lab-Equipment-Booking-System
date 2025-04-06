#!/bin/bash

if [ "$#" -ne 2 ]; then
    echo "Please enter a git branch and a date in YYYY-DD-MM format"
    echo "Example ./files-changed-from-date.sh main 2023-10-01"
    exit 1
fi

git_branch="$1"
input_date="$2"

git log ${git_branch} --since=${input_date} --name-only --pretty=format: | grep -v '^$' | sort | uniq | sed 's/^/- /'  