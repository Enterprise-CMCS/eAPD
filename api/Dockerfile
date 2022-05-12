FROM node:16.15.0-alpine3.15

RUN mkdir /app
WORKDIR /app

ADD package.json .
ADD yarn.lock .

RUN chown -R node:node /app
USER node:node
RUN yarn install --frozen-lockfile

WORKDIR /app/api
CMD yarn run start-dev