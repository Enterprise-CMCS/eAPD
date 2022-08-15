#!/usr/bin/env sh

export NODE_ENV=development
export DEV_DB_HOST=localhost
export DEV_DB_PORT=54325
export TEALIUM_ENV="test"

yarn workspace @cms-eapd/common build
yarn workspace @cms-eapd/api build
yarn workspace @cms-eapd/web build

docker-compose up -d
sleep 5

docker-compose exec api yarn run migrate
docker-compose exec api yarn run seed
sleep 5
