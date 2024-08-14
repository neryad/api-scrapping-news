import express from "express";
import { extract } from "@extractus/article-extractor";

export const detailsExtractor = async (req, res, next) => {
  console.log(req.body.url);
  const newsUrl = req.body.url;

  if (!newsUrl) {
    return res.status(400).json({
      ok: false,
      message: "URL is required",
    });
  }

  try {
    const article = await extract(newsUrl);

    if (!article) {
      return res.status(404).json({
        ok: false,
        message: "Article could not be extracted",
      });
    }

    const cleanContent = article.content
      ? article.content
          .replace(/<[^>]*>?/gm, "") // Elimina etiquetas HTML
          .replace(/\n|\t/g, "") // Elimina saltos de línea y tabulaciones
          .replace(/&nbsp;/g, " ") // Reemplaza espacios no rompibles
          .replace(/&quot;/g, '"') // Reemplaza comillas dobles
          .replace(/&apos;/g, "'") // Reemplaza comillas simples
          .replace(/\s+/g, " ") // Reemplaza múltiples espacios por uno solo
          .trim() // Elimina espacios al inicio y final
      : "";

    const {
      url,
      title,
      description,
      image,
      author,
      favicon,
      content,
      published,
      type,
      source,
      links,
      ttr,
    } = article;

    return res.json({
      ok: true,
      data: {
        url,
        title,
        description,
        image,
        author,
        favicon,
        content: cleanContent,
        published,
        type,
        source,
        links,
        ttr,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      message: "An error occurred while extracting the article",
      error: err.message,
    });
  }
};
