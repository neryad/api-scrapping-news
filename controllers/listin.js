const axios = require('axios');
const cheerio = require('cheerio');

const getListinNews = async (req, res, next) => {
  let articles = [];
  const mediaUrl = 'https://listindiario.com/';
  try {
    const { data: html } = await axios.get(mediaUrl);
    const $ = cheerio.load(html);

    $('.row_item', html).each(function () {
      const text = $(this).find('h2');
      const url = mediaUrl + $(this).find('a').attr('href');
      const img = $(this).find('img').attr('src');
      const title = text.text();
      articles = [...articles, { title, url, img }];
    });
    res.json({ ok: true, data: articles });

  } catch (error) {
    console.log(error);
    res.json({ ok: false, data: 'Error' });
  }
};

module.exports = { getListinNews };
