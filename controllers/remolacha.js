const axios = require('axios');
const cheerio = require('cheerio');

const getRemolachaNews = async (req, res, next) => {
  let articles = [];
  const mediaUrl = 'https://remolacha.net/';
  try {
    const { data: html } = await axios.get(mediaUrl);
    const $ = cheerio.load(html);

    $('.post', html).each(function () {
      const text = $(this).find('h1');
      const url = $(this).find('a').attr('href');
      let img = $(this).find('img').attr('data-orig-file');
     if (!img) {
        img = 'https://raw.githubusercontent.com/neryad/api-scrapping-news/master/assets/news.png';
      }
      const title = text.text();

      articles = [...articles, { title, url, img }];
    });
    res.json({ ok: true, data: articles });
  } catch (error) {
    console.log(error);
    res.json({ ok: false, data: 'Error' });
  }
};

module.exports = { getRemolachaNews };
