import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const source = path.join(root, "design", "icon-source.svg");
const outDir = path.join(root, "public", "icons");

await mkdir(outDir, { recursive: true });

const targets = [
  { file: "icon-64.png", size: 64 },
  { file: "icon-192.png", size: 192 },
  { file: "icon-512.png", size: 512 },
  { file: "icon-maskable-512.png", size: 512 },
  { file: "apple-touch-icon.png", size: 180 },
];

for (const { file, size } of targets) {
  await sharp(source, { density: 384 })
    .resize(size, size)
    .png()
    .toFile(path.join(outDir, file));
  console.log(`generated ${file} (${size}x${size})`);
}

// A larger preview so it's easy to eyeball proportions/quality.
await sharp(source, { density: 384 })
  .resize(1024, 1024)
  .png()
  .toFile(path.join(root, "design", "icon-preview.png"));

console.log("done");
