import sharp from 'sharp';

async function testSvg() {
  const svg = `
    <svg width="320" height="320" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg">
      <circle cx="160" cy="160" r="140" fill="white" />
      <rect x="65" y="65" width="190" height="190" rx="35" ry="35" fill="#0077b5" />
      <text x="156" y="152" font-family="Arial, Helvetica, sans-serif" font-size="130" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="central">in</text>
    </svg>
  `;
  await sharp(Buffer.from(svg))
    .png()
    .toFile('public/textures/corridor/doors/test_linkedin_svg.png');
  console.log('Saved test_linkedin_svg.png!');
}

testSvg();
