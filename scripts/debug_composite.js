import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function debug() {
  const doorDir = 'public/textures/corridor/doors';
  const backupUnpainted = path.join(doorDir, 'drzwisocial_backup.webp');
  
  // 1. Generate LinkedIn logo
  const svg = `
    <svg width="320" height="320" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg">
      <circle cx="160" cy="160" r="140" fill="white" />
      <rect x="65" y="65" width="190" height="190" rx="35" ry="35" fill="#0077b5" />
      <text x="156" y="152" font-family="Arial, Helvetica, sans-serif" font-size="130" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="central">in</text>
    </svg>
  `;
  const linkedinLogo = await sharp(Buffer.from(svg)).png().toBuffer();

  const whiteIgCover = await sharp({
    create: { width: 330, height: 340, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 255 } }
  }).png().toBuffer();

  const whiteTkCover = await sharp({
    create: { width: 320, height: 320, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 255 } }
  }).png().toBuffer();

  // Step 1: Base image
  console.log('Step 1...');
  await sharp(backupUnpainted).webp().toFile('public/textures/corridor/doors/debug_step1.webp');

  // Step 2: Add covers
  console.log('Step 2...');
  const step2 = await sharp(backupUnpainted)
    .composite([
      { input: whiteIgCover, left: 185, top: 140 },
      { input: whiteTkCover, left: 418, top: 250 }
    ])
    .webp()
    .toBuffer();
  fs.writeFileSync('public/textures/corridor/doors/debug_step2.webp', step2);

  // Step 3: Add LinkedIn
  console.log('Step 3...');
  const step3 = await sharp(step2)
    .composite([
      { input: linkedinLogo, left: 418, top: 250 }
    ])
    .webp()
    .toBuffer();
  fs.writeFileSync('public/textures/corridor/doors/debug_step3.webp', step3);
  
  console.log('Done!');
}

debug();
