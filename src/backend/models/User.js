const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,  // hashed password
  role: { type: String, default: "user" }, // "user" atau "admin"
});

module.exports = mongoose.model("User", userSchema);
