import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import {  getJSONfiles} from "../utils/fileUtils.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const showHome = (req, res) => res.render("home.ejs");

export const showPosts = (req, res) => {
  const JSONfiles = getJSONfiles(path.join(__dirname, "../uploads"));

  console.log(JSONfiles)

  res.render("posts.ejs", { files:JSONfiles});
};

export const showWrite = (req, res) => res.render("write.ejs");

