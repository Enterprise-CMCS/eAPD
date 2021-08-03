echo 'Creating Mongo Admin User'

mongo admin \
        --eval "db.runCommand({'createUser' : '${PREVIEW_MONGO_INITDB_ROOT_USERNAME}','pwd' : '${PREVIEW_MONGO_INITDB_ROOT_PASSWORD}', 'roles' : [{'role' : 'root','db' : 'admin'}]});"

echo 'Creating eAPD Application Eser and DB'

mongo ${PREVIEW_MONGO_INITDB_DATABASE} \
        -u ${PREVIEW_MONGO_INITDB_ROOT_USERNAME} \
        -p ${PREVIEW_MONGO_INITDB_ROOT_PASSWORD} \
        --authenticationDatabase admin \
        --eval "db.createUser({user: '${PREVIEW_MONGO_DATABASE_USERNAME}', pwd: '${PREVIEW_MONGO_DATABASE_PASSWORD}', roles:[{role:'readWrite', db: '${PREVIEW_MONGO_INITDB_DATABASE}'}]});"
