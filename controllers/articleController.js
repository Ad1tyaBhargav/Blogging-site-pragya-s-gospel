export const showArticle = (req, res) => {
  const filename = req.params.filename;
  res.render("article.ejs", { file: filename });
};
