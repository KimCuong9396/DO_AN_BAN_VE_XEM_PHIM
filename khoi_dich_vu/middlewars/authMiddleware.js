// /khoi_dich_vu/middlewares/authMiddleware.js

function authMiddleware(req, res, next) {
  const { userRole } = req.session || {}; // Lấy thông tin quyền hạn từ session

  if (userRole === "nhanvien" || userRole === "quanly") {
    next(); // Nếu có quyền hợp lệ, cho phép tiếp tục
  } else {
    res.status(403).json({ message: "Quyền truy cập bị từ chối" });
  }
}

module.exports = authMiddleware;
