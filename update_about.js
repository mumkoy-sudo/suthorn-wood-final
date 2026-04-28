const fs = require('fs');
const path = require('path');
const dir = __dirname;
let content = fs.readFileSync(path.join(dir, 'services.html'), 'utf8');

// Update image reference 1
content = content.replace(/'\/Users\/narongtechanirutsai\/\.openclaw\/media\/inbound\/file_287---e92e11a9-be0d-42f5-8913-2e07b5cb7659\.jpg'/g, '"/Users/narongtechanirutsai/.openclaw/media/inbound/file_287---627cf3aa-5010-448d-aead-db0b2a5ef258.jpg"');
content = content.replace(/"\/Users\/narongtechanirutsai\/\.openclaw\/media\/inbound\/file_287---e92e11a9-be0d-42f5-8913-2e07b5cb7659\.jpg"/g, '"/Users/narongtechanirutsai/.openclaw/media/inbound/file_287---627cf3aa-5010-448d-aead-db0b2a5ef258.jpg"');

fs.writeFileSync(path.join(dir, 'services.html'), content);
console.log("Updated about/services craftsman image.");
