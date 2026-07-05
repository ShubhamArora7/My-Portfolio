import sharp from 'sharp';

async function testPinkInpaint() {
  const file = 'public/textures/about/backups/threejsduzybalon_painted.webp';
  
  // Dimensions: 784x1360
  const patchW = 580;
  const patchH = 560;
  
  // Box-feathered mask
  const maskSvg = `
    <svg width="${patchW}" height="${patchH}">
      <filter id="blur">
        <feGaussianBlur stdDeviation="15" />
      </filter>
      <rect x="25" y="25" width="${patchW - 50}" height="${patchH - 50}" fill="white" filter="url(#blur)" />
    </svg>
  `;
  const maskBuffer = Buffer.from(maskSvg);

  // Extract clean patch from the pink balloon itself!
  const cleanPatch = await sharp(file)
    .extract({ left: 270, top: 100, width: 244, height: 160 })
    .resize(patchW, patchH, { fit: 'fill' })
    .toBuffer();

  const maskedPatch = await sharp(cleanPatch)
    .composite([{ input: maskBuffer, blend: 'dest-in' }])
    .png()
    .toBuffer();

  await sharp(file)
    .composite([{ input: maskedPatch, left: 102, top: 230 }])
    .webp()
    .toFile('public/textures/about/test_inpainted_pink.webp');

  console.log('Saved test_inpainted_pink.webp!');
}

testPinkInpaint();
