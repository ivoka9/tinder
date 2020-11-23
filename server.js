const express = require("express");
const session = require("express-session");
const app = express();
const control = require("./control");

require("dotenv").config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SICRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use("/", control.user);

app.listen(PORT, () => {
  console.log("server Online");
});
