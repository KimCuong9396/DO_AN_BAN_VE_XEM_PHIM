// routes/banVeRoutes.js
const express = require("express");
const router = express.Router();
const banVeController = require("../controllers/banVeController");

// Định nghĩa tuyến đường POST để bán vé
router.post("/ban_ve", banVeController.banVe);

module.exports = router;
