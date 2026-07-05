import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Paths
const doorDir = 'public/textures/corridor/doors';
const doorUnpainted = path.join(doorDir, 'drzwisocial.webp');
const doorPainted = path.join(doorDir, 'drzwisocial_painted.webp');

// Backups of the clean git-restored doors
const backupUnpainted = path.join(doorDir, 'drzwisocial_backup.webp');
const backupPainted = path.join(doorDir, 'drzwisocial_painted_backup.webp');

// Uploaded files
const trophyUpload = 'C:/Users/shubh/.gemini/antigravity/brain/7c07f471-79e6-4508-83b2-3202a009b675/media__1783030641868.png';
const certUpload = 'C:/Users/shubh/.gemini/antigravity/brain/7c07f471-79e6-4508-83b2-3202a009b675/media__1783030657231.png';

// Custom box-feathered mask
function createRectBoxFeatheredMask(width, height, stdDev = 15) {
  const inset = Math.round(stdDev * 1.2);
  return Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <filter id="blur">
        <feGaussianBlur stdDeviation="${stdDev}" />
      </filter>
      <rect x="${inset}" y="${inset}" width="${width - inset * 2}" height="${height - inset * 2}" fill="white" filter="url(#blur)" />
    </svg>
  `);
}

// Function to extract transparent colored logo from black background
async function extractColorLogo(imgPath) {
  const { data, info } = await sharp(imgPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const rgba = Buffer.alloc(data.length);
  for (let i = 0; i < data.length / 4; i++) {
    const r = data[i * 4];
    const g = data[i * 4 + 1];
    const b = data[i * 4 + 2];
    
    const brightness = (r + g + b) / 3;
    let alpha = 255;
    if (brightness < 8) {
      alpha = 0;
    } else if (brightness < 20) {
      alpha = Math.round(((brightness - 8) / 12) * 255);
    }
    
    rgba[i * 4] = r;
    rgba[i * 4 + 1] = g;
    rgba[i * 4 + 2] = b;
    rgba[i * 4 + 3] = alpha;
  }

  return sharp(rgba, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4
    }
  }).png().toBuffer();
}

// Function to extract black-and-white sketch outlines from a black-background colored drawing
async function extractSketchLogo(imgPath) {
  const { data, info } = await sharp(imgPath)
    .grayscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const alpha = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i++) {
    const val = data[i];
    if (val < 12) {
      alpha[i] = 0;
    } else if (val > 150) {
      alpha[i] = 0;
    } else if (val <= 70) {
      alpha[i] = 255;
    } else {
      alpha[i] = Math.round(((150 - val) / (150 - 70)) * 255);
    }
  }

  const rgba = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0; i < info.width * info.height; i++) {
    rgba[i * 4] = 0;
    rgba[i * 4 + 1] = 0;
    rgba[i * 4 + 2] = 0;
    rgba[i * 4 + 3] = alpha[i];
  }

  return sharp(rgba, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4
    }
  }).png().toBuffer();
}

// Generate the official LinkedIn logo SVG
async function getLinkedinLogo() {
  const svg = `
    <svg width="320" height="320" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg">
      <circle cx="160" cy="160" r="140" fill="white" />
      <rect x="65" y="65" width="190" height="190" rx="35" ry="35" fill="#0077b5" />
      <text x="156" y="152" font-family="Arial, Helvetica, sans-serif" font-size="130" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="central">in</text>
    </svg>
  `;
  return sharp(Buffer.from(svg)).png().toBuffer();
}

async function main() {
  console.log('Generating Studio Door textures from original source...');

  // Always copy from active doorUnpainted and doorPainted since they were clean-checked out from git!
  fs.copyFileSync(doorUnpainted, backupUnpainted);
  fs.copyFileSync(doorPainted, backupPainted);

  // Extract logos
  console.log('Extracting logo transparency masks...');
  const trophyColor = await extractColorLogo(trophyUpload);
  const certColor = await extractColorLogo(certUpload);

  const trophySketch = await extractSketchLogo(trophyUpload);
  const certSketch = await extractSketchLogo(certUpload);

  const linkedinLogo = await getLinkedinLogo();

  // ----------------------------------------------------
  // 1. UNPAINTED DOOR (drzwisocial.webp) - 1024x2048
  // ----------------------------------------------------
  console.log('Processing Unpainted Door...');
  
  // White cover for upper panel (width=620, height=600) to completely erase Instagram and TikTok at y=410
  const whiteIgCover = await sharp({
    create: { width: 620, height: 600, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 255 } }
  }).png().toBuffer();

  // White cover for TikTok at y=820 (width=410 to cover it completely from x=390 to 800)
  const whiteTkCover = await sharp({
    create: { width: 410, height: 320, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 255 } }
  }).png().toBuffer();

  const whiteYtCover = await sharp({
    create: { width: 624, height: 450, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 255 } }
  }).png().toBuffer();

  // Resize sketch logos (trophy: 280x366, certificate: 520x406)
  const trophySketchResized = await sharp(trophySketch).resize(280, 366).png().toBuffer();
  const certSketchResized = await sharp(certSketch).resize(520, 406).png().toBuffer();

  // Compose unpainted door
  await sharp(backupUnpainted)
    .composite([
      { input: whiteIgCover, left: 185, top: 140 },
      { input: whiteTkCover, left: 390, top: 660 },
      { input: whiteYtCover, left: 200, top: 1300 },
      { input: linkedinLogo, left: 418, top: 660 },
      { input: trophySketchResized, left: 180, top: 150 },
      { input: certSketchResized, left: 252, top: 1320 }
    ])
    .webp()
    .toFile(doorUnpainted);

  // ----------------------------------------------------
  // 2. PAINTED DOOR (drzwisocial_painted.webp) - 1024x2048
  // ----------------------------------------------------
  console.log('Processing Painted Door...');

  // Use Gaussian feathered clean wood grain patches to cover old logos
  // Cover Instagram and TikTok at y=410 (size 620x600) using clean wood grain from bottom panel
  const igPatchW = 620;
  const igPatchH = 600;
  const igMask = createRectBoxFeatheredMask(igPatchW, igPatchH, 10);
  const igClean = await sharp(backupPainted)
    .extract({ left: 185, top: 1750, width: 620, height: 200 }) // Extract clean wood grain from below YouTube
    .resize(igPatchW, igPatchH, { fit: 'fill' })
    .toBuffer();
  const igMasked = await sharp(igClean)
    .composite([{ input: igMask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  // Cover TikTok at y=820 (size 410x320, left=390) using clean wood grain from left panel
  const tkPatchW = 410;
  const tkPatchH = 320;
  const tkMask = createRectBoxFeatheredMask(tkPatchW, tkPatchH, 10);
  const tkClean = await sharp(backupPainted)
    .extract({ left: 185, top: 740, width: 220, height: 240 }) // Clean wood grain on the left panel
    .resize(tkPatchW, tkPatchH, { fit: 'fill' })
    .toBuffer();
  const tkMasked = await sharp(tkClean)
    .composite([{ input: tkMask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  // Cover YouTube
  const ytPatchW = 624;
  const ytPatchH = 450;
  const ytMask = createRectBoxFeatheredMask(ytPatchW, ytPatchH, 15);
  const ytClean = await sharp(backupPainted)
    .extract({ left: 200, top: 1750, width: 624, height: 200 })
    .resize(ytPatchW, ytPatchH, { fit: 'fill' })
    .toBuffer();
  const ytMasked = await sharp(ytClean)
    .composite([{ input: ytMask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  // Resize colored logos (trophy: 280x366, certificate: 520x406)
  const trophyColorResized = await sharp(trophyColor).resize(280, 366).png().toBuffer();
  const certColorResized = await sharp(certColor).resize(520, 406).png().toBuffer();

  // Compose painted door
  await sharp(backupPainted)
    .composite([
      { input: igMasked, left: 185, top: 140 },
      { input: tkMasked, left: 390, top: 660 },
      { input: ytMasked, left: 200, top: 1300 },
      { input: linkedinLogo, left: 418, top: 660 },
      { input: trophyColorResized, left: 180, top: 150 },
      { input: certColorResized, left: 252, top: 1320 }
    ])
    .webp()
    .toFile(doorPainted);

  console.log('Studio Door textures successfully generated!');
}

main().catch(err => {
  console.error('Error generating door textures:', err);
});
