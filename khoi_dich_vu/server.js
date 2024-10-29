const express = require("express");
const bodyParser = require("body-parser");
const nhanVienRoutes = require("./routes/nhan_vien");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/api", nhanVienRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
