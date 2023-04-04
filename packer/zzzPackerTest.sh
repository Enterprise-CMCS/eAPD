#!/bin/bash
# Run Yum Update
sudo su <<R_USER
# Update Logrotate Configuration
# Logs are offloaded to CloudWatch & Splunk
sed -i 's|weekly|daily|g' /etc/logrotate.conf
sed -i 's|rotate 12|rotate 5|g' /etc/logrotate.conf
systemctl restart rsyslog

# Updating/Upgrading installed apps and services
yum upgrade -y
yum update -y
R_USER

sudo su <<R_USER
# Add Mongo Repo
touch /etc/yum.repos.d/mongodb-org-5.0.repo
echo "
[mongodb-org-5.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/7/mongodb-org/5.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-5.0.asc
" > /etc/yum.repos.d/mongodb-org-5.0.repo
R_USER

sudo su <<R_USER
# Add New Relic Repo
wget https://download.newrelic.com/infrastructure_agent/linux/yum/el/7/x86_64/newrelic-infra.repo
mv newrelic-infra.repo /etc/yum.repos.d/newrelic-infra.repo
yum -q makecache -y --disablerepo='*' --enablerepo='newrelic-infra'
R_USER

sudo su <<R_USER
# Add PostGreSQL Repo
rpm -Uvh https://download.postgresql.org/pub/repos/yum/reporpms/EL-7-x86_64/pgdg-redhat-repo-latest.noarch.rpm
R_USER

sudo su <<R_USER
# Add CloudWatch Repo
wget https://s3.amazonaws.com/amazoncloudwatch-agent/redhat/amd64/latest/amazon-cloudwatch-agent.rpm
R_USER

sudo su <<R_USER
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
R_USER

sudo su <<R_USER
# Create self-signed certificates
openssl genrsa -des3 -passout pass:x -out /app/tls/server.pass.key 2048
openssl rsa -passin pass:x -in /app/tls/server.pass.key -out /app/tls/server.key
rm -f /app/tls/server.pass.key

# Use the instance metadata service to get public hostname
openssl req -new -key /app/tls/server.key -out /app/tls/server.csr -subj "/CN=$(wget -qO- http://169.254.169.254/latest/meta-data/public-hostname)"
openssl x509 -req -sha256 -days 365 -in /app/tls/server.csr -signkey /app/tls/server.key -out /app/tls/server.crt
rm -f /app/tls/server.csr
R_USER

#sudo su <<R_USER
#yum -y install epel-release
#yum -y install nginx
#R_USER
