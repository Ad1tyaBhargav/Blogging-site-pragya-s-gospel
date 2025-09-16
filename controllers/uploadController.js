import pg from "pg";
import { convertUploadedDocx, saveBodyAsJson, uploadImage} from "../utils/fileUtils.js";

const db=new pg.Client({
  user:"postgres",
  host:"localhost",
  database:"blogSite",
  password:"limbo89",
  port:5432
})

db.connect();

export const handleUpload = async(req, res) => {
  console.log(req.files.myImage[0])
  try {
    const nameWithExt = req.body.title;
    const summary=req.body.summary;
    const imagePath=`./uploads/images/${nameWithExt}.png`;
    await convertUploadedDocx(req.files.myfile[0], `./uploads/${nameWithExt}.html`);
    await saveBodyAsJson(req.body ,"./uploads" )
    await uploadImage(req.files.myImage[0], imagePath)

    // await db.query("insert into posts(title,summary,image_path) value($1,$2,$3)",[nameWithExt,summary,imagePath])

   res.redirect("/post")

  } catch (err) {
    res.status(500).send("Failed to convert file: " + err.message);
  }
};
