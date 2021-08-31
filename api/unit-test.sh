export NODE_ENV=test
export TEST_DB_HOST=localhost
export TEST_DB_PORT=55432

docker-compose -f docker-compose.endpoint-tests.yml up -d db

npm run test


