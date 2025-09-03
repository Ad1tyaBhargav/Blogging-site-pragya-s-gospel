import express from "express";
import { showArticle } from "../controllers/articleController.js";

const router = express.Router();

router.get("/:filename", showArticle);

export default router;
