import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Paths
const fontPath = 'public/fonts/CabinSketch-Bold.ttf';
const aboutDir = 'public/textures/about';
const backupDir = 'public/textures/about/backups';

// Load and base64-encode the CabinSketch-Bold font for SVG embedding
const fontData = fs.readFileSync(fontPath);
const base64Font = fontData.toString('base64');

// Helper to generate SVG text buffer with embedded font
function createTextSvg(text, width, height, options = {}) {
  const fontSize = options.fontSize || 120;
  const fill = options.fill || 'black';
  const stroke = options.stroke || 'none';
  const strokeWidth = options.strokeWidth || 0;
  const dy = options.dy || '60%'; // vertical centering adjustment

  return Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <style>
        @font-face {
          font-family: 'Cabin Sketch';
          src: url('data:font/ttf;base64,${base64Font}') format('truetype');
        }
        .text {
          font-family: 'Cabin Sketch', sans-serif;
          font-size: ${fontSize}px;
          font-weight: bold;
          fill: ${fill};
          stroke: ${stroke};
          stroke-width: ${strokeWidth}px;
        }
      </style>
      <text x="50%" y="${dy}" class="text" text-anchor="middle" dominant-baseline="middle">${text}</text>
    </svg>
  `);
}

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

async function main() {
  console.log('Starting balloon texture generation...');

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
      console.log(`Creating backup: ${destPath}`);
      fs.copyFileSync(path.join(aboutDir, backup.src), destPath);
    }
  }

  const pinkBalloonBackup = path.join(backupDir, 'threejsduzybalon_painted.webp');
  const gsapPaintedBackup = path.join(backupDir, 'GSAPduzybalon_painted.webp');
  const gsapSketchBackup = path.join(backupDir, 'GSAPduzybalon.webp');
  const threejsSketchBackup = path.join(backupDir, 'threejsduzybalon.webp');

  // ----------------------------------------------------
  // AWS BALLOON (Orange/Yellow)
  // ----------------------------------------------------
  console.log('Generating AWS Balloons...');
  
  // AWS Sketch (unpainted) - 1392x1392
  const cleanAwsSketch = await sharp(gsapSketchBackup)
    .composite([
      {
        input: Buffer.from(`<svg width="1392" height="1392"><circle cx="696" cy="620" r="320" fill="white" /></svg>`),
        left: 0,
        top: 0
      },
      {
        input: createTextSvg('AWS', 700, 300, { fontSize: 160, fill: 'black' }),
        left: 346,
        top: 470
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

  const cleanAwsPainted = await sharp(awsBaseShifted)
    .composite([
      {
        input: yellowPatch,
        left: 282,
        top: 250
      },
      {
        input: createTextSvg('AWS', 600, 250, {
          fontSize: 130,
          fill: '#fb923c', // Yellow/orange fill
          stroke: '#7c2d12', // Dark orange/brown border
          strokeWidth: 6,
          dy: '62%'
        }),
        left: 212,
        top: 280
      }
    ])
    .webp()
    .toBuffer();
  fs.writeFileSync(path.join(aboutDir, 'awsduzybalon_painted.webp'), cleanAwsPainted);

  // ----------------------------------------------------
  // DJANGO BALLOON (Green)
  // ----------------------------------------------------
  console.log('Generating Django Balloons...');

  // Django Sketch (unpainted) - 1141x1964
  const cleanDjangoSketch = await sharp(threejsSketchBackup)
    .composite([
      {
        input: Buffer.from(`<svg width="1141" height="1964"><rect x="200" y="440" width="750" height="680" fill="white" /></svg>`),
        left: 0,
        top: 0
      },
      {
        input: createTextSvg('DJANGO', 700, 250, { fontSize: 110, fill: 'black', dy: '62%' }),
        left: 220,
        top: 650
      }
    ])
    .webp()
    .toBuffer();
  fs.writeFileSync(path.join(aboutDir, 'djangoduzybalon.webp'), cleanDjangoSketch);

  // Django Painted (colored) - 1024x1024 (We resize it to 784x1360 to match ThreeJS balloon aspect ratio perfectly!)
  const greenPatch = await sharp(greenCleanPatch)
    .composite([{ input: createRectBoxFeatheredMask(460, 260, 15), blend: 'dest-in' }])
    .png()
    .toBuffer();

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

  const cleanDjangoPainted = await sharp(pinkBaseShiftedToGreen)
    .composite([
      {
        input: cleanPinkPatchForDjango,
        left: 102,
        top: 230
      },
      {
        input: createTextSvg('DJANGO', 600, 250, {
          fontSize: 90,
          fill: '#a3e635', // Light green fill
          stroke: '#1e3a1e', // Dark green border
          strokeWidth: 6,
          dy: '62%'
        }),
        left: 92,
        top: 400
      }
    ])
    .webp()
    .toBuffer();
  fs.writeFileSync(path.join(aboutDir, 'djangoduzybalon_painted.webp'), cleanDjangoPainted);

  // ----------------------------------------------------
  // PYTHON BALLOON (Pink)
  // ----------------------------------------------------
  console.log('Generating Python Balloons...');

  // Python Sketch (unpainted) - 1141x1964
  const cleanPythonSketch = await sharp(threejsSketchBackup)
    .composite([
      {
        input: Buffer.from(`<svg width="1141" height="1964"><rect x="200" y="440" width="750" height="680" fill="white" /></svg>`),
        left: 0,
        top: 0
      },
      {
        input: createTextSvg('PYTHON', 700, 250, { fontSize: 110, fill: 'black', dy: '62%' }),
        left: 220,
        top: 650
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

  const cleanPythonPainted = await sharp(pinkBalloonBackup)
    .composite([
      {
        input: pinkPatch,
        left: 102,
        top: 230
      },
      {
        input: createTextSvg('PYTHON', 600, 250, {
          fontSize: 90,
          fill: '#f472b6', // Light pink fill
          stroke: '#701a75', // Dark purple border
          strokeWidth: 5,
          dy: '62%'
        }),
        left: 92,
        top: 400
      }
    ])
    .webp()
    .toBuffer();
  fs.writeFileSync(path.join(aboutDir, 'pythonduzybalon_painted.webp'), cleanPythonPainted);

  console.log('Balloon textures generated successfully!');
}

main().catch(err => {
  console.error('Error generating balloon textures:', err);
});
