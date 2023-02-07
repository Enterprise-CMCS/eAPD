#!/usr/bin/env sh

./test-server-setup.sh

docker-compose -f ../docker-compose.endpoint-tests.yml -p api exec api-for-testing yarn test $@
EXIT_CODE=$? # this must stay right after the test run so that the EXIT_CODE is properly reported

docker cp api-container:/app/api/coverage ./coverage
docker-compose -f ../docker-compose.endpoint-tests.yml -p api down

exit $EXIT_CODE
