export const showArticle = (req, res) => {
  const filename = req.params.filename+".html";
  res.render("article.ejs", { file: filename });
};
