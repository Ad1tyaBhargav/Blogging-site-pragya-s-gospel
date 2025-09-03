import express from "express";
import { showHome, showPosts, showWrite } from "../controllers/blogController.js";

const router = express.Router();

router.get("/", showHome);
router.get("/post", showPosts);
router.get("/write", showWrite);

export default router;
