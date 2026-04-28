const fs = require('fs');
const path = require('path');
const dir = __dirname;
let content = fs.readFileSync(path.join(dir, 'quote.html'), 'utf8');

// The formspree ID `mqkrbgqw` is invalid/dead (Not Found). Since we can't easily create a real backend API key right now without the user doing it, the most bulletproof way to "send an email" from a static HTML site without a backend is to revert back to a clean `mailto:` link, or ask the user to provide a working Formspree hook.
// Let's revert back to the `mailto:` method but make it clear and robust, since we know it actually works to pop open their mail client.

const oldFormStart = /<form id="quote-form".*?>/;
content = content.replace(oldFormStart, '<form id="quote-form" class="space-y-6">');

const oldScript = /\/\/ Removed custom JS override so the form sends native POST directly to Formspree server\./;

const newScript = `document.getElementById('quote-form').addEventListener('submit', function(e) {
                    e.preventDefault(); 
                    
                    const name = document.getElementById('cust-name').value;
                    const contact = document.getElementById('cust-contact').value;
                    const type = document.getElementById('type-select').value;
                    const detail = document.getElementById('cust-detail').value;

                    const subject = encodeURIComponent('ขอใบเสนอราคา (จากเว็บโรงไม้สุธร) - ' + name);
                    const body = encodeURIComponent(
                        'ข้อมูลการขอใบเสนอราคา\\n\\n' +
                        'ชื่อ-นามสกุล / บริษัท: ' + name + '\\n' +
                        'เบอร์ติดต่อ / Line ID: ' + contact + '\\n' +
                        'ประเภทงานที่สนใจ: ' + type + '\\n\\n' +
                        'รายละเอียดโครงการ:\\n' + detail
                    );

                    // Open the user's email client directly
                    window.location.href = 'mailto:suthorn.kd@gmail.com?subject=' + subject + '&body=' + body;
                    
                    // Show success/instruction message
                    document.getElementById('quote-form').style.display = 'none';
                    document.getElementById('success-message').classList.remove('hidden');
                    document.querySelector('#success-message h3').innerText = 'ระบบกำลังสร้างอีเมลอัตโนมัติ';
                    document.querySelector('#success-message p').innerHTML = 'โปรดตรวจสอบแอปพลิเคชันอีเมล (เช่น Mail, Gmail) บนเครื่องของคุณ<br>และ <strong>"กดปุ่มส่ง (Send)"</strong> เพื่อส่งข้อมูลถึงโรงไม้สุธร (suthorn.kd@gmail.com)';
                });`;

content = content.replace(oldScript, newScript);

fs.writeFileSync(path.join(dir, 'quote.html'), content);
console.log("Reverted to mailto fallback due to dead formspree.");
