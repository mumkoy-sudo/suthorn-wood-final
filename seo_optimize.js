const fs = require('fs');
const path = require('path');
const dir = __dirname;
const files = ['index.html', 'products.html', 'services.html', 'masterpiece.html', 'quote.html'];

files.forEach(f => {
    let p = path.join(dir, f);
    if(fs.existsSync(p)) {
        let content = fs.readFileSync(p, 'utf8');

        // 1. Add Meta Description, Keywords, and Open Graph Tags inside <head>
        const metaTags = `
    <!-- SEO Optimization Meta Tags -->
    <meta name="description" content="โรงไม้สุธร (Suthorn Timber) ผู้จำหน่ายไม้แปรรูป ไม้โครงสร้าง ไม้แผ่นใหญ่ (Live-edge) และบริการรับสั่งทำชิ้นงานไม้คุณภาพระดับสากล ประสบการณ์กว่า 45 ปี จัดส่งทั่วประเทศ">
    <meta name="keywords" content="โรงเลื่อย, โรงไม้, ไม้แปรรูป, ไม้สัก, ไม้เนื้อแข็ง, ไม้แผ่นใหญ่, Live edge, งานไม้สั่งทำ, ต่อเรือ, พื้นไม้, ไม้ปูระเบียง, สมุทรปราการ">
    <meta name="author" content="Suthorn Timber Co., Ltd.">
    <!-- Open Graph for Social Media (Facebook, Line) -->
    <meta property="og:title" content="โรงไม้สุธร | สั่งทำไม้แปรรูปและงานไม้พรีเมียมครบวงจร">
    <meta property="og:description" content="ศูนย์รวมงานไม้อุตสาหกรรม บริการไม้แปรรูปโครงสร้างและงานตกแต่งภายในระดับไฮเอนด์ ด้วยเครื่องจักรมาตรฐานและประสบการณ์ฝีมือช่างกว่า 45 ปี">
    <meta property="og:image" content="https://suthorn.surge.sh/bg_hero_new.jpg">
    <meta property="og:url" content="https://suthorn.surge.sh/">
    <meta property="og:type" content="website">
    <!-- End SEO Meta -->
    <script src="https://cdn.tailwindcss.com">`;

        // Only inject if it doesn't already exist to avoid duplicates
        if(!content.includes('name="description"')){
            content = content.replace(/<script src="https:\/\/cdn\.tailwindcss\.com">/g, metaTags);
        }
        
        // 2. Update Image Alt attributes dynamically for better image search indexing
        content = content.replace(/alt="Live-edge slabs"/g, 'alt="ไม้แผ่นใหญ่ ไม้หน้าโต๊ะ Live-edge slabs โรงไม้สุธร"');
        content = content.replace(/alt="Structural Timber"/g, 'alt="ไม้แปรรูปโครงสร้าง เสาไม้ คานไม้ ทนทานพิเศษ"');
        content = content.replace(/alt="Architectural Paneling"/g, 'alt="ไม้หน้าเล็ก ไม้ระแนง สำหรับงานตกแต่งภายในและสถาปัตยกรรม"');

        fs.writeFileSync(p, content);
    }
});

console.log("SEO Meta Tags Configured.");
