FROM node:16.19.1-bullseye-slim

RUN mkdir /app
WORKDIR /app

COPY package.json .
COPY yarn.lock .
COPY api ./api
COPY common ./common

RUN chown -R node:node /app
USER node:node

RUN yarn install --frozen-lockfile --non-interactive
RUN npm rebuild

WORKDIR /app/api
CMD yarn run start-dev
