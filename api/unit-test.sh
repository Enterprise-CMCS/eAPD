#!/usr/bin/env sh

export NODE_ENV=test
export COMPOSE_HTTP_TIMEOUT=300

docker-compose -f ../docker-compose.endpoint-tests.yml -p api up -d

docker-compose -f ../docker-compose.endpoint-tests.yml -p api exec db sh -c 'PGPASSWORD=cms psql -U postgres -tc "DROP DATABASE IF EXISTS hitech_apd_test;"'
docker-compose -f ../docker-compose.endpoint-tests.yml -p api exec db sh -c 'PGPASSWORD=cms psql -U postgres -tc "CREATE DATABASE hitech_apd_test;"'

docker-compose -f ../docker-compose.endpoint-tests.yml -p api exec -e LOG_LEVEL=verbose api-for-testing yarn run migrate
docker-compose -f ../docker-compose.endpoint-tests.yml -p api exec -e LOG_LEVEL=verbose api-for-testing yarn run seed


docker-compose -f ../docker-compose.endpoint-tests.yml -p api exec api-for-testing yarn test $@
EXIT_CODE=$? # this must stay right after the test run so that the EXIT_CODE is properly reported

docker cp api-container:/app/api/coverage ./coverage
docker-compose -f ../docker-compose.endpoint-tests.yml -p api down

exit $EXIT_CODE
