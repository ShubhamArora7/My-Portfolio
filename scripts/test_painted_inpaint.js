import sharp from 'sharp';

async function testPaintedInpaint() {
  const file = 'public/textures/corridor/doors/drzwisocial_painted.webp';

  // 1. Cover Instagram: left=185, top=160, width=230, height=300
  const igPatchW = 230;
  const igPatchH = 300;
  const igMask = Buffer.from(`
    <svg width="${igPatchW}" height="${igPatchH}">
      <filter id="blur">
        <feGaussianBlur stdDeviation="10" />
      </filter>
      <rect x="15" y="15" width="${igPatchW - 30}" height="${igPatchH - 30}" fill="white" filter="url(#blur)" />
    </svg>
  `);
  
  const igClean = await sharp(file)
    .extract({ left: 185, top: 780, width: 230, height: 150 })
    .resize(igPatchW, igPatchH, { fit: 'fill' })
    .toBuffer();

  const igMasked = await sharp(igClean)
    .composite([{ input: igMask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  // 2. Cover YouTube: left=200, top=1300, width=624, height=450
  const ytPatchW = 624;
  const ytPatchH = 450;
  const ytMask = Buffer.from(`
    <svg width="${ytPatchW}" height="${ytPatchH}">
      <filter id="blur">
        <feGaussianBlur stdDeviation="15" />
      </filter>
      <rect x="25" y="25" width="${ytPatchW - 50}" height="${ytPatchH - 50}" fill="white" filter="url(#blur)" />
    </svg>
  `);

  const ytClean = await sharp(file)
    .extract({ left: 200, top: 1750, width: 624, height: 200 })
    .resize(ytPatchW, ytPatchH, { fit: 'fill' })
    .toBuffer();

  const ytMasked = await sharp(ytClean)
    .composite([{ input: ytMask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  await sharp(file)
    .composite([
      { input: igMasked, left: 185, top: 160 },
      { input: ytMasked, left: 200, top: 1300 }
    ])
    .webp()
    .toFile('public/textures/corridor/doors/test_door_inpainted.webp');

  console.log('Saved test_door_inpainted.webp!');
}

testPaintedInpaint();
