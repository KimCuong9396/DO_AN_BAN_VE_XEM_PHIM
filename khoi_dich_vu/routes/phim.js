const express = require("express");
const router = express.Router();
const phimController = require("../controllers/phimController");

router.get("/", phimController.getPhim);
router.post("/", phimController.addPhim);

module.exports = router;
