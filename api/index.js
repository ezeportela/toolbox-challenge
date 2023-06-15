const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = { app };

const port = 3001;
app.listen(port, () => {
  console.info(`⚡️[server]: Server is running at http://localhost:${port}`);
});
