const express = require("express");
const router = express.Router();
const nhanVienController = require("../controllers/nhanVienController");

router.post("/dang-nhap", nhanVienController.dangNhap);

module.exports = router;
