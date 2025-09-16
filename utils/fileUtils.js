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
        return image.read("base64").then(imageBuffer => {
          return {
            src: "data:" + image.contentType + ";base64," + imageBuffer
          };
        });
      })
    };

    // Use file.buffer (lowercase 'b'), not file.Buffer
    const result = await mammoth.convertToHtml({ buffer: file.buffer }, options);
    const html = result.value;

    if (outputPath) {
      fs.writeFileSync(outputPath, html, "utf8");
      console.log(`✅ HTML saved at: ${outputPath}`);
    }
    return html; // return the converted HTML content

  } catch (err) {
    console.error("❌ Error converting DOCX:", err);
    throw err;
  }
}

export async function uploadImage(file,outputPath) {

  // Write file to disk
  fs.writeFileSync(outputPath, file.buffer);
  console.log(`✅ HTML saved at: ${outputPath}`)

}

export async function saveBodyAsJson(reqBody, folder) {
  try {

    // File name with timestamp
    const fileName = `${reqBody.title}.json`;
    const filePath = path.join(folder, fileName);

    // Write JSON
    fs.writeFileSync(filePath, JSON.stringify(reqBody, null, 2));

    console.log("✅ JSON file saved at:", filePath);
  } catch (err) {
    console.error("❌ Error saving JSON:", err);
    throw err;
  }
}

export function getJSONfiles(folderPath) {
  try {
    const files = fs.readdirSync(folderPath)
      .filter(file => path.extname(file).toLowerCase() === ".json");

    return files.map(file => {
      const filePath = path.join(folderPath, file);
      const content = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      return content; // replace filename with parsed object
    });
  } catch (err) {
    console.error("❌ Error reading folder:", err);
    return [];
  }
}