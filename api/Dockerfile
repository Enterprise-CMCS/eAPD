FROM node:14

RUN npm i -g npm@^6

RUN mkdir /app
WORKDIR /app

ADD ./package.json .
ADD ./package-lock.json .

RUN npm cache clean --force
RUN npm install
RUN nvm use --delete-prefix v6.1.0 --silent

CMD npm run start-dev
