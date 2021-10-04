#!/usr/bin/env sh

export NODE_ENV=test

docker-compose -e NODE_DEBUG='net,tls,http,https' -f docker-compose.endpoint-tests.yml up -d db

docker-compose -e NODE_DEBUG='net,tls,http,https' -f docker-compose.endpoint-tests.yml exec db sh -c 'PGPASSWORD=cms psql -U postgres -tc "DROP DATABASE IF EXISTS hitech_apd_test;"'
docker-compose -e NODE_DEBUG='net,tls,http,https' -f docker-compose.endpoint-tests.yml exec db sh -c 'PGPASSWORD=cms psql -U postgres -tc "CREATE DATABASE hitech_apd_test;"'

docker-compose -e NODE_DEBUG='net,tls,http,https' -f docker-compose.endpoint-tests.yml run api-for-testing npm run migrate
docker-compose -e NODE_DEBUG='net,tls,http,https' -f docker-compose.endpoint-tests.yml run api-for-testing npm run seed

docker-compose -e NODE_DEBUG='net,tls,http,https' -f docker-compose.endpoint-tests.yml run api-for-testing npm run test $@
EXIT_CODE=$?

docker-compose -e NODE_DEBUG='net,tls,http,https' -f docker-compose.endpoint-tests.yml down

exit $EXIT_CODE
