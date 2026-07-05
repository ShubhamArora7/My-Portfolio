import sharp from 'sharp';
import fs from 'fs';

async function check() {
  const images = [
    'public/textures/corridor/doors/drzwisocial.webp',
    'public/textures/corridor/doors/drzwisocial_painted.webp'
  ];
  for (const img of images) {
    try {
      const meta = await sharp(img).metadata();
      console.log(`${img}: ${meta.width}x${meta.height}`);
    } catch (e) {
      console.log(`${img}: NOT FOUND`);
    }
  }
}

check();
