#!/usr/bin/env sh

export NODE_ENV=test

docker-compose -f ../docker-compose.endpoint-tests.yml -p api up -d
sleep 5

docker-compose -f ../docker-compose.endpoint-tests.yml -p api exec db sh -c 'PGPASSWORD=cms psql -U postgres -tc "DROP DATABASE IF EXISTS hitech_apd_test;"'
docker-compose -f ../docker-compose.endpoint-tests.yml -p api exec db sh -c 'PGPASSWORD=cms psql -U postgres -tc "CREATE DATABASE hitech_apd_test;"'

docker-compose -f ../docker-compose.endpoint-tests.yml -p api exec -e LOG_LEVEL=verbose api-for-testing yarn run migrate
docker-compose -f ../docker-compose.endpoint-tests.yml -p api exec -e LOG_LEVEL=verbose api-for-testing yarn run seed
sleep 5
docker-compose -f ../docker-compose.endpoint-tests.yml -p api exec api-for-testing yarn run test $@
EXIT_CODE=$?

docker cp api-for-testing:/app/api/coverage ./coverage

docker-compose -f ../docker-compose.endpoint-tests.yml -p api down

exit $EXIT_CODE
