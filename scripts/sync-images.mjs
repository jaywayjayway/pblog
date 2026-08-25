import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const postsDir = path.join(root, "content", "posts");
const imagesDir = path.join(root, "public", "images");

const IMAGE_EXT = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".svg",
  ".avif",
  ".bmp",
  ".ico",
]);

function syncImages() {
  fs.rmSync(imagesDir, { recursive: true, force: true });

  if (!fs.existsSync(postsDir)) return;

  for (const entry of fs.readdirSync(postsDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const slug = entry.name;
    const postDir = path.join(postsDir, slug);

    const images = fs
      .readdirSync(postDir)
      .filter((f) => IMAGE_EXT.has(path.extname(f).toLowerCase()));

    if (images.length === 0) continue;

    const targetDir = path.join(imagesDir, slug);
    fs.mkdirSync(targetDir, { recursive: true });

    for (const img of images) {
      fs.copyFileSync(path.join(postDir, img), path.join(targetDir, img));
    }
    console.log(`[sync-images] ${slug}: ${images.length} 张图片`);
  }
}

syncImages();
