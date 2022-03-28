FROM node:16.13.2-bullseye

RUN mkdir /app
WORKDIR /app

ADD ./package.json .
ADD ./yarn.lock .

RUN chown -R node:node /app
USER node:node
RUN yarn install --frozen-lockfile

CMD yarn run start
