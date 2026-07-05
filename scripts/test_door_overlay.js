import sharp from 'sharp';

async function testDoor() {
  const file = 'public/textures/corridor/doors/drzwisocial.webp';
  
  // Instagram: left=200, top=160, width=400, height=400
  const igOverlay = await sharp({
    create: {
      width: 400,
      height: 400,
      channels: 4,
      background: { r: 255, g: 0, b: 0, alpha: 128 } // Semi-transparent red
    }
  }).png().toBuffer();

  // YouTube: left=200, top=1300, width=624, height=450
  const ytOverlay = await sharp({
    create: {
      width: 624,
      height: 450,
      channels: 4,
      background: { r: 0, g: 0, b: 255, alpha: 128 } // Semi-transparent blue
    }
  }).png().toBuffer();

  await sharp(file)
    .composite([
      { input: igOverlay, left: 200, top: 160 },
      { input: ytOverlay, left: 200, top: 1300 }
    ])
    .webp()
    .toFile('public/textures/corridor/doors/test_door_boxes.webp');

  console.log('Saved test_door_boxes.webp!');
}

testDoor();
