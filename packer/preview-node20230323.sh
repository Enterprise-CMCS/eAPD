#!/bin/bash

# Become root user to perform installation and configuration
sudo su <<R_USER
#!/bin/bash

# Test to see the command that is getting built for pulling the Git Branch
sudo su - $(whoami) <<E_USER
# The su block begins inside the root user's home directory.  Switch to the
# ec2-user home directory.
cd ~
export MONGO_DATABASE="$MONGO_DATABASE"
export MONGO_INITDB_ROOT_USERNAME="$MONGO_INITDB_ROOT_USERNAME"
export MONGO_INITDB_ROOT_PASSWORD="$MONGO_INITDB_ROOT_PASSWORD"
export MONGO_INITDB_DATABASE="$MONGO_INITDB_DATABASE"
export MONGO_DATABASE_USERNAME="$MONGO_DATABASE_USERNAME"
export MONGO_DATABASE_PASSWORD="$MONGO_DATABASE_PASSWORD"
export MONGO_ADMIN_URL="$MONGO_ADMIN_URL"
export DATABASE_URL="$DATABASE_URL"
export OKTA_DOMAIN="$OKTA_DOMAIN"
export OKTA_API_KEY="$OKTA_API_KEY"
export ENVIRONMENT="$ENVIRONMENT"
export TERM="xterm"

#Migrate from PostGres
# Seed eAPD Mongo Database
# Install nvm.  Do it inside the ec2-user home directory so that user will have
# access to it forever, just in case we need to get into the machine and
# manually do some stuff to it.
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
source ~/.bashrc

# We're using Node 16.19.1, we care about minor/patch versions
nvm install 16.19.1
nvm alias default 16.19.1
nvm use 16.19.1
npm i -g yarn@1.22.18

# Install pm2: https://www.npmjs.com/package/pm2
# This is what'll manage running the API Node app. It'll keep it alive and make
# sure it's running when the EC2 instance restarts.
npm i -g pm2
E_USER
R_USER