#!/usr/bin/env sh

export NODE_ENV=development

docker-compose exec api yarn run migrate
docker-compose exec api yarn run seed

cp ../api/seeds/test/tokens.json ./tokens.json

npx cypress $1 $2 $3
