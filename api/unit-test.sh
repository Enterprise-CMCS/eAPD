#!/usr/bin/env sh

export NODE_ENV=test

docker-compose -f docker-compose.endpoint-tests.yml up -d
sleep 3

docker-compose -f docker-compose.endpoint-tests.yml exec db sh -c 'PGPASSWORD=cms psql -U postgres -tc "DROP DATABASE IF EXISTS hitech_apd_test;"'
docker-compose -f docker-compose.endpoint-tests.yml exec db sh -c 'PGPASSWORD=cms psql -U postgres -tc "CREATE DATABASE hitech_apd_test;"'

docker-compose -f docker-compose.endpoint-tests.yml exec api-for-testing yarn run migrate
docker-compose -f docker-compose.endpoint-tests.yml exec api-for-testing yarn run seed
docker-compose -f docker-compose.endpoint-tests.yml exec api-for-testing yarn run test $@
EXIT_CODE=$?

docker-compose -f docker-compose.endpoint-tests.yml down

exit $EXIT_CODE
