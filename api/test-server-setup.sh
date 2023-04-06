#!/usr/bin/env sh

export NODE_ENV=test
export COMPOSE_HTTP_TIMEOUT=300

docker-compose -f ../docker-compose.endpoint-tests.yml -p api up -d
echo "containers created"
sleep 30;

docker-compose -f ../docker-compose.endpoint-tests.yml -p api exec db sh -c 'PGPASSWORD=cms psql -U postgres -tc "DROP DATABASE IF EXISTS hitech_apd_test;"'
docker-compose -f ../docker-compose.endpoint-tests.yml -p api exec db sh -c 'PGPASSWORD=cms psql -U postgres -tc "CREATE DATABASE hitech_apd_test;"'

docker-compose -f ../docker-compose.endpoint-tests.yml -p api exec -e LOG_LEVEL=verbose api-for-testing yarn run migrate
docker-compose -f ../docker-compose.endpoint-tests.yml -p api exec -e LOG_LEVEL=verbose api-for-testing yarn run seed
