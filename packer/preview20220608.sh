#!/bin/bash

# Become root user to perform installation and configuration
sudo su <<R_USER
#!/bin/bash

# Update Logrotate Configuration
# Logs are offloaded to CloudWatch & Splunk
sed -i 's|weekly|daily|g' /etc/logrotate.conf
sed -i 's|rotate 12|rotate 5|g' /etc/logrotate.conf
systemctl restart rsyslog

# Install New Relic Infrastructure Monitor
curl -o /etc/yum.repos.d/newrelic-infra.repo https://download.newrelic.com/infrastructure_agent/linux/yum/el/7/x86_64/newrelic-infra.repo
yum -q makecache -y --disablerepo='*' --enablerepo='newrelic-infra'
yum install newrelic-infra -y

# Add a user group for the default user, and make it the owner of the /app
# directory.  Unzip stuff there and then set permissions.
groupadd eapd
gpasswd -a ec2-user eapd

mkdir /app
mkdir /app/api
mkdir /app/web
mkdir /app/common

# Create app logs and directories
mkdir -p /app/api/logs
touch /app/api/logs/eAPD-API-error-0.log
touch /app/api/logs/eAPD-API-out-0.log
touch /app/api/logs/Database-migration-error.log
touch /app/api/logs/Database-migration-out.log
touch /app/api/logs/Database-seeding-error.log
touch /app/api/logs/Database-seeding-out.log
touch /app/api/logs/cms-hitech-apd-api.logs

chown -R :eapd /app
chmod -R g+w /app

mkdir /app/tls

# Setup PostGres for Mongo Migraton
rpm -Uvh https://download.postgresql.org/pub/repos/yum/reporpms/EL-8-x86_64/pgdg-redhat-repo-latest.noarch.rpm
yum install -y postgresql13-server-13.4-1PGDG.rhel7

#postgresql-setup initdb
/usr/pgsql-13/bin/postgresql-13-setup initdb
echo "
# TYPE    DATABASE    USER    ADDRESS         METHODS
local     all         all                     peer
host      all         all     127.0.0.1/32    password
host      all         all     ::1/128         password
" > /var/lib/pgsql/13/data/pg_hba.conf
systemctl enable postgresql-13
systemctl start postgresql-13

# Setup Mongo Repo
touch /etc/yum.repos.d/mongodb-org-5.0.repo
echo "
[mongodb-org-5.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/7/mongodb-org/5.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-5.0.asc
" > /etc/yum.repos.d/mongodb-org-5.0.repo

# Install packages
yum -y install git
yum -y install epel-release
yum -y install nginx

yum -y install mongodb-org-5.0.3-1.el7 checkpolicy

# Install CloudWatch Agent
curl -O https://s3.amazonaws.com/amazoncloudwatch-agent/redhat/amd64/latest/amazon-cloudwatch-agent.rpm
rpm -U ./amazon-cloudwatch-agent.rpm
rm ./amazon-cloudwatch-agent.rpm

# Create self-signed certificates
openssl genrsa -des3 -passout pass:x -out /app/tls/server.pass.key 2048
openssl rsa -passin pass:x -in /app/tls/server.pass.key -out /app/tls/server.key
rm -f /app/tls/server.pass.key
# Use the instance metadata service to get public hostname
openssl req -new -key /app/tls/server.key -out /app/tls/server.csr -subj "/CN=$(curl http://169.254.169.254/latest/meta-data/public-hostname)"
openssl x509 -req -sha256 -days 365 -in /app/tls/server.csr -signkey /app/tls/server.key -out /app/tls/server.crt
rm -f /app/tls/server.csr

# Set SELinux context so Nginx can read the cert files
semanage fcontext -a -t httpd_sys_content_t "/app/tls(/.*)?"
restorecon -Rv /app/tls

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
rm mongodb_cgroup_memory.te

# Start & Enable Mongo
systemctl daemon-reload
systemctl enable mongod
systemctl start mongod

# Restart Nginx
systemctl enable nginx
systemctl restart nginx

su - postgres << PG_USER
# Prepare PostGres test database
psql -c "CREATE DATABASE hitech_apd;"
psql -c "ALTER USER postgres WITH PASSWORD 'cms';"
PG_USER
R_USER

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
export MONGO_URL="$MONGO_URL"
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

# We're using Node 16.16.0, we care about minor/patch versions
nvm install 16.16.0
nvm alias default 16.16.0
nvm use 16.16.0
npm i -g yarn@1.22.18

# Install pm2: https://www.npmjs.com/package/pm2
# This is what'll manage running the API Node app. It'll keep it alive and make
# sure it's running when the EC2 instance restarts.
npm i -g pm2

#Preparing Mongo DB Users
cd ~
cat <<MONGOROOTUSERSEED > mongo-init.sh
mongo $MONGO_INITDB_DATABASE --eval "db.runCommand({'createUser' : '$MONGO_INITDB_ROOT_USERNAME','pwd' : '$MONGO_INITDB_ROOT_PASSWORD', 'roles' : [{'role' : 'root','db' : '$MONGO_INITDB_DATABASE'}]});"
MONGOROOTUSERSEED
sh ~/mongo-init.sh
cat <<MONGOUSERSEED > mongo-user.sh
mongo $MONGO_INITDB_DATABASE --eval "db.runCommand({'createUser' : '$MONGO_DATABASE_USERNAME','pwd' : '$MONGO_DATABASE_PASSWORD', 'roles' : [{'role' : 'dbOwner', 'db' :'$MONGO_DATABASE'}]});"
MONGOUSERSEED
sh ~/mongo-user.sh
rm ~/mongo-init.sh
rm ~/mongo-user.sh

#touch ~/mongo-dump.sh
#echo "
## Var 1 is timestamp, 2 is environment, 3 is Mongo URL
##Create var for time so value doesn't drift between creating tarball and aws cp to S3
#echo $1
##Create dump
##mongodump --uri=$2_MONGO_URL
#MONGO_URL=$2_MONGO_URL
#mongodump --uri=$3
##Tar zip dump
#tar -cvf $2_mongo_$1.tar.gz dump/
##Send it
#aws s3 cp $2_mongo_$1.tar.gz s3://eapd-mongo-dump-$2
#" > ~/mongo-dump.sh
E_USER

sudo su <<R_USER
# Create cronjob to run MongoDump Hourly (For Testing)
touch /etc/cron.hourly/mongodump
echo "
bash /home/ec2-user/mongo-dump.sh $(date +%Y%m%d%H%M%S) $ENVIRONMENT $MONGO_DATABASE
" > /etc/cron.hourly/mongodump

# Harden & Restart Mongo
sed -i 's|#security:|security:|g' /etc/mongod.conf
sed -i '/security:/a \ \ authorization: "enabled"' /etc/mongod.conf
sed -i 's|bindIp:.*|bindIp: 0.0.0.0|g' /etc/mongod.conf
systemctl restart mongod

# Configure CloudWatch Agent
mkdir -p /opt/aws/amazon-cloudwatch-agent/doc/
touch /opt/aws/amazon-cloudwatch-agent/doc/app-logs.json
cat <<CWAPPLOGCONFIG > /opt/aws/amazon-cloudwatch-agent/doc/app-logs.json
{
  "logs": {
    "logs_collected": {
      "files": {
        "collect_list": [
          {
            "file_path": "/app/api/logs/eAPD-API-error-0.log*",
            "log_group_name": "preview/app/api/logs/eAPD-API-error-0.log"
          },
          {
            "file_path": "/app/api/logs/eAPD-API-out-0.log*",
            "log_group_name": "preview/app/api/logs/eAPD-API-out-0.log"
          },
          {
            "file_path": "/app/api/logs/eAPD-API-*",
            "log_group_name": "preview/app/api/logs/eAPD-API-combined-0.log"
          },
          {
            "file_path": "/var/log/mongodb/mongo.log*",
            "log_group_name": "preview/app/api/logs/eAPD-API-combined-0.log"
          },              
          {
            "file_path": "/app/api/logs/Database-migration-error.log*",
            "log_group_name": "preview/app/api/logs/Database-migration-error.log"
          },
          {
            "file_path": "/app/api/logs/Database-migration-out.log*",
            "log_group_name": "preview/app/api/logs/Database-migration-out.log"
          },
          {
            "file_path": "/app/api/logs/Database-migration-*",
            "log_group_name": "preview/app/api/logs/Database-migration-combined.log"
          },          
          {
            "file_path": "/app/api/logs/Database-seeding-error.log*",
            "log_group_name": "preview/app/api/logs/Database-seeding-error.log"
          },
          {
            "file_path": "/app/api/logs/Database-seeding-out.log*",
            "log_group_name": "preview/app/api/logs/Database-seeding-out.log"
          },
          {
            "file_path": "/app/api/logs/Database-seeding-*",
            "log_group_name": "preview/app/api/logs/Database-seeding-combined.log"
          },                                           
          {
            "file_path": "/app/api/logs/cms-hitech-apd-api.logs*",
            "log_group_name": "preview/app/api/logs/cms-hitech-apd-api.logs"              
          }    
        ]
      }
    }
  }
}
CWAPPLOGCONFIG

# Nginx is test/preview only
touch /opt/aws/amazon-cloudwatch-agent/doc/var-log.json
cat <<CWVARLOGCONFIG > /opt/aws/amazon-cloudwatch-agent/doc/var-log.json
{
  "logs": {
    "logs_collected": {
      "files": {
        "collect_list": [
          {
            "file_path": "/var/log/aide/aide.log*",
            "log_group_name": "preview/var/log/aide/aide.log"
          },
          {
            "file_path": "/var/log/audit/audit.log*",
            "log_group_name": "preview/var/log/audit/audit.log"
          },
          {
            "file_path": "/var/log/awslogs.log*",
            "log_group_name": "preview/var/log/awslogs.log"
          },
          {
            "file_path": "/var/log/cloud-init.log*",
            "log_group_name": "preview/var/log/cloud-init.log"
          },
          {
            "file_path": "/var/log/cloud-init-output.log*",
            "log_group_name": "preview/var/log/cloud-init-output.log"
          },
          {
            "file_path": "/var/log/cron*",
            "log_group_name": "preview/var/log/cron"
          },
          {
            "file_path": "/var/log/dmesg*",
            "log_group_name": "preview/var/log/dmesg"
          },
          {
            "file_path": "/var/log/maillog*",
            "log_group_name": "preview/var/log/maillog"
          },
          {
            "file_path": "/var/log/messages*",
            "log_group_name": "preview/var/log/messages"
          },
          {
            "file_path": "/var/log/nginx/access.log*",
            "log_group_name": "preview/var/log/nginx/access.log"
          },
          {
            "file_path": "/var/log/nginx/error.log*",
            "log_group_name": "preview/var/log/nginx/error.log"
          },
          {
            "file_path": "/var/log/secure*",
            "log_group_name": "preview/var/log/secure"
          },
          {
            "file_path": "/var/log/mongodb/mongod.log*",
            "log_group_name": "preview/var/log/mongodb/mongod.log"
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
            "log_group_name": "preview/var/opt/ds_agent/diag/ds_agent.log"
          },
          {
            "file_path": "/var/opt/ds_agent/diag/ds_agent-err.log*",
            "log_group_name": "preview/var/opt/ds_agent/diag/ds_agent-err.log"
          },
          {
            "file_path": "/var/opt/ds_agent/diag/ds_am.log*",
            "log_group_name": "preview/var/opt/ds_agent/diag/ds_am.log"
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
R_USER