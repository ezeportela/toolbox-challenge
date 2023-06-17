FROM node:14 AS tests

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . .

CMD [ "npm", "test" ]

FROM node:14 AS build

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i

COPY . .
EXPOSE 8080

CMD [ "npm", "start"]