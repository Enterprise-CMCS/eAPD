#!/usr/bin/env sh

rm ./endpoint-tests/endpoint-data.json

export NODE_ENV=test
export API_URL=http://localhost:8081
export COMPOSE_PROJECT_NAME=api

unset DEV_DB_NAME

echo "[]" > endpoint-data.json

docker-compose -f ../docker-compose.endpoint-tests.yml up -d

docker-compose -f ../docker-compose.endpoint-tests.yml exec api-for-testing yarn run migrate
docker-compose -f ../docker-compose.endpoint-tests.yml exec api-for-testing yarn run seed
docker-compose -f ../docker-compose.endpoint-tests.yml exec api-for-testing yarn run test-endpoints $@
EXIT_CODE=$?

docker-compose -f ../docker-compose.endpoint-tests.yml down

mv endpoint-data.json ./endpoint-tests

node endpoint-tests/endpoint-coverage.js

unset COMPOSE_PROJECT_NAME
exit $EXIT_CODE
