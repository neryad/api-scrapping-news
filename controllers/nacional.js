const axios = require('axios');
const cheerio = require('cheerio');

const getNacionalNews = (req, res, next) => {
  let articles = [];
  const url = 'https://elnacional.com.do/';

  axios(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      $('.utf_post_block_style').each(function () {
        const title = $(this).find('a').text();
        const url = $(this).find('a').attr('href');
        let img = $(this).find('img').attr('src');
        if (!img) {
          img = 'https://www.tbh-location.fr/wp-content/uploads/2019/12/news-e1544436032461.png';
        }
        articles.push({ title, url, img });
      });

      res.status(200).json({
        ok: true,
        data: articles,
      });
    })
    .catch((err) => console.log(err));
};

module.exports = { getNacionalNews };
