const fs = require('fs');
const path = require('path');
const dir = __dirname;
let content = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');

// Replace the first gallery image background url
content = content.replace(/style="background-image: url\('\.\.\/hero\.jpg'\);"/, 'style="background-image: url(\'industrial_scale_ai.jpg\');"');
content = content.replace(/style="background-image: url\('hero\.jpg'\);"/, 'style="background-image: url(\'industrial_scale_ai.jpg\');"');

fs.writeFileSync(path.join(dir, 'index.html'), content);
console.log("Updated Gallery 1 (Industrial Scale) image.");
