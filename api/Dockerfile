FROM node:14

RUN npm i -g npm

RUN mkdir /app
WORKDIR /app

ADD ./package.json .
ADD ./package-lock.json .

RUN npm install

CMD npm run start-dev
