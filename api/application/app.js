const express = require("express");
const dotenv = require("dotenv");
const router = require("./controller");

dotenv.config();

const app = express();
app.use(express.json());
app.use(router);

module.exports = app;