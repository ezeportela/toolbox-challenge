const app = require("./application/app");

const port = 3001;
app.listen(port, () => {
  console.info(`⚡️[server]: Server is running at http://localhost:${port}`);
});
