mongo -- "$MONGO_INITDB_DATABASE" <<EOF
  var rootUser = "$MONGO_INITDB_ROOT_USERNAME"
  var rootPassword = "$MONGO_INITDB_ROOT_PASSWORD"
  var adminDbName = "$MONGO_INITDB_DATABASE"
  var eapdUser = "$MONGO_DATABASE_USERNAME"
  var eapdPassword = "$MONGO_DATABASE_PASSWORD"
  var eapdDbName = "$MONGO_DATABASE"
  var admin = db.getSiblingDB(adminDbName)
  admin.auth(rootUser, rootPassword);
  var eapd = db.getSiblingDB(eapdDbName); 
  admin.createUser({
    user: eapdUser,
    pwd: eapdPassword,
    roles: [{ role: 'dbOwner', db: eapdDbName }]
  });
  eapd.createCollection('apds');
  eapd.createCollection('migrations');
EOF