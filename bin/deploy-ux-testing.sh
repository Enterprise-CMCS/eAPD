#!/bin/bash

# CF_USER, CF_PASSWORD are defined as private Environment Variables
# in CircleCI web UI: https://circleci.com/gh/18F/cms-hitech-apd/edit#env-vars

set -e

# CF environment
API="https://api.fr.cloud.gov"
ORG="sandbox-gsa"
SPACE="michael.walker"

export API_URL="https://hitech-api-ux.app.cloud.gov/"
export LOG_FORM_INTERACTIONS="true"

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
rm seeds/shared/delete-everything.js
rm seeds/development.js
rm seeds/test.js
cd ..

# Log into CF
cf login -a $API -u $CF_USER_UX -p $CF_PASSWORD_UX -o $ORG -s $SPACE

# Double-check that we're pointing at the UX
# testing instance, and if so...
route=`cf app hitech-apd-api | grep routes`
if [[ $route =~ .+\ hitech-api-ux.app.cloud.gov ]]
then
  # ...delete the database and add a new one.  This
  # guarantees us a fresh database for each deploy.
  cf delete-service cms-db -f
  cf create-service aws-rds shared-psql cms-db
  cf bind-service hitech-apd-api cms-db
fi

# Push
cf push -f manifest-ux-testing.yml

# Migrate and seed the database
cf run-task hitech-apd-api "npm run migrate && npm run seed"
