FROM node:8

RUN mkdir /app
WORKDIR /app

ADD ./package.json .
ADD ./package-lock.json .

RUN npm install

RUN npm run migrate
RUN npm run seed

CMD npm run start-dev
