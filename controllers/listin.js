const cheerio = require("cheerio");

const getListinNews = async (req, res, next) => {
  let articles = [];
  const mediaUrl = "https://listindiario.com";
  try {
    const response = await fetch(mediaUrl);

    if (!response.ok) {
      // throw new Error(`Error al obtener la página: ${response.statusText}`);
      return res.json({
        status: response.status,
        ok: false,
        error: response.statusText,
      });
    }

    const html = await response.text();

    const $ = cheerio.load(html);

    $(".c-article", html).each(function () {
      const text = $(this).find("h2");
      const url = mediaUrl + $(this).find("a").attr("href");
      const img =
        $(this).find("img").attr("src") ||
        "https://raw.githubusercontent.com/neryad/api-scrapping-news/master/assets/news.png";

      const title = text
        .text()
        .replace(/[\n\t\\"]/g, "")
        .trim();

      // if (title.trim() !== "" && url !== undefined) {
      //   articles.push({ title, url, img });
      // }
      articles = [...articles, { title, url, img }];
    });
    res.json({ ok: true, data: articles });
  } catch (error) {
    console.log(error);
    res.json({ ok: false, error });
  }
};

module.exports = { getListinNews };
