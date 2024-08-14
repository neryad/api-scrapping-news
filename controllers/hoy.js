//const cheerio = require("cheerio");
import cheerio from "cheerio";
export const getHoyNews = async (req, res, next) => {
  let articles = [];
  const mediaUrl = "https://hoy.com.do/secciones/el-pais/";
  try {
    // const { data: html } = await axios.get(mediaUrl);
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

    $(".col-lg-4", html).each(function () {
      const text = $(this).find(".post-title");
      const url = $(this).find(".post-title a").attr("href");
      let img =
        $(this).find(".ts-post-thumb img").attr("data-src") ||
        $(this).find(".ts-post-thumb img").attr("src");
      if (!img) {
        img =
          "https://raw.githubusercontent.com/neryad/api-scrapping-news/master/assets/news.png";
      }
      const title = text.text().replace(/\n|\t/g, "").trim();

      if (title.trim() !== "" && url !== undefined) {
        articles.push({ title, url, img });
      }

      //  articles = [...articles, { title, url, img }];

      console.log(articles);
    });
    res.json({ ok: true, data: articles });
  } catch (error) {
    console.log(error);
    res.json({ ok: false, error });
  }
};

// module.exports = { getHoyNews };
