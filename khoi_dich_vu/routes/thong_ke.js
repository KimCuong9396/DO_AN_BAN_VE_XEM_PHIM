const express = require("express");
const router = express.Router();
const thongKeController = require("../controllers/thongKeController");

router.get("/thong-ke-ve", thongKeController.thongKeVe);

module.exports = router;
