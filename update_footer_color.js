const fs = require('fs');
const path = require('path');
const dir = __dirname;
let content = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');

// Replace Footer dark background with Suthorn's primary green (#1b4332 or similar deep rich green)
// Instead of bg-[#111111] (almost black), change to bg-suthorn-dark (which is defined in tailwind config as #1b4332 or #123524)
// The existing tailwind config usually has bg-suthorn and bg-suthorn-dark. Let's use a very dark, elegant green or warm wood brown.
// Let's use a deep rich wood brown to avoid the "mourning/black and white" feeling.
content = content.replace(/<footer class="bg-\[\#111111\]/g, '<footer class="bg-[#2C1E16]'); 
// #2C1E16 is a very dark, elegant espresso brown.

// Also make sure the logo text isn't stark white on black, maybe a warm off-white/gold.
content = content.replace(/<span class="text-3xl font-medium text-white/g, '<span class="text-3xl font-medium text-[#Fdf5e6]');

// Change border-gray-800 to a softer brown border
content = content.replace(/border-gray-800/g, 'border-[#4A3728]');

fs.writeFileSync(path.join(dir, 'index.html'), content);

// Also need to update the dynamic injected footer in all other HTML files (products, services, masterpiece, quote)
const files = ['products.html', 'services.html', 'masterpiece.html', 'quote.html', 'quote_success.html'];
files.forEach(f => {
    let p = path.join(dir, f);
    if(fs.existsSync(p)) {
        let fContent = fs.readFileSync(p, 'utf8');
        fContent = fContent.replace(/<footer class="bg-\[\#111111\]/g, '<footer class="bg-[#2C1E16]');
        fContent = fContent.replace(/<span class="text-3xl font-medium text-white/g, '<span class="text-3xl font-medium text-[#Fdf5e6]');
        fContent = fContent.replace(/border-gray-800/g, 'border-[#4A3728]');
        fs.writeFileSync(p, fContent);
    }
});

console.log("Updated footer color to warm espresso brown.");
