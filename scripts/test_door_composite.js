import sharp from 'sharp';

async function testComposite() {
  const backupFile = 'public/textures/corridor/doors/drzwisocial_backup.webp';
  const trophySketch = 'public/textures/corridor/doors/test_trophy_extracted.png';

  // 1. Generate LinkedIn logo SVG
  const svg = `
    <svg width="320" height="320" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg">
      <circle cx="160" cy="160" r="140" fill="white" />
      <rect x="65" y="65" width="190" height="190" rx="35" ry="35" fill="#0077b5" />
      <text x="156" y="152" font-family="Arial, Helvetica, sans-serif" font-size="130" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="central">in</text>
    </svg>
  `;
  const linkedinLogo = await sharp(Buffer.from(svg)).png().toBuffer();

  // 2. White covers
  const whiteIgCover = await sharp({
    create: { width: 620, height: 480, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 255 } }
  }).png().toBuffer();

  const whiteTkCover = await sharp({
    create: { width: 320, height: 320, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 255 } }
  }).png().toBuffer();

  // 3. Make Trophy bigger: width=260, height=340
  const trophyResized = await sharp(trophySketch).resize(260, 340).png().toBuffer();

  await sharp(backupFile)
    .composite([
      { input: whiteIgCover, left: 185, top: 140 },
      { input: whiteTkCover, left: 418, top: 660 },
      { input: linkedinLogo, left: 418, top: 660 },
      { input: trophyResized, left: 200, top: 160 }
    ])
    .webp()
    .toFile('public/textures/corridor/doors/test_door_composite.webp');

  console.log('Saved test_door_composite.webp!');
}

testComposite();
