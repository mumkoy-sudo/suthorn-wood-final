const fs = require('fs');
const path = require('path');
const dir = __dirname;
let content = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');

// Replace the Hero Background with the new panoramic shot
content = content.replace(/background-image: url\('hero_truck\.jpg'\);/g, "background-image: url('hero_panoramic.jpg');");

fs.writeFileSync(path.join(dir, 'index.html'), content);
