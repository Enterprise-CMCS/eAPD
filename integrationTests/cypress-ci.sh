export OKTA_DOMAIN="$OKTA_DOMAIN"
export OKTA_SERVER_ID="$OKTA_SERVER_ID"
export OKTA_CLIENT_ID="$OKTA_CLIENT_ID"
export OKTA_API_KEY="$OKTA_API_KEY"
export JWT_SECRET="$JWT_SECRET"

echo "Startng and backgrounding the App"
docker-compose -f ../docker-compose.yml up -d

echo "ls from home"
ls -la
echo "Home"
pwd
echo "ls from root"
ls -la /

echo "Waiting for the App to start"
sleep 60

echo "Running migrate on API container"
docker-compose exec -e OKTA_DOMAIN="$OKTA_DOMAIN" -e OKTA_API_KEY="$OKTA_API_KEY" -t api npm run migrate
echo "Running seed on API container"
docker-compose exec -e OKTA_DOMAIN="$OKTA_DOMAIN" -e OKTA_API_KEY="$OKTA_API_KEY" -t api npm run seed
echo "List Docker containers"
docker ps
echo "Api Container path to tokens"
docker exec eapd_api_1 ls -la /app/seeds/test/tokens.json
echo "Copy seed to local"
rm ../api/seeds/test/tokens.json
docker cp eapd_api_1:/app/seeds/test/tokens.json ../api/seeds/test/tokens.json

echo "Running npm dependencies"
npm install knex
npm install pg
npm install cypress
npm install

echo "Starting Cypress E2E Tests"
#npx cypress run --headless $@
npm run cy:run:ci $@

EXIT_CODE=$?
echo "Shutting down the App"
docker-compose -f ../docker-compose.yml down
exit $EXIT_CODE