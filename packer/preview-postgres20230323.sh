#!/bin/bash

# Become root user to perform installation and configuration
sudo su <<R_USER
#!/bin/bash
export MONGO_DATABASE="$MONGO_DATABASE"
export MONGO_INITDB_ROOT_USERNAME="$MONGO_INITDB_ROOT_USERNAME"
export MONGO_INITDB_ROOT_PASSWORD="$MONGO_INITDB_ROOT_PASSWORD"
export MONGO_INITDB_DATABASE="$MONGO_INITDB_DATABASE"
export MONGO_DATABASE_USERNAME="$MONGO_DATABASE_USERNAME"
export MONGO_DATABASE_PASSWORD="$MONGO_DATABASE_PASSWORD"
export MONGO_ADMIN_URL="$MONGO_ADMIN_URL"
export DATABASE_URL="$DATABASE_URL"
export OKTA_DOMAIN="$OKTA_DOMAIN"
export OKTA_API_KEY="$OKTA_API_KEY"
export ENVIRONMENT="$ENVIRONMENT"
export TERM="xterm"

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

su - postgres << PG_USER
# Prepare PostGres test database
psql -c "CREATE DATABASE hitech_apd;"
psql -c "ALTER USER postgres WITH PASSWORD 'cms';"
PG_USER
R_USER