#!/bin/bash

set -e

apt-get update
apt-get install jq awscli

BUCKETS=$(aws s3api list-buckets | jq -c -r '.Buckets[] | { name: .Name }')

while read -r bucket; do
  NAME=$(echo $bucket | jq -r '.name')
  # Make sure the bucket name matches our PR-deploy pattern, otherwise skip it
  if [[ "$NAME" =~ pr([0-9]+)\.hitech\.eapd\.cms\.gov ]]; then
    PULL=`echo ${BASH_REMATCH[1]}`

    PR_STATE=$(curl -s "https://api.github.com/repos/18f/cms-hitech-apd/pulls/$PULL" | jq -r .state)
    if [[ "$PR_STATE" != "open" ]]; then
      echo "PR $PULL is closed"

      # Build the bucket name from the PR number, as an extra safety measure
      # to make sure we don't delete non-PR buckets
      aws s3 rb "s3://pr${PULL}.hitech.eapd.cms.gov" --force

      # Also update comment on Github, if there is one
      COMMENTS=$(curl -s -u "$GH_BOT_USER:$GH_BOT_PASSWORD" https://api.github.com/repos/18f/cms-hitech-apd/issues/$PULL/comments | jq -c -r '.[] | {id:.id,user:.user.login}' | grep "$GH_BOT_USER" || true)
      if [ "$COMMENTS" ]; then
        ID=$(echo "$COMMENTS" | jq -c -r .id)
        curl -s -u "$GH_BOT_USER:$GH_BOT_PASSWORD" -d '{"body":"This deploy was cleaned up."}' -H "Content-Type: application/json" -X PATCH "https://api.github.com/repos/18f/cms-hitech-apd/issues/comments/$ID"
      fi
    fi
  fi
done <<< "$BUCKETS"
