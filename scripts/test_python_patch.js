import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const fontPath = 'public/fonts/CabinSketch-Bold.ttf';
const fontData = fs.readFileSync(fontPath);
const base64Font = fontData.toString('base64');

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

async function testPython() {
  const pinkBalloonBackup = 'public/textures/about/backups/threejsduzybalon_painted.webp';
  
  const pinkCleanPatch = await sharp(pinkBalloonBackup)
    .extract({ left: 150, top: 80, width: 220, height: 140 })
    .resize(360, 340, { fit: 'fill' })
    .toBuffer();

  const pinkPatch = await sharp(pinkCleanPatch)
    .composite([{ input: createRectBoxFeatheredMask(360, 340, 15), blend: 'dest-in' }])
    .png()
    .toFile('public/textures/about/test_python_patch_output.png');
    
  console.log('Saved test_python_patch_output.png');
}

testPython();
