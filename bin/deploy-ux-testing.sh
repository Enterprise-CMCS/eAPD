#!/bin/bash

# CF_USER, CF_PASSWORD are defined as private Environment Variables
# in CircleCI web UI: https://circleci.com/gh/18F/cms-hitech-apd/edit#env-vars

set -e

export API_URL=$UX_API_URL
export LOG_FORM_INTERACTIONS="true"

# Install `cf` cli
curl -L -o cf-cli_amd64.deb 'https://cli.run.pivotal.io/stable?release=debian64&source=github'
dpkg -i cf-cli_amd64.deb
rm cf-cli_amd64.deb

# Build the front-end
cd web
npm ci
npm run build
cd ..

# Don't deliver seed files that might be dangerous.
cd api
rm -rf seeds/development
rm -rf seeds/test
rm seeds/shared/delete-everything.js
rm seeds/development.js
rm seeds/test.js
npm ci
cd ..

# Log into CF
cf login -a $UX_CF_API -u $UX_CF_USER -p $UX_CF_PASSWORD -o $UX_CF_ORG -s $UX_CF_SPACE

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
