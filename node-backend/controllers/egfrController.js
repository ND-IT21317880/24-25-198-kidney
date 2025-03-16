const egfrService = require("../services/egfrService");

// Create a new eGFR record
const createEgfr = async (req, res) => {
  try {
    const egfr = await egfrService.createEgfr(req.body);
    res.status(201).json(egfr);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all eGFR records
const getAllEgfrs = async (req, res) => {
  try {
    const egfrs = await egfrService.getAllEgfrs();
    res.status(200).json(egfrs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get eGFR records by user ID
const getEgfrsByUserId = async (req, res) => {
  try {
    const egfrs = await egfrService.getEgfrsByUserId(req.params.userId);
    res.status(200).json(egfrs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an eGFR record
const updateEgfr = async (req, res) => {
  try {
    const egfr = await egfrService.updateEgfr(req.params.egfrId, req.body);
    if (!egfr) {
      return res.status(404).json({ message: "eGFR record not found" });
    }
    res.status(200).json(egfr);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an eGFR record
const deleteEgfr = async (req, res) => {
  try {
    const egfr = await egfrService.deleteEgfr(req.params.egfrId);
    if (!egfr) {
      return res.status(404).json({ message: "eGFR record not found" });
    }
    res.status(200).json({ message: "eGFR record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createEgfr,
  getAllEgfrs,
  getEgfrsByUserId,
  updateEgfr,
  deleteEgfr,
};
