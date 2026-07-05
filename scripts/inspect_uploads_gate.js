import sharp from 'sharp';

async function main() {
  const files = [
    'C:/Users/shubh/.gemini/antigravity/brain/7c07f471-79e6-4508-83b2-3202a009b675/media__1783030641868.png',
    'C:/Users/shubh/.gemini/antigravity/brain/7c07f471-79e6-4508-83b2-3202a009b675/media__1783030657231.png'
  ];
  for (const f of files) {
    const meta = await sharp(f).metadata();
    console.log(`${f}: ${meta.width}x${meta.height}`);
  }
}

main();
