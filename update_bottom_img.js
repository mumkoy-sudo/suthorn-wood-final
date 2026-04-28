const fs = require('fs');
const path = require('path');
const dir = __dirname;
let content = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');

// The bottom right image is currently using `1776913002464_1---3ee9be6f-711d-4399-b60b-321344e8074f.jpg`.
// I will replace it with `big_wood_pieces.jpg` which is the image the user just uploaded (file_299---8185c8aa-a1ba-4c45-a6e3-993ed34b0345.jpg)
content = content.replace(/1776913002464_1---3ee9be6f-711d-4399-b60b-321344e8074f\.jpg/g, "big_wood_pieces.jpg");

fs.writeFileSync(path.join(dir, 'index.html'), content);
