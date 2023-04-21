ARG OKTA_DOMAIN
ARG TEALIUM_ENV
ARG LD_CLIENT_ID
ARG TEALIUM_TAG

FROM node:16.19.1-bullseye-slim as builder
RUN apt-get update; \
    apt-get install -y python3; \
    apt-get install -y python2 make; \
    apt-get install -y g++; \
    ln -s /usr/bin/python2.7 /usr/bin/python;

RUN mkdir /app
WORKDIR /app

COPY package.json yarn.lock ./
COPY web/package.json ./web/package.json
COPY common ./common
COPY web/src/static ./web/src/static

RUN yarn install --pure-lockfile

COPY web ./web

WORKDIR /app/web
RUN LD_CLIENT_ID=${LD_CLIENT_ID} TEALIUM_ENV=${TEALIUM_ENV} TEALIUM_TAG=${TEALIUM_TAG} OKTA_DOMAIN=${OKTA_DOMAIN} yarn build

# ---

FROM nginx:1.23.3
COPY --from=builder /app/web/dist /usr/share/nginx/html