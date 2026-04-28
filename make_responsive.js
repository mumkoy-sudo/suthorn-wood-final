const fs = require('fs');
const path = require('path');
const dir = __dirname;
const files = ['index.html', 'products.html', 'services.html', 'masterpiece.html', 'quote.html'];

files.forEach(f => {
    let content = fs.readFileSync(path.join(dir, f), 'utf8');

    // 1. Fix the top navbar to include a hamburger menu
    // We need to replace the static navbar with a responsive one.
    const navRegex = /<nav class="bg-paper-white[^>]*>[\s\S]*?<\/nav>/;
    
    const newNav = `<nav class="bg-paper-white shadow-[0_4px_20px_-10px_rgba(0,0,0,0.15)] absolute top-[36px] w-full z-50 border-b-[4px] border-suthorn">
        <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center py-4 lg:py-0 lg:h-[120px]">
                <a href="index.html" class="flex items-center space-x-4 group cursor-pointer block">
                    <img src="brand_logo.jpg" alt="โรงไม้สุธร Logo" class="h-[50px] lg:h-[75px] w-auto object-contain rounded shadow-sm">
                    <div class="border-l-[4px] border-solid border-suthorn pl-3 lg:pl-4 py-1">
                        <h1 class="text-[1.8rem] lg:text-[2.5rem] font-bold text-suthorn tracking-tight nav-font leading-none drop-shadow-sm">โรงไม้สุธร</h1>
                        <span class="block text-[0.7rem] lg:text-[0.9rem] text-wood tracking-[0.15em] uppercase mt-1 font-bold">Suthorn Timber</span>
                    </div>
                </a>
                
                <!-- Desktop Menu -->
                <div class="hidden lg:flex sm:items-center space-x-8 nav-font text-[1rem]">
                    <a href="index.html" class="nav-link text-gray-600 hover:text-wood border-b-[3px] border-transparent hover:border-wood px-1 py-2 font-medium transition-all duration-300">หน้าแรก</a>
                    <a href="products.html" class="nav-link text-gray-600 hover:text-wood border-b-[3px] border-transparent hover:border-wood px-1 py-2 font-medium transition-all duration-300">พรีเมียมผลิตภัณฑ์</a>
                    <a href="services.html" class="nav-link text-gray-600 hover:text-wood border-b-[3px] border-transparent hover:border-wood px-1 py-2 font-medium transition-all duration-300">บริการของเรา</a>
                    <a href="masterpiece.html" class="nav-link text-gray-600 hover:text-wood border-b-[3px] border-transparent hover:border-wood px-1 py-2 font-medium transition-all duration-300">ผลงานมาสเตอร์พีซ</a>
                    <a href="quote.html" class="bg-suthorn hover:bg-wood hover:text-white text-white px-6 py-2.5 rounded-none font-medium transition-all duration-500 shadow-md ml-4 border border-suthorn-dark flex items-center group">
                        ขอใบเสนอราคา <i class="fa-solid fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                    </a>
                </div>

                <!-- Mobile Menu Button -->
                <div class="lg:hidden flex items-center">
                    <button id="mobile-menu-btn" class="text-suthorn focus:outline-none">
                        <i class="fa-solid fa-bars text-3xl"></i>
                    </button>
                </div>
            </div>
        </div>

        <!-- Mobile Menu Panel -->
        <div id="mobile-menu" class="hidden lg:hidden bg-white border-t border-gray-200 shadow-lg absolute w-full left-0 top-full">
            <div class="px-4 pt-2 pb-6 space-y-2 nav-font">
                <a href="index.html" class="block px-3 py-3 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50 border-b border-gray-100">หน้าแรก</a>
                <a href="products.html" class="block px-3 py-3 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50 border-b border-gray-100">พรีเมียมผลิตภัณฑ์</a>
                <a href="services.html" class="block px-3 py-3 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50 border-b border-gray-100">บริการของเรา</a>
                <a href="masterpiece.html" class="block px-3 py-3 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50 border-b border-gray-100">ผลงานมาสเตอร์พีซ</a>
                <a href="quote.html" class="block mt-4 px-3 py-3 rounded-md text-base font-bold text-white bg-suthorn text-center shadow-md">ขอใบเสนอราคา</a>
            </div>
        </div>
    </nav>`;
    
    content = content.replace(navRegex, newNav);

    // 2. Add Mobile Menu Toggle Script before </body>
    if (!content.includes('mobile-menu-btn')) {
        // Just in case it didn't get added
    }
    const mobileScript = `
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const btn = document.getElementById('mobile-menu-btn');
            const menu = document.getElementById('mobile-menu');
            if(btn && menu) {
                btn.addEventListener('click', () => {
                    menu.classList.toggle('hidden');
                    const icon = btn.querySelector('i');
                    if(menu.classList.contains('hidden')){
                        icon.classList.remove('fa-xmark');
                        icon.classList.add('fa-bars');
                    } else {
                        icon.classList.remove('fa-bars');
                        icon.classList.add('fa-xmark');
                    }
                });
            }
            
            // Active link logic
            const title = document.title;
            const links = document.querySelectorAll('.nav-link');
            links.forEach(l => {
                const text = l.textContent.trim();
                if (title.includes(text) || (text === 'หน้าแรก' && title.includes('Classic'))) {
                    l.classList.add('text-suthorn', 'border-suthorn', 'font-bold');
                    l.classList.remove('text-gray-600', 'border-transparent');
                }
            });
        });
    </script>
</body>`;
    content = content.replace(/<script>\s*document\.addEventListener\('DOMContentLoaded'[\s\S]*?<\/body>/, mobileScript);

    // 3. Fix Hero Section Height for Mobile
    content = content.replace(/h-\[700px\]/g, 'h-[500px] md:h-[700px]');
    content = content.replace(/h-\[650px\]/g, 'h-[500px] md:h-[650px]');
    content = content.replace(/mt-\[160px\]/g, 'mt-[100px] md:mt-[160px]');
    content = content.replace(/text-5xl sm:text-6xl lg:text-7xl/g, 'text-4xl sm:text-5xl lg:text-6xl');
    content = content.replace(/text-4xl md:text-5xl font-bold/g, 'text-3xl md:text-5xl font-bold');

    // 4. Fix Padded Sections for better mobile experience
    content = content.replace(/p-16 md:p-24/g, 'p-8 md:p-16 lg:p-24');
    content = content.replace(/p-10 border/g, 'p-6 md:p-10 border');

    fs.writeFileSync(path.join(dir, f), content);
});

console.log("Responsive fixes applied to all files.");
