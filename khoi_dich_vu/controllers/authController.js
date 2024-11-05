const fs = require("fs");
const path = require("path");

// Hàm đọc dữ liệu từ file nguoi_dung.json
const readNguoiDungData = () => {
  const dataPath = path.join(__dirname, "../du_lieu/nguoi_dung.json");
  const data = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(data);
};

const login = (req, res) => {
  const { username, password } = req.body;
  const nguoiDungData = readNguoiDungData();

  // Tìm người dùng trong danh sách
  const user = nguoiDungData.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    res.status(200).json({ message: "Đăng nhập thành công", role: user.role });
  } else {
    res.status(401).json({ message: "Sai tên đăng nhập hoặc mật khẩu" });
  }
};

module.exports = { login };
