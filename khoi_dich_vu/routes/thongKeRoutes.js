const express = require("express");
const router = express.Router();
const thongKeController = require("../controllers/thongKeController");

// Route thống kê số vé bán
router.post("/ve-ban", thongKeController.thongKeVes);

module.exports = router;
