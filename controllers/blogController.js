import notifier from "node-notifier";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import {  getFilesArray } from "../utils/fileUtils.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const showHome = (req, res) => res.render("home.ejs");

export const showPosts = (req, res) => {
  const files = getFilesArray(path.join(__dirname, "../uploads"));
  res.render("posts.ejs", { files });
};

export const showWrite = (req, res) => res.render("write.ejs");

