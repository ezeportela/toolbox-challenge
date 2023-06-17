FROM node:14 AS tests

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . .

RUN npm test

FROM node:14 AS api

WORKDIR /usr/src/app
COPY --from=tests /usr/src/app/package*.json ./
RUN npm install

COPY . .
EXPOSE 8080

CMD [ "npm", "start"]