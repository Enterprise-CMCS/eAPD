#!/usr/bin/env sh

export NODE_ENV=test
export NODE_DEBUG="net,tls,http,https"
docker-compose -f docker-compose.endpoint-tests.yml up -d db

docker-compose -f docker-compose.endpoint-tests.yml exec --env-file .env.net db sh -c 'PGPASSWORD=cms psql -U postgres -tc "DROP DATABASE IF EXISTS hitech_apd_test;"'
docker-compose -f docker-compose.endpoint-tests.yml exec --env-file .env.net db sh -c 'PGPASSWORD=cms psql -U postgres -tc "CREATE DATABASE hitech_apd_test;"'

docker-compose -f docker-compose.endpoint-tests.yml run --env-file .env.net api-for-testing npm run migrate
docker-compose -f docker-compose.endpoint-tests.yml run --env-file .env.net api-for-testing npm run seed

docker-compose -f docker-compose.endpoint-tests.yml run --env-file .env.net api-for-testing npm run test $@
EXIT_CODE=$?

docker-compose -f docker-compose.endpoint-tests.yml down

exit $EXIT_CODE
