# 📊 OOE Dashboard 2569

แดชบอร์ดสำหรับติดตามข้อมูลรายวิชาออนไลน์ของ **สำนักงานการจัดการศึกษาออนไลน์ (OOE) มหาวิทยาลัยศรีปทุม**  

> 🎯 จุดประสงค์หลักคือให้ข้อมูลอัปเดตได้จาก Google Sheets โดยไม่ต้องสร้างไฟล์ Dashboard ใหม่ทุกครั้งที่ข้อมูลเปลี่ยน

## 🧭 Dashboard

| หน้า | รายละเอียด | ไฟล์ |
|---|---|---|
| 📘 **GR / GS** | ติดตามความคืบหน้ารายวิชาและสถานะการตรวจสอบ | `index.html` |
| 🤖 **AI Tutor** | ติดตามการใช้งาน AI Tutor ในแต่ละรายวิชา | `ai-tutor.html` |
| 🎙️ **Podcast** | ติดตามจำนวนและสถานะ Podcast ในแต่ละรายวิชา | `podcast.html` |

### 🌐 เปิดใช้งานผ่าน GitHub Pages

- 📘 [GR / GS Dashboard](https://donut204.github.io/ooe-dashboard-2569/)
- 🤖 [AI Tutor Dashboard](https://donut204.github.io/ooe-dashboard-2569/ai-tutor.html)
- 🎙️ [Podcast Dashboard](https://donut204.github.io/ooe-dashboard-2569/podcast.html)

## ✨ Features

- 🧩 แยกหน้า Dashboard สำหรับ **GR, GS, AI Tutor และ Podcast**
- 🏫 กรองข้อมูลตาม **คณะ / วิทยาลัย**
- 🔎 กรองตาม **สถานะความคืบหน้า / สถานะการตรวจสอบ**
- 🔍 ค้นหารายวิชาด้วยรหัสวิชาและ Course Profile
- 📌 แสดง KPI Cards สำหรับสรุปภาพรวม
- 📈 แสดงกราฟสัดส่วนและผลลัพธ์แยกตามคณะ
- 🔗 แสดงรายละเอียดรายวิชาและลิงก์เข้าสู่ d-Learning / i-Learning
- 📱 รองรับ Desktop และ Mobile
- 🔄 โหลดข้อมูลล่าสุดจาก Google Sheets เมื่อเปิดหน้าเว็บหรือกด **อัปเดตข้อมูล**

## 🔄 Data Flow

```text
Source Data
    │
    ▼
Google Sheets
    │
    ├── GRGS_Public
    ├── AI_Tutor_Public
    └── Podcast_Public
    │
    ▼
Publish to web (.csv)
    │
    ▼
HTML Dashboard
    │
    ▼
GitHub Pages
```

💡 การแยกข้อมูลออกเป็นชีท `*_Public` ช่วยให้หน้า Dashboard ใช้เฉพาะข้อมูลที่จำเป็นสำหรับการแสดงผล และไม่ต้องฝังข้อมูลทั้งหมดไว้ในไฟล์ HTML

## 🗂️ Data Sources

Dashboard ใช้ข้อมูลจาก Google Sheets ที่ Publish to web เป็น **CSV**

| Public Sheet | ใช้กับ |
|---|---|
| `GRGS_Public` | 📘 GR / GS Dashboard |
| `AI_Tutor_Public` | 🤖 AI Tutor Dashboard |
| `Podcast_Public` | 🎙️ Podcast Dashboard |

สำหรับ AI Tutor และ Podcast ข้อมูลใน Public Sheet จะอ้างอิงเฉพาะรายการที่ผ่านการกรองในชีทต้นทาง `691-AI Podcast`

## 📁 Project Structure

```text
ooe-dashboard-2569/
│
├── index.html
├── ai-tutor.html
├── podcast.html
└── README.md
```

## 🛠️ Updating the Dashboard

### 📝 กรณีข้อมูลเปลี่ยน

อัปเดตข้อมูลที่ Google Sheets ตาม workflow ปกติ

```text
Update Google Sheets
        ↓
Public Sheet
        ↓
Published CSV
        ↓
Dashboard โหลดข้อมูลใหม่
```

✅ โดยทั่วไป **ไม่ต้องแก้ HTML และไม่ต้อง Commit ใหม่**

### 🎨 กรณีหน้าตาหรือฟังก์ชันเปลี่ยน

เช่น เพิ่ม Filter, KPI Card, กราฟ หรือปรับ UX/UI

1. ✏️ แก้ไฟล์ HTML ที่เกี่ยวข้อง
2. 💾 Commit การเปลี่ยนแปลงเข้า branch `main`
3. 🚀 GitHub Pages จะ Deploy เวอร์ชันใหม่
4. 🔗 URL เดิมยังใช้งานต่อได้

## 🔐 Privacy

Dashboard สำหรับเผยแพร่จะไม่แสดงอีเมลผู้สอนในข้อมูล Public

ข้อมูลที่นำมาแสดงควรเป็นข้อมูลที่ผ่านการตรวจสอบและเหมาะสมสำหรับการเผยแพร่แล้วเท่านั้น

## 🧰 Technology

- 🌐 HTML5
- 🎨 CSS3
- ⚙️ Vanilla JavaScript
- 📊 Google Sheets
- 📄 CSV / Publish to web
- 🚀 GitHub Pages

---

**🏢 Office of Online Education (OOE)**  
Sripatum University
