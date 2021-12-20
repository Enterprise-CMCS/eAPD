export OKTA_DOMAIN="$OKTA_DOMAIN"
export OKTA_SERVER_ID="$OKTA_SERVER_ID"
export OKTA_CLIENT_ID="$OKTA_CLIENT_ID"
export OKTA_API_KEY="$OKTA_API_KEY"
export JWT_SECRET="$JWT_SECRET"

echo "Creatng TOKEN_LOC env var"
export TOKEN_LOC=$(docker exec eapd_api_1 find /app -type f -name tokens.json)

echo "Copying token"
docker cp \
  $(docker ps -aqf "name=eapd_api_1"):$TOKEN_LOC \
  ./tokens.json

echo "Creating Cypress Env File"
echo $CYPRESS_ENV >> ./cypress.env.json
