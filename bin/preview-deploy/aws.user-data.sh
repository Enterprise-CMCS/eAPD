#!/bin/bash
# Configure CloudWatch Agent
touch /opt/aws/amazon-cloudwatch-agent/doc/cwagent.json
cat <<CWAGENTCONFIG > /opt/aws/amazon-cloudwatch-agent/doc/cwagent.json
{
	"agent": {
		"metrics_collection_interval": 60,
		"run_as_user": "cwagent"
	},
	"metrics": {
		"aggregation_dimensions": [
			[
				"InstanceId"
			]
		],
		"append_dimensions": {
			"AutoScalingGroupName": "${aws:AutoScalingGroupName}",
			"ImageId": "${aws:ImageId}",
			"InstanceId": "${aws:InstanceId}",
			"InstanceType": "${aws:InstanceType}"
		},
		"metrics_collected": {
			"collectd": {
				"metrics_aggregation_interval": 60
			},
			"disk": {
				"measurement": [
					"used_percent"
				],
				"metrics_collection_interval": 60,
				"resources": [
					"*"
				]
			},
			"mem": {
				"measurement": [
					"mem_used_percent"
				],
				"metrics_collection_interval": 60
			},
			"statsd": {
				"metrics_aggregation_interval": 60,
				"metrics_collection_interval": 10,
				"service_address": ":8125"
			}
		}
	}
}

CWAGENTCONFIG

/opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a append-config -m ec2 -s -c file:/opt/aws/amazon-cloudwatch-agent/doc/cwagent.json

sudo yum install -y gcc-c++

# Test to see the command that is getting built for pulling the Git Branch
sudo su - ec2-user <<E_USER
# The su block begins inside the root user's home directory.  Switch to the
# ec2-user home directory.
cd ~
# Prepare the environment
export OKTA_DOMAIN="__OKTA_DOMAIN__"
export OKTA_SERVER_ID="__OKTA_SERVER_ID__"
export OKTA_CLIENT_ID="__OKTA_CLIENT_ID__"
export OKTA_API_KEY="__OKTA_API_KEY__"
export LD_API_KEY="__LD_API_KEY__"
export JWT_SECRET="__JWT_SECRET__"
export MONGO_DATABASE="__MONGO_DATABASE__"
export MONGO_URL="__MONGO_URL__"
export MONGO_ADMIN_URL="__MONGO_ADMIN_URL__"
export MONGO_INITDB_ROOT_USERNAME="__MONGO_INITDB_ROOT_USERNAME__"
export MONGO_INITDB_ROOT_PASSWORD="__MONGO_INITDB_ROOT_PASSWORD__"
export MONGO_INITDB_DATABASE="__MONGO_INITDB_DATABASE__"
export MONGO_DATABASE_USERNAME="__MONGO_DATABASE_USERNAME__"
export MONGO_DATABASE_PASSWORD="__MONGO_DATABASE_PASSWORD__"
export DATABASE_URL="__DATABASE_URL__"
sudo sh -c "echo license_key: '__NEW_RELIC_LICENSE_KEY__' >> /etc/newrelic-infra.yml"


# Clone from Github
git clone --single-branch -b __GIT_BRANCH__ https://github.com/Enterprise-CMCS/eAPD.git
# Build the web app and move it into place
cd eAPD
npm i -g yarn@1.22.18
yarn cache clean
yarn install --frozen-lockfile --non-interactive --production --network-timeout 1000000 2>&1 | tee yarn-install.log
cp package.json /app
cp yarn.lock /app

# move the common folder into place
cd ~/eAPD/common
mkdir -p /app/common
cp -r ~/eAPD/common/* /app/common

# move the web app into place
cd ~/eAPD/web
LD_CLIENT_ID="__LD_CLIENT_ID__" TEALIUM_ENV="__TEALIUM_ENV__" API_URL=/api TEALIUM_TAG="__TEALIUM_TAG__" OKTA_DOMAIN="__OKTA_DOMAIN__" OKTA_SERVER_ID="__OKTA_SERVER_ID__" OKTA_CLIENT_ID="__OKTA_CLIENT_ID__" yarn build 2>&1 | tee web-build.log
cp -r dist/* /app/web

# move over node modules
cd ~/eAPD
mkdir -p /app/node_modules
cp -r ~/eAPD/node_modules/* /app/node_modules

# Move the API code into place, then go set it up
cd ~/eAPD
mkdir -p /app/api
cp -r ~/eAPD/api/* /app/api

cd /app
yarn install --frozen-lockfile --non-interactive --production --network-timeout 1000000
cd /app/api

# Build and seed the database
LOG_LEVEL=verbose NODE_ENV=development DEV_DB_HOST=localhost yarn run migrate 2>&1 | tee migrate.log
LOG_LEVEL=verbose NODE_ENV=development DEV_DB_HOST=localhost yarn run seed 2>&1 | tee seed.log

# Setting Up New Relic Application Monitor
yarn add newrelic --save
cp node_modules/newrelic/newrelic.js ./newrelic.cjs
sed -i 's|My Application|eAPD API|g' newrelic.cjs
sed -i 's|license key here|__NEW_RELIC_LICENSE_KEY__|g' newrelic.cjs
sed -i "1 s|^|import('newrelic');\n|" main.js

sudo chown -R ec2-user:eapd /app

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
      OKTA_API_KEY: '__OKTA_API_KEY__',
      JWT_SECRET: '__JWT_SECRET__',
      MONGO_DATABASE: '__MONGO_DATABASE__',
      MONGO_URL: '__MONGO_URL__',
      DATABASE_URL: '__DATABASE_URL__',
			LD_API_KEY: '__LD_API_KEY__',
    },
  }]
};" > ecosystem.config.cjs
# Start it up
pm2 start ecosystem.config.cjs
pm2 save

E_USER

sudo yum remove -y gcc-c++

# SELinux context so Nginx can READ the files in /app/web
mv /home/ec2-user/nginx.conf.tpl /etc/nginx/nginx.conf
chown -R nginx /app/web
semanage fcontext -a -t httpd_sys_content_t /etc/nginx/nginx.conf
restorecon -Rv /etc/nginx/nginx.conf
semanage fcontext -a -t httpd_sys_content_t "/app/web(/.*)?"
restorecon -Rv /app/web
setsebool -P httpd_can_network_connect 1

# Restart Nginx
systemctl enable nginx
systemctl restart nginx

# Restart New Relic Infrastructure Monitor
systemctl enable newrelic-infra
systemctl start newrelic-infra

# Setup pm2 to start itself at machine launch, and save its current
# configuration to be restored when it starts
su - ec2-user -c '~/.bash_profile; sudo env PATH=$PATH:/home/ec2-user/.nvm/versions/node/v16.19.1/bin /home/ec2-user/.nvm/versions/node/v16.19.1/lib/node_modules/pm2/bin/pm2 startup systemd -u ec2-user --hp /home/ec2-user'
su - ec2-user -c 'pm2 save'
su - ec2-user -c 'pm2 restart "eAPD API"'

yum upgrade -y
yum update -y