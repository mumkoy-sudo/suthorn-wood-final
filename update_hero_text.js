const fs = require('fs');
const path = require('path');
const dir = __dirname;
let content = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');

// Replace the old text under the hero headline
// Old text: โรงไม้สุธร ผนวกความคลาสสิกเข้ากับมาตรฐานวิศวกรรม บริการแปรรูปไม้ สั่งทำตามแบบ ตลอดจนการติดตั้งครบวงจร ด้วยประสบการณ์ที่ส่งต่อจากรุ่นสู่รุ่น
const oldPRegex = /<p class="mt-4 text-xl text-gray-200 font-light leading-relaxed">\s*โรงไม้สุธร ผนวกความคลาสสิกเข้ากับมาตรฐานวิศวกรรม บริการแปรรูปไม้ สั่งทำตามแบบ ตลอดจนการติดตั้งครบวงจร ด้วยประสบการณ์ที่ส่งต่อจากรุ่นสู่รุ่น\s*<\/p>/;

const newP = `<p class="mt-6 text-xl text-gray-200 font-light leading-relaxed space-y-2">
                    <span class="block text-white/90 font-medium">- อุตสาหกรรมงานไม้คุณภาพ และคลังไม้ซุงขนาดใหญ่พิเศษ</span>
                    <span class="block">- โรงไม้สุธร เรามีไม้สัก ไม้ตะเคียนทอง ไม้เนื้อแข็ง ไม้เต็ง ไม้ยาง ขนาดพิเศษให้เลือกมากมาย พร้อมบริการแปรรูปไม้ สั่งทำตามแบบด้วยช่างชำนาญการ</span>
                </p>`;

// Do the replacement
content = content.replace(oldPRegex, newP);

// Also we should check if we should keep "ความเชี่ยวชาญในทุกสัมผัสของงานไม้", the user said "เปลี่ยนข้อความเป็นตามนี้ค่ะ" referencing the text box. The box has the title "ความเชี่ยวชาญ...". We can keep the title and just replace the paragraph, which looks better.

fs.writeFileSync(path.join(dir, 'index.html'), content);
console.log("Updated hero paragraph text.");
