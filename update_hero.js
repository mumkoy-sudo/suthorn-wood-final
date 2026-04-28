const fs = require('fs');
const path = require('path');
const dir = __dirname;
let content = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');

// Replace the background image URL in the Hero section
content = content.replace(/url\(['"]?(bg_hero_new\.jpg|hero\.jpg)['"]?\)/g, "url('hero_truck.jpg')");

fs.writeFileSync(path.join(dir, 'index.html'), content);
console.log("Updated Hero Background Image.");
