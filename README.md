# toolbox-challenge

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![Mocha](https://img.shields.io/badge/-mocha-%238D6748?style=for-the-badge&logo=mocha&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

Esta solución esta compuesta por una api desarrollada en express y un front utilizando React 18. La api disponibiliza endpoints que parsean contenido de archivos para que se puedan mostrar en el front.

La misma ha sido desarrollada utilizando diversos patrones, paradigmas y conceptos como `clean architecture`, `domain driven design`, `test driven design`  & `principios SOLID`.

La solución se puede iniciar con `docker` a través del comando `docker compose up --build -d`

## API

### Requisitos

- Node 14

### Health endpoint

* path: `/healthcheck`
* respuesta esperada: `200`

### Endpoints

* `GET /files/list`: to retrive market information for trading pair
* `GET /files/data`: to simulate trade with the given pair setting a price limit

### scripts

- `start`
- `test`

## Front

### Requisitos

- Node 16

### scripts

- `serve`
- `build`
- `test`
- `test:snapshot`
