const express = require('express');
const router = express.Router();
const { getDiarioLibreNews } = require('../controllers/diarioLibre');

router.get('/', getDiarioLibreNews);

module.exports = router;
