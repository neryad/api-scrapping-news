
const cheerio = require('cheerio');

const getNacionalNews = async (req, res, next) => {
  let articles = [];
  const mediaUrl = 'https://elnacional.com.do/';
  try {

    const response = await fetch(mediaUrl);

    if (!response.ok) {

      //throw new Error(`Error al obtener la página: ${response.statusText}`);
      return res.json({ status: response.status, ok: false, error: response.error });
    }
    const html = await response.text();
    const $ = cheerio.load(html);

    $('.utf_post_block_style').each(function () {
      const title = $(this).find('a').text();
      const url = $(this).find('a').attr('href');
      let img = $(this).find('img').attr('src') ||
        'https://raw.githubusercontent.com/neryad/api-scrapping-news/master/assets/news.png';

      articles.push({ title, url, img });
    });
    res.json({ ok: true, data: articles });
  } catch (error) {
    console.log(error);
    res.json({ ok: false, error });
  }
};

module.exports = { getNacionalNews };
