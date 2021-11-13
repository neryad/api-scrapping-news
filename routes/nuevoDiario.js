const express = require('express');
const router = express.Router();
const { getNuevoDiarioNews } = require('../controllers/nuevoDiario');
router.get('/', getNuevoDiarioNews);
module.exports = router;
