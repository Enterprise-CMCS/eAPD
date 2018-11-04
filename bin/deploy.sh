#!/bin/bash

# CF_USER, CF_PASSWORD are defined as private Environment Variables
# in CircleCI web UI: https://circleci.com/gh/18F/cms-hitech-apd/edit#env-vars

set -e

export API_URL=$STAGING_API_URL

apt-get update
apt-get install zip -y

# Install `cf` cli
curl -L -o cf-cli_amd64.deb 'https://cli.run.pivotal.io/stable?release=debian64&source=github'
dpkg -i cf-cli_amd64.deb
rm cf-cli_amd64.deb

# Install `autopilot` plugin
cf install-plugin autopilot -f -r CF-Community

# Build the front-end
cd web
npm ci
npm run build
zip -r /tmp/webapp.zip dist/*
aws s3 sync ./dist s3://$STAGING_S3_BUCKET
cd ..

# Don't deliver seed files that might be dangerous.
cd api
rm -rf seeds/development
rm -rf seeds/test
rm seeds/development.js
rm seeds/test.js
rm seeds/shared/delete-everything.js
npm ci --only=production
cd ..

cf login -a $STAGING_CF_API -u $STAGING_CF_USER -p $STAGING_CF_PASSWORD -o $STAGING_CF_ORG -s $STAGING_CF_SPACE

cf zero-downtime-push hitech-apd-frontend -f manifest.yml
cf zero-downtime-push hitech-apd-api -f manifest.yml

# Migrate and seed the database
cf run-task hitech-apd-api "npm run migrate && npm run seed"
