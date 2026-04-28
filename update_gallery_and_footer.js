const fs = require('fs');
const path = require('path');
const dir = __dirname;
let content = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');

// 1. Update first image and text
content = content.replace(/industrial_scale_ai\.jpg/g, "warehouse_inside.jpg");
content = content.replace(/>โรงเลื่อยแปรรูปคลังสีขนาดใหญ่<\/h3>/g, ">โรงไม้แปรรูปขนาดใหญ่</h3>");
content = content.replace(/>Industrial Scale<\/span>/g, ">Lumber Yard</span>");

// 2. Update second image text to "พื้นไม้ดาดฟ้าเรือยอร์ช"
content = content.replace(/>พื้นระเบียงไม้ดาดฟ้าเรือยอชต์<\/h3>/g, ">พื้นไม้ดาดฟ้าเรือยอร์ช</h3>");

// 3. Update third image text to "มีไม้พร้อมสำหรับงานทุกประเภท"
content = content.replace(/>งานประกอบชิ้นส่วนทนทานพิเศษ<\/h3>/g, ">มีไม้พร้อมสำหรับงานทุกประเภท</h3>");

// 4. Remove the chair/toolkit image section at the bottom
// Let's locate the "One-Stop Wood Service Section" right side background image and remove/replace the background image div or change it to something else, or drop that entire block.
// The code shows:
// <div class="md:w-1/2 min-h-[400px] md:min-h-[500px] bg-cover bg-center">
const oneStopImgRegex = /<div class="md:w-1\/2 min-h-\[400px\] md:min-h-\[500px\] bg-cover bg-center" style="background-image: url\('1776913076839_1---c4a9dc3b-63a5-48ff-98eb-62d2be8d167f\.jpg'\);"><\/div>/;

if (content.match(oneStopImgRegex)) {
    // If found, let's just make it a clean solid color or remove it. We'll just remove the div completely and let the text block take full width, or replace it with a clean wood texture pattern.
    // Let's replace it with a clean wood texture.
    content = content.replace(oneStopImgRegex, '<div class="hidden md:block md:w-1/2 min-h-[400px] md:min-h-[500px] bg-cover bg-center" style="background-image: url(\'hero_truck.jpg\'); background-position: right;"></div>');
} else {
    // Fallback if regex fails - try a broader match
    content = content.replace(/<div class="md:w-1\/2 min-h-\[400px\] md:min-h-\[500px\].*?><\/div>/, '<div class="hidden md:block md:w-1/2 min-h-[400px] md:min-h-[500px] bg-cover bg-center" style="background-image: url(\'hero_truck.jpg\'); background-position: right;"></div>');
}

fs.writeFileSync(path.join(dir, 'index.html'), content);
console.log("Updated Gallery texts, image 1, and removed messy toolkit image.");
