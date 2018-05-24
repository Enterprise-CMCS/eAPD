#!/bin/bash

# Make sure there is an associated pull request, then also make sure
# something changed in the ./web directory since we're only pushing
# up frontend changes
git diff origin/master --relative=web --exit-code
WEBCHANGES=$?
if [ -n "$CI_PULL_REQUESTS" ] && [ "$WEBCHANGES" -ne 0 ]; then
  PRNUM=`basename $CI_PULL_REQUESTS`

  # CF_USER, CF_PASSWORD are defined as private Environment Variables
  # in CircleCI web UI: https://circleci.com/gh/18F/cms-hitech-apd/edit#env-vars

  set -e
  apt-get update
  apt-get install jq

  export API_URL=$STAGING_API_URL

  # Install `cf` cli
  curl -L -o cf-cli_amd64.deb 'https://cli.run.pivotal.io/stable?release=debian64&source=github'
  dpkg -i cf-cli_amd64.deb
  rm cf-cli_amd64.deb

  # Build the front-end
  cd web
  npm ci
  npm run build
  cd ..

  # Log into CF
  cf login -a $STAGING_CF_API -u $STAGING_CF_USER -p $STAGING_CF_PASSWORD -o $STAGING_CF_ORG -s $STAGING_CF_SPACE

  # Push
  cf push "hitech-apd-frontend-pr$PRNUM" -n "hitech-apd-pr$PRNUM" -b https://github.com/cloudfoundry/staticfile-buildpack.git -m 64M --no-manifest -p web/dist

  # Add a comment on Github, if there's not one already
  COMMENTS=$(curl -s -u "$GH_BOT_USER:$GH_BOT_PASSWORD" https://api.github.com/repos/18f/cms-hitech-apd/issues/$PRNUM/comments | jq -c -r '.[] | {id:.id,user:.user.login}' | grep "$GH_BOT_USER" || true)
  if ! [ "$COMMENTS" ]; then
    URL="https://hitech-apd-pr$PRNUM.app.cloud.gov/"
    curl -s -u "$GH_BOT_USER:$GH_BOT_PASSWORD" -d '{"body":"See this pull request in action: '"$URL"'"}' -H "Content-Type: application/json" -X POST "https://api.github.com/repos/18f/cms-hitech-apd/issues/$PRNUM/comments"
  fi

elif [ "$WEBCHANGES" -eq 0 ]; then
  echo "No changes to /web"
else
  echo "Not a pull request"
fi