export OKTA_DOMAIN="$OKTA_DOMAIN"
export OKTA_SERVER_ID="$OKTA_SERVER_ID"
export OKTA_CLIENT_ID="$OKTA_CLIENT_ID"
export OKTA_API_KEY="$OKTA_API_KEY"
export JWT_SECRET="$JWT_SECRET"

echo "Startng and backgrounding the App"
docker-compose -f ../docker-compose.yml up -d

echo "Waiting for the App to start"
sleep 60

echo "Running migrate on API container"
docker-compose exec -e OKTA_DOMAIN="$OKTA_DOMAIN" -e OKTA_API_KEY="$OKTA_API_KEY" -t api npm run migrate
echo "Running seed on API container"
docker-compose exec -e OKTA_DOMAIN="$OKTA_DOMAIN" -e OKTA_API_KEY="$OKTA_API_KEY" -t api npm run seed > ../api/seeds/test/tokens.json
echo "Did Docker create tokens.json"
ls -la ../api/seeds/test/tokens.json
echo "Copying test tokens from API container method 1"
docker cp $(docker ps -aqf "name=eapd_api_1"):./seeds/test/tokens.json ../api/seeds/test/
echo "Copying development tokens from API container method 1"
docker cp $(docker ps -aqf "name=eapd_api_1"):./seeds/development/tokens.json ../api/seeds/test/
echo "Print API Container seeds directory contents"
docker exec $(docker ps -aqf "name=eapd_api_1") ls -la seeds
echo "Print API Container seeds/test directory contents"
docker exec $(docker ps -aqf "name=eapd_api_1") ls -la seeds/test
echo "Print API Container seeds/test/tokens.json directory contents"
docker exec $(docker ps -aqf "name=eapd_api_1") ls -la seeds/test/tokens.json
echo "Print API Container seeds/development working directory"

echo "Starting Cypress E2E Tests"
npx cypress run $@

EXIT_CODE=$?
echo "Shutting down the App"
docker-compose -f ../docker-compose.yml down
exit $EXIT_CODE