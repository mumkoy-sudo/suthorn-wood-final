// ==========================================
//  โพสต์ DDproperty อัตโนมัติ
//  รัน: node post_ddproperty.js
// ==========================================

const puppeteer = require('puppeteer');
const config = require('./config');

const { ddproperty: creds } = config.credentials;
const { units, owner, puppeteer: pConf } = config;

async function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

async function login(page) {
  console.log('🔐 กำลังล็อกอิน DDproperty...');
  await page.goto('https://www.ddproperty.com/en/user/login', { waitUntil: 'networkidle2' });
  await delay(2000);
  await page.type('input[name="email"]', creds.email, { delay: 60 });
  await page.type('input[name="password"]', creds.password, { delay: 60 });
  await page.click('button[type="submit"]');
  await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 20000 });
  console.log('✅ ล็อกอิน DDproperty สำเร็จ');
}

async function postUnit(page, unit) {
  console.log(`\n📝 โพสต์ DDproperty: ${unit.project}...`);
  await page.goto('https://www.ddproperty.com/en/post-property', { waitUntil: 'networkidle2' });
  await delay(2000);

  // ประเภท = Rent
  await page.click('input[value="rent"]').catch(() =>
    page.select('select[name="listing_type"]', 'rent')
  );
  await delay(500);

  // ประเภทอสังหา = Condo
  await page.click('input[value="condo"]').catch(() =>
    page.select('select[name="property_type"]', 'condo')
  );
  await delay(500);

  // ชื่อประกาศ
  await page.type('input[name="title"]',
    `${unit.project} - ${unit.typeEN} Floor ${unit.floor} ${unit.size}sqm`, { delay: 50 });
  await delay(300);

  // คำบรรยาย
  await page.type('textarea[name="description"]', unit.descEN, { delay: 25 });
  await delay(300);

  // ราคา
  await page.type('input[name="price"]', String(unit.rent), { delay: 50 });
  await delay(300);

  // ขนาดห้อง
  await page.type('input[name="floor_area"]', String(unit.size), { delay: 50 });
  await delay(300);

  // ชั้น
  await page.type('input[name="floor"]', String(unit.floor), { delay: 50 });
  await delay(300);

  // ห้องนอน/ห้องน้ำ
  const beds = unit.type.startsWith('2') ? '2' : '1';
  await page.select('select[name="bedroom"]', beds).catch(() => {});
  await page.select('select[name="bathroom"]', beds).catch(() => {});
  await delay(300);

  // ชื่อโครงการ
  await page.type('input[name="project"]', unit.project, { delay: 50 }).catch(() => {});
  await delay(300);

  // ข้อมูลติดต่อ
  await page.type('input[name="contact_name"]', owner.name, { delay: 50 }).catch(() => {});
  await page.type('input[name="contact_phone"]', owner.phone, { delay: 50 }).catch(() => {});
  await delay(500);

  await page.screenshot({ path: `./screenshots/ddproperty_${unit.id}_preview.png` });

  await page.click('button[type="submit"]');
  await delay(3000);

  await page.screenshot({ path: `./screenshots/ddproperty_${unit.id}_done.png` });
  console.log(`✅ โพสต์ DDproperty สำเร็จ: ${unit.project}`);
}

(async () => {
  const { mkdirSync } = require('fs');
  mkdirSync('./screenshots', { recursive: true });

  const browser = await puppeteer.launch({
    headless: pConf.headless,
    slowMo: pConf.slowMo,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  try {
    await login(page);
    // DDproperty ฟรี 1 ประกาศ — โพสต์ห้องไฮไลท์ก่อน (Park Origin)
    const highlight = units.find(u => u.id === 4);
    await postUnit(page, highlight);
    console.log('\n💡 DDproperty ฟรีได้ 1 ประกาศ — โพสต์ Park Origin (ห้อง highlight) แล้ว');
    console.log('   ถ้าต้องการโพสต์ทุกห้อง ต้องซื้อ package เพิ่ม');
  } catch (err) {
    console.error('❌ Error:', err.message);
    await page.screenshot({ path: './screenshots/ddproperty_ERROR.png' });
  } finally {
    await browser.close();
  }
})();
