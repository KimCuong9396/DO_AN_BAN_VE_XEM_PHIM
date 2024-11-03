const fs = require("fs");
const path = require("path");

// Đọc dữ liệu người dùng từ file JSON
const readNguoiDungData = () => {
  const dataPath = path.join(__dirname, "../du_lieu/nguoi_dung.json");
  const data = fs.readFileSync(dataPath, "utf8");
  return JSON.parse(data);
};

// Xử lý đăng nhập
const login = (req, res) => {
  const { username, password } = req.body;
  const nguoiDungData = readNguoiDungData();
  const user = nguoiDungData.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    // Đăng nhập thành công
    res.status(200).json({ role: user.role });
  } else {
    // Đăng nhập không thành công
    res
      .status(401)
      .json({ message: "Tài khoản hoặc mật khẩu không chính xác." });
  }
};

module.exports = { login };
