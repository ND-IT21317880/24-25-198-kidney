const express = require("express");
const egfrController = require("../controllers/egfrController");

const router = express.Router();

router.post("/", egfrController.createEgfr);
router.get("/", egfrController.getAllEgfrs);
router.get("/user/:userId", egfrController.getEgfrsByUserId);
router.put("/:egfrId", egfrController.updateEgfr);
router.delete("/:egfrId", egfrController.deleteEgfr);

module.exports = router;
