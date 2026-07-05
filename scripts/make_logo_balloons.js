import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Paths
const aboutDir = 'public/textures/about';
const backupDir = 'public/textures/about/backups';

// Uploaded logos paths
const logoAwsFile = 'C:/Users/shubh/.gemini/antigravity/brain/7c07f471-79e6-4508-83b2-3202a009b675/media__1783029086122.png';
const logoDjangoFile = 'C:/Users/shubh/.gemini/antigravity/brain/7c07f471-79e6-4508-83b2-3202a009b675/media__1783029098084.png';
const logoPythonFile = 'C:/Users/shubh/.gemini/antigravity/brain/7c07f471-79e6-4508-83b2-3202a009b675/media__1783029109049.png';

// Custom box-feathered mask for rectangle
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

// Helper to extract pencil lines from a white-background sketch image and color them
async function extractLogo(logoPath, color) {
  const logo = sharp(logoPath);
  const { data, info } = await logo
    .grayscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const alpha = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i++) {
    const val = data[i];
    // Custom threshold for pencil sketch line extraction
    if (val >= 225) {
      alpha[i] = 0;
    } else if (val <= 130) {
      alpha[i] = 255;
    } else {
      alpha[i] = Math.round(((225 - val) / (225 - 130)) * 255);
    }
  }

  // Create RGBA buffer with the target color and extracted alpha channel
  const rgba = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0; i < info.width * info.height; i++) {
    rgba[i * 4] = color.r;
    rgba[i * 4 + 1] = color.g;
    rgba[i * 4 + 2] = color.b;
    rgba[i * 4 + 3] = alpha[i];
  }

  return sharp(rgba, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4
    }
  }).png().toBuffer();
}

async function main() {
  console.log('Starting logo balloon texture generation...');

  // Ensure backup files exist.
  const backups = [
    { src: 'threejsduzybalon.webp', dest: 'threejsduzybalon.webp' },
    { src: 'threejsduzybalon_painted.webp', dest: 'threejsduzybalon_painted.webp' },
    { src: 'GSAPduzybalon.webp', dest: 'GSAPduzybalon.webp' },
    { src: 'GSAPduzybalon_painted.webp', dest: 'GSAPduzybalon_painted.webp' }
  ];
  for (const backup of backups) {
    const destPath = path.join(backupDir, backup.dest);
    if (!fs.existsSync(destPath)) {
      fs.copyFileSync(path.join(aboutDir, backup.src), destPath);
    }
  }

  const pinkBalloonBackup = path.join(backupDir, 'threejsduzybalon_painted.webp');
  const gsapPaintedBackup = path.join(backupDir, 'GSAPduzybalon_painted.webp');
  const gsapSketchBackup = path.join(backupDir, 'GSAPduzybalon.webp');
  const threejsSketchBackup = path.join(backupDir, 'threejsduzybalon.webp');

  // Define colors
  const black = { r: 0, g: 0, b: 0 };
  const awsColor = { r: 124, g: 45, b: 18 };      // #7c2d12 (dark orange/brown)
  const djangoColor = { r: 30, g: 58, b: 30 };    // #1e3a1e (dark green)
  const pythonColor = { r: 112, g: 26, b: 117 };   // #701a75 (dark purple)

  // Extract logos in black (for sketch balloons)
  console.log('Extracting logo outlines...');
  const awsLogoBlack = await extractLogo(logoAwsFile, black);
  const djangoLogoBlack = await extractLogo(logoDjangoFile, black);
  const pythonLogoBlack = await extractLogo(logoPythonFile, black);

  // Extract logos in respective painted colors
  const awsLogoColored = await extractLogo(logoAwsFile, awsColor);
  const djangoLogoColored = await extractLogo(logoDjangoFile, djangoColor);
  const pythonLogoColored = await extractLogo(logoPythonFile, pythonColor);

  // ----------------------------------------------------
  // AWS BALLOON (Orange/Yellow)
  // ----------------------------------------------------
  console.log('Generating AWS Balloon textures...');
  
  // AWS Sketch (unpainted) - 1392x1392
  // Logo dimensions: 283x204 (1.38 aspect). Resize to width=560, height=405.
  const awsLogoSketch = await sharp(awsLogoBlack).resize(560, 405).png().toBuffer();
  const cleanAwsSketch = await sharp(gsapSketchBackup)
    .composite([
      {
        input: Buffer.from(`<svg width="1392" height="1392"><circle cx="696" cy="620" r="320" fill="white" /></svg>`),
        left: 0,
        top: 0
      },
      {
        input: awsLogoSketch,
        left: 416, // 696 - 280 = 416
        top: 418  // 620 - 202 = 418
      }
    ])
    .webp()
    .toBuffer();
  fs.writeFileSync(path.join(aboutDir, 'awsduzybalon.webp'), cleanAwsSketch);

  // AWS Painted (colored) - 1024x1024
  const greenCleanPatch = await sharp(gsapPaintedBackup)
    .extract({ left: 300, top: 100, width: 424, height: 140 })
    .resize(460, 260, { fit: 'fill' })
    .toBuffer();

  const yellowPatch = await sharp(greenCleanPatch)
    .modulate({ hue: 275, saturation: 1.1 })
    .composite([{ input: createRectBoxFeatheredMask(460, 260, 15), blend: 'dest-in' }])
    .png()
    .toBuffer();

  const awsBaseShifted = await sharp(gsapPaintedBackup)
    .modulate({ hue: 275, saturation: 1.1 })
    .toBuffer();

  // Logo dimensions: resize to width=420, height=304.
  const awsLogoPaintedImg = await sharp(awsLogoColored).resize(420, 304).png().toBuffer();
  const cleanAwsPainted = await sharp(awsBaseShifted)
    .composite([
      {
        input: yellowPatch,
        left: 282,
        top: 250
      },
      {
        input: awsLogoPaintedImg,
        left: 302, // 512 - 210 = 302
        top: 298  // 450 - 152 = 298
      }
    ])
    .webp()
    .toBuffer();
  fs.writeFileSync(path.join(aboutDir, 'awsduzybalon_painted.webp'), cleanAwsPainted);

  // ----------------------------------------------------
  // DJANGO BALLOON (Green)
  // ----------------------------------------------------
  console.log('Generating Django Balloon textures...');

  // Django Sketch (unpainted) - 1141x1964
  // Logo dimensions: 370x229 (1.61 aspect). Resize to width=560, height=347.
  const djangoLogoSketch = await sharp(djangoLogoBlack).resize(560, 347).png().toBuffer();
  const cleanDjangoSketch = await sharp(threejsSketchBackup)
    .composite([
      {
        input: Buffer.from(`<svg width="1141" height="1964"><rect x="200" y="440" width="750" height="680" fill="white" /></svg>`),
        left: 0,
        top: 0
      },
      {
        input: djangoLogoSketch,
        left: 290, // 570 - 280 = 290
        top: 601  // 775 - 174 = 601
      }
    ])
    .webp()
    .toBuffer();
  fs.writeFileSync(path.join(aboutDir, 'djangoduzybalon.webp'), cleanDjangoSketch);

  // Django Painted (colored) - 784x1360
  // Create clean green painted balloon at 784x1360 (matching pink balloon geometry aspect ratio!)
  const pinkBaseShiftedToGreen = await sharp(pinkBalloonBackup)
    .modulate({ hue: 100, saturation: 1.2 })
    .toBuffer();

  const cleanPinkPatchForDjango = await sharp(pinkBalloonBackup)
    .extract({ left: 270, top: 100, width: 244, height: 160 })
    .resize(580, 560, { fit: 'fill' })
    .modulate({ hue: 100, saturation: 1.2 })
    .composite([{ input: createRectBoxFeatheredMask(580, 560, 15), blend: 'dest-in' }])
    .png()
    .toBuffer();

  // Logo dimensions: resize to width=420, height=260.
  const djangoLogoPaintedImg = await sharp(djangoLogoColored).resize(420, 260).png().toBuffer();
  const cleanDjangoPainted = await sharp(pinkBaseShiftedToGreen)
    .composite([
      {
        input: cleanPinkPatchForDjango,
        left: 102,
        top: 230
      },
      {
        input: djangoLogoPaintedImg,
        left: 182, // 392 - 210 = 182
        top: 395  // 525 - 130 = 395
      }
    ])
    .webp()
    .toBuffer();
  fs.writeFileSync(path.join(aboutDir, 'djangoduzybalon_painted.webp'), cleanDjangoPainted);

  // ----------------------------------------------------
  // PYTHON BALLOON (Pink)
  // ----------------------------------------------------
  console.log('Generating Python Balloon textures...');

  // Python Sketch (unpainted) - 1141x1964
  // Logo dimensions: 274x287 (0.95 aspect). Resize to width=400, height=420.
  const pythonLogoSketch = await sharp(pythonLogoBlack).resize(400, 420).png().toBuffer();
  const cleanPythonSketch = await sharp(threejsSketchBackup)
    .composite([
      {
        input: Buffer.from(`<svg width="1141" height="1964"><rect x="200" y="440" width="750" height="680" fill="white" /></svg>`),
        left: 0,
        top: 0
      },
      {
        input: pythonLogoSketch,
        left: 370, // 570 - 200 = 370
        top: 565  // 775 - 210 = 565
      }
    ])
    .webp()
    .toBuffer();
  fs.writeFileSync(path.join(aboutDir, 'pythonduzybalon.webp'), cleanPythonSketch);

  // Python Painted (colored) - 784x1360
  const pinkCleanPatch = await sharp(pinkBalloonBackup)
    .extract({ left: 270, top: 100, width: 244, height: 160 })
    .resize(580, 560, { fit: 'fill' })
    .toBuffer();

  const pinkPatch = await sharp(pinkCleanPatch)
    .composite([{ input: createRectBoxFeatheredMask(580, 560, 15), blend: 'dest-in' }])
    .png()
    .toBuffer();

  // Logo dimensions: resize to width=290, height=304.
  const pythonLogoPaintedImg = await sharp(pythonLogoColored).resize(290, 304).png().toBuffer();
  const cleanPythonPainted = await sharp(pinkBalloonBackup)
    .composite([
      {
        input: pinkPatch,
        left: 102,
        top: 230
      },
      {
        input: pythonLogoPaintedImg,
        left: 247, // 392 - 145 = 247
        top: 373  // 525 - 152 = 373
      }
    ])
    .webp()
    .toBuffer();
  fs.writeFileSync(path.join(aboutDir, 'pythonduzybalon_painted.webp'), cleanPythonPainted);

  console.log('Balloon logo textures generated successfully!');
}

main().catch(err => {
  console.error('Error generating balloon logo textures:', err);
});
