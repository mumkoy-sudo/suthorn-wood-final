const fs = require('fs');
const path = require('path');
const dir = __dirname;
let content = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');

// Update background image for Hero Section covering 'bg_hero_new.jpg' or similar image in the style tag
content = content.replace(/background-image: url\('bg_hero_new\.jpg'\);/g, "background-image: url('new_bg_hero_thai.jpg');");

fs.writeFileSync(path.join(dir, 'index.html'), content);
console.log("Updated index background image");
