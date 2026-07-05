import sharp from 'sharp';

async function testExtract() {
  const trophyPath = 'C:/Users/shubh/.gemini/antigravity/brain/7c07f471-79e6-4508-83b2-3202a009b675/media__1783030641868.png';
  const certPath = 'C:/Users/shubh/.gemini/antigravity/brain/7c07f471-79e6-4508-83b2-3202a009b675/media__1783030657231.png';

  const extract = async (imgPath, outPath) => {
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

    await sharp(rgba, {
      raw: {
        width: info.width,
        height: info.height,
        channels: 4
      }
    })
    .png()
    .toFile(outPath);
  };

  await extract(trophyPath, 'public/textures/corridor/doors/test_trophy_extracted.png');
  await extract(certPath, 'public/textures/corridor/doors/test_cert_extracted.png');
  console.log('Saved extracted images!');
}

testExtract();
