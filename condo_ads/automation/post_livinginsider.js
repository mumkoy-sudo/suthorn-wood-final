// ==========================================
//  โพสต์ Livinginsider อัตโนมัติ
//  รัน: node post_livinginsider.js
// ==========================================

const puppeteer = require('puppeteer');
const config = require('./config');

const { livinginsider: creds } = config.credentials;
const { units, owner, puppeteer: pConf } = config;

async function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function login(page) {
  console.log('🔐 กำลังล็อกอิน Livinginsider...');
  await page.goto('https://www.livinginsider.com/member/signin', { waitUntil: 'networkidle2' });
  await page.type('#email', creds.email, { delay: 60 });
  await page.type('#password', creds.password, { delay: 60 });
  await page.click('button[type="submit"]');
  await page.waitForNavigation({ waitUntil: 'networkidle2' });
  console.log('✅ ล็อกอินสำเร็จ');
}

async function postUnit(page, unit) {
  console.log(`\n📝 กำลังโพสต์: ${unit.project}...`);
  await page.goto('https://www.livinginsider.com/member/property/add', { waitUntil: 'networkidle2' });
  await delay(1500);

  // ประเภทประกาศ = เช่า
  await page.click('label[for="listing_type_rent"]').catch(() =>
    page.select('select[name="listing_type"]', 'rent')
  );
  await delay(500);

  // ประเภทอสังหาริมทรัพย์ = คอนโด
  await page.click('label[for="property_type_condo"]').catch(() =>
    page.select('select[name="property_type"]', 'condo')
  );
  await delay(500);

  // ชื่อโครงการ
  await page.type('input[name="project_name"]', unit.project, { delay: 50 });
  await delay(300);

  // ที่อยู่/ทำเล
  await page.type('input[name="location"]', unit.location, { delay: 50 }).catch(() => {});
  await delay(300);

  // ขนาด
  await page.type('input[name="area"]', String(unit.size), { delay: 50 });
  await delay(300);

  // ชั้น
  await page.type('input[name="floor"]', String(unit.floor), { delay: 50 });
  await delay(300);

  // จำนวนห้องนอน
  const bedrooms = unit.type.startsWith('2') ? '2' : '1';
  await page.select('select[name="bedroom"]', bedrooms).catch(() => {});
  await delay(300);

  // ราคาเช่า
  await page.type('input[name="price"]', String(unit.rent), { delay: 50 });
  await delay(300);

  // คำบรรยาย
  await page.type('textarea[name="detail"]', unit.descTH, { delay: 30 });
  await delay(500);

  // ชื่อผู้ติดต่อ
  await page.type('input[name="contact_name"]', owner.name, { delay: 50 }).catch(() => {});
  await page.type('input[name="contact_phone"]', owner.phone, { delay: 50 }).catch(() => {});
  await delay(500);

  // กด Submit
  await page.click('button[type="submit"]');
  await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: pConf.timeout });

  // Screenshot ยืนยัน
  if (pConf.screenshotOnError) {
    await page.screenshot({ path: `./screenshots/livinginsider_${unit.id}_done.png` });
  }

  console.log(`✅ โพสต์สำเร็จ: ${unit.project} (${unit.rent.toLocaleString()} บ./เดือน)`);
}

(async () => {
  const { mkdirSync } = require('fs');
  mkdirSync('./screenshots', { recursive: true });

  const browser = await puppeteer.launch({
    headless: pConf.headless,
    slowMo: pConf.slowMo,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--lang=th-TH'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');

  try {
    await login(page);
    for (const unit of units) {
      await postUnit(page, unit);
      await delay(3000); // หน่วงระหว่างห้องเพื่อป้องกัน bot detection
    }
    console.log('\n🎉 โพสต์ Livinginsider ครบทุกห้องแล้ว!');
  } catch (err) {
    console.error('❌ Error:', err.message);
    await page.screenshot({ path: './screenshots/livinginsider_ERROR.png' });
  } finally {
    await browser.close();
  }
})();
