const fs = require("fs");
const path = require("path");

const nhanVienModelPath = path.join(__dirname, "../models/nhanVienModel.js");
const nhanVienModel = require(nhanVienModelPath);

exports.dangNhap = (req, res) => {
  const { taiKhoan, matKhau } = req.body;
  const nhanVien = nhanVienModel.find(
    (nv) => nv.taiKhoan === taiKhoan && nv.matKhau === matKhau
  );

  if (nhanVien) {
    res.json({ success: true, vaiTro: nhanVien.vaiTro });
  } else {
    res.json({
      success: false,
      message: "Tài khoản hoặc mật khẩu không đúng!",
    });
  }
};
