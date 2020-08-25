import bodyParser = require("body-parser");
import express = require("express");
const app: express.Application = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port: number = 9003;

app.listen(port, () => {
  console.log(`The app is running on port: ${port}`);
});
