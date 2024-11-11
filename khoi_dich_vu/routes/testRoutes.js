// routes/testRoutes.js
const express = require("express");
const router = express.Router();
const testController = require("../controllers/testController");

router.get("/getFilms", testController.getFilms); // Đường dẫn API lấy danh sách phim

module.exports = router;
