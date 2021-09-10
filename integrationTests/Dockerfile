FROM cypress/included:8.3.1

RUN npm i -g npm@^7

#RUN mkdir -p /eAPD/integrationTests
COPY ../ /eAPD/integrationTests/
WORKDIR /eAPD/integrationTests

RUN echo "deb-src http://deb.debian.org/debian stretch main" >> /etc/apt/sources.list
RUN apt-get update -y
RUN apt-get install -y libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb

#ADD ../web/package.json .
#ADD ../web/package-lock.json .

RUN npm install
RUN npm install knex
RUN npm ci

#COPY ../api/seeds/test/tokens.json ../api/seeds/test/tokens.json

#CMD npm run cy:run:ci

CMD npx cypress run
