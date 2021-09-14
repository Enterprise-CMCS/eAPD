export OKTA_DOMAIN="$OKTA_DOMAIN"
export OKTA_SERVER_ID="$OKTA_SERVER_ID"
export OKTA_CLIENT_ID="$OKTA_CLIENT_ID"
export OKTA_API_KEY="$OKTA_API_KEY"
export JWT_SECRET="$JWT_SECRET"

echo "Startng and backgrounding the App"
docker-compose -f ../docker-compose.yml up -d

echo "Waiting for the App to start"
sleep 60

echo "Running migrate"
docker-compose exec -e OKTA_DOMAIN="$OKTA_DOMAIN" -e OKTA_API_KEY="$OKTA_API_KEY" -t api npm run migrate

echo "Running seed"
docker-compose exec -e OKTA_DOMAIN="$OKTA_DOMAIN" -e OKTA_API_KEY="$OKTA_API_KEY" -t api npm run seed

echo "Checking Running containers"
docker ps

echo "Looking for tokens.json"
find / -type f -name tokens.json

echo "Copying token"
docker cp \
  $(docker ps -aqf "name=eapd_api_1"):$(docker exec eapd_api_1 find /app -type f -name tokens.json) \
  ./tokens.json

docker-compose -f docker-compose.new-cypress.yml up

