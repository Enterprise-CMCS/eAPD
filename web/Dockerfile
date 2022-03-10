FROM node:16.13.2-bullseye

RUN npm i -g npm@8.3.1

RUN mkdir /app
WORKDIR /app

ADD ./package.json .
ADD ./package-lock.json .

RUN chown -R node:node /app
USER node:node
RUN npm ci --no-audit

CMD npm run start
