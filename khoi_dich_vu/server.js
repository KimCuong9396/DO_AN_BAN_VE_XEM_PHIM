const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");

const app = express();
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);

app.use(express.static("he_khach/giao_dien"));

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
