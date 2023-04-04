#!/bin/bash
# Run Yum Update
# Updating/Upgrading installed apps and services
sudo su <<R_USER
yum -y install epel-release
yum upgrade -y
yum update -y
yum -y install nginx

# Set SELinux context so Nginx can read the cert files
semanage fcontext -a -t httpd_sys_content_t "/app/tls(/.*)?"
restorecon -Rv /app/tls

# Restart Nginx
systemctl enable nginx
systemctl restart nginx
R_USER