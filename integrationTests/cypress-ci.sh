#!/usr/bin/env sh

export NODE_ENV=development
#export API_URL=http://localhost:8081
export CYPRESS_TESTS=true

docker-compose -f ../docker-compose.yml up --build -d --verbose
docker-compose exec -t api npm run migrate
docker-compose exec -t api npm run seed
docker-compose exec -t api npm run cy:run:ci $@
#docker-compose -f docker-compose.cypress.yml up $@

#npx cypress run --headless $@

EXIT_CODE=$?
docker-compose down
exit $EXIT_CODE