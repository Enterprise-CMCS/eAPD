#!/usr/bin/env sh

export NODE_ENV=development
export DEV_DB_HOST=localhost
export DEV_DB_PORT=54325

docker-compose exec api yarn run migrate
docker-compose exec api yarn run seed
sleep 5

TZ=utc npx cypress $1 $2 $3 --browser chrome
