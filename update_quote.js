const fs = require('fs');
const path = require('path');
const dir = __dirname;
let content = fs.readFileSync(path.join(dir, 'quote.html'), 'utf8');

const oldForm = /(<form class="space-y-6">)[\s\S]*?(<\/form>)/;

const newForm = `<div id="form-container">
                <form id="quote-form" class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">ชื่อ - นามสกุล / ชื่อบริษัท</label>
                            <input type="text" id="cust-name" class="w-full border-gray-300 rounded-md shadow-sm border p-3 focus:ring-suthorn focus:border-suthorn" placeholder="ระบุชื่อหรือบริษัท" required>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">เบอร์โทรศัพท์ / Line ID</label>
                            <input type="text" id="cust-contact" class="w-full border-gray-300 rounded-md shadow-sm border p-3 focus:ring-suthorn focus:border-suthorn" placeholder="08X-XXX-XXXX" required>
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">ประเภทงานที่สนใจ</label>
                        <select class="w-full border-gray-300 rounded-md shadow-sm border p-3 focus:ring-suthorn focus:border-suthorn bg-white">
                            <option>ไม้แปรรูปโครงสร้าง / ไม้ท่อนใหญ่</option>
                            <option>ไม้แผ่นใหญ่ลวดลายธรรมชาติ (Live-edge)</option>
                            <option>งานสั่งทำพิเศษ (เฟอร์นิเจอร์ / บิลต์อิน)</option>
                            <option>อุตสาหกรรมต่อเรือ / งานทางทะเล</option>
                            <option>อื่นๆ (โปรดระบุในรายละเอียด)</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">รายละเอียดโครงการ / สเปกไม้ที่ต้องการ</label>
                        <textarea id="cust-detail" rows="4" class="w-full border-gray-300 rounded-md shadow-sm border p-3 focus:ring-suthorn focus:border-suthorn" placeholder="เช่น ต้องการไม้สำหรับทำพื้นระเบียงขนาด 50 ตารางเมตร..."></textarea>
                    </div>
                    <button type="button" id="submit-btn" class="w-full bg-suthorn hover:bg-suthorn-dark text-white font-bold py-4 rounded-md transition-colors shadow-md text-lg nav-font flex justify-center items-center">
                        ส่งข้อมูลขอใบเสนอราคา
                    </button>
                </form>
            </div>
            
            <!-- Success Message (Hidden by default) -->
            <div id="success-message" class="hidden text-center py-12 px-6">
                <div class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 mb-6">
                    <i class="fa-solid fa-check text-5xl text-green-600"></i>
                </div>
                <h3 class="text-3xl font-bold text-gray-900 nav-font mb-4">ส่งข้อมูลเรียบร้อยแล้ว!</h3>
                <p class="text-lg text-gray-600 mb-8">
                    ได้รับข้อมูลคำขอใบเสนอราคาของคุณแล้ว<br>ทีมงานโรงไม้สุธรจะทำการประเมินราคาและรีบติดต่อกลับโดยเร็วที่สุดครับ/ค่ะ
                </p>
                <button type="button" onclick="location.reload()" class="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-8 rounded-md transition-colors border border-gray-300">
                    ส่งข้อมูลใหม่อีกครั้ง
                </button>
            </div>

            <script>
                document.getElementById('submit-btn').addEventListener('click', function() {
                    const btn = this;
                    // ตรวจสอบว่ากรอกข้อมูลครบไหม (จำลองการตรวจสอบเบื้องต้น)
                    const name = document.getElementById('cust-name').value;
                    const contact = document.getElementById('cust-contact').value;
                    
                    if(!name || !contact) {
                        alert('กรุณากรอก ชื่อ/บริษัท และ เบอร์ติดต่อ ให้ครบถ้วนค่ะ');
                        return;
                    }

                    // จำลองสถานะกำลังส่งข้อมูล (Loading)
                    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin mr-3"></i> กำลังส่งข้อมูล...';
                    btn.disabled = true;
                    btn.classList.add('opacity-75', 'cursor-not-allowed');
                    
                    // หน่วงเวลา 1.5 วินาที เพื่อให้เหมือนส่งเข้า Server จริงๆ
                    setTimeout(() => {
                        document.getElementById('form-container').classList.add('hidden');
                        document.getElementById('success-message').classList.remove('hidden');
                    }, 1500);
                });
            </script>`;

content = content.replace(oldForm, newForm);
fs.writeFileSync(path.join(dir, 'quote.html'), content);
console.log("Updated quote.html with working interaction");
