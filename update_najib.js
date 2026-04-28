const fs = require('fs');
const path = require('path');
const dir = __dirname;
let content = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');

// Replace the image in the 45th anniversary section specifically
content = content.replace(/<img src="big_wood_pieces\.jpg" class="relative z-10 rounded-xl shadow-2xl/g, '<img src="about_craftsman.jpg" class="relative z-10 rounded-xl shadow-2xl');

fs.writeFileSync(path.join(dir, 'index.html'), content);
