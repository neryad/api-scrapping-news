const axios = require('axios');
const cheerio = require('cheerio');

const getNuevoDiarioNews = async (req, res, next) => {
  let articles = [];
  //const mediaUrl = 'https://elnuevodiario.com.do/';
  const mediaUrl = 'https://elnuevodiario.com.do';

  try {
    const { data: html } = await axios.get(mediaUrl);
    const $ = cheerio.load(html);
    $('.mb-4', html).each(function () {
      let title = $(this).find('.title').text();
      const url = $(this).find('.title').attr('href');
      // const img = $(this).find('a').attr('src');
      const img = $(this).find('.img-fluid').attr('data-src') || $(this).find('.img-fluid').attr('src');
       if (!img) {
        img = 'https://raw.githubusercontent.com/neryad/api-scrapping-news/master/assets/news.png';
      }
      console.log(img, 'img');
      // const title = $('.title').text().trim();
      // const url = $('.title').attr('href');
      //const img = $('.img-fluid').attr('src');

      articles.push({ title, url, img });
      articles = articles.filter((article) => article.title.trim() !== '');
    });
    res.json({ ok: true, data: articles });
  } catch (error) {
    console.log(error);
    res.json({ ok: false, data: 'Error' });
  }

  function removeEmptyAndDuplicateTitles(articles) {
    const uniqueTitles = new Set();
    return articles.filter((article) => {
      const trimmedTitle = article.title.trim();
      if (trimmedTitle === '' || uniqueTitles.has(trimmedTitle)) {
        return false;
      }
      uniqueTitles.add(trimmedTitle);
      return true;
    });
  }
};

module.exports = { getNuevoDiarioNews };




// const axios = require('axios');
// const cheerio = require('cheerio');

// const getNuevoDiarioNews = async (req, res, next) => {
//   let articles = [];
//   const mediaUrl = 'https://elnuevodiario.com.do/';

//   try {
//     const { data: html } = await axios.get(mediaUrl);
//     const $ = cheerio.load(html);
//     $('.image-news', html).each(function () {
//       let title = $(this).find('a').attr('title');
//       const url = $(this).find('a').attr('href');
//       const img = $(this).find('div').attr('data-src');

//       articles.push({ title, url, img });
//     });
//     res.json({ ok: true, data: articles });
//   } catch (error) {
//     console.log(error);
//     res.json({ ok: false, data: 'Error' });
//   }
// };

// module.exports = { getNuevoDiarioNews };
