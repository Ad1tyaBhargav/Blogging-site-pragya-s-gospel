import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import path from "path";

import blogRoutes from "./routes/blogRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/", blogRoutes);
app.use("/article", articleRoutes);
app.use("/upload", uploadRoutes);

app.listen(port, () => {
  console.log(`🚀 Listening on http://localhost:${port}`);
});
