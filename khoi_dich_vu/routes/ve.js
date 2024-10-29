const express = require("express");
const router = express.Router();
const veController = require("../controllers/veController");

router.get("/", veController.getVe);
router.post("/", veController.addVe);

module.exports = router;
