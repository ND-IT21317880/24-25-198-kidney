const mongoose = require("mongoose");

const egfrSchema = new mongoose.Schema({
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  age: { type: Number, required: true },
  scValue: { type: Number, required: true }, // Serum Creatinine value
  yearOfData: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
});

module.exports = mongoose.model("eGFR", egfrSchema);
