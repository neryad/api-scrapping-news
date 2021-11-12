const { next } = require('cheerio/lib/api/traversing');
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    ok: true,
    data: 'Calentando el stream',
  });
});

module.exports = router;
