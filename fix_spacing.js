const fs = require('fs');
const path = require('path');
const dir = __dirname;
const files = ['masterpiece.html', 'quote.html', 'products.html', 'services.html'];

files.forEach(f => {
    const p = path.join(dir, f);
    if(fs.existsSync(p)) {
        let content = fs.readFileSync(p, 'utf8');
        
        // Increase top padding significantly across all content pages
        content = content.replace(/pt-\[140px\] md:pt-\[180px\]/g, 'pt-[180px] md:pt-[200px]');
        content = content.replace(/pt-48/g, 'pt-[180px] md:pt-[200px]'); // equivalent to 192px/more
        content = content.replace(/h-\[120px\]/g, 'h-[100px] lg:h-[120px]'); // shrink navbar slightly on mobile
        
        fs.writeFileSync(p, content);
    }
});

console.log("Increased top padding to prevent navbar overlap.");
