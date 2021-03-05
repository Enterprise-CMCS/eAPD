#!/usr/bin/env sh

rm ./endpoint-tests/endpoint-data.json
echo "[]" > endpoint-data.json

compose_file="docker-compose.endpoint-tests.yml"
alias dc="docker-compose -f $compose_file"

ENDPOINT_COVERAGE_CAPTURE=true \
  dc up --detach
dc exec api-for-testing npm run migrate
dc exec api-for-testing npm run seed
dc exec api-for-testing npm run test-endpoints $@ # -- --update-snapshot
EXIT_CODE=$?
dc down

mv endpoint-data.json ./endpoint-tests
node endpoint-tests/endpoint-coverage.js

exit $EXIT_CODE
