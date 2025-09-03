import fs from "fs";
import path from "path";
import mammoth from "mammoth";

export async function convertUploadedDocx(file, outputPath) {
  try {
    if (!file) {
      throw new Error("No file provided");
    }

    const options = {
      convertImage: mammoth.images.imgElement(image => {
        return image.read("base64").then(imageBuffer => ({
          src: "data:" + image.contentType + ";base64," + imageBuffer
        }));
      })
    };

    const result = await mammoth.convertToHtml({ buffer: file.buffer }, options);
    const html = result.value;

    if (outputPath) {
      fs.writeFileSync(outputPath, html, "utf8");
      console.log(`✅ HTML saved at: ${outputPath}`);
    }

    return html;
  } catch (err) {
    console.error("❌ Error converting DOCX:", err);
    throw err;
  }
}


export function getFilesArray(folderPath) {
  try {
    const files = fs.readdirSync(folderPath);
    return files.filter(file => fs.lstatSync(path.join(folderPath, file)).isFile());
  } catch (err) {
    console.error("❌ Error reading folder:", err);
    return [];
  }
}
