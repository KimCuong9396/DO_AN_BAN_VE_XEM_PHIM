const express = require("express");
const router = express.Router();
const thongKeController = require("../controllers/thongKeController");

// Định nghĩa các route cho thống kê
router.get("/", thongKeController.getStatistics);

module.exports = router;
