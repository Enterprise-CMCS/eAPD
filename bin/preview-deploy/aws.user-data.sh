#!/bin/bash
# Prepare test database
sudo -u postgres psql -c "CREATE DATABASE hitech_apd;"
sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD 'cms';"

# Start Nginx
systemctl enable start
systemctl start nginx

# Clone from Github
git clone --single-branch -b __GIT_BRANCH__ https://github.com/CMSgov/eAPD.git

# Build the web app and move it into place
cd eAPD/web
npm ci
API_URL=/api OKTA_DOMAIN="__OKTA_DOMAIN__" npm run build
mv dist/* /app/web
cd ~

# Move the API code into place, then go set it up
mv eAPD/api/* /app/api
cd /app/api

npm ci --only=production

# Build and seed the database
NODE_ENV=development DEV_DB_HOST=localhost npm run migrate
NODE_ENV=development DEV_DB_HOST=localhost npm run seed

# pm2 wants an ecosystem file that describes the apps to run and sets any
# environment variables they need.  The environment variables are sensitive,
# so we won't put them here.  Instead, the CI/CD process should replace
# "__ECOSYSTEM__" with a base64-encoded JSON string of an ecosystem file.
echo "module.exports = {
  apps : [{
    name: 'eAPD API',
    script: 'main.js',
    instances: 1,
    autorestart: true,
    error_file: '/app/api/logs/eAPD-API-error-0.log',
    out_file: '/app/api/logs/eAPD-API-out-0.log',
    env: {
      AUTH_LOCK_FAILED_ATTEMPTS_COUNT: 15,
      AUTH_LOCK_FAILED_ATTEMPTS_WINDOW_TIME_MINUTES: 1,
      AUTH_LOCK_FAILED_ATTEMPTS_DURATION_MINUTES: 10,
      FILE_PATH: '__files',
      FILE_STORE: 'local',
      NODE_ENV: 'development',
      PBKDF2_ITERATIONS: '__PBKDF2_ITERATIONS__',
      PORT: '8000',
      DEV_DB_HOST: 'localhost',
      DISABLE_SAME_SITE: 'yes',
      OKTA_DOMAIN: '__OKTA_DOMAIN__',
      OKTA_SERVER_ID: '__OKTA_SERVER_ID__',
      OKTA_CLIENT_ID: '__OKTA_CLIENT_ID__',
      OKTA_API_KEY: '__OKTA_API_KEY__'

    },
  }]
};" > ecosystem.config.js

# Start it up
pm2 start ecosystem.config.js

# Setup pm2 to start itself at machine launch, and save its current
# configuration to be restored when it starts
su - ec2-user -c '~/.bash_profile; sudo env PATH=$PATH:/home/ec2-user/.nvm/versions/node/v10.15.3/bin /home/ec2-user/.nvm/versions/node/v10.15.3/lib/node_modules/pm2/bin/pm2 startup systemd -u ec2-user --hp /home/ec2-user'
su - ec2-user -c 'pm2 save'
su - ec2-user -c 'pm2 restart'
yum remove -y gcc gcc-c++ make
