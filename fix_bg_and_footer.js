const fs = require('fs');
const path = require('path');
const dir = __dirname;
let content = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');

// 1. The Hero background image was previously set to 'new_bg_hero_thai.jpg'. Let's change it to 'hero_truck.jpg'
content = content.replace(/background-image: url\('new_bg_hero_thai\.jpg'\);/g, "background-image: url('hero_truck.jpg');");

// 2. Look for that bottom right section image again.
content = content.replace(/<div class="hidden md:block md:w-1\/2 min-h-\[400px\] md:min-h-\[500px\] bg-cover bg-center"" style="background-image: url\('hero_truck\.jpg'\); background-position: right;"><\/div>/g, '<div class="hidden md:block md:w-1/2 min-h-[400px] md:min-h-[500px] bg-[#123524] bg-cover bg-center" style="background-image: url(\'hero_truck.jpg\'); background-position: right;"></div>');

// Let's just make it look for any trace of the old tool image style
content = content.replace(/<div class="md:w-1\/2 min-h-\[400px\] md:min-h-\[500px\] md:hidden bg-cover bg-center".*?>/g, '');

fs.writeFileSync(path.join(dir, 'index.html'), content);
console.log("Fixed main background image and bottom image.");
