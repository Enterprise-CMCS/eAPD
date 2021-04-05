#!/usr/bin/env sh

ENDPOINT_COVERAGE_CAPTURE=true docker-compose -f docker-compose.endpoint-tests.yml up -d
docker-compose -f docker-compose.endpoint-tests.yml exec api-for-testing npm run migrate
docker-compose -f docker-compose.endpoint-tests.yml exec api-for-testing npm run seed
docker pull owasp/zap2docker-stable
docker run --name zap --network api_default -v "$(pwd)/../owasp":/zap/wrk -t owasp/zap2docker-stable zap-api-scan.py -c api-scan.conf -t http://api-for-testing:8000/open-api -f openapi
docker container rm zap
docker-compose -f docker-compose.endpoint-tests.yml down
