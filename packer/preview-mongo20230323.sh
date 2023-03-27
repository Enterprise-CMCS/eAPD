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

yum -y install mongodb-org-5.0.3-1.el7 checkpolicy

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

# Harden & Restart Mongo
sed -i 's|#security:|security:|g' /etc/mongod.conf
sed -i '/security:/a \ \ authorization: "enabled"' /etc/mongod.conf
sed -i 's|bindIp:.*|bindIp: 0.0.0.0|g' /etc/mongod.conf
systemctl restart mongod
R_USER