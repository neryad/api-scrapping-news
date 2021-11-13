const axios = require('axios');
const cheerio = require('cheerio');

const getNuevoDiarioNews = (req, res, next) => {
  let articles = [];
  const url = 'https://elnuevodiario.com.do/';

  axios(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      $('.image-news', html).each(function () {
        //TODO: Verificar los undefined en el titulo
        let title = $(this).find('a').attr('title');
        const url = $(this).find('a').attr('href');
        const img = $(this).find('div').attr('data-src');

        articles.push({ title, url, img });
      });
      res.status(200).json({
        ok: true,
        data: articles,
      });
    })
    .catch((err) => console.log(err));
};

module.exports = { getNuevoDiarioNews };
