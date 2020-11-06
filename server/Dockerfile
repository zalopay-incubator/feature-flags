FROM node:12-alpine

WORKDIR /src

ADD package.json /src

ADD package-lock.json /src

RUN npm ci

ADD . /src

EXPOSE 4242

CMD node index.js
