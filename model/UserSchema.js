const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
  first: { type: String },
  last: { type: String },
  like: [{ type: String }],
  dislike: [{ type: String }],
});

module.exports = mongoose.model("User", UserSchema);
