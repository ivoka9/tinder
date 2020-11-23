const express = require("express");
const app = express();
const control = require("./control");

require("dotenv").config();
const PORT = process.env.PORT;

app.use("/", control.user);

app.listen(PORT, () => {
  console.log("server Online");
});
