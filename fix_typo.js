const fs = require('fs');
const path = require('path');
const dir = __dirname;
let content = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');

// The user circled the typo "<" at the end of "ช่างชำนาญการ<"
content = content.replace(/ช่างชำนาญการ</g, "ช่างชำนาญการ</p>");

// We also need to remove the extra lingering text that got cut off badly before
content = content.replace(/เราพิถีพิถันทุกรายละเอียด ตั้งแต่การคัดสรรท่อนซุง การอบตาก ไปจนถึงการลงน้ำยาเคลือบผิวบนหน้าท็อปไม้แผ่นใหญ่ เพื่อดึงเอา "แก่นแท้แห่งความงาม" ของไม้ออกมาให้สมบูรณ์แบบที่สุด/g, '');

fs.writeFileSync(path.join(dir, 'index.html'), content);
