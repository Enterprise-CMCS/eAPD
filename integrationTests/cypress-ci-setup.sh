export NODE_ENV=development

docker-compose exec api npm run migrate
docker-compose exec api npm run seed

echo "Creating Cypress Env File"
echo $CYPRESS_ENV >> ./cypress.env.json
