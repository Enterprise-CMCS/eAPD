#!/usr/bin/env sh

rm ./endpoint-tests/endpoint-data.json

export NODE_ENV=test
export API_URL=http://localhost:8081
export COMPOSE_HTTP_TIMEOUT=300

unset DEV_DB_NAME

echo "[]" > endpoint-data.json

docker-compose -f ../docker-compose.endpoint-tests.yml -p api up -d
echo 'Checking to see if the server is running'
until [ "`docker inspect -f {{.State.Health.Status}} api-container`"=="healthy" ]; do
    sleep 10;
    echo '.';
done;
echo 'Server is running and status is healthy'

docker-compose -f ../docker-compose.endpoint-tests.yml -p api exec -e LOG_LEVEL=verbose api-for-testing yarn run migrate
docker-compose -f ../docker-compose.endpoint-tests.yml -p api exec -e LOG_LEVEL=verbose api-for-testing yarn run seed
docker-compose -f ../docker-compose.endpoint-tests.yml -p api exec -e ENDPOINT_COVERAGE_CAPTURE=true api-for-testing yarn run test-endpoints $@
EXIT_CODE=$? # this must stay right after the test run so that the EXIT_CODE is properly reported

docker cp api-container:/app/api/endpoint-data.json endpoint-data.json
docker-compose -f ../docker-compose.endpoint-tests.yml -p api down

mv endpoint-data.json ./endpoint-tests

node endpoint-tests/endpoint-coverage.js
exit $EXIT_CODE
