#!/bin/bash

# Become root user to perform installation and configuration
sudo su <<R_USER
#!/bin/bash

yum -y update
yum -y install git
yum -y install epel-release
yum -y install nginx

rpm -U ./amazon-cloudwatch-agent.rpm
rm ./amazon-cloudwatch-agent.rpm

# Restart Nginx
systemctl enable nginx
systemctl restart nginx

R_USER