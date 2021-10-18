echo 'Creating application user and db'

mongo ${MONGO_INITDB_DATABASE} \
        -u ${MONGO_INITDB_ROOT_USERNAME} \
        -p ${MONGO_INITDB_ROOT_PASSWORD} \
        --authenticationDatabase admin \
        --eval "db.createUser({user: '${DATABASE_USERNAME}', pwd: '${DATABASE_PASSWORD}', roles:[{role:'readWrite', db: '${MONGO_INITDB_DATABASE}'}]});"