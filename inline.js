const headerCode = `<!-- Header Template Fragment -->
    <!-- Top Bar -->
    <div class="hidden md:flex bg-[#5c2e0e] text-paper text-sm py-2 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div class="flex space-x-6 font-light">
            <span class="flex items-center"><i class="fa-solid fa-phone mr-2 text-wood-light"></i> 02-707-3428-9 , 061-072-1828</span>
            <span class="hidden sm:flex items-center"><i class="fa-solid fa-envelope mr-2 text-wood-light"></i> suthorn.kd@gmail.com</span>
        </div>
        <div class="flex space-x-4">
            <a href="https://www.facebook.com/p/%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%84%E0%B8%A1%E0%B9%89%E0%B8%AA%E0%B8%B8%E0%B8%98%E0%B8%A3-61552097488156/" target="_blank" class="hover:text-wood-light transition"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="https://line.me/ti/p/~suthorn.kd" target="_blank" class="hover:text-wood-light transition"><i class="fa-brands fa-line"></i></a>
        </div>
    </div>
    <!-- Navbar -->
    <nav class="bg-white shadow-[0_4px_20px_-10px_rgba(0,0,0,0.15)] sticky top-0 w-full z-50 border-b-[1px] border-gray-100">
        <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center py-4 lg:py-0 lg:h-[110px]">
                <a href="index.html" class="flex items-center space-x-4 group cursor-pointer block">
                    <img src="brand_logo.jpg" alt="โรงไม้สุธร Logo" class="h-[60px] lg:h-[85px] w-auto object-contain">
                    <div class="border-l-[2px] border-solid border-gray-300 pl-4 py-1">
                        <h1 class="text-[1.8rem] lg:text-[2.2rem] font-bold text-gray-800 tracking-tight nav-font leading-none">โรงไม้สุธร</h1>
                        <span class="block text-[0.7rem] lg:text-[0.85rem] text-[#5c2e0e] tracking-[0.1em] uppercase mt-1 font-bold">SUTHORN TIMBER</span>
                    </div>
                </a>
                
                <!-- Desktop Menu -->
                <div class="hidden lg:flex sm:items-center space-x-8 nav-font text-[1rem]">
                    <a href="index.html" class="nav-link text-gray-600 hover:text-wood font-medium transition-all duration-300">หน้าแรก</a>
                    <a href="products.html" class="nav-link text-gray-600 hover:text-wood font-medium transition-all duration-300">ผลิตภัณฑ์ของเรา</a>
                    <a href="services.html" class="nav-link text-gray-600 hover:text-wood font-medium transition-all duration-300">บริการของเรา</a>
                    <a href="masterpiece.html" class="nav-link text-gray-600 hover:text-wood font-medium transition-all duration-300">ผลงานของเรา</a>
                    <a href="quote.html" class="bg-[#1b4332] hover:bg-wood hover:text-white text-white px-6 py-3 rounded-md font-medium transition-all duration-500 shadow-md ml-4 flex items-center group">
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
                <a href="products.html" class="block px-3 py-3 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50 border-b border-gray-100">ผลิตภัณฑ์ของเรา</a>
                <a href="services.html" class="block px-3 py-3 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50 border-b border-gray-100">บริการของเรา</a>
                <a href="masterpiece.html" class="block px-3 py-3 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50 border-b border-gray-100">ผลงานของเรา</a>
                <a href="quote.html" class="block mt-4 px-3 py-3 rounded-md text-base font-bold text-white bg-suthorn text-center shadow-md">ขอใบเสนอราคา</a>
            </div>
        </div>
    </nav>`;

const footerCode = `<!-- Footer (Refined Version from P'Mum) -->
    <footer class="bg-[#061D0E] pt-16 pb-8 border-t-[5px] border-[#B5651D]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12 border-b border-white/5 pb-12">
                <!-- Branding -->
                <div class="md:col-span-5">
                    <div class="border-l-4 border-[#FFD700] pl-4 py-1 mb-8 flex items-center gap-4">
                        <img src="brand_logo.jpg" class="h-14 w-auto rounded bg-white p-1">
                        <span class="text-3xl font-bold text-[#FFD700] tracking-tight nav-font">บริษัท สุธร จำกัด</span>
                    </div>
                    <p class="text-white font-light leading-relaxed pr-8 text-lg">
                        โรงไม้สุธร ผู้ผลิตและจัดจำหน่ายไม้แปรรูปและงานไม้สั่งทำ สเกล อุตสาหกรรมและงานฝีมือคุณภาพสูง ด้วยประสบการณ์กว่า 45 ปี และเครื่องจักรที่ได้มาตรฐานระดับสากล
                    </p>
                </div>
                
                <!-- ลิงก์ลัด -->
                <div class="md:col-span-3">
                    <h4 class="text-[#FFD700] text-xl font-bold mb-8 nav-font">ลิงก์ลัด</h4>
                    <ul class="space-y-4 font-light text-white text-lg">
                        <li><a href="index.html" class="hover:text-[#FFD700] transition">หน้าแรก</a></li>
                        <li><a href="products.html" class="hover:text-[#FFD700] transition">ผลิตภัณฑ์ของเรา</a></li>
                        <li><a href="services.html" class="hover:text-[#FFD700] transition">บริการของเรา</a></li>
                        <li><a href="masterpiece.html" class="hover:text-[#FFD700] transition">ผลงานของเรา</a></li>
                    </ul>
                </div>
                
                <!-- รายละเอียดติดต่อ -->
                <div class="md:col-span-4">
                    <h4 class="text-[#FFD700] text-xl font-bold mb-8 nav-font">รายละเอียดติดต่อ</h4>
                    <ul class="space-y-5 font-light text-white text-lg">
                        <li class="flex items-start">
                            <i class="fa-solid fa-location-dot text-[#FFD700] mt-1.5 mr-4 w-5"></i>
                            <a href="https://maps.app.goo.gl/5KYCf8wpFWaHubAf8?g_st=il" target="_blank" class="hover:text-[#FFD700] transition leading-snug">
                                <span>388 หมู่ที่ 11 ตำบลคลองด่าน<br>อำเภอบางบ่อ จ.สมุทรปราการ 10550</span>
                                <span class="block text-[#4ade80] font-medium mt-2 text-sm"><i class="fa-solid fa-map-location-dot"></i> ดูบนแผนที่ Google Maps</span>
                            </a>
                        </li>
                        <li class="flex items-center">
                            <i class="fa-solid fa-phone text-[#FFD700] mr-4 w-5"></i>
                            <span>02-707-3428-9 , 061-072-1828</span>
                        </li>
                        <li class="flex items-center">
                            <i class="fa-brands fa-line text-[#FFD700] mr-4 w-5 text-xl"></i>
                            <a href="https://line.me/ti/p/~suthorn.kd" target="_blank" class="hover:text-white transition">ID: suthorn.kd</a>
                        <li class="flex items-center">
                            <i class="fa-brands fa-facebook text-[#FFD700] mr-4 w-5 text-xl"></i>
                            <a href="https://www.facebook.com/p/%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%84%E0%B8%A1%E0%B9%89%E0%B8%AA%E0%B8%B8%E0%B8%98%E0%B8%A3-61552097488156/" target="_blank" class="hover:text-white transition">โรงไม้สุธร</a>
                        </li>
                        </li>
                        <li class="flex items-center">
                            <i class="fa-brands fa-facebook text-[#FFD700] mr-4 w-5 text-xl"></i>
                            <a href="https://www.facebook.com/p/%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%84%E0%B8%A1%E0%B9%89%E0%B8%AA%E0%B8%B8%E0%B8%98%E0%B8%A3-61552097488156/" target="_blank" class="hover:text-white transition">โรงไม้สุธร</a>
                        </li>
                        <li class="flex items-center">
                            <i class="fa-brands fa-facebook text-[#FFD700] mr-4 w-5 text-xl"></i>
                            <a href="https://www.facebook.com/p/%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%84%E0%B8%A1%E0%B9%89%E0%B8%AA%E0%B8%B8%E0%B8%98%E0%B8%A3-61552097488156/" target="_blank" class="hover:text-white transition">โรงไม้สุธร</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="text-center text-gray-500 text-sm font-light">
                &copy; 2026 บริษัท สุธร จำกัด. All rights reserved.
            </div>
        </div>
    </footer>`;

    document.getElementById('header-container').innerHTML = headerCode;
    document.getElementById('footer-container').innerHTML = footerCode;

    // Mobile Menu Script Logic
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if(btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }

    // Active link logic
    const title = document.title;
    const links = document.querySelectorAll('.nav-link');
    links.forEach(l => {
        const text = l.textContent.trim();
        if (title.includes(text) || (text === 'หน้าแรก' && title.includes('SU-THORN'))) {
            l.classList.add('text-wood', 'font-bold');
            l.classList.remove('text-gray-600');
        }
    });