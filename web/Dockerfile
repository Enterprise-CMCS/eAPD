FROM node:14-bullseye

RUN npm i -g npm

RUN mkdir /app
WORKDIR /app

ADD ./package.json .
ADD ./package-lock.json .

RUN npm ci

CMD npm run start
