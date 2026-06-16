// ==========================================
//  โพสต์ Facebook Marketplace อัตโนมัติ
//  รัน: node post_facebook.js
// ==========================================

const puppeteer = require('puppeteer');
const config = require('./config');

const { facebook: creds } = config.credentials;
const { units, owner, puppeteer: pConf } = config;

async function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function login(page) {
  console.log('🔐 กำลังล็อกอิน Facebook...');
  await page.goto('https://www.facebook.com/login', { waitUntil: 'networkidle2' });
  await delay(2000);

  await page.type('#email', creds.email, { delay: 80 });
  await page.type('#pass', creds.password, { delay: 80 });
  await page.click('button[name="login"]');
  await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 20000 });

  // เช็ค 2FA
  const has2FA = await page.$('input[name="approvals_code"]');
  if (has2FA) {
    console.log('⚠️  ต้องใส่ 2FA code — กรุณาใส่ใน browser แล้วกด Enter ใน terminal นี้');
    await new Promise(r => process.stdin.once('data', r));
  }
  console.log('✅ ล็อกอิน Facebook สำเร็จ');
}

async function postToMarketplace(page, unit) {
  console.log(`\n📝 โพสต์ Marketplace: ${unit.project}...`);
  await page.goto('https://www.facebook.com/marketplace/create/rental', { waitUntil: 'networkidle2' });
  await delay(3000);

  // Property type = Apartment/Condo
  const typeBtn = await page.$('[aria-label="Property type"]');
  if (typeBtn) {
    await typeBtn.click();
    await delay(1000);
    const condoOpt = await page.$x('//div[contains(text(),"Apartment") or contains(text(),"Condo")]');
    if (condoOpt[0]) await condoOpt[0].click();
    await delay(500);
  }

  // ชื่อประกาศ
  const titleField = await page.$('input[placeholder*="Title"]') ||
                     await page.$('input[aria-label*="Title"]');
  if (titleField) {
    await titleField.click({ clickCount: 3 });
    await titleField.type(`ให้เช่า ${unit.project} ${unit.type} ชั้น ${unit.floor} ${(unit.rent).toLocaleString()} บ./เดือน`, { delay: 50 });
  }
  await delay(500);

  // ราคา
  const priceField = await page.$('input[placeholder*="Price"]') ||
                     await page.$('input[aria-label*="Price"]');
  if (priceField) {
    await priceField.click({ clickCount: 3 });
    await priceField.type(String(unit.rent), { delay: 50 });
  }
  await delay(500);

  // ที่อยู่/Location
  const locField = await page.$('input[placeholder*="Location"]') ||
                   await page.$('input[aria-label*="City"]');
  if (locField) {
    await locField.click({ clickCount: 3 });
    await locField.type(unit.locationEN, { delay: 50 });
    await delay(1000);
    // เลือก suggestion แรก
    const suggestions = await page.$$('[role="option"]');
    if (suggestions[0]) await suggestions[0].click();
  }
  await delay(500);

  // ห้องนอน
  const bedroomsField = await page.$('input[placeholder*="Bedrooms"]');
  if (bedroomsField) {
    await bedroomsField.click({ clickCount: 3 });
    await bedroomsField.type(unit.type.startsWith('2') ? '2' : '1', { delay: 50 });
  }
  await delay(500);

  // ห้องน้ำ
  const bathroomsField = await page.$('input[placeholder*="Bathrooms"]');
  if (bathroomsField) {
    await bathroomsField.click({ clickCount: 3 });
    await bathroomsField.type(unit.type.startsWith('2') ? '2' : '1', { delay: 50 });
  }
  await delay(500);

  // คำบรรยาย
  const descField = await page.$('textarea[placeholder*="Description"]') ||
                    await page.$('div[contenteditable][aria-label*="Description"]');
  if (descField) {
    await descField.click();
    await delay(300);
    await page.keyboard.type(unit.descEN, { delay: 30 });
  }
  await delay(500);

  // Screenshot ก่อน submit
  await page.screenshot({ path: `./screenshots/facebook_marketplace_${unit.id}_preview.png` });

  // กด Next/Publish
  const nextBtn = await page.$x('//div[@aria-label="Next"] | //span[text()="Next"]');
  if (nextBtn[0]) {
    await nextBtn[0].click();
    await delay(2000);
    const publishBtn = await page.$x('//div[@aria-label="Publish"] | //span[text()="Publish"]');
    if (publishBtn[0]) await publishBtn[0].click();
    await delay(3000);
  }

  await page.screenshot({ path: `./screenshots/facebook_marketplace_${unit.id}_done.png` });
  console.log(`✅ โพสต์ Marketplace สำเร็จ: ${unit.project}`);
}

async function postToGroup(page, unit, groupId) {
  console.log(`📢 โพสต์กลุ่ม ${groupId}: ${unit.project}...`);
  await page.goto(`https://www.facebook.com/groups/${groupId}`, { waitUntil: 'networkidle2' });
  await delay(3000);

  // กด Write something
  const writeBtn = await page.$('[placeholder*="Write something"]') ||
                   await page.$('[aria-label*="Write something"]');
  if (writeBtn) {
    await writeBtn.click();
    await delay(1500);
    await page.keyboard.type(
      `🏠 ให้เช่า ${unit.project}\n` +
      `${unit.type} | ชั้น ${unit.floor} | ${unit.size} ตร.ม.\n` +
      `💰 ${unit.rent.toLocaleString()} บาท/เดือน\n\n` +
      unit.descTH +
      `\n\n#คอนโดให้เช่า #${unit.project.replace(/\s/g,'')} #กรุงเทพ`,
      { delay: 20 }
    );
    await delay(1000);

    const postBtn = await page.$x('//div[@aria-label="Post"] | //span[text()="Post"]');
    if (postBtn[0]) {
      await postBtn[0].click();
      await delay(3000);
    }
    console.log(`✅ โพสต์กลุ่มสำเร็จ`);
  }
}

// Facebook Groups ที่เกี่ยวข้อง (Group ID หรือ slug)
const TARGET_GROUPS = [
  'condorentbangkok',
  'bangkokcondorent',
  'thonglorhipflat',
  // เพิ่ม Group ID ได้เรื่อยๆ
];

(async () => {
  const { mkdirSync } = require('fs');
  mkdirSync('./screenshots', { recursive: true });

  const browser = await puppeteer.launch({
    headless: pConf.headless,
    slowMo: pConf.slowMo,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--lang=th-TH,en-US'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36');

  try {
    await login(page);

    // 1. โพสต์ Marketplace ทุกห้อง
    for (const unit of units) {
      await postToMarketplace(page, unit);
      await delay(5000);
    }

    // 2. โพสต์กลุ่ม (ห้องแรกก่อน ทดสอบ)
    for (const unit of units) {
      for (const group of TARGET_GROUPS) {
        await postToGroup(page, unit, group);
        await delay(8000); // หน่วงนานขึ้นระหว่างกลุ่ม
      }
    }

    console.log('\n🎉 โพสต์ Facebook ครบทุกห้องแล้ว!');
  } catch (err) {
    console.error('❌ Error:', err.message);
    await page.screenshot({ path: './screenshots/facebook_ERROR.png' });
  } finally {
    await browser.close();
  }
})();
