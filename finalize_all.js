const fs = require('fs');
const path = require('path');
const dir = __dirname;
// We've already verified the index looks correct from previous scripts, but let's double check if there's any stray <
const content = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');

if (content.includes("ช่างชำนาญการ<")) {
    const fixedContent = content.replace(/ช่างชำนาญการ</g, "ช่างชำนาญการ</p>");
    fs.writeFileSync(path.join(dir, 'index.html'), fixedContent);
    console.log("Fixed stray <");
} else {
    console.log("No stray < found. All set!");
}
