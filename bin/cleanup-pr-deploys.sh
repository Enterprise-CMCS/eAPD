#!/bin/bash

set -e

apt-get update
apt-get install jq

# Install `cf` cli
curl -L -o cf-cli_amd64.deb 'https://cli.run.pivotal.io/stable?release=debian64&source=github'
dpkg -i cf-cli_amd64.deb
rm cf-cli_amd64.deb

# Log into CF
cf login -a $STAGING_CF_API -u $STAGING_CF_USER -p $STAGING_CF_PASSWORD -o $STAGING_CF_ORG -s $STAGING_CF_SPACE

ORG_GUID=$(cf curl "/v2/organizations?q=name:$STAGING_CF_ORG" | jq -r ".resources[0].metadata.guid")
SPACE_GUID=$(cf curl "/v2/spaces?q=name:$STAGING_CF_SPACE&q=organization_guid:$ORG_GUID" | jq -r ".resources[0].metadata.guid")
APPS=$(cf curl "/v2/spaces/$SPACE_GUID/apps" | jq -c -r '.resources[] | { name: .entity.name, guid: .metadata.guid, routes: .entity.routes_url }')

while read -r app; do
  NAME=$(echo $app | jq -r '.name')
  if [[ "$NAME" =~ hitech-apd-frontend-pr([0-9]+) ]]; then
    PULL=`echo ${BASH_REMATCH[1]}`

    PR_STATE=$(curl -s "https://api.github.com/repos/18f/cms-hitech-apd/pulls/$PULL" | jq -r .state)
    if [[ "$PR_STATE" != "open" ]]; then
      echo "PR $PULL is closed"
      # -r to delete mapped routes, -f to skip the prompt
      cf delete $NAME -r -f

      # Also update comment on Github, if there is one
      COMMENTS=$(curl -s -u "$GH_BOT_USER:$GH_BOT_PASSWORD" https://api.github.com/repos/18f/cms-hitech-apd/issues/$PULL/comments | jq -c -r '.[] | {id:.id,user:.user.login}' | grep "$GH_BOT_USER")
      if [ "$COMMENTS" ]; then
        ID=$(echo "$COMMENTS" | jq -c -r .id)
          curl -s -u "$GH_BOT_USER:$GH_BOT_PASSWORD" -d '{"body":"This deploy was cleaned up."}' -H "Content-Type: application/json" -X PATCH "https://api.github.com/repos/18f/cms-hitech-apd/issues/comments/$ID"
      fi
    fi
  fi
done <<< "$APPS"