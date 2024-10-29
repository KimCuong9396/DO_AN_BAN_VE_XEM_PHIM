const express = require("express");
const router = express.Router();
const veController = require("../controllers/veController");

router.get("/", veController.layTatCaVe);
router.post("/dat-ve", veController.datVe);

module.exports = router;
