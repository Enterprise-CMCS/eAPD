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

#Install CloudWatch Agent
wget https://s3.amazonaws.com/amazoncloudwatch-agent/redhat/amd64/latest/amazon-cloudwatch-agent.rpm

rpm -U ./amazon-cloudwatch-agent.rpm

# Configure CloudWatch Agent
cat <<CWAGENTCONFIG > /opt/aws/amazon-cloudwatch-agent/doc/cwagent.json
{
        "agent": {
                "metrics_collection_interval": 60,
                "run_as_user": "cwagent"
        },
        "metrics": {
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
                        "cpu": {
                                "measurement": [
                                        "cpu_usage_idle",
                                        "cpu_usage_iowait",
                                        "cpu_usage_user",
                                        "cpu_usage_system"
                                ],
                                "metrics_collection_interval": 60,
                                "totalcpu": false
                        },
                        "disk": {
                                "measurement": [
                                        "used_percent",
                                        "inodes_free"
                                ],
                                "metrics_collection_interval": 60,
                                "resources": [
                                        "*"
                                ]
                        },
                        "diskio": {
                                "measurement": [
                                        "io_time"
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
                                "metrics_collection_interval": 60,
                                "service_address": ":8125"
                        },
                        "swap": {
                                "measurement": [
                                        "swap_used_percent"
                                ],
                                "metrics_collection_interval": 60
                        }
                }
        }
}
CWAGENTCONFIG

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
          }
        ]
      }
    }
  }
}
CWVARLOGCONFIG

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

/opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -s -c file:/opt/aws/amazon-cloudwatch-agent/doc/cwagent.json

/opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a append-config -m ec2 -s -c file:/opt/aws/amazon-cloudwatch-agent/doc/var-log.json

/opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a append-config -m ec2 -s -c file:/opt/aws/amazon-cloudwatch-agent/doc/var-opt.json

/opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a append-config -m ec2 -s -c file:/opt/aws/amazon-cloudwatch-agent/doc/app-logs.json

# Install New Relic Infrastructure Monitor
curl -o /etc/yum.repos.d/newrelic-infra.repo https://download.newrelic.com/infrastructure_agent/linux/yum/el/7/x86_64/newrelic-infra.repo
yum -q makecache -y --disablerepo='*' --enablerepo='newrelic-infra'
yum install newrelic-infra -y

# Become the default user. Everything between "<<E_USER" and "E_USER" will be
# run in the context of this su command.
su ec2-user <<E_USER
# The su block begins inside the root user's home directory.  Switch to the
# ec2-user home directory.
cd ~
mkdir -p /app/api/logs
touch /app/api/logs/eAPD-API-error-0.log
touch /app/api/logs/eAPD-API-out-0.log
touch /app/api/logs/Database-migration-error.log
touch /app/api/logs/Database-migration-out.log
touch /app/api/logs/Database-seeding-error.log
touch /app/api/logs/Database-seeding-out.log
touch /app/api/logs/cms-hitech-apd-api.logs

# Add New Relic License Key to Infra Monitor config
sudo sh -c "echo license_key: '__NEW_RELIC_LICENSE_KEY__' >> /etc/newrelic-infra.yml"

# Install nvm.  Do it inside the ec2-user home directory so that user will have
# access to it forever, just in case we need to get into the machine and
# manually do some stuff to it.
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
source ~/.bashrc

# We're using Node 16, and we don't care about minor/patch versions, so always
# get the latest.
nvm install 16.13.2
nvm alias default 16.13.2

# Install pm2: https://www.npmjs.com/package/pm2
# This is what'll manage running the API Node app. It'll keep it alive and make
# sure it's running when the EC2 instance restarts.
npm i -g pm2
npm i -g yarn@1.22.17
# Get the built API code
cd /app
curl -o backend.zip -L __BUILDURL__
unzip backend.zip
rm backend.zip
cd api
yarn install --frozen-lockfile --production=true
# There are some platform-dependent binaries that need to be rebuilt before
# the knex CLI will work correctly.
yarn rebuild knex

# pm2 wants an ecosystem file that describes the apps to run and sets any
# environment variables they need.  The environment variables are sensitive,
# so we won't put them here.  Instead, the CI/CD process should replace the
# "ECOSYSTEM" placeholder below with a base64-encoded JSON string of an
# ecosystem file.
echo "__ECOSYSTEM__" | base64 --decode > ecosystem.config.js
# Start it up
pm2 start ecosystem.config.js
yarn add newrelic --save
cp node_modules/newrelic/newrelic.js ./newrelic.js
sed -i 's|My Application|eAPD API|g' newrelic.js
sed -i 's|license key here|__NEW_RELIC_LICENSE_KEY__|g' newrelic.js
sed -i "1 s|^|require('newrelic');\n|" main.js
E_USER

# Restart New Relic Infrastructure Monitor
systemctl enable newrelic-infra
systemctl start newrelic-infra

# Setup pm2 to start itself at machine launch, and save its current
# configuration to be restored when it starts
su - ec2-user -c '~/.bash_profile; sudo env PATH=$PATH:/home/ec2-user/.nvm/versions/node/v16.13.2/bin /home/ec2-user/.nvm/versions/node/v16.13.2/lib/node_modules/pm2/bin/pm2 startup systemd -u ec2-user --hp /home/ec2-user'
su - ec2-user -c 'pm2 save'
su - ec2-user -c 'pm2 restart "eAPD API"'
