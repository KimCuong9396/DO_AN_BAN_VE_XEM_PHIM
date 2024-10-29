const express = require("express");
const router = express.Router();
const phimController = require("../controllers/phimController");

router.get("/", phimController.layTatCaPhim);
router.get("/:id", phimController.layPhimTheoId);

module.exports = router;
