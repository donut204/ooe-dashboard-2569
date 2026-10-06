# OOE Dashboard 2569 — Handoff & Knowledge Base

> Living handoff note สำหรับส่งต่องาน กู้บริบท และใช้เป็นแหล่งอ้างอิงก่อนแก้ระบบ  
> **อัปเดตล่าสุด: 06/10/2569**  
> Repo: `donut204/ooe-dashboard-2569`

---

## 1. กติกาการทำงานของโปรเจกต์

- **ก่อนลงมือทำงานใด ๆ ในโปรเจกต์นี้ ต้องเปิดอ่านไฟล์ `OOE_Dashboard_2569_Handoff_Knowledge.md` จาก `main` ก่อนเสมอ** เพื่อทบทวนบริบทล่าสุดและป้องกันการลืมหรือใช้ข้อมูลเก่า
- **เมื่อมีข้อมูลใหม่ การตัดสินใจใหม่ การเปลี่ยน logic, UI, wording, source, workflow หรือบริบทสำคัญ ต้องจดเพิ่มลงไฟล์นี้ในรอบงานเดียวกัน**
- ห้ามเริ่มแก้ระบบจากความจำอย่างเดียว หากยังไม่ได้อ่าน Handoff เวอร์ชันล่าสุด
- `main` คือ branch ใช้งานจริงของ GitHub Pages
- ก่อนแก้ไฟล์ทุกครั้ง ต้อง fetch ไฟล์ล่าสุดจาก `main` และใช้ SHA ล่าสุด
- เมื่อผู้ใช้สั่ง “อัพขึ้น main / ขึ้น main” สามารถแก้ `main` โดยตรงได้
- ทุกครั้งที่มีการเปลี่ยน logic, UI, wording, data mapping, source, modal, status rule หรือ workflow ต้องอัปเดตไฟล์ MD นี้ด้วย
- ถ้าผู้ใช้บอกว่า Google Sheet “เพิ่งเปลี่ยน / ล่าสุด / เพิ่มข้อมูล” ต้องอ่าน source ล่าสุดก่อนแก้ Dashboard
- ห้ามเดาเกณฑ์เอง หากไม่มีข้อมูลจากผู้ใช้หรือเอกสารต้นทาง
- หลังแก้ระบบควรตรวจซ้ำว่า code ที่แก้มีผลจริง และไม่ทับงานใหม่

---

## 2. ข้อมูลโครงการ

**ชื่อระบบ:** OOE Dashboard 2569  
**หน่วยงาน:** สำนักการจัดการศึกษาออนไลน์ (OOE) มหาวิทยาลัยศรีปทุม

คำที่ต้องใช้ให้ถูก:
- `สำนักการจัดการศึกษาออนไลน์`
- `d-Learning` (d เล็ก, L ใหญ่)
- `AI Tutor`
- `Podcast`

Dashboard หลัก:
- GR
- GS
- AI Tutor
- Podcast

GitHub Pages:
`https://donut204.github.io/ooe-dashboard-2569/`

ไฟล์สำคัญ:
- `index.html` — GR / GS
- `ai-tutor.html` — AI Tutor
- `podcast.html` — Podcast
- `login.html` — Login
- `auth.js`
- `auth-config.js`
- `assets/ooe-robot.svg`
- `README.md`
- `OOE_Dashboard_2569_Handoff_Knowledge.md` — ไฟล์นี้

Branches ที่เคยมี:
- `main`
- `backup-before-google-login`
- `google-login`

---

## 3. Google Sheet ต้นทาง

Spreadsheet:
`Report691_18_09_2569`

Spreadsheet ID:
`1q8Dfe2f79ehjk7NsefGGYP6UduajKJDV7E79w1_fKMg`

Public sheets:
- `GRGS_Public` — gid `131857057`
- `AI_Tutor_Public` — gid `223035731`
- `Podcast_Public` — gid `149082930`

ชีทสำคัญอื่น:
- `691-Data`
- `691-AI Podcast`
- `69/1-GS`
- `69/1-GR`
- `AI_Podcast_Result`
- `ข้อมูลบุคลากร`
- `dLรายการสร้างรายวิชา ปี 69`
- `iLรายการสร้างรายวิชา ปี 69`

---

## 4. วันที่อ้างอิงที่แสดงบน Dashboard

ปัจจุบันทุก Dashboard หลักแสดง:

`ข้อมูลอ้างอิง ณ วันที่ 05/10/2569`

ไฟล์ที่แก้แล้ว:
- `index.html`
- `ai-tutor.html`
- `podcast.html`

ส่วน `ดึงข้อมูลเมื่อ ...` เป็นเวลาที่ browser ดึง CSV ล่าสุด ไม่ใช่วันที่อ้างอิงข้อมูล

---

## 5. GR / GS

ไฟล์: `index.html`

### Data mapping ล่าสุดจาก GRGS_Public

Headers สำคัญ:
- `group`
- `faculty`
- `courseCode`
- `credits`
- `courseProfile`
- `profileType`
- `createdDate`
- `courseName`
- `instructors`
- `teacherType`
- `teacherCount`
- `students`
- `weeks`
- `activities`
- `progress`
- `reviewStatus`
- `courseLink`
- `evidence`

### หน่วยกิต

มีการเพิ่ม `credits` ใน `GRGS_Public` แล้ว

Dashboard รองรับ:
- แสดงคอลัมน์ **หน่วยกิต**
- อยู่ถัดจาก **รหัสวิชา**
- ไม่มีค่าให้แสดง `—`
- Search รองรับข้อมูลหน่วยกิต

ตัวอย่าง:
- `3(3-0-6)`
- `3(2-2-5)`
- `4(1-6-5)`

### Progress wording

ค่าที่ใช้ล่าสุด:
- `เนื้อหาและองค์ประกอบมากกว่า 50%`
- `เนื้อหาและองค์ประกอบน้อยกว่า 50%`
- `ไม่มีเนื้อหา`

Review status:
- `ผ่าน`
- `อยู่ระหว่างการตรวจสอบ`
- `ไม่ผ่าน`

ข้อควรระวัง:
GR/GS ยังผูก status logic กับข้อความใน Sheet ค่อนข้างตรง หากเปลี่ยน wording ใน Sheet อาจต้องทำ dynamic label architecture แบบ Podcast ในอนาคต

---

## 6. AI Tutor

ไฟล์: `ai-tutor.html`

### สถานะ
- `ทำ`
- `ไม่ทำ`

การตรวจ AI Tutor อยู่ใน upstream data แล้ว  
YouTube link ไม่ถือเป็น AI Tutor

### คำแนะนำรายวิชา
- `ทำ` → แสดง `—`
- `ไม่ทำ` → ปุ่ม icon ดูคำแนะนำ

Modal คำแนะนำมี:
- ชื่อรายวิชา
- Course Profile
- สถานะ
- เกณฑ์การจัดทำ AI Tutor

เกณฑ์:
- AI Tutor ให้คำแนะนำเนื้อหาของบทเรียนทั้งรายวิชา
- AI Tutor ให้คำแนะนำวิธีการเรียนของรายวิชา
- ใช้ SPU AI หรือรูปแบบอื่นตามความเหมาะสมกับลักษณะรายวิชา

ตัดหัวข้อ `รูปแบบการนำไปใช้` ออกแล้ว

### Modal เกณฑ์การนับ AI Tutor

แสดงอัตโนมัติเมื่อเข้าหน้า AI Tutor ถ้ายังไม่เลือก “ห้ามแสดงอีก”

หัวข้อ:
`🤖 เกณฑ์การนับรายวิชาสำหรับ AI Tutor`

ไม่มี subtitle ใต้หัวข้อ

**ตัวตั้ง**
- จำนวนรายวิชา (ระดับปริญญาตรี)
- หนึ่งวิชาต้องมี 1 AI Tutor

**ตัวหาร**
จำนวนรายวิชา (ระดับปริญญาตรี) โดยไม่นับ:
1. สอนโดยอาจารย์พิเศษท่านเดียว
2. รายวิชาโครงงาน / เตรียมโครงงาน
3. รายวิชาสหกิจศึกษา / เตรียมสหกิจ
4. รายวิชาสัมมนา
5. รายวิชาอื่น ๆ ที่ไม่ได้สอนในห้องเรียน
6. รายวิชาที่นักศึกษาเป็นศูนย์
7. วิชาที่ได้รับให้ดำเนินการในรูปแบบอื่น ๆ เช่น Active Learning

UI:
- Minimal
- icon AI/robot
- ปุ่ม X เป็น SVG
- ไม่มี icon รูปตาข้าง “ห้ามแสดงอีก”
- `Active Learning` ถูกจัด layout ให้ไม่แตก/เพี้ยน

LocalStorage key:
`ooe_ai_tutor_criteria_hidden_v1`

ถ้าต้องการให้ Modal กลับมาแสดง:
```js
localStorage.removeItem('ooe_ai_tutor_criteria_hidden_v1')
```

---

## 7. Podcast

ไฟล์: `podcast.html`

### Logic จำนวน Podcast

ค่าคงที่:
```js
PODCAST_REQUIRED_COUNT = 15
```

กลุ่ม logic ภายใน:
- `complete` → Podcast >= 15
- `partial` → Podcast 1–14
- `notdone` → Podcast = 0
- `pending`

### Dynamic status label

Podcast แยก **internal logic** ออกจาก **ข้อความที่แสดง**

Dashboard อ่าน label จาก `podcastStatus` ใน Google Sheet อัตโนมัติ และใช้กับ:
- Filter
- KPI
- Donut legend
- Badge
- Modal

ตัวอย่าง:
หาก Sheet เปลี่ยน `จัดทำไม่ครบ` เป็นคำใหม่ Dashboard สามารถแสดงคำใหม่ได้โดยไม่ต้องแก้ HTML ตราบใดที่จำนวน Podcast ยังใช้ logic เดิม

Fallback wording ที่รองรับ:
- ทำครบ
- จัดทำไม่ครบ
- ทำบ้าง
- ยังไม่ครบ
- ไม่ทำ

ถ้ามีหลาย label ในกลุ่มเดียวกัน ระบบเลือกคำที่พบมากที่สุดเป็น label หลัก

### Modal คำแนะนำ Podcast

ใช้เกณฑ์คงที่ 15 ไม่ใช้ `weeks` ของแต่ละรายวิชาในการคำนวณคำแนะนำ

สูตร:
`ต้องทำเพิ่ม = max(0, 15 - จำนวน Podcast ที่พบ)`

เกณฑ์:
- จัดทำ Podcast ให้ครบตามเกณฑ์คงที่ 15 สัปดาห์
- อย่างน้อย 1 คลิปเสียงต่อสัปดาห์ โดยความยาวรวมไม่น้อยกว่า 10 นาที
- บันทึกเนื้อหา podcast ตามรายละเอียด File PDF เอกสารประกอบการสอน

แนวทาง:
- ใช้ File PDF ของแต่ละสัปดาห์เป็นข้อมูลหลัก
- ใช้ AI เช่น Google NotebookLM ช่วยได้
- ตรวจจำนวนให้ครบก่อนส่งรายวิชา

### Modal เกณฑ์การนับ Podcast

แสดงอัตโนมัติเมื่อเข้าหน้า Podcast ถ้ายังไม่เลือก “ห้ามแสดงอีก”

หัวข้อ:
`🎙️ เกณฑ์การนับรายวิชาสำหรับ Podcast`

**ตัวตั้ง**
- จำนวนรายวิชา (ระดับปริญญาตรี)
- หนึ่งวิชาต้องมี 15 Podcast

**ตัวหาร**
ไม่นับ:
1. สอนโดยอาจารย์พิเศษท่านเดียว
2. รายวิชาโครงงาน / เตรียมโครงงาน
3. รายวิชาสหกิจศึกษา / เตรียมสหกิจ
4. รายวิชาสัมมนา
5. รายวิชาอื่น ๆ ที่ไม่ได้สอนในห้องเรียน
6. รายวิชาที่นักศึกษาเป็นศูนย์
7. วิชาที่ได้รับให้ดำเนินการในรูปแบบอื่น ๆ เช่น Active Learning

UI:
- Minimal แบบเดียวกับ AI Tutor
- icon microphone
- ไม่มี icon รูปตาข้าง “ห้ามแสดงอีก”
- Active Learning ไม่แตก layout

LocalStorage key:
`ooe_podcast_criteria_hidden_v1`

รีเซ็ต:
```js
localStorage.removeItem('ooe_podcast_criteria_hidden_v1')
```

---

## 8. ฐานรายวิชา AI Tutor / Podcast

เดิมใช้ฐาน 879 รายวิชา หลังการคัดกรอง

เกณฑ์คัดออกที่ตกลง:
- รายวิชาที่ลงท้าย `-(L)`
- สอนโดยอาจารย์พิเศษเพียงคนเดียว
- รายวิชาโครงงาน / เตรียมโครงงาน
- รายวิชาเตรียมสหกิจ / สหกิจศึกษา
- รายวิชาบัณฑิตศึกษาด้านการจัดการ

กติกาผู้สอน:
- มีอาจารย์ประจำอย่างน้อย 1 คน → ยังนับ
- มีแต่อาจารย์พิเศษ → ตัดออก

International College:
- ใช้ i-Learning เป็นหลัก
- ไม่ควรนับ d-Learning ซ้ำกับ i-Learning

หมายเหตุ:
จำนวนฐานอาจเปลี่ยนตามข้อมูลล่าสุด จึงต้องตรวจใหม่เมื่อ source/filter เปลี่ยน  
ปัจจุบันหน้า AI Tutor เคยแสดงจำนวนมากกว่า 879 จากข้อมูล source ใหม่ ดังนั้นอย่ายึด 879 เป็นค่าตายตัวโดยไม่ตรวจชีทล่าสุด

---

## 9. Podcast Weekly Audit — logic ที่ต้องจำ

- Key รายวิชา = `ชื่อคณะ + shortname`
- ดูเฉพาะ Activity ที่เป็น Podcast
- `week` ใน raw data จริง ๆ คือ section
- ผู้สอนอาจตั้งชื่อ Podcast ว่า Week 1 แต่เก็บอยู่ Section 3
- ห้ามตีความ section = week แบบตายตัว
- รายวิชาที่ครบแล้วให้ข้าม
- โฟกัสกลุ่มจัดทำไม่ครบ / ไม่ทำ
- ถ้าจะระบุว่าขาด Week ไหน ต้องอาศัยชื่อ/ข้อมูล Podcast จริง ไม่ใช่ section อย่างเดียว

---

## 10. Login / Authentication

ระบบใช้ Google Workspace sign-in และจำกัด domain:
`@spu.ac.th`

ข้อสำคัญ:
- เป็น client-side gate
- ไม่ใช่ private hosting
- GitHub Pages source ยังเปิดอ่านได้
- Published CSV เป็น public URL

ห้าม commit Client Secret ลง repo

Robot login:
- `assets/ooe-robot.svg`
- มี blink / wave
- ใช้ asset เดิมเพื่อป้องกันรูปร่างเพี้ยน

---

## 11. UI / UX Guideline

แนวทางหลัก:
- Minimal
- Professional
- Modern University Dashboard
- สีชมพู / น้ำเงิน / ส้ม / ขาว
- Card-based layout
- ตัวเลขสำคัญเด่น
- ไม่รก
- responsive
- icon แบบเส้นเรียบ
- animation เบา ๆ

มีอยู่แล้ว:
- KPI hover
- chart reveal
- loading skeleton
- clickable faculty chart
- pagination
- refresh
- search/filter
- guidance modal

ปัจจุบันมีแผนจะ **ปรับรูปแบบการแสดงผลรายวิชาในหน้า AI Tutor และ Podcast** ในอนาคต แต่ยังไม่ได้ลงรายละเอียด/แก้ระบบ

---

## 12. README Policy

README ตั้งใจให้กระชับและไม่เปิดเผยรายละเอียดภายในเกินจำเป็น

หัวข้อที่เคยตัดออก:
- Dashboard
- Data Flow
- Data Sources
- Project Structure

ข้อมูล handoff เชิงเทคนิคให้เก็บในไฟล์นี้แทน README

---

## 13. Browser cache / Testing

หลัง deploy แล้วเห็นหน้าเก่า:
- ใช้ `Ctrl + F5`

Modal “ห้ามแสดงอีก” จำค่าต่อ browser/device ผ่าน LocalStorage

หากเปิด Chrome DevTools แล้ว paste ไม่ได้ อาจต้องพิมพ์ `allow pasting` ตามคำเตือนของ Chrome ก่อน

---

## 14. Handoff checklist

ก่อนแก้:
- [ ] **อ่านไฟล์นี้จาก `main` ก่อนเริ่มงานทุกครั้ง**
- [ ] ห้ามเริ่มแก้ระบบจากความจำอย่างเดียว
- [ ] Fetch ไฟล์ล่าสุดจาก `main`
- [ ] ถ้า source เปลี่ยน ให้ตรวจ Google Sheet ล่าสุด
- [ ] เช็ก header ก่อน mapping
- [ ] ทวน logic เดิมก่อนแก้
- [ ] รักษา UI minimal
- [ ] ไม่เผยแพร่อีเมลผู้สอน
- [ ] ทดสอบ Desktop / Mobile
- [ ] ตรวจ Login
- [ ] แจ้ง commit SHA หลังขึ้น main
- [ ] **อัปเดตไฟล์ MD นี้ทุกครั้งที่มีความรู้/บริบท/การตัดสินใจใหม่ แม้ยังไม่แก้โค้ด**
- [ ] **ถ้ามีการแก้ระบบ ให้อัปเดตไฟล์ MD นี้ในรอบงานเดียวกัน**

---

## 15. Change Log

### 06/10/2569
- เพิ่มกฎบังคับ: ต้องอ่าน Handoff จาก `main` ก่อนเริ่มงานทุกครั้ง
- เพิ่มกฎบังคับ: ต้องจดข้อมูลใหม่และการตัดสินใจใหม่ลง Handoff อย่างต่อเนื่อง แม้ยังไม่แก้โค้ด
- สร้าง Handoff file ใน GitHub repo
- บันทึกสถานะระบบล่าสุดทั้งหมด
- บันทึกวันที่อ้างอิง 05/10/2569
- บันทึก credits ใน GR/GS
- บันทึก Podcast dynamic status label
- บันทึก AI Tutor / Podcast counting criteria modal
- บันทึก LocalStorage “ห้ามแสดงอีก”
- บันทึกการเอา icon รูปตาออก
- ปรับ wording:
  - `รายวิชาโครงงาน / เตรียมโครงงาน`
  - `รายวิชาสัมมนา`
  - `รายวิชาที่นักศึกษาเป็นศูนย์`
- บันทึกการแก้ layout `Active Learning`
- บันทึกแผน future change: ปรับการแสดงผลรายวิชา AI Tutor / Podcast
