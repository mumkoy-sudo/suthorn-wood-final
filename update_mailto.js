const fs = require('fs');
const path = require('path');
const dir = __dirname;
let content = fs.readFileSync(path.join(dir, 'quote.html'), 'utf8');

const oldFormBlock = /<div id="form-container">[\s\S]*?<\/script>/;

const newFormBlock = `<div id="form-container">
                <!-- เปลี่ยนเป็นระบบ Mailto: เปิดโปรแกรมส่งอีเมลยิงตรงเข้า suthorn.kd@gmail.com -->
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
                        <select id="type-select" class="w-full border-gray-300 rounded-md shadow-sm border p-3 focus:ring-suthorn focus:border-suthorn bg-white">
                            <option value="ไม้แปรรูปโครงสร้าง / ไม้ท่อนใหญ่">ไม้แปรรูปโครงสร้าง / ไม้ท่อนใหญ่</option>
                            <option value="ไม้แผ่นใหญ่ลวดลายธรรมชาติ (Live-edge)">ไม้แผ่นใหญ่ลวดลายธรรมชาติ (Live-edge)</option>
                            <option value="งานสั่งทำพิเศษ (เฟอร์นิเจอร์ / บิลต์อิน)">งานสั่งทำพิเศษ (เฟอร์นิเจอร์ / บิลต์อิน)</option>
                            <option value="อุตสาหกรรมต่อเรือ / งานทางทะเล">อุตสาหกรรมต่อเรือ / งานทางทะเล</option>
                            <option value="อื่นๆ">อื่นๆ (โปรดระบุในรายละเอียด)</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">รายละเอียดโครงการ / สเปกไม้ที่ต้องการ</label>
                        <textarea id="cust-detail" rows="4" class="w-full border-gray-300 rounded-md shadow-sm border p-3 focus:ring-suthorn focus:border-suthorn" placeholder="เช่น ต้องการไม้สำหรับทำพื้นระเบียงขนาด 50 ตารางเมตร..." required></textarea>
                    </div>

                    <button type="submit" id="submit-btn" class="w-full bg-suthorn hover:bg-suthorn-dark text-white font-bold py-4 rounded-md transition-colors shadow-md text-lg nav-font flex justify-center items-center">
                        ส่งข้อมูลขอใบเสนอราคา
                    </button>
                </form>
            </div>
            
            <!-- Success Message -->
            <div id="success-message" class="hidden text-center py-12 px-6">
                <div class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 mb-6">
                    <i class="fa-solid fa-check text-5xl text-green-600"></i>
                </div>
                <h3 class="text-3xl font-bold text-gray-900 nav-font mb-4">ระบบกำลังเปิดอีเมลของคุณ!</h3>
                <p class="text-lg text-gray-600 mb-8">
                    กรุณากดยืนยันการส่งอีเมลในโปรแกรม (เช่น Gmail, Outlook) ของคุณอีกครั้ง<br>ข้อมูลจะถูกส่งตรงไปที่ <strong>suthorn.kd@gmail.com</strong>
                </p>
                <button type="button" onclick="location.reload()" class="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-8 rounded-md transition-colors border border-gray-300">
                    กลับไปกรอกใหม่
                </button>
            </div>

            <script>
                document.getElementById('quote-form').addEventListener('submit', function(e) {
                    e.preventDefault(); // หยุดการโหลดหน้าใหม่
                    
                    const btn = document.getElementById('submit-btn');
                    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin mr-3"></i> กำลังเตรียมอีเมล...';
                    btn.disabled = true;
                    btn.classList.add('opacity-75');

                    // ดึงค่ามาจัดเรียง
                    const name = document.getElementById('cust-name').value;
                    const contact = document.getElementById('cust-contact').value;
                    const type = document.getElementById('type-select').value;
                    const detail = document.getElementById('cust-detail').value;

                    // สร้างเนื้อหาอีเมล (แปลงเป็น URL Format)
                    const subject = encodeURIComponent('ขอใบเสนอราคาจากเว็บไซต์โรงไม้สุธร - ' + name);
                    const body = encodeURIComponent(
                        'ข้อมูลการขอใบเสนอราคา (Suthorn Wood Mill)\n\n' +
                        'ชื่อ-นามสกุล / บริษัท: ' + name + '\n' +
                        'เบอร์ติดต่อ / Line ID: ' + contact + '\n' +
                        'ประเภทงานที่สนใจ: ' + type + '\n\n' +
                        'รายละเอียดโครงการ:\n' + detail + '\n\n' +
                        '------------------------------\n' +
                        'ส่งจากแบบฟอร์มเว็บไซต์'
                    );

                    // ใช้ Mailto link เพื่อส่งเข้า suthorn.kd@gmail.com ตรงๆ
                    window.location.href = 'mailto:suthorn.kd@gmail.com?subject=' + subject + '&body=' + body;

                    // แสดงหน้าต่างสำเร็จ
                    setTimeout(() => {
                        document.getElementById('form-container').classList.add('hidden');
                        document.getElementById('success-message').classList.remove('hidden');
                    }, 1000);
                });
            </script>`;

content = content.replace(oldFormBlock, newFormBlock);
fs.writeFileSync(path.join(dir, 'quote.html'), content);
console.log("Updated quote.html with direct mailto script.");
