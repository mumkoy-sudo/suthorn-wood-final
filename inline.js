const fs = require('fs');
const path = require('path');
const dir = __dirname;

const header = fs.readFileSync(path.join(dir, 'header.html'), 'utf8');
const footer = fs.readFileSync(path.join(dir, 'footer.html'), 'utf8');

const files = ['index.html', 'products.html', 'services.html', 'masterpiece.html', 'quote.html'];

files.forEach(f => {
    let content = fs.readFileSync(path.join(dir, f), 'utf8');
    
    // Replace header fetch
    if (content.includes('fetch(\'header.html\')')) {
        content = content.replace(/<script>\s*fetch\('header\.html'\)[\s\S]*?<\/script>/, header);
    }
    
    // Replace footer fetch
    if (content.includes('fetch(\'footer.html\')')) {
        content = content.replace(/<div id="footer-container"><\/div>\s*<script>fetch\('footer\.html'\)[\s\S]*?<\/script>/, footer);
    }
    
    // Add active state script
    const activeScript = `
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const title = document.title;
            const links = document.querySelectorAll('.nav-link');
            links.forEach(l => {
                const text = l.textContent.trim();
                if (title.includes(text) || (text === 'หน้าแรก' && title.includes('Classic'))) {
                    l.classList.add('text-suthorn', 'border-suthorn', 'font-bold');
                    l.classList.remove('text-gray-600', 'border-transparent');
                }
            });
        });
    </script>
</body>`;
    
    content = content.replace('</body>', activeScript);
    fs.writeFileSync(path.join(dir, f), content);
});
console.log("Inlined successfully.");
