const axios = require('axios');
const cheerio = require('cheerio');

const getDiarioLibreNews = (req, res, next) => {
  let articles = [];

  const url = 'https://www.diariolibre.com/';

  axios(url)
    .then((response) => {
      const html = response.data;

      const $ = cheerio.load(html);

      $('.headline', html).each(function () {
        let text = $(this).find('.priority-content');
        const title = text.text();
        const url = 'https://www.diariolibre.com' + $(this).find('a').attr('href');
        let sourceImg = $(this).find('img').attr('data-srcset');
        if (!sourceImg) {
          sourceImg = 'https://www.tbh-location.fr/wp-content/uploads/2019/12/news-e1544436032461.png';
        }
        let clearStepOne = sourceImg.replace(' 620w', '');
        let clearStepTwo = clearStepOne.replace(' 980w', '');
        let clearStepThree = clearStepTwo.replace(' 619w', '');
        const img = clearStepThree;
        articles.push({ title, url, img });
      });
      res.status(200).json({
        ok: true,
        data: articles,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { getDiarioLibreNews };
