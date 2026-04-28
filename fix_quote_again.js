const fs = require('fs');
const path = require('path');
const dir = __dirname;
let content = fs.readFileSync(path.join(dir, 'quote.html'), 'utf8');

// The issue might be the text in the success message itself is still saying "ระบบกำลังเปิดอีเมลของคุณ" which refers to the old mailto logic. Did the user get confused by the pop-up text, or did they literally not receive it?
// Formspree requires the owner of the email (suthorn.kd@gmail.com) to activate the form FIRST before anyone else can send to it.
// If it's literally not sending, we might want to just set it up as a pure form submit without AJAX to trigger the Formspree activation clearly, OR just fix the success message text.

content = content.replace(/<h3 class="text-3xl font-bold text-gray-900 nav-font mb-4">ระบบกำลังเปิดอีเมลของคุณ!<\/h3>/g, '<h3 class="text-3xl font-bold text-gray-900 nav-font mb-4">ส่งข้อมูลสำเร็จแล้ว!</h3>');
content = content.replace(/กรุณากดยืนยันการส่งอีเมลในโปรแกรม \(เช่น Gmail, Outlook\) ของคุณอีกครั้ง<br>ข้อมูลจะถูกส่งตรงไปที่ <strong>suthorn.kd@gmail.com<\/strong>/g, 'ทีมงานสุธรได้รับข้อมูลของคุณแล้ว<br>เราจะติดต่อกลับโดยเร็วที่สุดทางเบอร์โทรศัพท์หรือ Line ที่ให้ไว้');

// Let's remove the e.preventDefault() so it just does a standard browser POST to formspree, this guarantees it works without CORS issues if they are testing locally.
const oldScript = /document\.getElementById\('quote-form'\)\.addEventListener.*?\}\);/s;

const newScript = `// Removed custom JS override so the form sends native POST directly to Formspree server.`;

content = content.replace(oldScript, newScript);

fs.writeFileSync(path.join(dir, 'quote.html'), content);
console.log("Fixed Quote to just use standard Formspree POST.");
