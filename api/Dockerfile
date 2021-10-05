FROM node:14.16

RUN npm i -g npm@^6

RUN mkdir /app
WORKDIR /app

ADD ./package.json .
ADD ./package-lock.json .

RUN npm cache clean --force
RUN npm install

CMD npm run start-dev
