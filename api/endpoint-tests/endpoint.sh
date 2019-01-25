#!/usr/bin/env sh

rm ./endpoint-tests/endpoints-all.txt
rm ./endpoint-tests/endpoints-hit.txt

docker-compose -f docker-compose.endpoint-tests.yml up -d
docker-compose -f docker-compose.endpoint-tests.yml exec api-for-testing npm run migrate
docker-compose -f docker-compose.endpoint-tests.yml exec api-for-testing npm run seed
docker-compose -f docker-compose.endpoint-tests.yml exec api-for-testing npm run test-endpoints $@
docker-compose -f docker-compose.endpoint-tests.yml down

mv endpoints-*.txt ./endpoint-tests

node endpoint-tests/endpoint-coverage.js
