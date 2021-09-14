export OKTA_DOMAIN="$OKTA_DOMAIN"
export OKTA_SERVER_ID="$OKTA_SERVER_ID"
export OKTA_CLIENT_ID="$OKTA_CLIENT_ID"
export OKTA_API_KEY="$OKTA_API_KEY"
export JWT_SECRET="$JWT_SECRET"

# Setup postgres
postgresql-setup initdb
echo "
# TYPE    DATABASE    USER    ADDRESS         METHODS
local     all         all                     peer
host      all         all     127.0.0.1/32    password
host      all         all     ::1/128         password
" > /var/lib/pgsql/data/pg_hba.conf
systemctl start postgresql
systemctl enable postgresql

# Prepare test database
sudo -u postgres psql -c "CREATE DATABASE hitech_apd;"
sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD 'cms';"

echo "Startng and backgrounding the App"
#docker-compose -f ../docker-compose.yml up -d
cd ../api
npm start
cd ../web
npm start
cd ../integrationTests

echo "Waiting for the App to start"
sleep 60

echo "Running migrate"
#docker-compose exec -e OKTA_DOMAIN="$OKTA_DOMAIN" -e OKTA_API_KEY="$OKTA_API_KEY" -t api npm run migrate
npm run migrate
echo "Running seed"
#docker-compose exec -e OKTA_DOMAIN="$OKTA_DOMAIN" -e OKTA_API_KEY="$OKTA_API_KEY" -t api npm run seed
npm run seed
#echo "Copy seed to local"
#rm ../api/seeds/test/tokens.json
#docker cp $(docker ps -aqf "name=eapd_api_1"):/app/seeds/test/tokens.json ../api/seeds/test/tokens.json

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