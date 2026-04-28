const fs = require('fs');
const path = require('path');
const dir = __dirname;
let content = fs.readFileSync(path.join(dir, 'quote.html'), 'utf8');

// For quote.html, the structure relies on top padding
content = content.replace(/<div class="max-w-7xl mx-auto px-4 py-16">/g, '<div class="max-w-7xl mx-auto px-4 pt-[180px] md:pt-[200px] pb-16">');

fs.writeFileSync(path.join(dir, 'quote.html'), content);
console.log("Fixed quote page overlap issue.");
