
const cheerio = require('cheerio');


const getDiarioLibreNews = async (req, res, next) => {
  try {
    const mediaUrl = 'https://www.diariolibre.com/ultima-hora';
    // const { data } = await axios.get(mediaUrl);
    const response = await fetch(mediaUrl);

    if (!response.ok) {
      // throw new Error(`Error al obtener la página: ${response.statusText}`);
      return res.json({ status: response.status, ok: false, error: response.statusText });
    }
    const data = await response.text();
    const $ = cheerio.load(data);



    const articles = [];
    $('.w-full').each(function () {
      const $this = $(this);
      const title = $this.find('.mb-3').text().trim();
      const url = 'https://www.diariolibre.com' + $('h2 a', $this).attr('href');
      let sourceImg =
        $this.find('img.mb-3').attr('data-src') ||
        'https://raw.githubusercontent.com/neryad/api-scrapping-news/master/assets/news.png';
      sourceImg = cleanImageUrl(sourceImg);
      articles.push({ title, url, img: sourceImg });
    });

    const uniqueArticles = removeEmptyAndDuplicateTitles(articles);
    const excludedArticles = uniqueArticles.slice(2, -2);

    res.json({ status: response.status, ok: true, data: excludedArticles });
  } catch (error) {
    console.log(error);
    res.json({ ok: false, error });
  }
};

function cleanImageUrl(url) {
  return url.replace(/ \d+w/g, '');
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

module.exports = { getDiarioLibreNews };

