const fs = require('fs');
const path = require('path');
const dir = __dirname;

['masterpiece.html', 'quote.html'].forEach(f => {
    const p = path.join(dir, f);
    if(fs.existsSync(p)) {
        let c = fs.readFileSync(p, 'utf8');
        c = c.replace('<div class="max-w-7xl mx-auto px-4 py-16">', '<div class="max-w-7xl mx-auto px-4 pt-[140px] md:pt-[180px] pb-16">');
        fs.writeFileSync(p, c);
    }
});

const sPath = path.join(dir, 'services.html');
if(fs.existsSync(sPath)) {
    let s = fs.readFileSync(sPath, 'utf8');
    s = s.replace('py-24 bg-[#1b4332]', 'pt-[140px] md:pt-[180px] pb-24 bg-[#1b4332]');
    fs.writeFileSync(sPath, s);
}

// products already has pt-48 (192px)
console.log("Overlap fixed.");
