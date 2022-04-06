#!/usr/bin/env sh

export NODE_ENV=test

docker-compose -f docker-compose.endpoint-tests.yml up -d db
sleep 3

docker-compose -f docker-compose.endpoint-tests.yml exec db sh -c 'PGPASSWORD=cms psql -U postgres -tc "DROP DATABASE IF EXISTS hitech_apd_test;"'
docker-compose -f docker-compose.endpoint-tests.yml exec db sh -c 'PGPASSWORD=cms psql -U postgres -tc "CREATE DATABASE hitech_apd_test;"'

docker-compose -f docker-compose.endpoint-tests.yml run api-for-testing yarn run migrate
docker-compose -f docker-compose.endpoint-tests.yml run api-for-testing yarn run seed

echo "Test DB is now running (docker ps to confirm)"
echo "Please run the following commands to ensure tests run successfully"
echo "export TEST_DB_HOST=localhost"
echo "export TEST_DB_PORT=55432"
