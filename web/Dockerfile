FROM node:16.15.0-alpine3.15
RUN apk add --no-cache python3 g++ make

RUN mkdir /app
WORKDIR /app

ADD package.json .
ADD yarn.lock .
ADD web ./web
ADD common ./common

RUN chown -R node:node /app
USER node:node

RUN yarn install --frozen-lockfile --non-interactive

WORKDIR /app/web
CMD yarn run start