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
    echo "APP $NAME: related to PR #$PULL"

    PR_STATE=$(curl -s "https://api.github.com/repos/18f/cms-hitech-apd/pulls/$PULL" | jq -r .state)
    if [[ "$PR_STATE" != "open" ]]; then
      GUID=$(echo $app | jq -r '.guid')
      ROUTES_URL=$(echo $app | jq -r '.routes')
      echo " -- PR is closed; need to delete the app"
      echo " -- app GUID is $GUID"

      ROUTES=$(cf curl "$ROUTES_URL" | jq -c -r ".resources[] | { guid: .metadata.guid, host: .entity.host }")
      while read -r route; do
        ROUTE_GUID=$(echo $route | jq -r '.guid')
        ROUTE_HOST=$(echo $route | jq -r '.host')
        echo " -- deleting route $ROUTE_HOST [$ROUTE_GUID]"
        cf curl -X DELETE "/v2/routes/$ROUTE_GUID"
      done <<< "$ROUTES"

      echo " -- deleting app $NAME [$GUID]"
      cf curl -X DELETE "/v2/apps/$GUID"
    else
      echo " -- PR is still open; don't do anything"
    fi
  fi
done <<< "$APPS"