#!/bin/bash

# Become root user to perform installation and configuration
sudo su <<R_USER
#!/bin/bash

# Install New Relic Infrastructure Monitor
curl -o /etc/yum.repos.d/newrelic-infra.repo https://download.newrelic.com/infrastructure_agent/linux/yum/el/7/x86_64/newrelic-infra.repo
yum -q makecache -y --disablerepo='*' --enablerepo='newrelic-infra'
yum install newrelic-infra -y

# Setup Mongo Repo
touch /etc/yum.repos.d/mongodb-org-4.4.repo
echo "
[mongodb-org-4.4]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/7/mongodb-org/4.4/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.4.asc
" > /etc/yum.repos.d/mongodb-org-4.4.repo

# Install mongo
yum -y install mongodb-org checkpolicy

# Install git
yum -y install git

# Install CloudWatch Agent
curl -O https://s3.amazonaws.com/amazoncloudwatch-agent/redhat/amd64/latest/amazon-cloudwatch-agent.rpm
rpm -U ./amazon-cloudwatch-agent.rpm
rm ./amazon-cloudwatch-agent.rpm

# SELinux for Mongo
cat > mongodb_cgroup_memory.te <<EOF
module mongodb_cgroup_memory 1.0;
require {
      type cgroup_t;
      type mongod_t;
      class dir search;
      class file { getattr open read };
}
#============= mongod_t ==============
allow mongod_t cgroup_t:dir search;
allow mongod_t cgroup_t:file { getattr open read };
EOF

checkmodule -M -m -o mongodb_cgroup_memory.mod mongodb_cgroup_memory.te
semodule_package -o mongodb_cgroup_memory.pp -m mongodb_cgroup_memory.mod
sudo semodule -i mongodb_cgroup_memory.pp

# Start & Enable Mongo
systemctl daemon-reload
systemctl enable mongod
systemctl start mongod

# Test to see the command that is getting built for pulling the Git Branch
su ec2-user <<E_USER
# The su block begins inside the root user's home directory.  Switch to the
# ec2-user home directory.
export MONGO_DATABASE="$mongo_database"
export MONGO_URL=""
export MONGO_INITDB_ROOT_USERNAME="$mongo_initdb_root_username"
export MONGO_INITDB_ROOT_PASSWORD="$mongo_initdb_root_password"
export MONGO_INITDB_DATABASE="$mongo_initdb_database"
export MONGO_DATABASE_USERNAME="$mongo_database_username"
export MONGO_DATABASE_PASSWORD="$mongo_database_password"

# Seed eAPD Mongo Database
cd ~
# Install nvm.  Do it inside the ec2-user home directory so that user will have
# access to it forever, just in case we need to get into the machine and
# manually do some stuff to it.
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
source ~/.bashrc

# We're using Node 14, and we don't care about minor/patch versions, so always
# get the latest.
nvm install 14
nvm alias default 14

git clone --single-branch -b tforkner/3100-move-apds-to-mongodb https://github.com/CMSgov/eAPD.git
cd eAPD/api
npm i
npm run migrate

#Preparing Mongo DB Users
cd ~
cat <<MONGOUSERSEED > mongo-init.sh
mongo admin --eval "db.runCommand({'createUser' : '$MONGO_INITDB_ROOT_USERNAME','pwd' : '$MONGO_INITDB_ROOT_PASSWORD', 'roles' : [{'role' : 'root','db' : 'admin'}]});"
mongo admin --eval "db.eapd.insert({'name': 'Garbage'});"
mongo admin --eval "db.runCommand({'createUser' : '$MONGO_DATABASE_USERNAME','pwd' : '$MONGO_DATABASE_PASSWORD', 'roles' : [{'role' : 'userAdmin', 'db' :'$MONGO_DATABASE'}]});"
MONGOUSERSEED
E_USER

# Harden & Restart Mongo
sh /home/ec2-user/mongo-init.sh
sed -i 's|#security:|security:|g' /etc/mongod.conf
sed -i '/security:/a \ \ authorization: "enabled"' /etc/mongod.conf
systemctl restart mongod
rm mongo-init.sh

# Configure CloudWatch Agent
mkdir -p /opt/aws/amazon-cloudwatch-agent/doc/
touch /opt/aws/amazon-cloudwatch-agent/doc/cwagent.json
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

touch /opt/aws/amazon-cloudwatch-agent/doc/var-log.json
cat <<CWVARLOGCONFIG > /opt/aws/amazon-cloudwatch-agent/doc/var-log.json
{
  "logs": {
    "logs_collected": {
      "files": {
        "collect_list": [
          {
            "file_path": "/var/log/aide/aide.log*",
            "log_group_name": "staging/var/log/aide/aide.log"
          },
          {
            "file_path": "/var/log/audit/audit.log*",
            "log_group_name": "staging/var/log/audit/audit.log"
          },
          {
            "file_path": "/var/log/awslogs.log*",
            "log_group_name": "staging/var/log/awslogs.log"
          },
          {
            "file_path": "/var/log/cloud-init.log*",
            "log_group_name": "staging/var/log/cloud-init.log"
          },
          {
            "file_path": "/var/log/cloud-init-output.log*",
            "log_group_name": "staging/var/log/cloud-init-output.log"
          },
          {
            "file_path": "/var/log/cron*",
            "log_group_name": "staging/var/log/cron"
          },
          {
            "file_path": "/var/log/dmesg*",
            "log_group_name": "staging/var/log/dmesg"
          },
          {
            "file_path": "/var/log/maillog*",
            "log_group_name": "staging/var/log/maillog"
          },
          {
            "file_path": "/var/log/messages*",
            "log_group_name": "staging/var/log/messages"
          },
          {
            "file_path": "/var/log/secure*",
            "log_group_name": "staging/var/log/secure"
          },
          {
            "file_path": "/var/log/mongodb/mongod.log*",
            "log_group_name": "staging/var/log/mongodb/mongod.log"
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
            "log_group_name": "staging/var/opt/ds_agent/diag/ds_agent.log"
          },
          {
            "file_path": "/var/opt/ds_agent/diag/ds_agent-err.log*",
            "log_group_name": "staging/var/opt/ds_agent/diag/ds_agent-err.log"
          },
          {
            "file_path": "/var/opt/ds_agent/diag/ds_am.log*",
            "log_group_name": "staging/var/opt/ds_agent/diag/ds_am.log"
          }
        ]
      }
    }
  }
}

CWVAROPTCONFIG

/opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -s -c file:/opt/aws/amazon-cloudwatch-agent/doc/cwagent.json

/opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a append-config -m ec2 -s -c file:/opt/aws/amazon-cloudwatch-agent/doc/var-log.json

/opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a append-config -m ec2 -s -c file:/opt/aws/amazon-cloudwatch-agent/doc/var-opt.json

R_USER