const express = require('express');
const router = express.Router();
const { getNacionalNews } = require('../controllers/nacional');

router.get('/', getNacionalNews);
module.exports = router;
