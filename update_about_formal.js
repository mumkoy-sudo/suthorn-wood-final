const fs = require('fs');
const path = require('path');
const dir = __dirname;
let content = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');

// Replace the bullet points with a formal, professional paragraph
const currentTextRegex = /<p class="text-gray-600 text-\[20px\] font-medium leading-relaxed mb-4 text-\[\#4a3728\] pl-4 border-l-\[3px\] border-wood">- อุตสาหกรรมงานไม้คุณภาพ และคลังไม้ซุงขนาดใหญ่พิเศษ<\/p>\n\s*<p class="text-gray-600 text-\[20px\] font-medium leading-relaxed mb-10 text-\[\#4a3728\] pl-4 border-l-\[3px\] border-wood">- โรงไม้สุธร เรามีไม้สัก ไม้ตะเคียนทอง ไม้เนื้อแข็ง ไม้เต็ง ไม้ยาง ขนาดพิเศษให้เลือกมากมาย พร้อมบริการแปรรูปไม้ สั่งทำตามแบบด้วยช่างชำนาญการ<\/p>/;

const formalText = `<p class="text-gray-700 text-lg leading-relaxed mb-6">
                    บริษัท สุธร จำกัด เป็นศูนย์กลางอุตสาหกรรมงานไม้คุณภาพและคลังไม้ซุงขนาดใหญ่พิเศษ ที่ดำเนินธุรกิจเคียงคู่สังคมไทยมามากกว่า 4ทศวรรษ เรามีความมุ่งมั่นในการส่งมอบผลิตภัณฑ์ไม้ที่มีมาตรฐานสูงสุดให้แก่ลูกค้า
                </p>
                <p class="text-gray-700 text-lg leading-relaxed mb-10">
                    เรามีคลังสินค้าที่พรั่งพร้อมด้วยไม้สัก ไม้ตะเคียนทอง ไม้เนื้อแข็ง ไม้เต็ง และไม้ยางขนาดพิเศษหลากหลายมิติ พร้อมบริการแปรรูปและสั่งทำตามแบบ (Made to Order) โดยทีมช่างผู้ชำนาญการ เพื่อตอบสนองความต้องการของงานสถาปัตยกรรมอุตสาหกรรมและงานตกแต่งภายในระดับพรีเมียม
                </p>`;

content = content.replace(currentTextRegex, formalText);

fs.writeFileSync(path.join(dir, 'index.html'), content);
console.log("Replaced bullets with formal text.");
