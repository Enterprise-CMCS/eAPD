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
docker-compose exec -e OKTA_DOMAIN="$OKTA_DOMAIN" -e OKTA_API_KEY="$OKTA_API_KEY" api npm run migrate
echo "Running seed on API container"
docker-compose exec -e OKTA_DOMAIN="$OKTA_DOMAIN" -e OKTA_API_KEY="$OKTA_API_KEY" api npm run seed
echo "Copying tokens from API container"
docker cp api:/app/seeds/test/tokens.json ../api/seeds/test/tokens.json

echo "NODE_ENV=$NODE_ENV"

echo "Starting Cypress E2E Tests"
npx cypress run $@

EXIT_CODE=$?
echo "Shutting down the App"
docker-compose -f ../docker-compose.yml down
exit $EXIT_CODE