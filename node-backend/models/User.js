const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  contactNumber: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
});

module.exports = mongoose.model("User", userSchema);
