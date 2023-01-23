#!/bin/bash
# Configure CloudWatch Agent
export ENVIRONMENT=$ENVIRONMENT
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

touch /opt/aws/amazon-cloudwatch-agent/doc/app-logs.json
cat <<CWAPPLOGCONFIG > /opt/aws/amazon-cloudwatch-agent/doc/app-logs.json

{
  "logs": {
    "logs_collected": {
      "files": {
        "collect_list": [
          {
            "file_path": "/app/api/logs/eAPD-API-error-0.log*",
            "log_group_name": "__ENVIRONMENT__/app/api/logs/eAPD-API-error-0.log"
          },
          {
            "file_path": "/app/api/logs/eAPD-API-out-0.log*",
            "log_group_name": "__ENVIRONMENT__/app/api/logs/eAPD-API-out-0.log"
          },
          {
            "file_path": "/app/api/logs/eAPD-API-*",
            "log_group_name": "__ENVIRONMENT__/app/api/logs/eAPD-API-combined-0.log"
          },
          {
            "file_path": "/var/log/mongodb/mongo.log*",
            "log_group_name": "__ENVIRONMENT__/app/api/logs/eAPD-API-combined-0.log"
          },              
          {
            "file_path": "/app/api/logs/Database-migration-error.log*",
            "log_group_name": "__ENVIRONMENT__/app/api/logs/Database-migration-error.log"
          },
          {
            "file_path": "/app/api/logs/Database-migration-out.log*",
            "log_group_name": "__ENVIRONMENT__/app/api/logs/Database-migration-out.log"
          },
          {
            "file_path": "/app/api/logs/Database-migration-*",
            "log_group_name": "__ENVIRONMENT__/app/api/logs/Database-migration-combined.log"
          },          
          {
            "file_path": "/app/api/logs/Database-seeding-error.log*",
            "log_group_name": "__ENVIRONMENT__/app/api/logs/Database-seeding-error.log"
          },
          {
            "file_path": "/app/api/logs/Database-seeding-out.log*",
            "log_group_name": "__ENVIRONMENT__/app/api/logs/Database-seeding-out.log"
          },
          {
            "file_path": "/app/api/logs/Database-seeding-*",
            "log_group_name": "__ENVIRONMENT__/app/api/logs/Database-seeding-combined.log"
          },                                           
          {
            "file_path": "/app/api/logs/cms-hitech-apd-api.logs*",
            "log_group_name": "__ENVIRONMENT__/app/api/logs/cms-hitech-apd-api.logs"              
          }    
        ]
      }
    }
  }
}
CWAPPLOGCONFIG

touch /opt/aws/amazon-cloudwatch-agent/doc/var-log.json
cat <<CWVARLOGCONFIG > /opt/aws/amazon-cloudwatch-agent/doc/var-log.json
{
  "logs": {
    "logs_collected": {
      "files": {
        "collect_list": [
          {
            "file_path": "/var/log/aide/aide.log*",
            "log_group_name": "__ENVIRONMENT__/var/log/aide/aide.log"
          },
          {
            "file_path": "/var/log/audit/audit.log*",
            "log_group_name": "__ENVIRONMENT__/var/log/audit/audit.log"
          },
          {
            "file_path": "/var/log/awslogs.log*",
            "log_group_name": "__ENVIRONMENT__/var/log/awslogs.log"
          },
          {
            "file_path": "/var/log/cloud-init.log*",
            "log_group_name": "__ENVIRONMENT__/var/log/cloud-init.log"
          },
          {
            "file_path": "/var/log/cloud-init-output.log*",
            "log_group_name": "__ENVIRONMENT__/var/log/cloud-init-output.log"
          },
          {
            "file_path": "/var/log/cron*",
            "log_group_name": "__ENVIRONMENT__/var/log/cron"
          },
          {
            "file_path": "/var/log/dmesg*",
            "log_group_name": "__ENVIRONMENT__/var/log/dmesg"
          },
          {
            "file_path": "/var/log/maillog*",
            "log_group_name": "__ENVIRONMENT__/var/log/maillog"
          },
          {
            "file_path": "/var/log/messages*",
            "log_group_name": "__ENVIRONMENT__/var/log/messages"
          },
          {
            "file_path": "/var/log/secure*",
            "log_group_name": "__ENVIRONMENT__/var/log/secure"
          },
          {
            "file_path": "/var/log/mongodb/mongod.log*",
            "log_group_name": "__ENVIRONMENT__/var/log/mongodb/mongod.log"
          }                    
        ]
      }
    }
  }
}
CWVARLOGCONFIG

touch /opt/aws/amazon-cloudwatch-agent/doc/var-opt.json
cat <<CWVAROPTCONFIG > /opt/aws/amazon-cloudwatch-agent/doc/var-opt.json
{
  "logs": {
    "logs_collected": {
      "files": {
        "collect_list": [
          {
            "file_path": "/var/opt/ds_agent/diag/ds_agent.log*",
            "log_group_name": "__ENVIRONMENT__/var/opt/ds_agent/diag/ds_agent.log"
          },
          {
            "file_path": "/var/opt/ds_agent/diag/ds_agent-err.log*",
            "log_group_name": "__ENVIRONMENT__/var/opt/ds_agent/diag/ds_agent-err.log"
          },
          {
            "file_path": "/var/opt/ds_agent/diag/ds_am.log*",
            "log_group_name": "__ENVIRONMENT__/var/opt/ds_agent/diag/ds_am.log"
          }
        ]
      }
    }
  }
}

CWVAROPTCONFIG

/opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a append-config -m ec2 -s -c file:/opt/aws/amazon-cloudwatch-agent/doc/app-logs.json
/opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a append-config -m ec2 -s -c file:/opt/aws/amazon-cloudwatch-agent/doc/var-log.json
/opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a append-config -m ec2 -s -c file:/opt/aws/amazon-cloudwatch-agent/doc/var-opt.json
/opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a append-config -m ec2 -s -c file:/opt/aws/amazon-cloudwatch-agent/doc/cwagent.json

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
yarn add newrelic --save
cp node_modules/newrelic/newrelic.js api/newrelic.cjs

cd api

sed -i 's|My Application|eAPD API|g' newrelic.cjs
sed -i 's|license key here|__NEW_RELIC_LICENSE_KEY__|g' newrelic.cjs
sed -i "1 s|^|import('newrelic');\n|" main.js

# pm2 wants an ecosystem file that describes the apps to run and sets any
# environment variables they need.  The environment variables are sensitive,
# so we won't put them here.  Instead, the CI/CD process should replace the
# "ECOSYSTEM" placeholder below with a base64-encoded JSON string of an
# ecosystem file.
echo "__ECOSYSTEM__" | base64 --decode > ecosystem.config.cjs
# Start it up
pm2 start ecosystem.config.cjs
E_USER

# Restart New Relic Infrastructure Monitor
systemctl enable newrelic-infra
systemctl start newrelic-infra

# Setup pm2 to start itself at machine launch, and save its current
# configuration to be restored when it starts
su - ec2-user -c '~/.bash_profile; sudo env PATH=$PATH:/home/ec2-user/.nvm/versions/node/v16.16.0/bin /home/ec2-user/.nvm/versions/node/v16.16.0/lib/node_modules/pm2/bin/pm2 startup systemd -u ec2-user --hp /home/ec2-user'
su - ec2-user -c 'pm2 save'
su - ec2-user -c 'pm2 restart "eAPD API"'
