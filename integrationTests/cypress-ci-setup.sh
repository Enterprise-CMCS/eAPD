echo "Creating TOKEN_LOC env var"
export TOKEN_LOC=$(docker exec eapd_api_1 find /app -type f -name tokens.json)

echo "Copying token"
docker cp \
  $(docker ps -aqf "name=eapd_api_1"):$TOKEN_LOC \
  ./tokens.json

echo "Creating Cypress Env File"
echo $CYPRESS_ENV >> ./cypress.env.json
