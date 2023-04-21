FROM node:16.19.1-bullseye-slim as builder

RUN mkdir /app
WORKDIR /app

COPY package.json .
COPY ./api/package.json ./api/package.json
COPY yarn.lock .
COPY common ./common

RUN chown -R node:node /app
USER node:node

RUN yarn install --frozen-lockfile --non-interactive
RUN npm rebuild

COPY api ./api

# ---

FROM node:16.19.1-bullseye-slim

USER node
WORKDIR /home/node

COPY --from=builder --chown=node:node /app/package.json ./
COPY --from=builder --chown=node:node /app/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /app/common/ ./common/
COPY --from=builder --chown=node:node /app/api/ ./api/

WORKDIR /home/node/api

CMD yarn run start