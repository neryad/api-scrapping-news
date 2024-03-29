
const cheerio = require('cheerio');

const getNuevoDiarioNews = async (req, res, next) => {
  let articles = [];
  //const mediaUrl = 'https://elnuevodiario.com.do/';
  const mediaUrl = 'https://elnuevodiario.com.do';

  try {
    // const { data: html } = await axios.get(mediaUrl);
    const response = await fetch(mediaUrl);
    if (!response.ok) {

      //throw new Error(`Error al obtener la página: ${response.statusText}`);
      return res.json({ status: response.status, ok: false, error: response.error });
    }
    const html = await response.text();
    const $ = cheerio.load(html);
    $('.mb-4', html).each(function () {
      let title = $(this).find('.title').text();
      const url = $(this).find('.title').attr('href');
      // const img = $(this).find('a').attr('src');
      let img = $(this).find('.img-fluid').attr('data-src') || $(this).find('.img-fluid').attr('src');
      if (!img) {
        img = 'https://raw.githubusercontent.com/neryad/api-scrapping-news/master/assets/news.png';
      }

      articles.push({ title, url, img });
      articles = articles.filter((article) => article.title.trim() !== '');
    });
    res.json({ ok: true, data: articles });
  } catch (error) {
    console.log(error);
    res.json({ ok: false, error });
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
