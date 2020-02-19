FROM node:10

RUN npm i -g npm@^6

RUN mkdir /app
WORKDIR /app

ADD ./package.json .
ADD ./package-lock.json .

RUN npm ci

CMD npm run start -- --public=0.0.0.0:8080
