#!/bin/bash
# ==========================================
#  รันทุก script พร้อมกัน (ทีละอัน)
#  ก่อนรัน: ใส่ credentials ใน config.js
#  รัน: bash run_all.sh
# ==========================================

set -e
cd "$(dirname "$0")"

echo "============================================"
echo "  CONDO AD AUTOMATION — เริ่มโพสต์ทุกช่องทาง"
echo "  ณรงค์ (พี่ม่ำ) | 081-8327707"
echo "============================================"

# ตรวจสอบ node_modules
if [ ! -d "node_modules" ]; then
  echo "📦 ติดตั้ง dependencies..."
  npm install puppeteer
fi

mkdir -p screenshots

echo ""
echo "1️⃣  โพสต์ Livinginsider (6 ห้อง)..."
node post_livinginsider.js
echo "✅ Livinginsider เสร็จ"
sleep 10

echo ""
echo "2️⃣  โพสต์ DDproperty (1 ห้อง — highlight)..."
node post_ddproperty.js
echo "✅ DDproperty เสร็จ"
sleep 10

echo ""
echo "3️⃣  โพสต์ Facebook Marketplace + Groups..."
node post_facebook.js
echo "✅ Facebook เสร็จ"
sleep 5

echo ""
echo "============================================"
echo "  🎉 เสร็จสิ้น! ตรวจสอบผลในโฟลเดอร์ screenshots/"
echo "  แจ้งพี่ม่ำ: 081-8327707 | Line: narong.t"
echo "============================================"
