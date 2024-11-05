const express = require("express");
const router = express.Router();
const { traCuuLichChieu } = require("../controllers/traCuuController");

router.get("/tra_cuu", traCuuLichChieu);

module.exports = router;
