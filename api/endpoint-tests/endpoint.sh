#!/usr/bin/env sh

rm ./endpoint-tests/endpoint-data.json

export NODE_ENV=test
export API_URL=http://localhost:8081

unset DEV_DB_NAME

echo "[]" > endpoint-data.json

docker-compose -f docker-compose.endpoint-tests.yml up -d
sleep 3
docker cp ./ api-for-testing:/app/ 
docker-compose -f docker-compose.endpoint-tests.yml exec api-for-testing yarn run migrate
docker-compose -f docker-compose.endpoint-tests.yml exec api-for-testing yarn run seed
docker-compose -f docker-compose.endpoint-tests.yml exec api-for-testing yarn run test-endpoints $@
EXIT_CODE=$?
echo $EXIT_CODE
docker-compose -f docker-compose.endpoint-tests.yml down

mv endpoint-data.json ./endpoint-tests

node endpoint-tests/endpoint-coverage.js
exit $EXIT_CODE
