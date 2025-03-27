const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  profileImage: String,
  latitude: Number,
  longitude: Number,
  token: String,
});

module.exports = mongoose.model("User", UserSchema);
