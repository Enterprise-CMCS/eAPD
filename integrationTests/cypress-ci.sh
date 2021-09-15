export OKTA_DOMAIN="$OKTA_DOMAIN"
export OKTA_SERVER_ID="$OKTA_SERVER_ID"
export OKTA_CLIENT_ID="$OKTA_CLIENT_ID"
export OKTA_API_KEY="$OKTA_API_KEY"
export JWT_SECRET="$JWT_SECRET"

#echo "Startng and backgrounding the App"
#docker-compose -f ../docker-compose.yml up -d

#echo "Waiting for the App to start"
#sleep 30

#echo "Running migrate"
#docker-compose exec -e OKTA_DOMAIN="$OKTA_DOMAIN" -e OKTA_API_KEY="$OKTA_API_KEY" -T api npm run migrate

#echo "Running seed"
#docker-compose exec -e OKTA_DOMAIN="$OKTA_DOMAIN" -e OKTA_API_KEY="$OKTA_API_KEY" -T api npm run seed

echo "Creatng TOKEN_LOC env var"
export TOKEN_LOC=$(docker exec eapd_api_1 find /app -type f -name tokens.json)

echo "Copying token"
docker cp \
  $(docker ps -aqf "name=eapd_api_1"):$TOKEN_LOC \
  ./tokens.json

echo "Starting Cypress End to End Tests"
docker-compose -f docker-compose.new-cypress.yml up $@

EXIT_CODE=$?
echo "Shutting down the App"
docker-compose -f ../docker-compose.yml down
exit $EXIT_CODE

