#!/usr/bin/env sh
docker-compose -f docker-compose.endpoint-tests.yml up -d
docker-compose -f docker-compose.endpoint-tests.yml exec api-endpoint-tests npm run migrate
docker-compose -f docker-compose.endpoint-tests.yml exec api-endpoint-tests npm run seed
docker-compose -f docker-compose.endpoint-tests.yml exec api-endpoint-tests npm run test-endpoints
#docker-compose -f docker-compose.endpoint-tests.yml down --rmi all
