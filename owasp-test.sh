#!/usr/bin/env sh

export NODE_ENV=test
export API_URL=http://localhost:8081

# Set up API server
docker-compose -f docker-compose.endpoint-tests.yml -p api up -d
sleep 60

docker-compose -f docker-compose.endpoint-tests.yml -p api exec -e LOG_LEVEL=verbose api-for-testing yarn run migrate
docker-compose -f docker-compose.endpoint-tests.yml -p api exec -e LOG_LEVEL=verbose api-for-testing yarn run seed
echo 'Checking to see if the server is running'
until [ "`docker inspect -f {{.State.Health.Status}} api-container`"=="healthy" ]; do
    sleep 10;
    echo '.';
done;
echo 'Server is running and status is healthy'

# run tests
docker pull owasp/zap2docker-stable:2.11.1

docker run \
    --network api_default \
    -v $(pwd)/owasp:/zap/wrk:rw \
    owasp/zap2docker-stable:2.11.1 \
    zap-api-scan.py \
    -c api-scan.conf \
    -t http://api-for-testing:8000/open-api \
    -f openapi
