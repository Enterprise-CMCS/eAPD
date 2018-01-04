#!/usr/bin/env sh
docker-compose -f docker-compose.endpoint-tests.yml up -d
docker-compose -f docker-compose.endpoint-tests.yml exec api-for-testing npm run test-endpoints
docker-compose -f docker-compose.endpoint-tests.yml stop
