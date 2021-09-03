#!/usr/bin/env sh

export NODE_ENV=development
##export API_URL=http://localhost:8081
##export CYPRESS_TESTS=true

#docker-compose -f ../docker-compose.yml up -d
#docker-compose exec -t api npm run migrate
#docker-compose exec -t api npm run seed
##docker-compose -f docker-compose.cypress.yml up $@

##npx cypress run --headless $@

cd ../web
npm install
cd ../api
cd ..
sudo -u postgres psql -c "CREATE DATABASE hitech_apd;"
sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD 'cms';"
cd api
npm run migrate
npm run seed
npm start &
cd ../web
npm start &
cd ../integrationTests
sudo apt-get install -y libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
npm install knex
npm install cypress

npm run cy:run:ci $@
EXIT_CODE=$?
docker-compose down
exit $EXIT_CODE