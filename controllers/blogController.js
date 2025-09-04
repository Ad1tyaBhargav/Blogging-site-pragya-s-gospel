import notifier from "node-notifier";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import {  getJSONfiles, getHTMLfiles } from "../utils/fileUtils.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const showHome = (req, res) => res.render("home.ejs");

export const showPosts = (req, res) => {
  const HTMLfiles = getHTMLfiles(path.join(__dirname, "../uploads"));
  const JSONfiles = getJSONfiles(path.join(__dirname, "../uploads"));
  res.render("posts.ejs", { files:HTMLfiles, summary:JSONfiles});
};

export const showWrite = (req, res) => res.render("write.ejs");

