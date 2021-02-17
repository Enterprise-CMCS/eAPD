#!/usr/bin/env sh

rm ./endpoint-tests/endpoint-data.json
echo "[]" > endpoint-data.json

alias dc="docker-compose"
compose_file="docker-compose.endpoint-tests.yml"

ENDPOINT_COVERAGE_CAPTURE=true \
  dc -f "$compose_file" up -d
dc -f "$compose_file" exec api-for-testing npm run migrate
dc -f "$compose_file" exec api-for-testing npm run seed
dc -f "$compose_file" exec api-for-testing npm run test-endpoints $@
EXIT_CODE=$?
dc -f "$compose_file" down

mv endpoint-data.json ./endpoint-tests
#node endpoint-tests/endpoint-coverage.js

exit $EXIT_CODE
