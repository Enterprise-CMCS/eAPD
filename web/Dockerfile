FROM node:16-bullseye

RUN npm i -g npm@8

RUN mkdir /app
WORKDIR /app

ADD ./package.json .
ADD ./package-lock.json .

RUN npm ci

CMD npm run start
