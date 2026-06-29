#!/usr/bin/env node

const https = require("https");
const fs = require("fs");
const path = require("path");

const files = [
  "Vegan_FAQ_epub_v2.epub",
  "Vegan_FAQ_epub_v3.epub",
  "Vegan_FAQ.pdf"
];

const filesDir = path.join(__dirname, "..", "public", "files");

/**
 * Downloads a file from the URL and saves it to the destination path.
 * Handles HTTP redirects (301, 302, 307, 308).
 */
function downloadFile(url, destPath, maxRedirects = 10) {
  return new Promise((resolve, reject) => {
    const isHttps = url.startsWith("https");
    const client = isHttps ? https : require("http");

    client
      .get(url, (res) => {
        if (
          res.statusCode === 301 ||
          res.statusCode === 302 ||
          res.statusCode === 307 ||
          res.statusCode === 308
        ) {
          if (maxRedirects === 0) {
            reject(new Error("Too many redirects"));
            return;
          }
          const redirectUrl = res.headers.location;
          if (!redirectUrl) {
            reject(new Error("Redirect without location header"));
            return;
          }
          res.resume(); // discard response body
          const resolvedUrl = new URL(redirectUrl, url).toString();
          downloadFile(resolvedUrl, destPath, maxRedirects - 1)
            .then(resolve)
            .catch(reject);
          return;
        }

        if (res.statusCode !== 200) {
          reject(new Error(`Failed to download (${res.statusCode}): ${url}`));
          return;
        }

        const fileStream = fs.createWriteStream(destPath);
        res.pipe(fileStream);

        fileStream.on("finish", () => {
          fileStream.close();
          resolve();
        });

        fileStream.on("error", (err) => {
          fs.unlink(destPath, () => {}); // delete partial file on error
          reject(err);
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

async function main() {
  console.log(`Ensuring target directory exists: ${filesDir}`);
  if (!fs.existsSync(filesDir)) {
    fs.mkdirSync(filesDir, { recursive: true });
  }

  // Generate a Unix timestamp for cache busting
  const timestamp = Math.floor(Date.now() / 1000);

  console.log(`Starting download of ${files.length} books...`);

  for (const filename of files) {
    const url = `https://camerongreen.org/sites/default/files/ebook/${filename}?v=${timestamp}`;
    const destPath = path.join(filesDir, filename);

    console.log(`Downloading ${filename} from: ${url}`);
    try {
      await downloadFile(url, destPath);
      console.log(`✓ Successfully downloaded and saved to ${destPath}`);
    } catch (err) {
      console.error(`✗ Failed to download ${filename}:`, err.message);
      process.exit(1);
    }
  }

  console.log("\nAll books downloaded successfully!");
}

main().catch((err) => {
  console.error("An unexpected error occurred:", err);
  process.exit(1);
});
