#!/bin/bash

# Add a user group for the default user, and make it the owner of the /app
# directory, then give the directory group write permission
groupadd eapd
gpasswd -a ec2-user eapd
mkdir /app
chown -R :eapd /app
chmod g+w /app

# Oddly, EC2 images don't have git installed. Shruggy person.
yum -y install git

# Become the default user. Everything between "<<E_USER" and "E_USER" will be
# run in the context of this su command.
su ec2-user <<E_USER

# The su block begins inside the root user's home directory.  Switch to the
# ec2-user home directory.
cd ~

# Install nvm.  Do it inside the ec2-user home directory so that user will have
# access to it forever, just in case we need to get into the machine and
# manually do some stuff to it.
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
source ~/.bashrc

# We're using Node 10, and we don't care about minor/patch versions, so always
# get the latest.
nvm install 10
nvm alias default 10

# Install pm2: https://www.npmjs.com/package/pm2
# This is what'll manage running the API Node app. It'll keep it alive and make
# sure it's running when the EC2 instance restarts.
npm i -g pm2

# Get the API code.  In the future, it'd be nice if we could get a zip file
# from the CI/CD process instead of using git.  This will work for now.
cd /app
git clone --depth 1 https://github.com/18F/cms-hitech-apd.git
cd cms-hitech-apd/api

# Delete seed files that might be dangerous so they can't be accidentally run
rm -rf seeds/development
rm -rf seeds/test
rm seeds/development.js
rm seeds/test.js
rm seeds/shared/delete-everything.js

npm ci --only=production

# Migrate the database.  The "DB_URL" placeholder below should be replaced by
# the CI/CD process with the real database URL to use.
NODE_ENV=production DB_URL=__DB_URL__ npm run migrate

# pm2 wants an ecosystem file that describes the apps to run and sets any
# environment variables they need.  The environment variables are sensitive,
# so we won't put them here.  Instead, the CI/CD process should replace the
# "ECOSYSTEM" placeholder below with a base64-encoded JSON string of an
# ecosystem file.
echo "__ECOSYSTEM__" | base64 --decode > ecosystem.config.js

# Start it up
pm2 start ecosystem.config.js

E_USER

# Setup pm2 to start itself at machine launch, and save its current
# configuration to be restored when it starts
su - ec2-user -c '~/.bash_profile; sudo env PATH=$PATH:/home/ec2-user/.nvm/versions/node/v10.15.3/bin /home/ec2-user/.nvm/versions/node/v10.15.3/lib/node_modules/pm2/bin/pm2 startup systemd -u ec2-user --hp /home/ec2-user'
su - ec2-user -c 'pm2 save'
