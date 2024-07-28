const express = require("express");
const router = express.Router();
const { getHoyNews } = require("../controllers/hoy");

router.get("/", getHoyNews);

module.exports = router;
