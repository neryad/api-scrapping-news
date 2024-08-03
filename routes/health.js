const express = require("express");
const router = express.Router();
const { checkHealth } = require("../controllers/health");

router.get("/", checkHealth);

module.exports = router;
