const fs = require("fs");
const path = require("path");

const readUserData = () => {
  const dataPath = path.join(__dirname, "../du_lieu/users.json");
  const data = fs.readFileSync(dataPath);
  return JSON.parse(data);
};

const login = (req, res) => {
  const { username, password } = req.body;
  const users = readUserData();
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    res.status(200).json({ role: user.role });
  } else {
    res
      .status(401)
      .json({ message: "Tài khoản hoặc mật khẩu không chính xác." });
  }
};

module.exports = { login };
