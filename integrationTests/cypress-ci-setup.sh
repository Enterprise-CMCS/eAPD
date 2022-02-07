echo "Creatng TOKEN_LOC env var"
export TOKEN_LOC=$(docker exec eapd-api-1 find /app -type f -name tokens.json)

echo "Copying token"
docker cp \
  $(docker ps -aqf "name=eapd-api-1"):$TOKEN_LOC \
  ./tokens.json

echo "Creating Cypress Env File"
echo $CYPRESS_ENV >> ./cypress.env.json

npx cypress run -C cypress.json --parallel --record $1 $2 $@

EXIT_CODE=$?
echo $EXIT_CODE

exit $EXIT_CODE