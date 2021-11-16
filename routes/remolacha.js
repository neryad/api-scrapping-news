const express = require('express');
const router = express.Router();
const { getRemolachaNews } = require('../controllers/remolacha');

router.get('/', getRemolachaNews);

module.exports = router;
