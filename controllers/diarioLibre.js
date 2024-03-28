const axios = require('axios');
const cheerio = require('cheerio');

const getDiarioLibreNews = async (req, res, next) => {
  let articles = [];

  const mediaUrl = 'https://www.diariolibre.com/ultima-hora';
  try {
    // const data = await axios.get(mediaUrl);
    // console.log(data.data);
    // return;
    const data = await axios.get(mediaUrl);
    // console.log(data.data);
    const $ = cheerio.load(data.data);

    $('.w-full', data.data).each(function () {
      let text = $(this).find('.mb-3');
      // console.log(text, 'text');
      const title = text.text();
      // const url = 'https://www.diariolibre.com/' + $(this).find('.mb-3').filter('a').attr('href');
      const url = 'https://www.diariolibre.com' + $('h2 a').attr('href');
      //console.log(url, 'url');
      let sourceImg = $(this).find('img.mb-3').attr('data-src');
      //let sourceImg = $('a img').attr('data-src');
      // console.log(sourceImg);
      if (!sourceImg) {
        sourceImg = 'https://raw.githubusercontent.com/neryad/api-scrapping-news/master/assets/news.png';
      }
      let clearStepOne = sourceImg.replace(' 620w', '');
      let clearStepTwo = clearStepOne.replace(' 980w', '');
      let clearStepThree = clearStepTwo.replace(' 619w', '');
      const img = clearStepThree;
      articles.push({ title, url, img });
    });
    res.json({ ok: true, data: articles });
  } catch (error) {
    console.log(error);
    res.json({ ok: false, data: 'Error' });
  }
};

module.exports = { getDiarioLibreNews };


// const axios = require('axios');
// const cheerio = require('cheerio');

// const getDiarioLibreNews = async (req, res, next) => {
//   let articles = [];

//   const mediaUrl = 'https://www.diariolibre.com/';
//   try {
//     const { data: html } = await axios.get(mediaUrl);
//     const $ = cheerio.load(html);
//     $('.headline', html).each(function () {
//       let text = $(this).find('.priority-content');
//       const title = text.text();
//       const url = 'https://www.diariolibre.com' + $(this).find('a').attr('href');
//       let sourceImg = $(this).find('img').attr('data-srcset');
//       if (!sourceImg) {
//         sourceImg = 'https://www.tbh-location.fr/wp-content/uploads/2019/12/news-e1544436032461.png';
//       }
//       let clearStepOne = sourceImg.replace(' 620w', '');
//       let clearStepTwo = clearStepOne.replace(' 980w', '');
//       let clearStepThree = clearStepTwo.replace(' 619w', '');
//       const img = clearStepThree;
//       articles.push({ title, url, img });
//     });
//     res.json({ ok: true, data: articles });
//   } catch (error) {
//     console.log(error);
//     res.json({ ok: false, data: 'Error' });
//   }
// };

// module.exports = { getDiarioLibreNews };
