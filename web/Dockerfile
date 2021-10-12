FROM node:14

RUN npm i

RUN mkdir /app
WORKDIR /app

ADD ./package.json .
ADD ./package-lock.json .

RUN npm ci

CMD npm run start -- --public=0.0.0.0:8080
