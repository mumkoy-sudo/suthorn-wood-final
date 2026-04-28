const fs = require('fs');
const path = require('path');
const dir = __dirname;
let content = fs.readFileSync(path.join(dir, 'quote.html'), 'utf8');

// Replace the mock form block with a real Formspree form block
const oldFormBlock = /<div id="form-container">[\s\S]*?<\/script>/;

const newFormBlock = `<div id="form-container">
                <!-- FORM เชื่อมกับ Formspree.io แทนที่ 'YOUR_FORM_ID' ด้วย ID ของพี่ม่ำ -->
                <form id="quote-form" action="https://formspree.io/f/suthorn.kd@gmail.com" method="POST" class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">ชื่อ - นามสกุล / ชื่อบริษัท</label>
                            <input type="text" name="Name" id="cust-name" class="w-full border-gray-300 rounded-md shadow-sm border p-3 focus:ring-suthorn focus:border-suthorn" placeholder="ระบุชื่อหรือบริษัท" required>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">เบอร์โทรศัพท์ / Line ID</label>
                            <input type="text" name="Contact" id="cust-contact" class="w-full border-gray-300 rounded-md shadow-sm border p-3 focus:ring-suthorn focus:border-suthorn" placeholder="08X-XXX-XXXX" required>
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">ประเภทงานที่สนใจ</label>
                        <select name="Project Type" class="w-full border-gray-300 rounded-md shadow-sm border p-3 focus:ring-suthorn focus:border-suthorn bg-white">
                            <option value="Timber">ไม้แปรรูปโครงสร้าง / ไม้ท่อนใหญ่</option>
                            <option value="Live-edge">ไม้แผ่นใหญ่ลวดลายธรรมชาติ (Live-edge)</option>
                            <option value="Custom">งานสั่งทำพิเศษ (เฟอร์นิเจอร์ / บิลต์อิน)</option>
                            <option value="Marine">อุตสาหกรรมต่อเรือ / งานทางทะเล</option>
                            <option value="Other">อื่นๆ (โปรดระบุในรายละเอียด)</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">รายละเอียดโครงการ / สเปกไม้ที่ต้องการ</label>
                        <textarea name="Message" id="cust-detail" rows="4" class="w-full border-gray-300 rounded-md shadow-sm border p-3 focus:ring-suthorn focus:border-suthorn" placeholder="เช่น ต้องการไม้สำหรับทำพื้นระเบียงขนาด 50 ตารางเมตร..." required></textarea>
                    </div>
                    
                    <!-- เพื่อส่งลูกค้ากลับไปที่เว็บเดิมหลังจากส่งเมลเสร็จ -->
                    <input type="hidden" name="_next" value="quote_success.html">
                    <input type="hidden" name="_subject" value="การขอใบเสนอราคาใหม่จากเว็บไซต์โรงไม้สุธร">

                    <button type="submit" id="submit-btn" class="w-full bg-suthorn hover:bg-suthorn-dark text-white font-bold py-4 rounded-md transition-colors shadow-md text-lg nav-font flex justify-center items-center">
                        ส่งข้อมูลขอใบเสนอราคา
                    </button>
                </form>
            </div>
            
            <script>
                document.getElementById('quote-form').addEventListener('submit', function() {
                    const btn = document.getElementById('submit-btn');
                    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin mr-3"></i> กำลังส่งข้อมูล...';
                    btn.style.pointerEvents = 'none';
                    btn.classList.add('opacity-75');
                });
            </script>`;

content = content.replace(oldFormBlock, newFormBlock);
fs.writeFileSync(path.join(dir, 'quote.html'), content);
console.log("Updated quote.html with real email form stringing.");
