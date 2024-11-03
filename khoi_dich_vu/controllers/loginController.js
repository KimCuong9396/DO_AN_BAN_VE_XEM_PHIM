// /khoi_dich_vu/controllers/loginController.js
exports.login = (req, res) => {
  const user = req.user;
  if (user.role === "nhan_vien") {
    res.json({ redirect: "/nhan_vien.html" });
  } else if (user.role === "quan_ly") {
    res.json({ redirect: "/quan_ly.html" });
  } else {
    res.status(403).json({ message: "Không có quyền truy cập" });
  }
};
