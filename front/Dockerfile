FROM node:16 AS tests

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . .

RUN npm test
RUN npm run build

FROM node:16 AS front

WORKDIR /usr/src/app
COPY --from=tests /usr/src/app/dist ./dist

RUN npm install -g serve
EXPOSE 3000

CMD [ "serve", "-s", "dist"]