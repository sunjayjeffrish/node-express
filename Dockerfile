FROM node:alpine

WORKDIR /usr/src/app

COPY package.json ./package.json
RUN npm install

COPY app.js ./app.js
COPY config ./config
EXPOSE 5000

CMD node app.js

