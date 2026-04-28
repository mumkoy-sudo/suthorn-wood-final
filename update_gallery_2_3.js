const fs = require('fs');
const path = require('path');
const dir = __dirname;
let content = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');

// Update gallery item 2 (Yacht -> Use image 39: a7f542e3-f164-445d-bba0-4f3380bfc07d.png which is already in use by default but let's ensure it fits flawlessly)
// It was currently set to the high-angle yacht deck. 
// Now let's change gallery item 3 (Custom Fabrication)
// From: f267985f-6a5e-45ce-96f3-8ac9f4afe0b2.jpg (truck bed)
// To: 13f72e23-f6c2-480a-9b5b-09ef3c41aff0.jpg (the epic classic wooden truck itself)
content = content.replace(/1776913000400_1---f267985f-6a5e-45ce-96f3-8ac9f4afe0b2\.jpg/g, '1776913001040_1---13f72e23-f6c2-480a-9b5b-09ef3c41aff0.jpg');

fs.writeFileSync(path.join(dir, 'index.html'), content);
console.log("Updated Gallery 3 (Custom) image to the epic truck.");
