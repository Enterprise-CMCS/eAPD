echo 'Creating application user and db'

mongo admin --eval "db.runCommand({'createUser' : '','pwd' : '', 'roles' : [{'role' : 'root','db' : 'admin'}]});"
mongo $MONGO_INITDB_DATABASE --eval "db.runCommand({'createUser' : '$MONGO_INITDB_ROOT_USERNAME','pwd' : '$MONGO_INITDB_ROOT_PASSWORD', 'roles' : [{'role' : 'root','db' : '$MONGO_INITDB_DATABASE'}]});"
mongo ${MONGO_INITDB_DATABASE} \
        -u ${MONGO_INITDB_ROOT_USERNAME} \
        -p ${MONGO_INITDB_ROOT_PASSWORD} \
        --authenticationDatabase admin \
        --eval "db.createUser({user: '${DATABASE_USERNAME}', pwd: '${DATABASE_PASSWORD}', roles:[{role:'dbOwner', db: '${MONGO_INITDB_DATABASE}'}]});"