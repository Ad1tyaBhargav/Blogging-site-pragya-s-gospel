import { convertUploadedDocx, saveBodyAsJson} from "../utils/fileUtils.js";

export const handleUpload = async(req, res) => {
  console.log(req.body)
  try {
    const nameWithoutExt = req.body.title;
    await convertUploadedDocx(req.file, `./uploads/${nameWithoutExt}.html`);
    await saveBodyAsJson(req.body ,"./uploads" )

    // Option 1: return as JSON (for AJAX frontend)
   res.redirect("/post")

    // Option 2: render directly with EJS
    // res.render("preview.ejs", { content: html });
  } catch (err) {
    res.status(500).send("Failed to convert file: " + err.message);
  }
};
