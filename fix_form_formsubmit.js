const fs = require('fs');
const path = require('path');
const dir = __dirname;
let content = fs.readFileSync(path.join(dir, 'quote.html'), 'utf8');

// The exact string to replace is the old mailto form tag
const oldFormStart = /<form id="quote-form".*?>/s;
const newFormStart = `<form id="quote-form" action="https://formsubmit.co/suthorn.kd@gmail.com" method="POST" class="space-y-6">
                    <!-- Config for formsubmit.co -->
                    <input type="hidden" name="_subject" value="🔔 ลูกค้าส่งคำขอใบเสนอราคาใหม่ จากเว็บไซต์โรงไม้สุธร">
                    <input type="hidden" name="_next" value="http://suthorn.surge.sh/quote_success.html">
                    <input type="hidden" name="_captcha" value="false">
                    <input type="hidden" name="_template" value="box">
`;

content = content.replace(oldFormStart, newFormStart);

// Remove the mailto JS script entirely so native form submission works
const oldScript = /<script>\s*document\.getElementById\('quote-form'\)[\s\S]*?<\/script>/;
content = content.replace(oldScript, "");

// Make sure inputs have name attributes
if(!content.includes('name="name"')) content = content.replace(/id="cust-name"/, 'id="cust-name" name="name"');
if(!content.includes('name="contact"')) content = content.replace(/id="cust-contact"/, 'id="cust-contact" name="contact"');
if(!content.includes('name="interest_type"')) content = content.replace(/id="type-select"/, 'id="type-select" name="interest_type"');
if(!content.includes('name="details"')) content = content.replace(/id="cust-detail"/, 'id="cust-detail" name="details"');

// Fix success message container to be hidden permanently on this page since we redirect to quote_success.html
const successMsg = /<div id="success-message"[\s\S]*?<\/div>/;
content = content.replace(successMsg, "");

fs.writeFileSync(path.join(dir, 'quote.html'), content);

// Now let's create a beautiful quote_success.html
const successHTML = `<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ส่งข้อมูลสำเร็จ | SUTHORN TIMBER</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="style.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@300;400;500;600&family=Bai+Jamjuree:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="tailwind.config.js"></script>
</head>
<body class="bg-paper flex flex-col min-h-screen">
    <div id="header-container"></div>

    <div class="flex-grow flex items-center justify-center py-20 px-4 mt-24">
        <div class="max-w-lg w-full bg-white rounded-xl shadow-2xl p-10 text-center border-t-4 border-suthorn">
            <div class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 mb-6">
                <i class="fa-solid fa-check text-5xl text-green-600"></i>
            </div>
            <h2 class="text-3xl font-bold text-gray-900 nav-font mb-4">ส่งข้อมูลสำเร็จ!</h2>
            <p class="text-gray-600 text-lg mb-8 leading-relaxed">
                ระบบได้จัดส่งข้อมูลความต้องการของคุณไปยัง <strong>โรงไม้สุธร</strong> เป็นที่เรียบร้อยแล้ว ทีมงานจะรีบติดต่อกลับเพื่อให้คำปรึกษาและเสนอราคาโดยเร็วที่สุด
            </p>
            <a href="index.html" class="inline-block bg-suthorn hover:bg-suthorn-dark text-white font-bold py-4 px-8 rounded-md transition-colors shadow-md text-lg nav-font w-full">
                กลับสู่หน้าหลัก
            </a>
        </div>
    </div>

    <div id="footer-container"></div>
    <script src="inline.js"></script>
</body>
</html>`;
fs.writeFileSync(path.join(dir, 'quote_success.html'), successHTML);

console.log("Upgraded to FormSubmit.co backend for stable email delivery.");
