#!/bin/bash

# CF_USER, CF_PASSWORD are defined as private Environment Variables
# in CircleCI web UI: https://circleci.com/gh/18F/cms-hitech-apd/edit#env-vars

set -e

# CF environment
API="https://api.fr.cloud.gov"
ORG="sandbox-gsa"
SPACE="brendan.sudol"

export API_URL="https://hitech-api.app.cloud.gov"

# Install `cf` cli
curl -L -o cf-cli_amd64.deb 'https://cli.run.pivotal.io/stable?release=debian64&source=github'
dpkg -i cf-cli_amd64.deb
rm cf-cli_amd64.deb

# Install `autopilot` plugin
cf install-plugin autopilot -f -r CF-Community

# Build the front-end
cd web
npm install
npm run build
cd ..

# Don't deliver seed files that might be dangerous.
cd api
rm -rf seeds/development
rm -rf seeds/test
rm seeds/development.js
rm seeds/test.js
rm seeds/shared/delete-everything.js
cd ..

# Log into CF and push
cf login -a $API -u $CF_USER -p $CF_PASSWORD -o $ORG -s $SPACE
cf push -f manifest.yml

# Migrate and seed the database
cf run-task hitech-apd-api "npm run migrate && npm run seed"
