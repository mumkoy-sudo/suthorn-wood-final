const fs = require('fs');
const path = require('path');
const dir = __dirname;
let content = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');

// Replace the old text below "กว่า 45 ปีแห่งตำนานการรังสรรค์งานไม้"
const oldTextRegex = /ภาพสะท้อนของ "ความเก๋าเกม" ไม่ได้มาจากเครื่องจักรที่ทันสมัยเพียงอย่างเดียว แต่อยู่ที่สองมือและสายตาของช่างผู้ชำนาญการ ที่คลุกคลีกับกลิ่นเยื่อไม้มาตลอด 45 ปี[\s\S]*?<p class="text-gray-600 text-lg leading-relaxed mb-10">/m;

const newText = `- อุตสาหกรรมงานไม้คุณภาพ และคลังไม้ซุงขนาดใหญ่พิเศษ</p>
                <p class="text-gray-600 text-lg leading-relaxed mb-10">
                    - โรงไม้สุธร เรามีไม้สัก ไม้ตะเคียนทอง ไม้เนื้อแข็ง ไม้เต็ง ไม้ยาง ขนาดพิเศษให้เลือกมากมาย พร้อมบริการแปรรูปไม้ สั่งทำตามแบบด้วยช่างชำนาญการ
                </p>`;

// We will just replace it cleanly
content = content.replace(/<p class="text-gray-600 text-lg leading-relaxed mb-6">[\s\S]*?ภาพสะท้อนของ "ความเก๋าเกม"[\s\S]*?<\/p>\s*<p class="text-gray-600 text-lg leading-relaxed mb-10">/, `<p class="text-gray-600 text-[20px] font-medium leading-relaxed mb-4 text-[#4a3728] pl-4 border-l-[3px] border-wood">- อุตสาหกรรมงานไม้คุณภาพ และคลังไม้ซุงขนาดใหญ่พิเศษ</p>\n                <p class="text-gray-600 text-[20px] font-medium leading-relaxed mb-10 text-[#4a3728] pl-4 border-l-[3px] border-wood">- โรงไม้สุธร เรามีไม้สัก ไม้ตะเคียนทอง ไม้เนื้อแข็ง ไม้เต็ง ไม้ยาง ขนาดพิเศษให้เลือกมากมาย พร้อมบริการแปรรูปไม้ สั่งทำตามแบบด้วยช่างชำนาญการ<`); // left angle bracket at the end is matched because we replaced the tag start

// Let's refine the placement. The HTML structure around it:
// <h2 class="text-4xl font-bold text-suthorn nav-font mb-6 leading-tight">กว่า 45 ปีแห่งตำนาน<br>การรังสรรค์งานไม้</h2>
// <div class="w-16 h-1.5 bg-wood mb-8 rounded-full"></div>
// <p class="text-gray-600 text-lg leading-relaxed mb-6">
// ภาพสะท้อนของ "ความเก๋าเกม"...
// </p>
// <p class="text-gray-600 text-lg leading-relaxed mb-10">
// ความทุ่มเทเหล่านั้นทำให้โรงเลื่อยสุธร...
// </p>

fs.writeFileSync(path.join(dir, 'index.html'), content);
console.log("Replaced storytelling text with bullet points.");
