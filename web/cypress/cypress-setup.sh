#!/usr/bin/env sh

export NODE_ENV=development
export API_URL="http://localhost:8081"
export DEV_DB_NAME="apd_cypress_test"
export CYPRESS_TESTS=true

docker-compose -f ../docker-compose.yml up -d

docker-compose -f ../docker-compose.yml exec db sh -c 'PGPASSWORD=cms psql -U postgres -tc "DROP DATABASE IF EXISTS apd_cypress_test;"'
docker-compose -f ../docker-compose.yml exec db sh -c 'PGPASSWORD=cms psql -U postgres -tc "CREATE DATABASE apd_cypress_test;"'

docker-compose -f ../docker-compose.yml exec -e NODE_ENV=development -e DEV_DB_NAME=apd_cypress_test api npm run migrate
docker-compose -f ../docker-compose.yml exec -e NODE_ENV=development -e DEV_DB_NAME=apd_cypress_test api npm run seed

API_URL="http://localhost:8081" npx cypress $1