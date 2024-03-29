#!/usr/bin/env bash
BUCKET_NAME="www.voegele.me"

if [[ ! -d _site ]]
then
  echo "No _site found!"
  exit 1
fi

if [[ -z $AWS_SECRET_ACCESS_KEY ]]
then
  echo "No aws credentials!"
  exit 1
fi

aws s3 sync --delete _site s3://${BUCKET_NAME}

for f in $(find _site -mindepth 2 -type f -name "index.html")
do
  target=${f#_site/}

  no_index_target="${target%/index.html}/"
  echo "Putting $f to ${no_index_target}"
  aws s3api put-object --bucket ${BUCKET_NAME} --key "${no_index_target}" --body $f --content-type "text/html"
done
