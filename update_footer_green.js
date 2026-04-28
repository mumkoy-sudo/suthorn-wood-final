const fs = require('fs');
const path = require('path');
const dir = __dirname;
const files = ['index.html', 'products.html', 'services.html', 'masterpiece.html', 'quote.html'];

files.forEach(f => {
    let p = path.join(dir, f);
    if(fs.existsSync(p)) {
        let fContent = fs.readFileSync(p, 'utf8');

        // 1. Footer background shape (Dark Green instead of Espresso Brown)
        // #123524 or #0A2612 is a nice, wealthy dark forest green
        fContent = fContent.replace(/<footer class="bg-\[\#2C1E16\]/g, '<footer class="bg-[#0A2612]');

        // 2. Change text that needs to pop against dark green
        // Yellow-Gold (#FCD34D or #EAB308) looks exceptionally premium against forest green
        fContent = fContent.replace(/text-\[\#Fdf5e6\]/g, 'text-[#FCD34D]');
        fContent = fContent.replace(/border-\[\#4A3728\]/g, 'border-[#FCD34D]/30');
        
        // Also headers in footer 
        fContent = fContent.replace(/<h4 class="text-white text-xl/g, '<h4 class="text-[#FCD34D] text-xl');

        // 3. For the bottom One-Stop section, user asked if there is a picture. 
        // We previously put hero_truck there. We can replace it with the new picture sent (file_299... wood working tools / large timber setup) 
        // Or if they just wanted to check if there is an image. The user asked "รูปไม้ล่างสุดมีรูปอยู่ไหม๊"
        
        fs.writeFileSync(p, fContent);
    }
});

console.log("Updated footer to Dark Green and Gold/Yellow text.");
