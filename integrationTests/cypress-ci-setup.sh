docker-compose -f docker-compose.cypress-ci.yml up -d
sleep 3

docker-compose -f docker-compose.cypress-ci.yml exec api npm run migrate
docker-compose -f docker-compose.cypress-ci.yml exec api npm run seed

echo "Creating TOKEN_LOC env var"
export TOKEN_LOC=$(docker exec integrationtests_api_1 find /app -type f -name tokens.json)

echo "Copying token"
docker cp \
  $(docker ps -aqf "name=integrationtests_api_1"):$TOKEN_LOC \
  ./tokens.json

echo "Creating Cypress Env File"
echo $CYPRESS_ENV >> ./cypress.env.json