#!/usr/bin/env sh
set -e

npm run build

cd dist

# place .nojekyll to bypass Jekyll processing
echo > .nojekyll

git init
git checkout -B main
git add -A
git commit -m 'deploy'

git push -f git@github.com:christianjosueBT/wordle-clone.git main:gh-pages

cd -