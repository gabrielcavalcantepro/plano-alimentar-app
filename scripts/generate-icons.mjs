import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const source = path.join(root, "public", "LOGO-ICONE-FUNDO-LARANJA.png");
const outDir = path.join(root, "public", "icons");
const BRAND_ORANGE = "#C84600";

await mkdir(outDir, { recursive: true });

// The uploaded icon already has rounded corners baked in (transparent outside the
// rounded square) — flatten it back to a full-bleed square so the OS does its own
// rounding/masking instead of layering on top of ours.
const fullBleed = await sharp(source).flatten({ background: BRAND_ORANGE }).png().toBuffer();

const targets = [
  { file: "icon-64.png", size: 64 },
  { file: "icon-192.png", size: 192 },
  { file: "icon-512.png", size: 512 },
  { file: "apple-touch-icon.png", size: 180 },
];

for (const { file, size } of targets) {
  await sharp(fullBleed).resize(size, size).png().toFile(path.join(outDir, file));
  console.log(`generated ${file} (${size}x${size})`);
}

// Maskable icons get clipped to a circle/squircle by Android — pad the mark down so it
// sits inside the ~80%-diameter safe zone instead of touching the edges of the square.
const MASKABLE_SIZE = 512;
const MARK_SIZE = Math.round(MASKABLE_SIZE * 0.72);
const markResized = await sharp(fullBleed).resize(MARK_SIZE, MARK_SIZE).toBuffer();

await sharp({
  create: {
    width: MASKABLE_SIZE,
    height: MASKABLE_SIZE,
    channels: 4,
    background: BRAND_ORANGE,
  },
})
  .composite([{ input: markResized, gravity: "center" }])
  .png()
  .toFile(path.join(outDir, "icon-maskable-512.png"));
console.log(`generated icon-maskable-512.png (${MASKABLE_SIZE}x${MASKABLE_SIZE}, mark padded to ${MARK_SIZE}px)`);

console.log("done");
