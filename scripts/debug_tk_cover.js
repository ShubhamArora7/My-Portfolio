import sharp from 'sharp';
import path from 'path';

async function test() {
  const doorDir = 'public/textures/corridor/doors';
  const backupUnpainted = path.join(doorDir, 'drzwisocial_backup.webp');

  const whiteTkCover = await sharp({
    create: { width: 360, height: 320, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 255 } }
  }).png().toBuffer();

  await sharp(backupUnpainted)
    .composite([
      { input: whiteTkCover, left: 400, top: 660 }
    ])
    .webp()
    .toFile('public/textures/corridor/doors/debug_tk_cover.webp');
  console.log('Saved debug_tk_cover.webp!');
}

test();
