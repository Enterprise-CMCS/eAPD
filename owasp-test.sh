#!/usr/bin/env sh

export NODE_ENV=test
export API_URL=http://localhost:8081

# Set up API server
docker-compose -f docker-compose.endpoint-tests.yml -p api up -d
sleep 60

docker-compose -f docker-compose.endpoint-tests.yml -p api exec -e LOG_LEVEL=verbose api-for-testing yarn run migrate
docker-compose -f docker-compose.endpoint-tests.yml -p api exec -e LOG_LEVEL=verbose api-for-testing yarn run seed

