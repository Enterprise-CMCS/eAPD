FROM node:16.16.0-alpine3.15
RUN apk add --no-cache python3 g++ make

RUN mkdir /app
WORKDIR /app

COPY package.json .
COPY yarn.lock .
COPY web ./web
COPY common ./common

RUN chown -R node:node /app
USER node:node

RUN yarn install --frozen-lockfile --non-interactive
WORKDIR /app/common
RUN yarn build

WORKDIR /app/web
CMD yarn run start
