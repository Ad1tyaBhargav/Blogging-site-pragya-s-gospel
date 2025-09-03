import { convertUploadedDocx } from "../utils/fileUtils.js";

export const handleUpload = async(req, res) => {
  try {
    const nameWithoutExt = req.file.originalname.slice(0, -5);
    const html = await convertUploadedDocx(req.file, `./uploads/${nameWithoutExt}.html`);

    // Option 1: return as JSON (for AJAX frontend)
   res.redirect("/post")

    // Option 2: render directly with EJS
    // res.render("preview.ejs", { content: html });
  } catch (err) {
    res.status(500).send("Failed to convert file: " + err.message);
  }
};
