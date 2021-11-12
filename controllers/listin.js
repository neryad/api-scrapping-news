const axios = require('axios');
const cheerio = require('cheerio');
//const expres = require('express');

const getListinNews = (req, res, next) => {
  let articles = [];

  const url = 'https://listindiario.com/';

  axios(url)
    .then((response) => {
      const html = response.data;

      const $ = cheerio.load(html);
      $('.row_item', html).each(function () {
        const text = $(this).find('h2');
        const url = 'https://listindiario.com' + $(this).find('a').attr('href');
        const img = $(this).find('img').attr('src');
        const title = text.text();

        articles.push({ title, url, img });
      });

      res.status(200).json({
        ok: true,
        data: articles,
      });
    })
    .catch((err) => console.log(err));
};

module.exports = { getListinNews };
