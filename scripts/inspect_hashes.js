import fs from 'fs';
import crypto from 'crypto';

function hashFile(p) {
  if (!fs.existsSync(p)) return 'NOT FOUND';
  const data = fs.readFileSync(p);
  return crypto.createHash('md5').update(data).digest('hex');
}

console.log('drzwisocial.webp MD5:', hashFile('public/textures/corridor/doors/drzwisocial.webp'));
console.log('drzwisocial_backup.webp MD5:', hashFile('public/textures/corridor/doors/drzwisocial_backup.webp'));
console.log('drzwisocial_painted.webp MD5:', hashFile('public/textures/corridor/doors/drzwisocial_painted.webp'));
console.log('drzwisocial_painted_backup.webp MD5:', hashFile('public/textures/corridor/doors/drzwisocial_painted_backup.webp'));
