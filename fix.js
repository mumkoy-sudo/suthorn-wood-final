const fs = require('fs');
const path = require('path');
const dir = __dirname;
const files = ['index.html', 'products.html', 'services.html', 'masterpiece.html', 'quote.html'];

files.forEach(f => {
    let content = fs.readFileSync(path.join(dir, f), 'utf8');

    // Fix phone number in top bar
    content = content.replace(/061-072-1828,\s*02-707-3428/g, '02-707-3428-9 , 061-072-1828');

    // Fix logo and brand name in navbar
    const oldLogoBlockRegex = /<a href="index\.html" class="flex items-center space-x-6 py-2 group cursor-pointer block">[\s\S]*?<\/a>/;
    const newLogoBlock = `<a href="index.html" class="flex items-center space-x-6 py-2 group cursor-pointer block">
                    <img src="brand_logo.jpg" alt="โรงไม้สุธร Logo" class="h-20 w-auto object-contain rounded-md shadow-sm">
                    <div class="border-l-[6px] border-solid border-suthorn pl-5 py-1">
                        <h1 class="text-[3rem] font-bold text-suthorn tracking-tight nav-font leading-none drop-shadow-sm">โรงไม้สุธร</h1>
                        <span class="block text-[1.1rem] text-wood tracking-[0.15em] uppercase mt-2 font-medium">Suthorn Timber</span>
                    </div>
                </a>`;
    if (content.match(oldLogoBlockRegex)) {
        content = content.replace(oldLogoBlockRegex, newLogoBlock);
    }

    if (f === 'index.html') {
        const oldHeroRegex = /<!-- Hero Section -->[\s\S]*?<!-- Highlight Projects \(Mini Gallery\) -->/;
        const newHero = `<!-- Hero Section -->
    <section class="relative h-[700px] flex items-center bg-[#111] overflow-hidden mt-[160px]">
        <!-- รูปพื้นหลังเต็มสเกล ไม่ดรอป Opacity เพื่อให้รูปเด่นและชัดที่สุด -->
        <div class="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat" style="background-image: url('bg_hero_new.jpg');"></div>
        
        <!-- เงาดำบางๆ ไล่จากซ้ายมาขวา เพื่อให้ตัวหนังสือยังพออ่านได้ แต่ไม่กวนภาพพื้นหลัง -->
        <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
            <div class="max-w-2xl bg-black/40 backdrop-blur-md p-10 rounded-2xl border border-white/10 shadow-2xl">
                <div class="inline-block bg-wood text-white text-sm font-medium px-5 py-2 mb-6 tracking-wider uppercase shadow-md rounded-md">
                    อุตสาหกรรมชิ้นไม้คุณภาพ
                </div>
                <h1 class="text-5xl sm:text-6xl font-bold leading-tight mb-6 text-white nav-font text-shadow-lg">
                    ความเชี่ยวชาญ<br>
                    <span class="text-wood-light font-medium italic">ในทุกสัมผัสของงานไม้</span>
                </h1>
                <p class="mt-4 text-xl text-gray-200 font-light leading-relaxed">
                    โรงไม้สุธร ผนวกความคลาสสิกเข้ากับมาตรฐานวิศวกรรม บริการแปรรูปไม้ สั่งทำตามแบบ ตลอดจนการติดตั้งครบวงจร ด้วยประสบการณ์ที่ส่งต่อจากรุ่นสู่รุ่น
                </p>
                <div class="mt-10 flex gap-4">
                    <a href="services.html" class="bg-wood hover:bg-wood-dark text-white px-8 py-4 text-lg font-medium transition duration-300 shadow-xl flex items-center nav-font rounded-md">
                        บริการของเรา <i class="fa-solid fa-arrow-right ml-3"></i>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Highlight Projects (Mini Gallery) -->`;
        content = content.replace(oldHeroRegex, newHero);
    }
    
    fs.writeFileSync(path.join(dir, f), content);
});
console.log("Fixes applied.");
