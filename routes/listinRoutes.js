const express = require('express');
const router = express.Router();
const { getListinNews } = require('../controllers/listin');
router.get('/', getListinNews);

module.exports = router;
