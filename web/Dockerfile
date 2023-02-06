FROM node:16.19.0-bullseye-slim
RUN  apt-get update; \
    apt-get install -y python3; \
    apt-get install -y python2 make; \
    apt-get install -y g++; \
    ln -s /usr/bin/python2.7 /usr/bin/python;

RUN mkdir /app
WORKDIR /app

COPY package.json .
COPY yarn.lock .
COPY web ./web
COPY common ./common

RUN chown -R node:node /app
USER node:node

RUN yarn install --frozen-lockfile --non-interactive

WORKDIR /app/web
CMD yarn run start
