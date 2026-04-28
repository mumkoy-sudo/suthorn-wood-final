const fs = require('fs');
const path = require('path');
const dir = __dirname;
let content = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');

// The hero bg accidentally got changed to big_wood_pieces.jpg in a previous script due to a bad regex/replace. Let's fix the Hero to hero_panoramic.jpg
content = content.replace(/background-image: url\('big_wood_pieces\.jpg'\);/g, "background-image: url('hero_panoramic.jpg');");

// The bottom section (One-Stop Wood Service) with class md:w-1/2 should have big_wood_pieces.jpg
// We'll replace the image in the footer half
content = content.replace(/<div class="hidden md:block md:w-1\/2 min-h-\[400px\] md:min-h-\[500px\].*?>/g, '<div class="hidden md:block md:w-1/2 min-h-[400px] md:min-h-[500px] bg-[#123524] bg-cover bg-center" style="background-image: url(\'big_wood_pieces.jpg\'); background-position: right;"></div>');

// The 45th Anniversary should be about_craftsman.jpg (which we set before, but I'll make sure it's there instead of big_wood_pieces)
// Ensure product history is about_craftsman.jpg
if(content.includes('big_wood_pieces.jpg" class="relative z-10 rounded-xl shadow-2xl')) {
    content = content.replace(/big_wood_pieces\.jpg/g, "about_craftsman.jpg"); // Note this only matches if it's there
}

fs.writeFileSync(path.join(dir, 'index.html'), content);
