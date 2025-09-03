import express from "express";
import multer from "multer";
import path from "path";
import { handleUpload } from "../controllers/uploadController.js";

const router = express.Router();

// File filter
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (
    ext === ".docx" &&
    file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only .docx files are allowed!"), false);
  }
};

// Multer instance
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
});

// Route
router.post("/", upload.single("myfile"), handleUpload);

export default router;
