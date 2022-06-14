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

/opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -s -c file:/opt/aws/amazon-cloudwatch-agent/doc/cwagent.json

# Prepare the environment
sudo su - ec2-user <<E_USER
# The su block begins inside the root user's home directory.  Switch to the
# ec2-user home directory.
cd ~
sudo sh -c "echo license_key: '__NEW_RELIC_LICENSE_KEY__' >> /etc/newrelic-infra.yml"

# Get the built API code
cd /app
echo __BUILDURL__ |tee /home/ec2-user/buildurl.txt
curl -o backend.zip -L __BUILDURL__ |tee /home/ec2-user/backenddownload.txt
unzip backend.zip
rm backend.zip

yarn cache clean
yarn install --frozen-lockfile --non-interactive --production --network-timeout 1000000

# There are some platform-dependent binaries that need to be rebuilt before
# the knex CLI will work correctly.
#yarn rebuild knex ### TODO use when yarn is updated
yarn add --force knex
yarn add newrelic
cp node_modules/newrelic/newrelic.js api/newrelic.js
cd api
sed -i 's|My Application|eAPD API|g' newrelic.js
sed -i 's|license key here|__NEW_RELIC_LICENSE_KEY__|g' newrelic.js
sed -i "1 s|^|require('newrelic');\n|" main.js

# pm2 wants an ecosystem file that describes the apps to run and sets any
# environment variables they need.  The environment variables are sensitive,
# so we won't put them here.  Instead, the CI/CD process should replace the
# "ECOSYSTEM" placeholder below with a base64-encoded JSON string of an
# ecosystem file.
echo "__ECOSYSTEM__" | base64 --decode > ecosystem.config.js
# Start it up
pm2 start ecosystem.config.js
E_USER

# Restart New Relic Infrastructure Monitor
systemctl enable newrelic-infra
systemctl start newrelic-infra

# Setup pm2 to start itself at machine launch, and save its current
# configuration to be restored when it starts
su - ec2-user -c '~/.bash_profile; sudo env PATH=$PATH:/home/ec2-user/.nvm/versions/node/v16.15.0/bin /home/ec2-user/.nvm/versions/node/v16.15.0/lib/node_modules/pm2/bin/pm2 startup systemd -u ec2-user --hp /home/ec2-user'
su - ec2-user -c 'pm2 save'
su - ec2-user -c 'pm2 restart "eAPD API"'
