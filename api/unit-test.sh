#!/usr/bin/env sh

export NODE_ENV=test

npm cache clean --force
#nvm use --delete-prefix v6.1.0 --silent
nvm install 14
nvm alias default v14
which npm

docker-compose -f docker-compose.endpoint-tests.yml up -d db

docker-compose -f docker-compose.endpoint-tests.yml exec db sh -c 'PGPASSWORD=cms psql -U postgres -tc "DROP DATABASE IF EXISTS hitech_apd_test;"'
docker-compose -f docker-compose.endpoint-tests.yml exec db sh -c 'PGPASSWORD=cms psql -U postgres -tc "CREATE DATABASE hitech_apd_test;"'

docker-compose -f docker-compose.endpoint-tests.yml run api-for-testing npm run migrate
docker-compose -f docker-compose.endpoint-tests.yml run api-for-testing npm run seed

docker-compose -f docker-compose.endpoint-tests.yml run api-for-testing npm run test $@
EXIT_CODE=$?

docker-compose -f docker-compose.endpoint-tests.yml down

exit $EXIT_CODE
