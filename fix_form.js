const fs = require('fs');
const path = require('path');
const dir = __dirname;
let content = fs.readFileSync(path.join(dir, 'quote.html'), 'utf8');

// Replace mailto approach with Formspree
content = content.replace(/<form id="quote-form" class="space-y-6">/, '<form id="quote-form" action="https://formspree.io/f/mqkrbgqw" method="POST" class="space-y-6">');

// Add name attributes to inputs (required for Formspree)
content = content.replace(/id="cust-name" class="w-full/, 'id="cust-name" name="name" class="w-full');
content = content.replace(/id="cust-contact" class="w-full/, 'id="cust-contact" name="contact" class="w-full');
content = content.replace(/id="type-select" class="w-full/, 'id="type-select" name="interest_type" class="w-full');
content = content.replace(/id="cust-detail" rows="4" class="w-full/, 'id="cust-detail" name="details" rows="4" class="w-full');

// Completely rewrite the javascript handler
const oldScriptPattern = /document\.getElementById\('quote-form'\)\.addEventListener\('submit', function\(e\) \{[\s\S]*?\}\);/g;
const newScript = `document.getElementById('quote-form').addEventListener('submit', async function(e) {
                    e.preventDefault(); 
                    
                    const btn = document.getElementById('submit-btn');
                    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin mr-3"></i> กำลังส่งข้อมูล...';
                    btn.disabled = true;
                    btn.classList.add('opacity-75');

                    const form = e.target;
                    const data = new FormData(form);

                    try {
                        const response = await fetch(form.action, {
                            method: form.method,
                            body: data,
                            headers: {
                                'Accept': 'application/json'
                            }
                        });

                        if (response.ok) {
                            form.style.display = 'none';
                            const successMsg = document.getElementById('success-message');
                            successMsg.classList.remove('hidden');
                            document.querySelector('#success-message h3').innerText = 'ส่งข้อมูลสำเร็จแล้ว!';
                            document.querySelector('#success-message p').innerHTML = 'ทีมงานสุธรได้รับข้อมูลของคุณแล้ว<br>เราจะติดต่อกลับโดยเร็วที่สุดทางเบอร์โทรศัพท์หรือ Line ที่ให้ไว้';
                        } else {
                            btn.innerHTML = 'ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่';
                            btn.disabled = false;
                            btn.classList.remove('opacity-75');
                            alert('เกิดข้อผิดพลาดในการส่งข้อมูล');
                        }
                    } catch (error) {
                        btn.innerHTML = 'ส่งข้อมูลขอใบเสนอราคา';
                        btn.disabled = false;
                        alert('เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์');
                    }
                });`;

content = content.replace(oldScriptPattern, newScript);

fs.writeFileSync(path.join(dir, 'quote.html'), content);
console.log("Fixed quote form with Formspree");
