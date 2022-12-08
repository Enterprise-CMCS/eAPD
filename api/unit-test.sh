#!/usr/bin/env sh

./test-server-setup.sh

echo 'Checking to see if the server is running'
until [ "`docker inspect -f {{.State.Health.Status}} api-container`"=="healthy" ]; do
    sleep 10;
    echo '.';
done;
echo 'Server is running and status is healthy'
docker-compose -f ../docker-compose.endpoint-tests.yml -p api exec api-for-testing yarn run test $@
EXIT_CODE=$? # this must stay right after the test run so that the EXIT_CODE is properly reported

docker cp api-container:/app/api/coverage ./coverage
docker-compose -f ../docker-compose.endpoint-tests.yml -p api down

exit $EXIT_CODE
