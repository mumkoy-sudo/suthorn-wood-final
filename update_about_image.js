const fs = require('fs');
const path = require('path');
const dir = __dirname;
let content = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');

// The original image for the About section is 'file_287---627cf3aa-5010-448d-aead-db0b2a5ef258.jpg'
// we will replace it with 'big_wood_pieces.jpg' as well, since the user said "และรูปตรง 45ปี เปลี่ยนเป็นรูปนี้ด้วย" and we just saved it and still have it in our mind.
content = content.replace(/file_287---627cf3aa-5010-448d-aead-db0b2a5ef258\.jpg/g, "big_wood_pieces.jpg");

fs.writeFileSync(path.join(dir, 'index.html'), content);
