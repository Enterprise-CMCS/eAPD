# #!/bin/bash

# # CF_USER, CF_PASSWORD are defined as private Environment Variables
# # in CircleCI web UI: https://circleci.com/gh/18F/cms-hitech-apd/edit#env-vars

# set -e

# # Install `cf` cli
# curl -L -o cf-cli_amd64.deb 'https://cli.run.pivotal.io/stable?release=debian64&source=github'
# dpkg -i cf-cli_amd64.deb
# rm cf-cli_amd64.deb

# # Build the front-end
# cd web
# npm ci
# npm run build-storybook
# cd ..

# # Log into CF and push
# cf login -a $SB_CF_API -u $SB_CF_USER -p $SB_CF_PASSWORD -o $SB_CF_ORG -s $SB_CF_SPACE
# cf push -f manifest-storybook.yml
