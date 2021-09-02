#!/usr/bin/env sh

export NODE_ENV=development
export API_URL=http://localhost:8081
export CYPRESS_TESTS=true

docker-compose -f ../docker-compose.yml up -d
docker-compose exec api npm run migrate
docker-compose exec api npm run seed

npx cypress run --headless $@
EXIT_CODE=$?
docker-compose down
exit $EXIT_CODE