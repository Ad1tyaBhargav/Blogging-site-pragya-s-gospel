import express from "express";
import multer from "multer";
import path from "path";
import { handleUpload } from "../controllers/uploadController.js";

const router = express.Router();

// File filter
const fileFilter = (req, file, cb) => {
 if (file.fieldname === "myfile") {
    const ext = path.extname(file.originalname).toLowerCase();
    if (
      ext === ".docx" &&
      file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only .docx files are allowed for myfile!"), false);
    }
  } else if (file.fieldname === "myImage") {
    const ext = path.extname(file.originalname).toLowerCase();
    if (
      ext === ".png" &&
      file.mimetype === "image/png"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only .png images are allowed for myImage!"), false);
    }
  } else {
    cb(new Error("Unexpected field!"), false);
  }
};

// Multer instance
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
});

// Route
router.post("/", upload.fields([
    { name: "myfile", maxCount: 2 },
    { name: "myImage", maxCount: 2 }
]), handleUpload);

export default router;
