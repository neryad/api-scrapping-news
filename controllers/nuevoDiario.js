const axios = require('axios');
const cheerio = require('cheerio');

const getNuevoDiarioNews = async (req, res, next) => {
  let articles = [];
  const mediaUrl = 'https://elnuevodiario.com.do/';

  try {
    const { data: html } = await axios.get(mediaUrl);
    const $ = cheerio.load(html);
    $('.image-news', html).each(function () {
      let title = $(this).find('a').attr('title');
      const url = $(this).find('a').attr('href');
      const img = $(this).find('div').attr('data-src');

      articles.push({ title, url, img });
    });
    res.json({ ok: true, data: articles });
  } catch (error) {
    console.log(error);
    res.json({ ok: false, data: 'Error' });
  }
};

module.exports = { getNuevoDiarioNews };
