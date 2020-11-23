const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URL = process.env.MONGODB_URL;
mongoose
  .connect(MONGODB_URL, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connceted");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = {
  User: require("./UserSchema"),
};
