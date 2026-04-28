const fs = require('fs');
const path = require('path');
const dir = __dirname;
let content = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');

// Replace the heavily dark gradients with a more subtle one that just protects the text at the bottom.
const oldDark1 = /bg-gradient-to-t from-black\/80 via-black\/20 to-transparent/g;
content = content.replace(oldDark1, "bg-gradient-to-t from-black/80 to-transparent opacity-70 group-hover:opacity-90 transition-opacity");

const oldDark2 = /bg-gradient-to-t from-black\/80/g;
if(content.includes('bg-gradient-to-t from-black/80 to-transparent"></div>')){
    // Just in case we didn't catch the previous match properly in other gallery items
    content = content.replace(/<div class="absolute inset-0 bg-gradient-to-t from-black\/80 to-transparent"><\/div>/g, '<div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70 group-hover:opacity-90 transition-opacity"></div>');
}

fs.writeFileSync(path.join(dir, 'index.html'), content);
console.log("Fixed dark overlay on mini gallery.");
