import sharp from 'sharp';

async function testExtract() {
  const file = 'C:/Users/shubh/.gemini/antigravity/brain/7c07f471-79e6-4508-83b2-3202a009b675/media__1783029086122.png';
  
  const logo = sharp(file);
  const { data, info } = await logo
    .grayscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const alpha = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i++) {
    const val = data[i];
    if (val >= 225) {
      alpha[i] = 0;
    } else if (val <= 130) {
      alpha[i] = 255;
    } else {
      alpha[i] = Math.round(((225 - val) / (225 - 130)) * 255);
    }
  }

  // target color: black (0, 0, 0)
  const rgba = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0; i < info.width * info.height; i++) {
    rgba[i * 4] = 0;
    rgba[i * 4 + 1] = 0;
    rgba[i * 4 + 2] = 0;
    rgba[i * 4 + 3] = alpha[i];
  }

  await sharp(rgba, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4
    }
  })
  .png()
  .toFile('public/textures/about/test_aws_logo_extracted.png');

  console.log('Saved test_aws_logo_extracted.png!');
}

testExtract();
