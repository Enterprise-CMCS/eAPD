#!/usr/bin/env sh

rm ./endpoint-tests/endpoint-data.json

export NODE_ENV=test
export API_URL=http://localhost:8081
export CYPRESS_TESTS=false
unset DEV_DB_NAME

echo "[]" > endpoint-data.json

ENDPOINT_COVERAGE_CAPTURE=true docker-compose -e NODE_DEBUG='net,tls,http,https' -f docker-compose.endpoint-tests.yml up -d
docker-compose -e NODE_DEBUG='net,tls,http,https' -f docker-compose.endpoint-tests.yml exec api-for-testing npm run migrate
docker-compose -e NODE_DEBUG='net,tls,http,https' -f docker-compose.endpoint-tests.yml exec api-for-testing npm run seed
docker-compose -e NODE_DEBUG='net,tls,http,https' -f docker-compose.endpoint-tests.yml exec api-for-testing npm run test-endpoints $@
EXIT_CODE=$?
docker-compose -e NODE_DEBUG='net,tls,http,https' -f docker-compose.endpoint-tests.yml down

mv endpoint-data.json ./endpoint-tests

node endpoint-tests/endpoint-coverage.js
exit $EXIT_CODE
