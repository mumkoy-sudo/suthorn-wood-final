const fs = require('fs');
const path = require('path');
const dir = __dirname;
const files = ['index.html', 'products.html', 'services.html', 'masterpiece.html', 'quote.html', 'quote_success.html'];

files.forEach(f => {
    let p = path.join(dir, f);
    if(fs.existsSync(p)) {
        let content = fs.readFileSync(p, 'utf8');

        // ปัญหา: 
        // 1. absolute top-[36px] ทำให้เมนูหลุดการเป็น sticky/fixed และเกิดช่องโหว่สีเทาหาก scroll หรือหน้าจอยาว
        // 2. การใช้ absolute ต้องดัน layout ลงไปเยอะมาก
        // แก้ไข: เปลี่ยน Navbar กลับมาเป็น sticky top-0 หรือ fixed top-0 w-full
        // และเอา absolute top-[36px] ออก

        // 1. Navbar style fix
        const oldNav = /<nav class="bg-paper-white shadow-\[0_4px_20px_-10px_rgba\(0,0,0,0\.15\)\] absolute top-\[36px\] w-full z-50 border-b-\[4px\] border-suthorn">/g;
        const newNav = '<nav class="bg-paper-white shadow-[0_4px_20px_-10px_rgba(0,0,0,0.15)] sticky top-0 w-full z-50 border-b-[4px] border-suthorn">';
        content = content.replace(oldNav, newNav);

        // 2. Adjust Top Bar so it scrolls away naturally, leaving just the sticky navbar
        content = content.replace(/<!-- Top Bar -->\s*<div class="bg-wood-dark/, '<!-- Top Bar -->\n    <div class="hidden md:flex bg-wood-dark'); // ซ่อน top bar ในมือถือไปเลย เพื่อลดความน่ารำคาญ

        // 3. Fix Margin Top / Padding Top on Hero/Content sections
        // เอา mt-[100px] mt-[160px] ออก เพราะ navbar ตอนนี้ใช้ sticky ไม่ใช่ absolute แล้ว มันจะกินพื้นที่ของมันเอง
        content = content.replace(/mt-\[100px\] md:mt-\[160px\]/g, ''); 
        content = content.replace(/mt-\[160px\]/g, '');
        
        // Remove massive padding tops that were added to dodge absolute nav
        content = content.replace(/pt-\[180px\] md:pt-\[200px\]/g, 'pt-16 md:pt-24');
        content = content.replace(/pt-\[140px\] md:pt-\[180px\]/g, 'pt-16 md:pt-24');

        fs.writeFileSync(p, content);
    }
});

console.log("Fixed Navigation Bar overlap and grey bar gap.");
