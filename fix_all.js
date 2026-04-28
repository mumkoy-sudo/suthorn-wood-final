const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const dir = __dirname;
const files = ['index.html', 'products.html', 'services.html', 'masterpiece.html', 'quote.html'];

// 1. Gather all local paths, copy them, and replace them in the HTML
files.forEach(f => {
    let content = fs.readFileSync(path.join(dir, f), 'utf8');
    
    const localPathRegex = /\/Users\/narongtechanirutsai\/\.openclaw\/media\/(inbound|tool-image-generation)\/[a-zA-Z0-9_\-\.]+\.(jpg|png|jpeg)/g;
    let match;
    while ((match = localPathRegex.exec(content)) !== null) {
        const fullPath = match[0];
        const filename = path.basename(fullPath);
        
        // Ensure file is copied
        const dest = path.join(dir, filename);
        if (!fs.existsSync(dest)) {
            try { fs.copyFileSync(fullPath, dest); } catch(e) {}
        }
        
        // Replace in content
        content = content.replace(new RegExp(fullPath, 'g'), filename);
    }
    
    // Also replace any '../' image paths
    content = content.replace(/\.\.\//g, '');

    // Add mobile menu script proper placement and ensure no duplicates
    const scriptStart = '<!-- MOBILE MENU SCRIPT -->';
    if (!content.includes(scriptStart)) {
        const script = `
${scriptStart}
<script>
    document.addEventListener('DOMContentLoaded', () => {
        const btn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');
        if(btn && menu) {
            btn.addEventListener('click', () => {
                menu.classList.toggle('hidden');
            });
        }
    });
</script>
</body>`;
        content = content.replace(/<\/body>/, script);
    }
    
    fs.writeFileSync(path.join(dir, f), content);
});

console.log("Images copied, paths updated to relative, and mobile menu script injected.");
