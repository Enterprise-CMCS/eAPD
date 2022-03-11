FROM node:16.13.2-bullseye

RUN mkdir /app
WORKDIR /app

ADD ./package.json .
ADD ./yarn.lock .

RUN yarn install --frozen-lockfile

CMD yarn run start
