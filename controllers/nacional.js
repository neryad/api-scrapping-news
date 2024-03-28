const axios = require('axios');
const cheerio = require('cheerio');

const getNacionalNews = async (req, res, next) => {
  let articles = [];
  const mediaUrl = 'https://elnacional.com.do/';
  try {
    const { data: html } = await axios.get(mediaUrl);
    const $ = cheerio.load(html);

    $('.utf_post_block_style').each(function () {
      const title = $(this).find('a').text();
      const url = $(this).find('a').attr('href');
      let img = $(this).find('img').attr('src')||
        'https://raw.githubusercontent.com/neryad/api-scrapping-news/master/assets/news.png';
      // if (!img) {
      //   img = 'https://www.tbh-location.fr/wp-content/uploads/2019/12/news-e1544436032461.png';
      // }
      articles.push({ title, url, img });
    });
    res.json({ ok: true, data: articles });
  } catch (error) {
    console.log(error);
    res.json({ ok: false, data: 'Error' });
  }
};

module.exports = { getNacionalNews };
