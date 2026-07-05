import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Paths
const galleryDir = 'public/textures/gallery';

// Backups of the clean template sheets
const backups = {
  chatrio_unpainted: path.join(galleryDir, 'monetuneprzod_backup.webp'),
  chatrio_painted: path.join(galleryDir, 'monetuneprzod_painted_backup.webp'),
  caresync_unpainted: path.join(galleryDir, 'timberkittyprzod_backup.webp'),
  caresync_painted: path.join(galleryDir, 'timberkittyprzod_painted_backup.webp'),
  union_unpainted: path.join(galleryDir, 'youngmultiprzod_backup.webp'),
  union_painted: path.join(galleryDir, 'youngmultiprzod_painted_backup.webp'),
  aws_unpainted: path.join(galleryDir, 'bioprzod_backup.webp'),
  aws_painted: path.join(galleryDir, 'bioprzod_painted_backup.webp')
};

// Target output files
const targets = {
  chatrio_unpainted: path.join(galleryDir, 'monetuneprzod.webp'),
  chatrio_painted: path.join(galleryDir, 'monetuneprzod_painted.webp'),
  caresync_unpainted: path.join(galleryDir, 'timberkittyprzod.webp'),
  caresync_painted: path.join(galleryDir, 'timberkittyprzod_painted.webp'),
  union_unpainted: path.join(galleryDir, 'youngmultiprzod.webp'),
  union_painted: path.join(galleryDir, 'youngmultiprzod_painted.webp'),
  aws_unpainted: path.join(galleryDir, 'bioprzod.webp'),
  aws_painted: path.join(galleryDir, 'bioprzod_painted.webp')
};

// Uploaded logo source files
const uploads = {
  chatrio: 'C:/Users/shubh/.gemini/antigravity/brain/7c07f471-79e6-4508-83b2-3202a009b675/media__1783101548765.png',
  caresync: 'C:/Users/shubh/.gemini/antigravity/brain/7c07f471-79e6-4508-83b2-3202a009b675/media__1783101632491.png',
  union: 'C:/Users/shubh/.gemini/antigravity/brain/7c07f471-79e6-4508-83b2-3202a009b675/media__1783101666971.jpg',
  aws: path.join(galleryDir, 'aws.png')
};

// Box coordinates for drawing area inside the hand-drawn border:
// x = 115 to 905 (width = 790)
// y = 620 to 1865 (height = 1245)
const BOX_X = 115;
const BOX_Y = 620;
const BOX_W = 790;
const BOX_H = 1245;

async function prepareBackup(source, backup) {
  if (!fs.existsSync(backup)) {
    fs.copyFileSync(source, backup);
    console.log(`Created backup: ${path.basename(backup)}`);
  }
}

async function makeSketch(srcPath, invertBg = false) {
  let img = sharp(srcPath);
  if (invertBg) {
    img = img.negate({ alpha: false });
  }
  return img
    .grayscale()
    .linear(1.5, -45) // Boost contrast to make outlines pop
    .png()
    .toBuffer();
}

async function main() {
  console.log('Generating custom gallery sheet cover textures...');

  // 1. Prepare backups first
  await prepareBackup(targets.chatrio_unpainted, backups.chatrio_unpainted);
  await prepareBackup(targets.chatrio_painted, backups.chatrio_painted);
  await prepareBackup(targets.caresync_unpainted, backups.caresync_unpainted);
  await prepareBackup(targets.caresync_painted, backups.caresync_painted);
  await prepareBackup(targets.union_unpainted, backups.union_unpainted);
  await prepareBackup(targets.union_painted, backups.union_painted);
  await prepareBackup(targets.aws_unpainted, backups.aws_unpainted);
  await prepareBackup(targets.aws_painted, backups.aws_painted);

  // ----------------------------------------------------
  // CHATRIO
  // ----------------------------------------------------
  console.log('Processing CHATRIO...');
  // Painted: Centered logo on a black background
  const chatrioPaintedLogo = await sharp(uploads.chatrio)
    .resize(BOX_W - 60, BOX_H - 100, { fit: 'contain', background: { r: 11, g: 14, b: 20, alpha: 255 } })
    .toBuffer();
  const chatrioPaintedBox = await sharp({
    create: { width: BOX_W, height: BOX_H, channels: 4, background: { r: 11, g: 14, b: 20, alpha: 255 } }
  }).composite([{ input: chatrioPaintedLogo, gravity: 'center' }]).png().toBuffer();

  await sharp(backups.chatrio_painted)
    .composite([{ input: chatrioPaintedBox, left: BOX_X, top: BOX_Y }])
    .webp({ quality: 90 })
    .toFile(targets.chatrio_painted);

  // Unpainted (Sketch): Invert colors, grayscale, center on white background
  const chatrioSketchSrc = await makeSketch(uploads.chatrio, true);
  const chatrioSketchLogo = await sharp(chatrioSketchSrc)
    .resize(BOX_W - 60, BOX_H - 100, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 255 } })
    .toBuffer();
  const chatrioSketchBox = await sharp({
    create: { width: BOX_W, height: BOX_H, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 255 } }
  }).composite([{ input: chatrioSketchLogo, gravity: 'center' }]).png().toBuffer();

  await sharp(backups.chatrio_unpainted)
    .composite([{ input: chatrioSketchBox, left: BOX_X, top: BOX_Y }])
    .webp({ quality: 90 })
    .toFile(targets.chatrio_unpainted);


  // ----------------------------------------------------
  // CARESYNC
  // ----------------------------------------------------
  console.log('Processing CARESYNC...');
  // Painted: Centered logo on a dark navy background
  const caresyncPaintedLogo = await sharp(uploads.caresync)
    .resize(BOX_W - 60, BOX_H - 100, { fit: 'contain', background: { r: 10, g: 17, b: 40, alpha: 255 } })
    .toBuffer();
  const caresyncPaintedBox = await sharp({
    create: { width: BOX_W, height: BOX_H, channels: 4, background: { r: 10, g: 17, b: 40, alpha: 255 } }
  }).composite([{ input: caresyncPaintedLogo, gravity: 'center' }]).png().toBuffer();

  await sharp(backups.caresync_painted)
    .composite([{ input: caresyncPaintedBox, left: BOX_X, top: BOX_Y }])
    .webp({ quality: 90 })
    .toFile(targets.caresync_painted);

  // Unpainted (Sketch): Invert colors, grayscale, center on white background
  const caresyncSketchSrc = await makeSketch(uploads.caresync, true);
  const caresyncSketchLogo = await sharp(caresyncSketchSrc)
    .resize(BOX_W - 60, BOX_H - 100, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 255 } })
    .toBuffer();
  const caresyncSketchBox = await sharp({
    create: { width: BOX_W, height: BOX_H, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 255 } }
  }).composite([{ input: caresyncSketchLogo, gravity: 'center' }]).png().toBuffer();

  await sharp(backups.caresync_unpainted)
    .composite([{ input: caresyncSketchBox, left: BOX_X, top: BOX_Y }])
    .webp({ quality: 90 })
    .toFile(targets.caresync_unpainted);


  // ----------------------------------------------------
  // UNION OF TAXPAYERS
  // ----------------------------------------------------
  console.log('Processing UNION OF TAXPAYERS...');
  // Painted: Centered logo on a white background
  const unionPaintedLogo = await sharp(uploads.union)
    .resize(BOX_W - 40, BOX_H - 80, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 255 } })
    .toBuffer();
  const unionPaintedBox = await sharp({
    create: { width: BOX_W, height: BOX_H, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 255 } }
  }).composite([{ input: unionPaintedLogo, gravity: 'center' }]).png().toBuffer();

  await sharp(backups.union_painted)
    .composite([{ input: unionPaintedBox, left: BOX_X, top: BOX_Y }])
    .webp({ quality: 90 })
    .toFile(targets.union_painted);

  // Unpainted (Sketch): Grayscale, boost contrast, center on white background
  const unionSketchSrc = await makeSketch(uploads.union, false);
  const unionSketchLogo = await sharp(unionSketchSrc)
    .resize(BOX_W - 40, BOX_H - 80, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 255 } })
    .toBuffer();
  const unionSketchBox = await sharp({
    create: { width: BOX_W, height: BOX_H, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 255 } }
  }).composite([{ input: unionSketchLogo, gravity: 'center' }]).png().toBuffer();

  await sharp(backups.union_unpainted)
    .composite([{ input: unionSketchBox, left: BOX_X, top: BOX_Y }])
    .webp({ quality: 90 })
    .toFile(targets.union_unpainted);


  // ----------------------------------------------------
  // AWS STATIC HOSTING
  // ----------------------------------------------------
  console.log('Processing AWS STATIC HOSTING...');
  // Painted: Centered logo on a white background
  const awsPaintedLogo = await sharp(uploads.aws)
    .resize(BOX_W - 80, BOX_H - 120, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .toBuffer();
  const awsPaintedBox = await sharp({
    create: { width: BOX_W, height: BOX_H, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 255 } }
  }).composite([{ input: awsPaintedLogo, gravity: 'center' }]).png().toBuffer();

  await sharp(backups.aws_painted)
    .composite([{ input: awsPaintedBox, left: BOX_X, top: BOX_Y }])
    .webp({ quality: 90 })
    .toFile(targets.aws_painted);

  // Unpainted (Sketch): Make outlines black on white background
  // For transparent AWS png, we extract alpha channel, invert it to make it black, and composite on white.
  const awsAlpha = await sharp(uploads.aws)
    .grayscale()
    .threshold(254) // Make all colored elements black
    .toBuffer();
  const awsSketchLogo = await sharp(awsAlpha)
    .resize(BOX_W - 80, BOX_H - 120, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 255 } })
    .toBuffer();
  const awsSketchBox = await sharp({
    create: { width: BOX_W, height: BOX_H, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 255 } }
  }).composite([{ input: awsSketchLogo, gravity: 'center' }]).png().toBuffer();

  await sharp(backups.aws_unpainted)
    .composite([{ input: awsSketchBox, left: BOX_X, top: BOX_Y }])
    .webp({ quality: 90 })
    .toFile(targets.aws_unpainted);

  console.log('Gallery sheet cover textures successfully generated!');
}

main().catch(err => {
  console.error('Error generating gallery textures:', err);
});
