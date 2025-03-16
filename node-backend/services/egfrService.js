const eGFR = require("../models/eGFR");

// Create a new eGFR record
const createEgfr = async (egfrData) => {
  const egfr = new eGFR(egfrData);
  return await egfr.save();
};

// Get all eGFR records
const getAllEgfrs = async () => {
  return await eGFR.find().populate("user");
};

// Get eGFR records by user ID
const getEgfrsByUserId = async (userId) => {
  return await eGFR.find({ user: userId }).populate("user");
};

// Update an eGFR record
const updateEgfr = async (egfrId, egfrData) => {
  return await eGFR.findByIdAndUpdate(egfrId, egfrData, { new: true });
};

// Delete an eGFR record
const deleteEgfr = async (egfrId) => {
  return await eGFR.findByIdAndDelete(egfrId);
};

module.exports = {
  createEgfr,
  getAllEgfrs,
  getEgfrsByUserId,
  updateEgfr,
  deleteEgfr,
};
