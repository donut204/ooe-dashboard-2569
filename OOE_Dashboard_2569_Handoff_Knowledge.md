# OOE Dashboard 2569 — Handoff & Knowledge Base

> **ACTIVE RULE (18/11/2569):** AI Tutor/Podcast CourseScore ใช้ MAX เฉพาะ Profile ที่เป็น `courseType` เดียวกันและกลุ่มผู้เรียนเดียวกัน; ถ้ามี instructor suffix ใน Course Profile ให้ถือเป็นกลุ่มผู้สอนแยก; เฉลี่ยคะแนนระหว่างกลุ่มผู้สอน แล้วเฉลี่ยระหว่าง `courseType` ที่ต่างกัน โดยยังเต็ม 1 คะแนนต่อ `faculty + courseCode`. ดูรายละเอียดท้ายเอกสารหัวข้อ 18/11/2569; ข้อความเก่าเรื่อง AVERAGE ทุก Profile เป็นประวัติเดิมเท่านั้น

> Living handoff note สำหรับส่งต่องาน กู้บริบท และใช้เป็นแหล่งอ้างอิงก่อนแก้ระบบ  
> **อัปเดตล่าสุด: 18/11/2569**  
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


## 1E. หน้าที่ผู้ดูแลและข้อบังคับบันทึกความรู้ (16/10/2569)

> **ข้อกำหนดสำคัญของเจ้าของโปรเจกต์:** ผู้ดูแลต้อง **อัปเดต Handoff MD และบันทึกความรู้ใหม่ทุกครั้ง** เมื่อเกิดการเปลี่ยนแปลง ค้นพบข้อเท็จจริงที่เกี่ยวข้องกับระบบ หรือสรุปการตัดสินใจสำคัญ แม้รอบนั้นจะไม่ได้แก้โค้ดก็ตาม ห้ามส่งมอบงานแก้ไขระบบโดยไม่มีเอกสารในรอบเดียวกัน

### บทบาทผู้ดูแลโปรเจกต์

- **Lead Developer:** พัฒนา/แก้ปัญหา HTML, CSS, JavaScript โดยแก้เฉพาะขอบเขตที่ร้องขอ
- **System Architect:** ดูแลโครงสร้างระบบ, data flow, data mapping, dependencies และผลกระทบข้ามหน้า
- **Data Analyst:** ตรวจสอบ Google Sheets/Public CSV, สูตร KPI, ProfileScore, CourseScore และหน่วยนับรายวิชา
- **UI/UX Developer:** ดูแลความสอดคล้องของหน้าจอ, ความสามารถในการใช้งาน, TH/EN และ Desktop/Mobile
- **QA Engineer:** ตรวจ syntax, business-rule regression, ข้อมูลและการแสดงผลโดยไม่อ้างว่าทดสอบสิ่งที่ยังไม่ทดสอบ
- **GitHub Maintainer:** ดูแล branch, SHA, diff, PR, merge และตรวจผลบน `main` หลัง merge
- **Technical Documentation / Knowledge Owner:** บันทึกความรู้และข้อสรุปที่ตรวจสอบได้ลง Handoff ให้แชทหรือผู้พัฒนาคนถัดไปรับช่วงได้โดยไม่พึ่งความจำ

### Knowledge Capture — ต้องบันทึกอะไรบ้าง

1. **Requirement / Decision:** สิ่งที่ผู้ใช้สั่ง ผลการตัดสินใจ เหตุผล และ business rule ที่ต้องรักษา
2. **Source / Evidence:** แหล่งข้อมูลที่ตรวจจริง ชื่อชีท, spreadsheet ID/gid, ชื่อคอลัมน์, field mapping, วันที่ตรวจ และตัวอย่างควบคุม (เมื่อเกี่ยวข้อง)
3. **Implementation:** ไฟล์/ฟังก์ชัน/หน้า/branch ที่เกี่ยวข้อง ความแตกต่างก่อน–หลัง และขอบเขตที่จงใจไม่แตะ
4. **Validation:** ผลตรวจ syntax, KPI/control cases, source mapping, TH/EN, Desktop/Mobile, Diff/Regression โดยแยก **ผ่านการตรวจจริง** ออกจาก **ยังไม่ได้ตรวจ** อย่างชัดเจน
5. **Issue / Risk / Follow-up:** Bug, root cause, ข้อจำกัด, assumption ที่ยังไม่ยืนยัน, ผลกระทบ, ทางแก้ และงานค้างที่จำเป็นต่อการรับช่วง
6. **Traceability:** วันที่, PR, commit SHA, merge SHA และสถานะ `main`/Production เมื่อมีข้อมูลที่ยืนยันได้

**ต้องแยก “ข้อเท็จจริงที่ตรวจจาก source/code จริง” ออกจาก “ข้อเสนอ / สมมติฐาน / ประวัติเก่า”**; เมื่อข้อมูลขัดกัน ให้ระบุว่าเอกสารช่วงเก่าเป็น historical context และยึดข้อกำหนด/โค้ดปัจจุบันที่ตรวจยืนยันล่าสุดเป็นหลัก ห้ามสร้าง business rule ใหม่จากการคาดเดา

### Workflow บังคับก่อนปิดงาน

1. อ่าน Handoff ฉบับเต็มจาก `main` ก่อนเริ่มทุกงาน แล้ว fetch ไฟล์ที่เกี่ยวข้องพร้อม blob SHA ล่าสุดจาก `main`
2. หากข้อมูลต้นทางเปลี่ยน ให้ตรวจ Google Sheet/Public CSV จริงก่อนแก้ mapping, filter, KPI หรือ wording
3. ประเมินผลกระทบก่อนแก้; ทำบน feature/fix/docs branch → ตรวจ diff/QA → PR → ตรวจ mergeable และ head SHA → merge ตาม workflow ที่ผู้ใช้กำหนด
4. อัปเดต **`OOE_Dashboard_2569_Handoff_Knowledge.md` ใน branch/PR เดียวกับงานนั้น** (สำหรับการตรวจสอบอย่างเดียว ให้บันทึกเมื่อพบความรู้ใหม่หรือข้อสรุปสำคัญที่ต้องส่งต่อ)
5. หลัง merge ให้ fetch `main` เพื่อยืนยันว่าโค้ดและ Handoff ใหม่อยู่จริง พร้อมแจ้ง PR/commit SHA และสถานะตรวจ Production ตามจริง
6. ห้ามเปลี่ยน KPI, ProfileScore, CourseScore, source CSV, authentication, pagination, responsive หรือฟังก์ชันอื่นนอกขอบเขต; ห้ามใส่ token, secret หรือข้อมูลบุคคลที่ไม่จำเป็นลง Handoff

**Definition of Done:** งานที่มีการแก้ logic, UI/UX, wording, filter, KPI, chart, data mapping, source, workflow หรือ business rule **ยังไม่ถือว่าเสร็จ** จนกว่าจะตรวจผลกระทบ/QA ตามขอบเขต และบันทึกความรู้ใน Handoff พร้อมการแก้ไขรอบเดียวกัน

---

## 1A. งานถัดไปที่ต้องทำ — AI Tutor / Podcast แบบ “1 รายวิชาเต็ม 1 คะแนน” (คำสั่งล่าสุด 07/10/2569)

> **ส่วนนี้เป็น Requirement ปัจจุบันที่มีลำดับความสำคัญสูงสำหรับแชท/ผู้พัฒนาคนถัดไป**  
> ให้ศึกษา section นี้ทั้งหมดก่อนแก้ `ai-tutor.html` หรือ `podcast.html` และห้ามย้อนกลับไปใช้ logic เก่าที่นับ 1 Profile = 1 รายวิชา


### สถานะการดำเนินการ — Implemented on `main` (07/10/2569)

ดำเนินการตาม section 1A แล้ว:

- `ai-tutor.html` ใช้ `ProfileScore` จาก `AI_Tutor_Public` และ Group ด้วย `faculty + courseCode`
- `podcast.html` ใช้ `ProfileScore` จาก `Podcast_Public` และ Group ด้วย `faculty + courseCode`
- CourseScore = AVERAGE(ProfileScore ของทุก Profile ในรายวิชาเดียวกัน)
- Filter, KPI, Faculty summary, Donut และ Course list ทำงานที่ระดับ “รายวิชา”
- การเลือก `courseType` / คณะ / สถานะ / Search จะกรองหลัง Group แล้ว จึงไม่ทำให้ CourseScore ถูกคำนวณใหม่จาก Profile บางส่วน
- รายการหลักเป็นรายวิชา และรองรับ Expand/Collapse เพื่อดู Profile ย่อย
- **UI ตารางล่าสุด (07/10/2569): แสดงแบบลำดับชั้น `คณะ / วิทยาลัย → รหัสวิชา → Course Profile` ตามภาพอ้างอิงของผู้ใช้**
- แถวคณะ/วิทยาลัยใช้โทนฟ้าอ่อน / Blue-gray และปุ่ม `− / +`
- แถวรายวิชาแสดง `courseCode` + จำนวน Profile และมีปุ่ม `− / +`
- Profile ย่อยแสดงเป็นกิ่ง Tree ใต้รายวิชา และแสดง `courseProfile`, Course Type, ผู้สอน, ProfileScore, status, คำแนะนำ และลิงก์รายวิชา
- **Tree alignment ล่าสุด:** เพิ่มระยะระหว่างปุ่ม Expand กับชื่อรายวิชา และให้เส้นกิ่งของ Course Profile เชื่อมจาก parent มาถึงคอลัมน์ Course Profile อย่างต่อเนื่อง
- **Alignment refinement 07/10/2569:** ขยับทั้งปุ่ม Expand และข้อความรายวิชาไปทางขวาเพิ่ม โดยเพิ่ม `tree-course-cell` padding-left เป็น 42px (Mobile 38px) และเลื่อน Tree connector ตามไปด้วย
- ระยะระหว่างชื่อรายวิชากับ `(n Profile)` ถูกปรับให้กลับมากระชับขึ้นด้วย `margin-left:-6px` (Mobile -5px) โดยยังคงระยะปุ่ม Expand → ชื่อรายวิชาเดิม
- ค่า `Course Profile` ย่อยต้องเริ่มตรงแนวเดียวกับหัวคอลัมน์ `Course Profile`; ใช้ padding ซ้าย 14px เท่ากับ cell/header ปกติ และย่อเส้น connector ในคอลัมน์ Profile ให้จบก่อนข้อความ
- **Faculty group count ล่าสุด:** ตัวเลขหลังชื่อคณะ/วิทยาลัยต้องเป็นจำนวนรายวิชาทั้งหมดของคณะนั้นในชุดผลลัพธ์ที่ผ่าน Filter ปัจจุบัน ไม่ใช่จำนวนเฉพาะในหน้าปัจจุบันของ Pagination
- **Pagination ล่าสุด (07/10/2569):** AI Tutor / Podcast ต้อง `Filter/Search → Group รายวิชาตามคณะ → Paginate ตามคณะ` ไม่ใช่แบ่ง 20 รายวิชาก่อนแล้วค่อย Group
  - ใช้ `FACULTY_PAGE_SIZE=4` แสดงสูงสุด 4 คณะต่อหน้า
  - เมื่อหุบคณะ คณะอื่นที่อยู่ในหน้าเดียวกันต้องยังแสดงและเลื่อนขึ้นทันที ไม่เกิดหน้าว่าง
  - ทุก Filter (คณะ / Course Type / Status / จำนวน Profile / Search / KPI Card) ถูกใช้ก่อนการ Group/Pagination
  - เมื่อ Filter เปลี่ยน `currentPage` ต้องกลับหน้า 1
  - Page info แสดงรูปแบบ `แสดงคณะ x–y จาก n คณะ · m รายวิชา`
  - ถ้า Filter เหลือเพียง 1 คณะ ให้แสดงรายวิชาทั้งหมดของคณะนั้นในหน้าเดียว (ตารางมี internal scroll อยู่แล้ว)
- ค่าเริ่มต้น: **คณะเปิดอยู่ แต่รายวิชาแต่ละตัวไม่ Expand Profile**; กด `+` จึงแสดง Profile ย่อย
- Profile ย่อยแสดงค่า AI Tutor / Podcast พร้อม `ProfileScore`
- Podcast ไม่คำนวณคะแนนจาก `podcastCount` ซ้ำใน Dashboard อีกต่อไป แต่ใช้ `ProfileScore` upstream โดยตรง
- Source ยังคงเป็น Public CSV เดิม ไม่ได้เปลี่ยนไปใช้ Pivot
- ไม่ re-filter เกณฑ์ตัวหาร 7 ข้อใน Dashboard
- ไม่ hard-code จำนวน 767 รายวิชา หรือคะแนนรวม

Validation กับ source จริง ณ 07/10/2569:
- AI Tutor = **921 Profile / 767 รายวิชา**, TotalPoints = **410.6667**, Progress = **53.54%**
- Podcast = **921 Profile / 767 รายวิชา**, TotalPoints = **264.8668**, Progress = **34.53%**
- Test cases ผ่าน:
  - `BSC21467` = **66.67%**
  - `GEC13267` = **50.00%**
  - `BBA31367` = **50.00%**
  - `BBA21267` = **76.67%**

Commits:
- AI Tutor: `b3efe13befb69a94552150b28a0ce258c5b99b14`
- Podcast: `81a8de21d10b883a17c3cac9c562db4b320185aa`

### เป้าหมาย

Dashboard AI Tutor และ Podcast ต้องประเมินผลที่ **ระดับรายวิชา** ไม่ใช่ระดับ Course Profile

- Key ของ 1 รายวิชา = `faculty + courseCode`
- 1 รายวิชา มีคะแนนเต็มสูงสุด = **1.00 คะแนน**
- หากรายวิชาหนึ่งมีหลาย Course Profile ให้เฉลี่ยคะแนนของทุก Profile ภายในรายวิชานั้น
- จำนวน Profile มากหรือน้อยต้องไม่ทำให้รายวิชานั้นมีน้ำหนักเกิน 1 คะแนน
- KPI ระดับมหาวิทยาลัย/คณะ ต้องคำนวณจากคะแนนระดับรายวิชา ไม่ใช่นับ Profile เป็นตัวหาร

### Source ที่ต้องใช้จริง

**ให้ใช้ Public CSV เดิมเป็น Data Source ของ Dashboard:**
- `AI_Tutor_Public` — gid `223035731`
- `Podcast_Public` — gid `149082930`

**ห้ามเปลี่ยน Dashboard ไปใช้ Pivot เป็น CSV Source** ใน requirement ปัจจุบัน

Pivot มีหน้าที่เป็น **Control Report / Validation** เท่านั้น:
- `Pivot AI Tutor`
- `Pivot Podcast`

Source flow ที่ต้องยึด:

```text
691 AI Tutor
├─ Pivot AI Tutor        ← ตรวจสอบผล
└─ AI_Tutor_Public       ← CSV Source → Dashboard

691 Podcast
├─ Pivot Podcast         ← ตรวจสอบผล
└─ Podcast_Public        ← CSV Source → Dashboard
```

### ข้อสำคัญเกี่ยวกับการคัดรายวิชา

ชีท `691 AI Tutor` และ `691 Podcast` **ผ่านการคัด/กรองรายวิชาตามเกณฑ์ตัวหารมาแล้ว**  
ดังนั้น Dashboard **ห้ามนำเกณฑ์ตัดออก 7 ข้อมากรองซ้ำอีกครั้ง** เพราะจะเสี่ยงตัดข้อมูลซ้ำและทำให้ตัวหารผิด

เกณฑ์ 7 ข้อใน Modal ยังใช้เพื่ออธิบายเกณฑ์แก่ผู้ใช้ได้ แต่ business logic การคัดรายวิชาเกิดขึ้น upstream แล้ว

### Schema ล่าสุดของ Public CSV

`AI_Tutor_Public`:

```text
faculty
courseType
courseCode
credits
courseProfile
profileType
createdDate
courseName
instructors
teacherType
teacherCount
students
weeks
aiTutor
aiStatus
ProfileScore
courseLink
```

`Podcast_Public`:

```text
faculty
courseType
courseCode
credits
courseProfile
profileType
createdDate
courseName
instructors
teacherType
teacherCount
students
weeks
podcastCount
podcastStatus
ProfileScore
courseLink
```

### ProfileScore — กติกาที่ต้องใช้

ค่าจริงของ `ProfileScore` อยู่ในสเกล **0–1** และใน Google Sheet/Public CSV จะแสดงเป็นเปอร์เซ็นต์ เช่น `53.33%`, `100.00%`

Dashboard ต้อง parse ค่าเปอร์เซ็นต์กลับเป็น 0–1 ก่อนนำไปเฉลี่ย เช่น:

```text
0.00%   → 0
53.33%  → 0.5333
100.00% → 1
```

ห้ามคูณ 100 ซ้ำ และห้ามเปลี่ยนคะแนนเต็มของรายวิชาจาก 1 เป็น 100

#### AI Tutor — ProfileScore

ต่อ 1 Profile:

```text
AI Tutor = 1 → ProfileScore = 1.00 = 100%
AI Tutor = 0 → ProfileScore = 0.00 = 0%
```

คะแนนระดับรายวิชา:

```text
CourseScore = AVERAGE(ProfileScore ของทุก Profile ใน faculty + courseCode เดียวกัน)
```

ตัวอย่างควบคุม:
- `BSC21467` → Profile = 0%, 100%, 100% → CourseScore = **66.67% = 0.6667/1**
- `GEC13267` → Profile = 100%, 0% → CourseScore = **50.00% = 0.50/1**
- `BBA31367` → Profile = 0%, 0%, 100%, 100% → CourseScore = **50.00% = 0.50/1**

#### Podcast — ProfileScore

ต่อ 1 Profile upstream ใช้หลัก:

```text
ProfileScore = MIN(podcastCount, 15) / 15
```

จึงต้องมีเพดานสูงสุด 1.00 ต่อ Profile  
Podcast ที่เกิน 15 **ห้ามเอาส่วนเกินไปชดเชย Profile อื่น**

ตัวอย่าง:
- Podcast 8 → 8/15 = 53.33%
- Podcast 15 → 100.00%
- Podcast 28 → ยังเป็น 100.00%

คะแนนระดับรายวิชา:

```text
CourseScore = AVERAGE(ProfileScore ของทุก Profile ใน faculty + courseCode เดียวกัน)
```

ตัวอย่างควบคุม:
- `BBA21267` → 53.33%, 100.00% → CourseScore = **76.67% = 0.7667/1**

### KPI ระดับภาพรวม

ให้คำนวณโดยใช้ “รายวิชา” เป็นหน่วย:

```text
TotalCourses = จำนวน unique (faculty + courseCode)
TotalPoints  = SUM(CourseScore)
Progress %   = TotalPoints / TotalCourses × 100
```

**ห้ามใช้จำนวน Profile เป็นตัวหาร KPI**

ค่าควบคุมล่าสุดที่ตรวจจาก Public source เมื่อ 07/10/2569:
- AI Tutor = **921 Profile / 767 รายวิชา**, TotalPoints ≈ **410.6667**, Progress ≈ **53.54%**
- Podcast = **921 Profile / 767 รายวิชา**, TotalPoints ≈ **264.8668**, Progress ≈ **34.53%**

> ตัวเลขเหล่านี้เป็น control figure ณ เวลาตรวจ ไม่ใช่ค่าที่ให้ hard-code หาก source เปลี่ยน ต้องคำนวณใหม่จาก CSV

### การแสดงผลระดับรายวิชา / Profile

Direction ที่ผู้ใช้ต้องการ:
- รายการหลักควร Group เป็น **รายวิชา**
- แสดง `courseCode` / ข้อมูลระดับรายวิชา / `CourseScore`
- รายวิชาที่มีหลาย Profile ควรสามารถ **Expand** เพื่อดู Profile ย่อยได้
- Profile ย่อยแสดงข้อมูลเดิมจาก CSV เช่น `courseProfile`, ผู้สอน, AI Tutor/Podcast count, status, ProfileScore, link
- UI expand/collapse เป็นเรื่องการแสดงผลเท่านั้น **ห้ามมีผลต่อการคำนวณ KPI**

Internal status ระดับรายวิชาสามารถจัดกลุ่มเพื่อใช้กับ KPI/filter ได้ดังนี้:
- `CourseScore = 1` → complete
- `0 < CourseScore < 1` → partial
- `CourseScore = 0` → notdone

ข้อความที่แสดงควรรักษา wording เดิมของแต่ละหน้าเท่าที่ทำได้ และห้ามสร้าง wording ใหม่โดยไม่จำเป็น

### สิ่งที่ห้ามทำ

- **ห้าม** นับ 1 Profile = 1 รายวิชา
- **ห้าม** รวม ProfileScore ด้วย SUM แล้วปล่อยให้ 1 รายวิชาเกิน 1 คะแนน
- **ห้าม** ใช้ `podcastCount รวม / (15 × จำนวน Profile)` แบบที่ Podcast ส่วนเกินของ Profile หนึ่งไปชดเชยอีก Profile
- **ห้าม** re-filter เกณฑ์ตัวหารซ้ำใน Dashboard เพราะ upstream ตัดแล้ว
- **ห้าม** hard-code จำนวน 767 หรือค่าคะแนนรวม เพราะ source เปลี่ยนได้
- **ห้าม** เปลี่ยน source ไป Pivot โดยไม่ได้รับคำสั่งใหม่จากผู้ใช้
- **ห้าม** merge/คัดลอก experimental branch แบบทั้งก้อนโดยไม่เทียบกับ `main` ล่าสุด

### Branch / PR ทดลองที่มีอยู่

มี experimental branch:
- `course-profile-scoring`

PR ที่เกี่ยวข้อง:
- PR #2 — แนวคิด group รายวิชา/เฉลี่ย Profile — **ปิดแล้ว 07/10/2569, ไม่ได้ merge**

Branch นี้ใช้เป็น **prototype/reference เท่านั้น ไม่ใช่ source of truth**  
หากต้องการหยิบ logic มาใช้ ให้ fetch `main` ล่าสุดก่อน แล้วตรวจ diff/reimplement เฉพาะส่วนที่ยังตรง requirement ปัจจุบัน

### คำสั่งสำหรับแชท/ผู้พัฒนาคนถัดไป

1. อ่าน Handoff นี้จาก `main` ให้ครบ โดยเฉพาะ section **1A**
2. Fetch `ai-tutor.html`, `podcast.html` และ source mapping ล่าสุดจาก `main` ก่อนแก้
3. ถ้าผู้ใช้บอกว่า Sheet เปลี่ยน/ล่าสุด ให้ตรวจ Google Sheet exact source ก่อนคำนวณหรือแก้ code
4. ปรับ AI Tutor และ Podcast ให้ใช้ `ProfileScore` จาก Public CSV และ Group ด้วย `faculty + courseCode`
5. ให้ KPI, Faculty summary, filter/status และ course list ใช้หน่วย “รายวิชา” อย่างสอดคล้องกัน
6. ตรวจ test case อย่างน้อย `BBA21267`, `BSC21467`, `GEC13267`, `BBA31367`
7. เทียบ aggregate กับ control figure ล่าสุด แต่ห้าม hard-code
8. รักษา UI/UX เดิมที่ไม่เกี่ยวข้อง หลีกเลี่ยงการรื้อหน้าโดยไม่จำเป็น
9. **ก่อนแก้ `main` ต้องอ่านไฟล์ล่าสุดและใช้ SHA ล่าสุด ป้องกันการทับงานจากอีกแชท**
10. หลังแก้ code ต้องตรวจ diff/test และ **อัปเดตไฟล์ Handoff นี้ในรอบเดียวกัน**
11. หากพบว่า requirement ใน code/branch เก่าขัดกับ section 1A ให้ถือ **section 1A เป็น requirement ปัจจุบัน** จนกว่าผู้ใช้จะสั่งเปลี่ยน


## 1C. Navigation / Sidebar Proposal (รออนุมัติ 07/10/2569)

- ลำดับ Navigation ล่าสุดเปลี่ยนเป็น: **หน้า GS → หน้า GR → AI Tutor → Podcast** ทุกหน้าหลัก
- ปัจจุบันยังใช้ Top navigation buttons อยู่
- ผู้ใช้ขอร่างแนวทาง **Sidebar Navigation** ก่อน implement จริง
- Proposal:
  - Desktop: Sidebar ซ้ายกว้างประมาณ 200–220px อยู่ใต้ Header หลัก
  - เมนูเรียง: หน้า GS, หน้า GR, AI Tutor, Podcast
  - Active menu ใช้ Blue filled; เมนูอื่นพื้นโปร่ง/ขาว
  - Main content อยู่ด้านขวาและยังคง Filter → KPI → Chart → Table ตามเดิม
  - Sidebar ควร sticky ขณะ scroll
  - Mobile/Tablet: Sidebar ยุบเป็นปุ่ม Menu / Drawer เพื่อไม่กินพื้นที่
  - Header หลักยังคง Navy เดิม ไม่ย้ายข้อมูลอ้างอิง/สถานะออนไลน์เข้า Sidebar ในร่างแรก
- **ยังไม่ implement Sidebar จนกว่าผู้ใช้จะอนุมัติภาพร่าง**

## 1D. Local Development with VS Code

ใช้ workflow นี้เมื่อย้ายงานจาก ChatGPT/GitHub ไปทำต่อใน Visual Studio Code บนเครื่องผู้ใช้

### Clone ครั้งแรก

```bash
git clone https://github.com/donut204/ooe-dashboard-2569.git
cd ooe-dashboard-2569
code .
```

ก่อนเริ่มแก้ทุกครั้ง:
1. เปิดอ่าน `OOE_Dashboard_2569_Handoff_Knowledge.md`
2. อยู่ที่ branch `main`
3. ดึงงานล่าสุดจาก GitHub

```bash
git checkout main
git pull origin main
```

### Deploy ขึ้น main จาก VS Code / Terminal

หลังแก้และทดสอบแล้ว:

```bash
git status
git add .
git commit -m "อธิบายสิ่งที่แก้"
git pull --rebase origin main
git push origin main
```

โปรเจกต์นี้ใช้ `main` เป็น branch สำหรับ GitHub Pages ดังนั้นเมื่อ push เข้า `main` แล้ว GitHub Pages จะ deploy เวอร์ชันใหม่ตาม workflow ปัจจุบัน

ถ้า `git push` ถูกปฏิเสธเพราะ remote มี commit ใหม่:
```bash
git pull --rebase origin main
# แก้ conflict ถ้ามี
git add .
git rebase --continue
git push origin main
```

ข้อควรระวัง:
- ก่อน push ต้อง `git pull --rebase origin main` เพราะ ChatGPT หรือผู้ร่วมงานอาจแก้ repo ระหว่างที่ผู้ใช้กำลังทำ local
- ทุกการเปลี่ยน logic/UI/source/workflow ต้องอัปเดต Handoff MD ใน commit เดียวกัน
- อย่า force push `main` โดยไม่จำเป็น
- หากต้องการ workflow ปลอดภัยกว่า ให้ทำ branch แยกแล้วเปิด Pull Request แทนการแก้ `main` โดยตรง

## 1B. UI Implementation — AI Tutor / Podcast (อนุมัติและดำเนินการ 07/10/2569)

> ดำเนินการตามร่างเดิมแล้ว **ยกเว้น KPI Card** ตามคำสั่งผู้ใช้ล่าสุด

### ตารางรายวิชา
- ใช้โครงสร้าง Tree: `คณะ / วิทยาลัย → รายวิชา → Course Profile`
- ค่าเริ่มต้น: **คณะเปิดอยู่ แต่รายวิชาแต่ละตัวยังไม่ Expand Profile**
- แถวคณะแสดงชื่อคณะ + จำนวนรายวิชา
- แถวรายวิชาแสดง `courseCode` + จำนวน Profile, Course Type, CourseScore, status
- ปุ่มรายวิชาเริ่มต้นเป็น `+`; กดแล้วจึงแสดง Profile ย่อย
- Profile ย่อยแสดง Course Profile, ผู้สอน, ProfileScore, status, คำแนะนำ และลิงก์
- การ Collapse/Expand เป็น presentation layer เท่านั้น ไม่เปลี่ยน Section 1A scoring / KPI / source

### สี
- ตัดโทนชมพูออกจาก Tree table แล้ว
- ใช้ Navy / Blue / Slate / White เป็นฐาน
- Faculty group row = ฟ้าอ่อน / Blue-gray
- Course row = ขาว/เทาอ่อน
- ปุ่ม Expand/Collapse = น้ำเงิน
- Status ยังใช้ Green / Amber / Red ตามความหมายเดิม

### Font
- เพิ่ม shared stylesheet: `assets/ooe-font.css`
- ทุกหน้าหลัก (`index.html`, `login.html`, `ai-tutor.html`, `podcast.html`) โหลด stylesheet นี้
- ใช้ Noto Sans Thai ผ่าน Google Fonts Web Font เพื่อให้เครื่องผู้ใช้ต่างกันไม่ fallback ไปคนละฟอนต์ในภาวะปกติ
- มี fallback `Leelawadee UI, Tahoma, Arial, sans-serif` หากโหลด Web Font ไม่สำเร็จ
- **หมายเหตุ:** ปัจจุบันยังไม่ได้ bundle binary font file ลง repo; ใช้ stylesheet กลางใน project + remote web font

### KPI Card
- **ปรับล่าสุด 07/10/2569** สำหรับทั้ง AI Tutor และ Podcast
- ใช้โครงสร้าง 2 ระดับ: **ระดับรายวิชา (หลัก)** + **ระดับ Profile (รอง)**
- Card ด้านบนมี 4 ใบ:
  1. `รายวิชาทั้งหมด`
  2. `ครบทุก Profile`
  3. `จัดทำไม่ครบ`
  4. `ไม่ทำ`
- `คะแนน KPI รวม` ถูกย้ายออกจากแถว Card ด้านบน ไปวางใน **คอลัมน์ขวาเหนือกราฟวงกลม (Donut)** และอยู่ใน section เดียวกับกราฟความคืบหน้าแยกตามคณะ
- **Chart layout ล่าสุด:** คอลัมน์ขวา (`คะแนน KPI รวม + Donut`) ต้อง stretch ให้สูงสมดุลกับกราฟความคืบหน้าแยกตามคณะ เพื่อลดช่องว่างมุมขวาล่างบน Desktop; Mobile/Tablet กลับเป็นความสูงตามเนื้อหา
- **AI Tutor / Podcast Faculty chart ล่าสุด:** เปลี่ยนเป็น **จำนวนรายวิชาแยกตามคณะ** โดยยังแบ่งสีตามสถานะ
  - ความยาวรวมของแท่งแต่ละคณะอิงจำนวนรายวิชาจริง เทียบกับคณะที่มีรายวิชามากที่สุด
  - Green = ครบทุก Profile, Amber = จัดทำไม่ครบ, Red = ไม่ทำ
  - ตัวเลขใน segment แสดงเป็น **จำนวนรายวิชา** เมื่อพื้นที่เพียงพอ
  - ด้านขวาแสดงจำนวนรายวิชารวมของคณะ
  - ไม่ใช้ 100% stacked ในรอบล่าสุด เพื่อให้เปรียบเทียบขนาดคณะได้โดยตรง
- **Donut layout ล่าสุด (07/10/2569):** ทุกหน้าที่มีกราฟวงกลมให้วาง Legend/ข้อความอธิบาย **ใต้กราฟวงกลม** ไม่วางด้านข้าง
- AI Tutor / Podcast Donut ใช้ Green = คะแนนที่ได้ และ **Amber = คะแนนที่ยังขาด** (ยกเลิก Gray สำหรับคะแนนที่ยังขาด)
- **มาตรฐานชื่อ Donut:** ใช้คำว่า `ความคืบหน้า AI Tutor` / `ความคืบหน้า Podcast` เท่านั้น ไม่ใช้ชื่อ `คะแนนความครบถ้วน` เพื่อไม่ให้สับสนกับ Card `คะแนน KPI รวม`
  - ตรงกลาง Donut ใช้คำว่า `ความคืบหน้า`
  - Legend ใช้ `คะแนนที่ได้` และ `คะแนนที่ยังขาด`
  - ใช้กับ GR/GS, AI Tutor และ Podcast
  - Donut อยู่กึ่งกลาง Card
  - Legend เรียงแนวตั้งด้านล่าง พร้อมจุดสี + label + ค่าทางขวา
- Card คะแนน KPI รวมแสดง TotalPoints / TotalCourses + Progress % + horizontal progress bar
- **KPI Score layout ล่าสุด:** จัด Header (icon + ชื่อ) แยกด้านบน แล้ววาง `คะแนนที่ได้ / คะแนนเต็ม` ทางซ้าย และ `ความคืบหน้า %` ทางขวาในบรรทัดเดียวกัน ก่อน Progress Bar เพื่อลดความรู้สึกแน่น/เอียงของ layout เดิม
- **การแสดง TotalPoints ใน Card ใช้การปัดขึ้นด้วย `Math.ceil()`** ทั้ง AI Tutor และ Podcast เช่น 410.67 → 411, 264.87 → 265
- การปัดขึ้นเป็น **presentation เท่านั้น**; ค่า Progress % และ logic คำนวณ KPI ยังคงใช้คะแนนจริงก่อนปัด
- Card ผลลัพธ์หลักใช้ icon ขนาดใหญ่ขึ้น และวาง **icon ทางซ้าย / label + จำนวนทางขวา** แทนการวางจำนวนใต้ icon
- **GR/GS Active state ใช้สีตามสถานะของ Card**: รายวิชาทั้งหมด = Blue, ผ่าน = Green, อยู่ระหว่างการตรวจสอบ = Amber, ไม่ผ่าน = Red
- **GR/GS KPI visual system ล่าสุด:** รูปแบบ Card ใช้แนวเดียวกับ AI Tutor / Podcast โดยคงข้อความเดิมทั้งหมด แต่ปรับขนาด Card, typography และเพิ่ม icon:
  - รายวิชาทั้งหมด = Book / Blue
  - ผ่าน = Check / Green
  - อยู่ระหว่างการตรวจสอบ = Minimal ! / Amber
  - ไม่ผ่าน = X / Red
  - icon 52px (Mobile 48px), ตัวเลขใหญ่ 39px (Mobile 34px), card min-height 146px
- **Main KPI Card กดเพื่อกรองข้อมูลได้ทุกหน้า**
  - GR / GS: `รายวิชาทั้งหมด` = ทุกสถานะการตรวจสอบ, `ผ่าน`, `อยู่ระหว่างการตรวจสอบ`, `ไม่ผ่าน` → sync กับ `reviewFilter`
  - AI Tutor / Podcast: `รายวิชาทั้งหมด` = ทุกสถานะ, `ครบทุก Profile`, `จัดทำไม่ครบ`, `ไม่ทำ` → sync กับ `statusFilter`
  - Card `คะแนน KPI รวม` ของ AI Tutor / Podcast กดเพื่อกลับไปแสดงทุกสถานะ
  - กด Card สถานะเดิมซ้ำ = ยกเลิกสถานะนั้นและกลับเป็นทั้งหมด
  - การกด Card **ไม่ล้าง filter อื่น** เช่น คณะ, ประเภทรายวิชา, ความคืบหน้า หรือ Search
  - Card ที่เป็น filter ปัจจุบันมี Active state; รองรับเมาส์และ keyboard Enter / Space
  - Profile Summary / Mini Card **ไม่ใช้เป็นตัวกรอง** เพราะรายการหลักเป็นหน่วยรายวิชา
- AI Tutor / Podcast มี Filter `จำนวน Profile` แบบ **dynamic ตามค่าที่พบจริงในข้อมูล**
- Dropdown เริ่มด้วย `ทั้งหมด` แล้วสร้าง option จากจำนวน Profile ของแต่ละรายวิชา เช่น ปัจจุบัน source พบ `1 Profile`, `2 Profile`, `3 Profile`, `4 Profile`
- ถ้าในอนาคต source มี 5 หรือมากกว่านั้น ระบบจะเพิ่ม option ให้อัตโนมัติ ไม่ hard-code จำนวน
- Profile-count filter ทำงานหลัง Group เป็นรายวิชาแล้ว จึงกรองจาก `g.profileCount` แบบ exact match และไม่กระทบสูตร CourseScore
- Secondary Profile Summary:
  - AI Tutor: Profile ทั้งหมด / Profile ที่ทำ / Profile ที่ไม่ทำ
  - Podcast: Profile ทั้งหมด / Profile ที่ทำครบ / Profile ที่จัดทำไม่ครบ / Profile ที่ไม่ทำ
- **มาตรฐานคำใน UI ใช้ `Profile` โดยไม่เติม s เสมอ** แม้จำนวนมากกว่า 1 เพื่อให้ศัพท์ในระบบคงที่ เช่น `921 Profile`, `2 Profile`
- AI Tutor เปลี่ยน wording สถานะระดับรายวิชา `ทำบางส่วน` → `จัดทำไม่ครบ` ใน Filter, KPI และ Badge
- Card `จัดทำไม่ครบ` ใช้ **ไอคอนเครื่องหมายตกใจแบบ Minimal / เส้นบาง** สี Amber ทั้ง AI Tutor และ Podcast; ไม่มีกรอบสามเหลี่ยม Warning เพื่อให้ภาพเบาลง
- **Active state ของ KPI Card ต้องอิงสีสถานะของ Card เอง**: ทั้งหมด = Blue, ครบ = Green, จัดทำไม่ครบ = Amber, ไม่ทำ = Red; ไม่ใช้ขอบ Blue เหมือนกันทุก Card
- Modal เกณฑ์ AI Tutor ใช้ข้อความ exact: `หนึ่งรายวิชาต้องมี 1 AI Tutor`
- Modal เกณฑ์ Podcast ใช้ข้อความ exact: `หนึ่งรายวิชาต้องมี 15 Podcast`
- ใช้สี Navy / Blue / Slate / White เป็นฐาน และ Green / Amber / Red เฉพาะสถานะ
- ห้าม hard-code ตัวเลขควบคุม เช่น 767, 921, 410.67, 53.54%, 264.87, 34.53%
- ตัวเลข KPI ทุกตัวอัปเดตจาก Public CSV ของ Google Sheet ผ่าน `DATA` ปัจจุบัน และเปลี่ยนตาม filter/search
- Course KPI ใช้ CourseScore ตาม Section 1A; Profile KPI ใช้ `ProfileScore` จาก source
- ตัวเลขคะแนนและเปอร์เซ็นต์แสดง 2 ตำแหน่งทศนิยม
- Validation source ณ 07/10/2569:
  - AI Tutor: 767 รายวิชา / 921 Profile / 410.67 คะแนน / 53.54% / complete 389 / partial 43 / notdone 335 / Profile complete 482 / notdone 439
  - Podcast: 767 รายวิชา / 921 Profile / 264.87 คะแนน / 34.53% / complete 161 / partial 223 / notdone 383 / Profile complete 203 / partial 225 / notdone 493
- ค่าข้างต้นเป็น control figure สำหรับตรวจสอบเท่านั้น ไม่ใช่ค่าที่เขียนค้างใน HTML/JS

### Commits
- Shared font stylesheet: `895edf283ab08acdf81fc308a6c211aee7c9091b`
- index.html font: `a52294759e588c63e6390400d621d397629e02aa`
- login.html font: `c44ced282fde5f962a0d4ba770a958ad408f4ecf`
- AI Tutor UI: `09686cd983f96410959f21ebe22614ee831ee308`
- Podcast UI: `1888705cb3d13a9c11c62cb055e9e629eaa286d6`
- AI Tutor KPI v2: `ab94f9283390976e641a4e670a2264a3a51a2fee`
- Podcast KPI v2: `2da36a9e86bd4732457c59c9f46f156341925de1`
- AI Tutor KPI refinement: `c3f6524175052eb54a00f9d3520081c60a131b60`
- Podcast KPI refinement: `42e4a17abfce07c1f501075c2592bb7319e30561`
- AI Tutor warning icon: `403040b73cee962d0bc4cab4ec4596e979b08941`
- Podcast warning icon / wording: `57214c0891d0153080952d0d6d5d74447240ca06`
- AI Tutor minimal warning icon: `bcdd69e3ff02f7c2428043b0a2ea83037f265032`
- Podcast minimal warning icon: `30c549a98f73090aafdc134a8baedda475da7b45`
- AI Tutor KPI round-up display: `7da3a459dea72318ccebbeec82f361f16ab92d18`
- Podcast KPI round-up display: `dc033233305e9faecc4cfeba8bdfb08d6d65b845`
- GR/GS KPI card filters: `a60df8648fd484f9ef81e62ee2c7e798a5515ad9`
- AI Tutor KPI card filters: `a011d2edc92118ebb19477214d456d1361dc9850`
- Podcast KPI card filters: `5982912492a36c42f13f6ac1add34ca03f615ba3`
- AI Tutor tree alignment: `b6654802e8a3281477ebb45fe559192701a5b7c8`
- Podcast tree alignment: `1fb1da0f80b0d00ea29233de5b4b3a5d94067273`
- AI Tutor faculty/filter/chart refinement: `116596da658afbf7804aa51b6f6fde927e673087`
- Podcast faculty/filter/chart refinement: `235fa6424b67c881fddb7b1f8b51a18563ab90d6`
- AI Tutor dynamic Profile-count filter: `34c6fcb2fd3392ab7f2eb7bf6dc5078b242a1348`
- Podcast dynamic Profile-count filter: `e52eb1ced14f155aa5f6c01397bd2b79eec0acd7`
- GR/GS active colors + GS-first nav: `41dd555f22c5d58d613b9050d3e9a2690ec38d81`
- AI Tutor GS-first nav: `45d05e2fb2d1793f847b633e6fa1423f120d4c67`
- Podcast GS-first nav: `9117a75e5b2800d60fe13de6f4bf9b236be533bf`
- GR/GS donut legend-below: `dbccec16cee52ac9ca48081360965ee38ac4ed0f`
- AI Tutor donut legend-below: `fcd9b8cb6c36bd6adfd160847e6e273ded44281c`
- Podcast donut legend-below: `57d7090df47e1cf4410e9d9ea2e9132327a75b00`

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
- `course-profile-scoring` — experimental prototype; ห้าม merge เข้า main แบบอัตโนมัติ

---

## 3. Google Sheet ต้นทาง

Spreadsheet:
`Report691_05_10_2569`

Spreadsheet ID:
`1q8Dfe2f79ehjk7NsefGGYP6UduajKJDV7E79w1_fKMg`

Public sheets:
- `GRGS_Public` — gid `131857057`
- `AI_Tutor_Public` — gid `223035731`
- `Podcast_Public` — gid `149082930`

ชีทสำคัญอื่น:
- `691 AI Tutor`
- `691 Podcast`
- `Pivot AI Tutor`
- `Pivot Podcast`
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

ฐานรายวิชาสำหรับ Dashboard มาจากข้อมูลที่ผ่านการคัดกรอง upstream แล้วใน:
- `691 AI Tutor`
- `691 Podcast`

Public CSV ที่ Dashboard ต้องใช้:
- `AI_Tutor_Public`
- `Podcast_Public`

**ห้ามใช้ 879 เป็นค่าตายตัว** และ **ห้าม re-filter เกณฑ์ตัวหารซ้ำใน Dashboard**  
หน่วย KPI ปัจจุบัน = unique `faculty + courseCode` และ 1 รายวิชาเต็ม 1 คะแนน ตาม section 1A

ค่าควบคุมล่าสุด ณ 07/10/2569:
- Public ทั้งสองชุดมี 921 Profile
- unique course key = 767 รายวิชา

จำนวนนี้เปลี่ยนได้เมื่อ source เปลี่ยน จึงต้องคำนวณ runtime จาก CSV และห้าม hard-code

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

Requirement ปัจจุบันสำหรับหน้า AI Tutor / Podcast ถูกกำหนดแล้วใน section 1A: ให้ Group ระดับรายวิชา, คำนวณ CourseScore จากค่าเฉลี่ย ProfileScore และสามารถ Expand ดู Profile ย่อยได้ โดยรักษา UI เดิมที่ไม่เกี่ยวข้อง

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
- [ ] AI Tutor / Podcast: ยืนยันว่า source คือ `AI_Tutor_Public` / `Podcast_Public`
- [ ] AI Tutor / Podcast: Group ด้วย `faculty + courseCode` และ 1 รายวิชาเต็ม 1 คะแนน
- [ ] AI Tutor / Podcast: ห้าม re-filter เกณฑ์ตัวหารซ้ำใน Dashboard
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

### 07/10/2569
- เปลี่ยนชื่อ Donut AI Tutor / Podcast เป็น `ความคืบหน้า` ให้ใช้คำเดียวกันทั้งหัวกราฟและกลางวงกลม
- เลิกใช้ชื่อ `คะแนนความครบถ้วน` สำหรับ Donut เพื่อไม่ให้สับสนกับ `คะแนน KPI รวม`
- Commit AI Tutor donut title: `dab704a0d88c1d42939eddb650c10833b6a67e6e`
- Commit Podcast donut title: `373339be52a8d1f67ed8c48e2655f25c8d026696`
- บังคับให้แสดงจำนวนในทุกสีของกราฟแท่งทุกหน้า: GR/GS, AI Tutor, Podcast แม้ segment แคบ
- ปรับ CSS ของ segment ให้ label ตัวเลขสามารถล้นเล็กน้อยได้, ลดขนาดเป็น 12px และเพิ่ม text-shadow เพื่ออ่านง่าย
- Commit GR/GS chart labels: `aaa3ae15dd45e0454d906381f049c049f68e91d6`
- Commit AI Tutor chart labels: `e374ab6f65b7c817374a236a37f91f25ce565758`
- Commit Podcast chart labels: `04f6ffdf61370e3e0eb2eddb88b50a1cac2d3364`
- ปรับ GR/GS KPI Card ให้ใช้ visual system แบบ AI Tutor / Podcast โดยคงข้อความเดิมทั้งหมด และเพิ่ม icon/ขนาดตัวอักษร/ขนาด card ให้สอดคล้องกัน
- เปลี่ยนกราฟคณะของ AI Tutor / Podcast เป็น 100% stacked status proportion: ครบทุก Profile / จัดทำไม่ครบ / ไม่ทำ
- Donut ของ AI Tutor / Podcast **ยังไม่เปลี่ยนในรอบนี้**; คงแสดงคะแนน KPI ที่ได้ vs คะแนนที่ยังขาด เพื่อไม่ซ้ำกับกราฟสถานะรายวิชา
- Commit GR/GS KPI visual: `1b61b37babec9eb719270a9e13c19085976e866d`
- Commit AI Tutor faculty status chart: `3da991e46f2df9c06a8cfeaade3fd7715c3eae36`
- Commit Podcast faculty status chart: `56143b05a9e3d17de04575a4bb576a4067caedd0`
- เปลี่ยน Pagination AI Tutor / Podcast เป็น paginate ตามกลุ่มคณะหลัง Filter/Search แล้ว เพื่อแก้ปัญหาหุบคณะแล้วหน้าโล่ง
- ใช้ 4 คณะต่อหน้า; Filter ทุกชนิดทำงานก่อน Group/Pagination และ reset กลับหน้า 1 เมื่อค่า Filter เปลี่ยน
- Commit AI Tutor faculty pagination: `b94ad258053a55b3905de87b3768ea0c2309af67`
- Commit Podcast faculty pagination: `898e9f5b7ea85126c5e2fce34e6a38f8dac2acdf`
- ปรับตำแหน่งปุ่ม Expand + ชื่อรายวิชาไปทางขวาอีกทั้ง AI Tutor และ Podcast
- ทำ `(n Profile)` ให้ชิดชื่อรายวิชามากขึ้น โดยไม่ดึงทั้งกลุ่มกลับไปทางซ้าย
- Commit AI Tutor row spacing: `ac3258651a600a342d2edf6aff7f1f356bd15520`
- Commit Podcast row spacing: `b60b71cd0e5668de44b8a5db481acc2ce1f4f064`
- ปรับ Donut legend ทุกหน้าให้อยู่ใต้กราฟวงกลม: GR/GS, AI Tutor, Podcast
- Donut จัดกึ่งกลาง Card และ Legend แสดงแนวตั้งด้านล่าง เพื่อให้อ่านง่ายและสม่ำเสมอ
- ปรับ GR/GS Active KPI Card ให้ใช้สีตามสถานะ ไม่ใช้ Blue เหมือนกันทุก Card
- เปลี่ยนลำดับ Navigation ทุกหน้าเป็น GS → GR → AI Tutor → Podcast
- บันทึก Sidebar Navigation เป็น proposal รอผู้ใช้อนุมัติภาพก่อน implement
- ปรับ Filter `จำนวน Profile` ให้สร้าง option ตามจำนวนที่พบจริงใน source แบบ dynamic และกรองแบบ exact match
- Source ปัจจุบันทั้ง AI Tutor และ Podcast พบจำนวน Profile ต่อรายวิชา = 1, 2, 3, 4
- หากอนาคตมีจำนวนอื่น ระบบเพิ่ม option อัตโนมัติโดยไม่ต้องแก้ HTML
- แก้ Faculty group count ให้แสดงจำนวนรายวิชาทั้งหมดของคณะในผลลัพธ์ Filter ปัจจุบัน ไม่ใช่จำนวนเฉพาะหน้า Pagination
- ปรับสี Active ของ KPI Card ให้ตรงกับสีสถานะของ Card
- ปรับสัดส่วนคอลัมน์ขวาของส่วนกราฟให้ยืดเติมความสูง ลดช่องว่างมุมขวาล่าง
- เพิ่ม Filter `จำนวน Profile` บน AI Tutor / Podcast: ทั้งหมด / 1 Profile / มากกว่า 1 Profile
- Commit AI Tutor refinement: `116596da658afbf7804aa51b6f6fde927e673087`
- Commit Podcast refinement: `235fa6424b67c881fddb7b1f8b51a18563ab90d6`
- ปรับ Tree connector ของ Course Profile ทั้ง AI Tutor และ Podcast ให้เส้นเริ่มใต้แนวชื่อรายวิชาและลากต่อเนื่องถึง Course Profile
- ขยับชื่อรายวิชาไปทางขวาเล็กน้อยโดยเพิ่ม gap ระหว่างปุ่ม `+ / −` กับชื่อรายวิชา
- เพิ่ม Click-to-filter ให้ Main KPI Card ทุกหน้า: GR, GS, AI Tutor และ Podcast
- GR/GS Card sync กับ `reviewFilter`; AI Tutor/Podcast Card sync กับ `statusFilter`
- กดสถานะเดิมซ้ำเพื่อกลับ `ทั้งหมด`; Card คะแนน KPI รวมใช้เป็น reset status บน AI Tutor/Podcast
- รักษา filter อื่นไว้เมื่อกด Card และเพิ่ม Active state + keyboard Enter/Space
- Profile Summary ยังคงเป็นข้อมูลประกอบ ไม่ใช้กรองรายวิชา
- ปรับการแสดง `คะแนน KPI รวม` ให้ปัดขึ้นด้วย `Math.ceil()` ทั้ง AI Tutor และ Podcast; ค่าเปอร์เซ็นต์ยังคำนวณจากคะแนนจริงก่อนปัด
- ปรับ Warning icon ของ Card `จัดทำไม่ครบ` ให้เบาลงทั้ง AI Tutor และ Podcast: ใช้เครื่องหมาย `!` แบบเส้นบาง ไม่มีกรอบสามเหลี่ยม
- เปลี่ยน icon Card `จัดทำไม่ครบ` เป็น Warning / เครื่องหมายตกใจสี Amber ทั้ง AI Tutor และ Podcast
- Podcast criteria ปรับข้อความเป็น `หนึ่งรายวิชาต้องมี 15 Podcast` ให้รูปแบบสอดคล้องกับ AI Tutor
- ยืนยันหน้า Podcast ใช้ layout ล่าสุดเหมือน AI Tutor: KPI score card อยู่เหนือ Donut, ใช้คำ `Profile` ไม่เติม s
- ย้าย Card `คะแนน KPI รวม` ไปไว้เหนือ Donut ในคอลัมน์ขวา ระดับเดียวกับกราฟความคืบหน้า
- ปรับ Main KPI Card ให้ icon ใหญ่ขึ้น และวางจำนวนผลทางขวาของ icon
- AI Tutor เปลี่ยนสถานะ `ทำบางส่วน` เป็น `จัดทำไม่ครบ` ทุกจุดที่เป็นสถานะระดับรายวิชา
- AI Tutor criteria เปลี่ยนเป็น `หนึ่งรายวิชาต้องมี 1 AI Tutor`
- กำหนดมาตรฐาน UI ให้ใช้คำ `Profile` ไม่เติม s ทั้ง AI Tutor และ Podcast
- Commit AI Tutor refinement: `c3f6524175052eb54a00f9d3520081c60a131b60`
- Commit Podcast refinement: `42e4a17abfce07c1f501075c2592bb7319e30561`
- ปรับ KPI Card AI Tutor / Podcast เป็น 5 Main Cards ระดับรายวิชา + Secondary Profile Summary
- เพิ่ม Card `คะแนน KPI รวม` พร้อม TotalPoints / TotalCourses, Progress % และ Progress Bar
- เพิ่มสถานะรายวิชา complete / partial / notdone พร้อมจำนวนและเปอร์เซ็นต์
- เพิ่ม Profile summary แยกจาก KPI รายวิชาเพื่อไม่ให้สับสนหน่วย
- KPI ใช้ข้อมูลจาก Google Sheet Public CSV แบบ dynamic; **ไม่ hard-code ตัวเลขควบคุม**
- ตรวจ source ล่าสุดแล้วตรงกับ control figure AI Tutor 53.54% และ Podcast 34.53%
- Commit AI Tutor KPI: `ab94f9283390976e641a4e670a2264a3a51a2fee`
- Commit Podcast KPI: `2da36a9e86bd4732457c59c9f46f156341925de1`
- ปรับ Tree table รอบล่าสุดให้รายวิชาเริ่มต้นแบบ collapsed; คณะยังเปิดให้เห็นรายการรายวิชา
- ตัดสีชมพูจาก Tree table และเปลี่ยนเป็น Navy / Blue / Slate / White
- เพิ่ม `assets/ooe-font.css` และใช้ Noto Sans Thai Web Font ร่วมกันในทุกหน้าหลัก
- **ไม่ปรับ KPI Card** ตามคำสั่งผู้ใช้ และตรวจว่า KPI HTML เดิมไม่เปลี่ยน
- ปิด PR #2 (`course-profile-scoring` → `main`) โดย **ไม่ merge** เพื่อเคลียร์ Pull Request ที่ค้างอยู่
- ปรับ UI ตาราง AI Tutor / Podcast ตามภาพอ้างอิงให้เป็น Tree Hierarchy: **คณะ/วิทยาลัย → รายวิชา → Course Profile**
- เพิ่มแถวกลุ่มคณะ/วิทยาลัยพื้นชมพูอ่อน พร้อมปุ่ม Collapse/Expand
- เพิ่มแถวรายวิชาแบบ Nested พร้อมจำนวน Profile และปุ่ม Collapse/Expand
- Profile ย่อยแสดง Tree connector และรายละเอียดเดิมครบ
- ค่าเริ่มต้นแสดงแบบ expanded
- การเปลี่ยนครั้งนี้เป็น **presentation layer เท่านั้น** ไม่เปลี่ยน Section 1A scoring / KPI / source
- Commit AI Tutor UI: `8b6f2637d1e7404fe3cca9c2abc0542b6eb0d8f8`
- Commit Podcast UI: `37a482f39724fef415ba02dae2b61c6d293654c8`
- **ดำเนินการ section 1A บน `main` แล้ว**
- ปรับ AI Tutor และ Podcast จากการนับ Profile เป็นการให้คะแนนระดับรายวิชา
- ใช้ `ProfileScore` จาก Public CSV เป็น source ของคะแนนจริง
- Group ด้วย `faculty + courseCode` และเฉลี่ย ProfileScore เป็น CourseScore
- เปลี่ยน KPI / Faculty summary / Donut / Filter / Course list ให้ใช้หน่วย “รายวิชา”
- เพิ่ม Expand/Collapse เพื่อดู Profile ย่อย พร้อม ProfileScore
- แก้ filter ให้กรองหลัง Group เพื่อไม่ให้การเลือกประเภทวิชาทำให้คะแนนรายวิชาถูกคำนวณใหม่จาก Profile บางส่วน
- ตรวจ source จริงได้ 921 Profile / 767 รายวิชา
- Validation: AI Tutor 53.54% และ Podcast 34.53% ตรงกับ control figure
- Commit AI Tutor: `b3efe13befb69a94552150b28a0ce258c5b99b14`
- Commit Podcast: `81a8de21d10b883a17c3cac9c562db4b320185aa`
- เพิ่ม requirement หลักสำหรับ AI Tutor / Podcast แบบ **1 รายวิชาเต็ม 1 คะแนน**
- กำหนด key รายวิชา = `faculty + courseCode`
- กำหนด CourseScore = AVERAGE(ProfileScore ของทุก Profile ในรายวิชาเดียวกัน)
- ยืนยันให้ใช้ `AI_Tutor_Public` / `Podcast_Public` เป็น CSV Source ต่อไป ไม่ใช้ Pivot เป็น source
- กำหนด Pivot AI Tutor / Pivot Podcast เป็น Control Report สำหรับ validation
- บันทึก schema ใหม่ที่มี `ProfileScore` ก่อน `courseLink`
- บันทึกว่า ProfileScore แสดงเป็นเปอร์เซ็นต์ แต่ค่าจริงยังอยู่ในสเกล 0–1
- บันทึกว่า `691 AI Tutor` / `691 Podcast` ผ่านการคัดเกณฑ์ตัวหาร upstream แล้ว ห้ามกรองซ้ำใน Dashboard
- บันทึก control figure ล่าสุด: 921 Profile / 767 รายวิชา ทั้ง AI Tutor และ Podcast
- เพิ่ม test cases สำหรับตรวจ logic: BBA21267, BSC21467, GEC13267, BBA31367
- เพิ่มข้อห้าม hard-code จำนวนรายวิชา/คะแนนรวม
- เพิ่มคำสั่งป้องกันการทับงาน: fetch main ล่าสุดและใช้ SHA ล่าสุดก่อนแก้
- บันทึก `course-profile-scoring` / PR #2 เป็น prototype เท่านั้น ห้าม merge อัตโนมัติ

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


### 08/10/2569
- ปรับ Header หลักของหน้า GR/GS ให้เปลี่ยนตามหน้าที่เลือก: `Dashboard รายวิชา GS` และ `Dashboard รายวิชา GR`
- เพิ่ม `syncPageIdentity()` เพื่อ sync ทั้งข้อความ H1 และ browser title ตาม `activeType` เมื่อสลับ GS/GR หรือเปลี่ยน hash
- Commit GR/GS dynamic page title: `030c2b60602fc8768f7e98d54a3f41092efa9cf9`
- ปรับกราฟคณะ AI Tutor / Podcast ให้แสดงจำนวนรายวิชาจริง ไม่ใช่เปอร์เซ็นต์ 100% stacked; ความยาวแท่งเทียบกับคณะที่มีรายวิชามากที่สุด
- ปรับ Card `คะแนน KPI รวม` ใหม่เป็น Header + score/total + progress % แบบ side-by-side + progress bar
- เปลี่ยน Donut `คะแนนที่ยังขาด` จาก Gray เป็น Amber ทั้ง AI Tutor และ Podcast
- Commit AI Tutor: `c0e4ebc0cc6680bd26147ecdeb9fa8b34f1c8853`
- Commit Podcast: `35411d241e1f06ec93a961e18c0fb8c1c3c2b2dd`
- **UX KPI Card affordance (08/10/2569):** ทำให้ Card ที่กดกรองได้สื่อความเป็น interactive control ชัดขึ้นทั้ง GR/GS, AI Tutor และ Podcast
  - เพิ่ม visual cue ด้านล่างขวา: `กดเพื่อกรอง →`
  - Card “ทั้งหมด” / Card คะแนน KPI รวมที่ใช้ reset แสดง `กดเพื่อแสดงทั้งหมด →`
  - เมื่อ Card เป็นสถานะที่กำลังเลือก แสดง `กำลังกรอง ✓` หรือ `แสดงทั้งหมด ✓`
  - รักษา hover, focus-visible, keyboard Enter/Space และ Active state เดิม พร้อมใช้สี Active ตามสถานะ
  - การปรับนี้เป็น presentation/interaction affordance เท่านั้น ไม่เปลี่ยน filter logic
- **Tree hierarchy refinement (08/10/2569):** เพิ่มความชัดของลำดับ `คณะ / วิทยาลัย → รายวิชา → Course Profile` ใน AI Tutor / Podcast
  - Faculty row เด่นขึ้นด้วย Blue gradient + left accent และ count badge จำนวนรายวิชา
  - Course row ใช้พื้นฟ้าอ่อน + left accent; รหัสวิชาเด่นขึ้น และจำนวน Profile เปลี่ยนเป็น pill badge
  - Profile row ใช้ typography/สีที่เบากว่าระดับรายวิชาเพื่อให้เห็นว่าเป็นข้อมูลย่อย
  - รักษา Tree connector, Expand/Collapse และ alignment เดิม
  - ไม่เปลี่ยน CourseScore, KPI, source, grouping หรือ pagination
- Commit GR/GS KPI affordance: `1d9f7c9072e725e6e88d862559320e7d9397e7b6`
- Commit AI Tutor KPI + Tree hierarchy: `de644b9f8df56e8be1ddaca5e41ebf32e0391662`
- Commit Podcast KPI + Tree hierarchy: `089b98e92c44ff0f6e2763e933dd5078add5f84e`
- **Faculty Chart Tooltip Interaction (08/10/2569):** เพิ่ม Custom Tooltip ให้กราฟคณะทั้ง GR/GS, AI Tutor และ Podcast
  - Tooltip แสดงเมื่อ Mouse Hover และ Keyboard Focus
  - AI Tutor / Podcast แสดง: `คณะ · จำนวนรายวิชา` + `ครบ · จัดทำไม่ครบ · ไม่ทำ`
  - GR/GS แสดง: `คณะ · จำนวนรายวิชา` + `ผ่าน · ไม่ผ่าน · อยู่ระหว่างการตรวจสอบ`
  - เพิ่มข้อความ `คลิกเพื่อกรองคณะนี้` ใน Tooltip เพื่อสื่อ action
  - เพิ่ม `aria-label` ที่มี summary เดียวกับ Tooltip สำหรับ screen reader
  - เอา native browser `title` tooltip ออกเพื่อไม่ให้ซ้อนกับ Custom Tooltip
  - รักษา Click-to-filter, Keyboard Enter/Space และ filter logic เดิมทั้งหมด
  - Tooltip เป็น presentation/accessibility layer เท่านั้น ไม่เปลี่ยนข้อมูลหรือ KPI
- Commit GR/GS Faculty tooltip: `a6d2dc18867d7f97860e786b65443f138c11e5bb`
- Commit AI Tutor Faculty tooltip: `93b16537b87104d3145462a24c4a34700e1c5646`
- Commit Podcast Faculty tooltip: `8ca53bef0da53001645878e2e4b0af6677e48782`
- **GR/GS KPI Card overlap fix (08/10/2569):** แก้ข้อความคำอธิบายใต้ KPI Card ชนกับปุ่ม interaction
  - ย่อข้อความ Card `รายวิชาทั้งหมด` จาก `จากทั้งหมด n รายวิชาในหน้า GR/GS` เป็น `จาก n รายวิชาทั้งหมด` เพราะชื่อหน้าระบุ GR/GS อยู่แล้ว
  - Card สถานะ `ผ่าน / อยู่ระหว่างการตรวจสอบ / ไม่ผ่าน` ใช้คำอธิบาย `จาก n รายวิชาที่แสดง` เพื่อลดข้อความซ้ำ
  - เปลี่ยน cue `กดเพื่อกรอง → / แสดงทั้งหมด ✓` จาก absolute overlay ให้เป็น element ใน normal flow ด้านล่างขวาของ Card เพื่อไม่ให้ทับข้อความเมื่อขนาด Card หรือจำนวนตัวเลขเปลี่ยน
  - ไม่เปลี่ยน KPI/filter logic
- Commit GR/GS KPI overlap fix: `96a1e63805d433f8ba5499f14922890365236fa3`
- **AI Tutor / Podcast Criteria Modal — Minimal Executive UI (08/10/2569):** ปรับ Modal เกณฑ์การนับรายวิชาให้น้อยแต่มาก และอ่านลำดับข้อมูลได้เร็วขึ้น
  - ลดความกว้าง Modal จาก 720px เหลือ 660px และลด visual density
  - ตัด emoji ออกจากหัวข้อ ใช้ Blue accent line เล็กแทน
  - ลดขนาดปุ่มปิดและใช้เส้นกรอบบาง/พื้นโปร่ง
  - เก็บเฉพาะ `ตัวตั้ง` เป็น callout สีฟ้าอ่อน เพื่อเน้นเกณฑ์หลัก
  - `ตัวหาร` เปลี่ยนเป็น section เรียบ ไม่มี card ซ้อน ใช้ divider บาง
  - รายการข้อยกเว้นเปลี่ยนจากเลขในวงกลมเป็นเลข `01–07` แบบ muted เพื่อให้ scan เร็วและลด visual noise
  - ลดขนาด icon, typography และ spacing ให้กระชับ โดยยังคง readability
  - Footer กระชับขึ้น แต่ยังคง `ห้ามแสดงอีก` และ `เข้าใจแล้ว`
  - รักษา LocalStorage, Close, Backdrop click, Escape key และ Modal logic เดิมทั้งหมด
  - ไม่มีการเปลี่ยนเกณฑ์/ข้อความสาระสำคัญ/ข้อมูล KPI
- Commit AI Tutor criteria modal: `f82c756fd4e115259669bc31c7b65f3031b9c0ba`
- Commit Podcast criteria modal: `3db9df8a356cea612ab62cf082cc09e5592ab733`
- **Criteria Modal denominator card refinement (08/10/2569):** แก้ Section `ตัวหาร` ที่ดูคลุมเครือระหว่าง Section กับ Card ให้เป็น Neutral Card ที่ชัดเจนทั้ง AI Tutor และ Podcast
  - ใช้ geometry เดียวกับ `ตัวตั้ง`: padding / radius / grid alignment เท่ากัน
  - `ตัวตั้ง` คง Blue-tinted card เพื่อเน้นเกณฑ์หลัก
  - `ตัวหาร` ใช้พื้น neutral `#fbfcfe` + เส้นบาง `#e4eaf1` เพื่อให้เป็นรองแต่ยังเป็นกลุ่มเดียวกัน
  - เพิ่มระยะห่างระหว่างสอง Card 10px
  - Mobile ใช้ padding 14px ทั้งสอง Card เพื่อให้ alignment คงที่
  - ไม่เปลี่ยนข้อความเกณฑ์หรือ Modal logic
- Commit AI Tutor denominator card: `2ff837356cd2f75a66e6a50078caeb3b36a4be09`
- Commit Podcast denominator card: `10530233873cbb11b3992c827dfe6b3bbed8bded`
- **KPI Score Card cue cleanup (08/10/2569):** เอา visual cue `กดเพื่อแสดงทั้งหมด →` ออกจาก Card `คะแนน KPI รวม` ของ AI Tutor และ Podcast ตาม UX review
  - Card คะแนน KPI รวมกลับมาเน้นเฉพาะคะแนนที่ได้ / คะแนนเต็ม / ความคืบหน้า / Progress Bar
  - ลด bottom padding ที่เคยเผื่อพื้นที่ให้ cue จาก 40px กลับเป็น 18px
  - คง click-to-reset Status Filter และ keyboard behavior เดิมไว้; เปลี่ยนเฉพาะ visual cue
  - Card สถานะอื่นยังคง `กดเพื่อกรอง →` / active cue ตามเดิม
- Commit AI Tutor KPI score cue cleanup: `96505c1add580cf8f8c1f85aacd919db6720c7c2`
- Commit Podcast KPI score cue cleanup: `2d0f49f38456ed03f2ebaf2b441d4a76b0b958f7`
- **Advice Modal — Label naming guidance (08/10/2569):** เพิ่มคำแนะนำการตั้งชื่อ Label เพื่อให้ง่ายต่อการตรวจสอบใน Modal `คำแนะนำการจัดทำ`
  - AI Tutor: `ตั้งชื่อ Label โดยระบุคำว่า “AI Tutor” เพื่อให้ง่ายต่อตรวจสอบ`
  - Podcast: `ตั้งชื่อ Label โดยระบุคำว่า “Podcast” เพื่อให้ง่ายต่อตรวจสอบ เช่น “Podcast Week 1”`
  - AI Tutor เพิ่ม Section `แนวทางการจัดทำ` แบบสั้น 1 bullet
  - Podcast เพิ่ม bullet ใน Section `แนวทางการจัดทำ` เดิม
  - คง max-height และ `overflow:auto` ของ Modal เดิม เพื่อไม่ให้ Modal สูงเกิน viewport หลังเพิ่มข้อความ
  - ไม่เปลี่ยน KPI, scoring, source หรือคำแนะนำส่วนอื่น
- Commit AI Tutor label guidance: `ec7fb40a6113efc0efa0322203d6499464fada1c`
- Commit Podcast label guidance: `87548f63a939ccd55ffd80cb87f2a44229cbc18b`
- Follow-up wording: ตัดตัวอย่าง `AI Tutor Week 1` ออกจากคำแนะนำหน้า AI Tutor เพื่อให้ข้อความสั้นลงตาม UX review
- Commit AI Tutor wording cleanup: `1d6418dba05fb66398f7cffaf50d6a135b69f092`
- **AI Tutor / Podcast Header source summary cleanup (08/10/2569):** ปรับข้อมูลมุมขวาบนของ Header ให้อ่านง่ายและเป็นลำดับ 3 บรรทัด
  - บรรทัด 1: `สำนักการจัดการศึกษาออนไลน์ (OOE)`
  - บรรทัด 2: `n รายวิชา (n Profile)` โดยคำนวณ Dynamic จากข้อมูลที่โหลดจริง
  - บรรทัด 3: `ข้อมูลอ้างอิง ณ วันที่ 05/10/2569`
  - ตัดข้อความ `ดึงข้อมูลเมื่อ <วันที่> <เวลา>` และจุดสถานะสีเขียวออกจาก Header เพื่อลด visual noise
  - ระหว่างโหลด บรรทัดสรุปแสดง `กำลังโหลดข้อมูลออนไลน์...`; กรณีโหลดผิดพลาดยังแสดง error message ที่ตำแหน่งเดิม
  - ไม่ hard-code จำนวนรายวิชา/Profile และไม่เปลี่ยน data/KPI logic
- Commit AI Tutor header source summary: `55586b926d18487b8c470d60c3fc38a6d53cfc1a`
- Commit Podcast header source summary: `201c21a91fd2e14ba3490ed9b0cdbcce9a84f6e4`
- **Header source status pulse (08/10/2569):** เพิ่มจุดสถานะสีเขียวไว้หน้าบรรทัด `ข้อมูลอ้างอิง ณ วันที่ 05/10/2569` ของ AI Tutor และ Podcast
  - ใช้จุดสีเขียวขนาดเล็กพร้อม pulse animation แบบเบา `1.8s ease-in-out infinite`
  - Desktop จัดชิดขวาตาม Header เดิม; Mobile จัดชิดซ้ายตาม layout responsive
  - รองรับ `prefers-reduced-motion`: ปิด animation และคงจุดสีเขียวแบบนิ่ง
  - ไม่เพิ่มข้อความเวลาโหลดกลับมา และไม่เปลี่ยนข้อมูล/KPI logic
- Commit AI Tutor source status pulse: `dd840709337b7139e4a41a848ce5fef190c02af8`
- Commit Podcast source status pulse: `cab12daec2757c32c42a02b1d613dfae1dc443fa`
- **GR/GS Header source summary + pulse alignment (08/10/2569):** ปรับ Header หน้า GR/GS ให้ใช้รูปแบบเดียวกับ AI Tutor / Podcast
  - บรรทัด 1: `สำนักการจัดการศึกษาออนไลน์ (OOE)`
  - บรรทัด 2: `n รายวิชา` โดยคำนวณ Dynamic ตาม `activeType` ปัจจุบัน (GR หรือ GS)
  - บรรทัด 3: จุดสถานะสีเขียวแบบ pulse + `ข้อมูลอ้างอิง ณ วันที่ 05/10/2569`
  - ตัดข้อความ `ดึงข้อมูลเมื่อ <วันที่> <เวลา>` ออกจาก Header
  - เมื่อสลับ GR/GS จำนวนรายวิชาใน Header เปลี่ยนตามหน้าปัจจุบันอัตโนมัติ
  - Desktop จัดชิดขวา; responsive <=950px จัดชิดซ้าย
  - รองรับ `prefers-reduced-motion` โดยปิด pulse animation
  - ไม่เปลี่ยน KPI, filter, chart หรือ data logic
- Commit GR/GS header alignment: `f01453a7f7fa916858f58c1ecb97a48b78ff0a49`

---

## 08/10/2569 — Bilingual Dashboard Phase 1 (Review Branch)

> **สถานะ: อยู่บน branch `feature/bilingual-dashboard` เท่านั้น ยังไม่ merge เข้า `main` และยังไม่กระทบ GitHub Pages production**

### เป้าหมาย

รองรับ Dashboard ภาษาไทย / อังกฤษในระบบเดียว โดยไม่สร้าง logic หรือ data pipeline แยกอีกชุด เพื่อให้ตัวเลข KPI, Filter, Chart และ Table ของ TH/EN ใช้ข้อมูลเดียวกัน 100%

### สิ่งที่ Implement แล้วใน Phase 1

- เพิ่ม shared i18n core: `assets/ooe-i18n.js`
- เพิ่ม Language Switcher `TH | EN` ใน Header ของหน้า GR/GS
- ภาษาเริ่มต้นยังเป็นภาษาไทย
- รองรับ URL `?lang=en` / `?lang=th`
- จำภาษาที่เลือกด้วย `localStorage` key `ooe_dashboard_language_v1`
- เมื่อสลับภาษา URL จะอัปเดต query `lang` โดยรักษา hash `#GR / #GS` และ query parameter อื่น
- แปล UI หน้า GR/GS ทั้ง Static และ Dynamic ได้แก่:
  - Header / Academic Year / Source reference date
  - Navigation
  - Filter labels / Search placeholder / Buttons / Options
  - KPI Card labels / notes / filter cues / title attributes
  - Faculty Chart title / description / legend / tooltip / aria-label
  - Donut title / description / legend
  - QR source description + alt text
  - Table header / Semester / Status / Note / Links
  - Result count / Pagination / Empty / Loading / Error state
  - Footer note
  - Auth chip / Sign Out
- วันที่อ้างอิงเก็บใน i18n core เป็น ISO `2026-10-05`
  - TH แสดง `05/10/2569`
  - EN แสดง `05/10/2026`
- จำนวนและตัวเลขใช้ formatter ตามภาษา
- Browser title เปลี่ยนตามภาษาและหน้า เช่น `GS Course Dashboard | OOE 2026`

### หลักความปลอดภัยของ Logic

- **ห้ามแปล Internal Value ที่ใช้คำนวณ/Filter**
- ค่า Source และ comparison logic ต่อไปนี้ยังคงเดิม:
  - `ผ่าน`
  - `ไม่ผ่าน`
  - `อยู่ระหว่างการตรวจสอบ`
  - `เนื้อหาและองค์ประกอบมากกว่า 50%`
  - `เนื้อหาและองค์ประกอบน้อยกว่า 50%`
  - `ไม่มีเนื้อหา`
- ภาษาอังกฤษเป็น Presentation Layer เท่านั้น
- Google Sheet / CSV URL / Mapping / KPI / Pagination / Chart calculation ไม่ได้เปลี่ยน

### Faculty / College English Names

Phase 1 **ยังไม่เดาชื่อภาษาอังกฤษของคณะ/วิทยาลัยจากชื่อไทย**  
`OOEI18n.faculty()` จะ fallback เป็นชื่อจาก Source เดิม จนกว่าจะมี Official SPU English Name Mapping ที่ยืนยันแล้ว เพื่อหลีกเลี่ยงชื่อหน่วยงานผิด

### QA ที่ตรวจแล้ว

- Translation key ที่หน้า GR/GS เรียกใช้มีครบทั้ง TH และ EN
- JavaScript syntax ของ `assets/ooe-i18n.js` ผ่าน
- Inline JavaScript ทั้งหมดใน `index.html` ผ่าน syntax check
- Query language priority ทำงาน: `?lang=en` override ค่า saved language
- LocalStorage persistence ทำงาน
- URL update รักษา query อื่นและ `#GS/#GR`
- Reference year เปลี่ยน Buddhist Era / Gregorian ถูกต้อง
- Internal Thai data values ยังอยู่ครบและไม่ถูกเปลี่ยนเป็น English
- KPI / Chart / Table dynamic wording ใช้ i18n แต่ calculation เดิม

### Scope ที่ยังไม่ทำใน Phase 1

- `ai-tutor.html` และ `podcast.html` ยังไม่ได้เปิดใช้ EN UI
- `login.html` ยังไม่ได้เปิดใช้ Language Switcher
- Official Faculty/College English Name Mapping ยังรอยืนยัน
- ยังไม่ merge เข้า `main`; ต้องให้ผู้ใช้ตรวจ/อนุมัติก่อน

### Branch

`feature/bilingual-dashboard`



## 08/10/2569 — Bilingual Phase 2 & Animated Language Switch (main)

- Implemented bilingual presentation adapter for `ai-tutor.html` and `podcast.html` via `assets/ooe-page-i18n.js`, reusing `assets/ooe-i18n.js` language preference and URL handling (`?lang=en`, localStorage).
- Adapter translates visible DOM text, attributes, status labels, dynamic faculty charts, generated tables, pagination, error/loading messages, KPI notes and criteria/advice modals. It does NOT mutate CSV data, internal `select.value`, grouping, ProfileScore, CourseScore, or KPI calculations.
- New shared `assets/ooe-language-switch.css` implements `TH | EN` sliding segmented control (`::before` animated thumb), reduced-motion fallback and responsive layout.
- Across `index.html`, `ai-tutor.html`, `podcast.html`, Header places the language switch **to the right of** the 3-line source summary on desktop; mobile uses flex space-between with wrapping safeguards.
- New AI Tutor/Podcast header loads shared i18n core before a deferred bilingual adapter; source reference date changes Buddhist/Gregorian via `OOEI18n.referenceDate()`.
- Official faculty English names remain fallback-to-source until verified mapping. Course teacher names and raw course details remain unmodified.
- Static JS syntax checks passed for the shared adapter and all inline scripts in the three dashboard pages. Browser visual/functional QA on deployed site still recommended.
- Commits: CSS `08cb50e6b92dce26265cd2041cdf2ef94ac96c54`, adapter `ebdaf47333ef759407e7b9ec4d7faed39dac31cd`, GR/GS `305de9f3797b9f97871ddbf22bbab9c7be52fe50`, AI Tutor `368d7bf3536b6718d3c45b06769baa234f03bd03`, Podcast `2b3f1439c1dd3f0dea76cda56a796ed9bb36398f`.


## 08/10/2569 — Mobile UX improvements (main)

- User approved mobile-only adjustments with a strict requirement not to affect the main/desktop dashboard.
- Added isolated stylesheet `assets/ooe-mobile.css` (commit `8e7c438762b355fdcb6b9ee1cda958b99e637756`) referenced **after** the existing styles on all dashboard pages:
  - GR/GS `index.html`: `647296787c3857b1c8004978ed185b2e155cbe26`
  - AI Tutor `ai-tutor.html`: `06e128922f12c7a95e9b014f410c242e09fddcc1`
  - Podcast `podcast.html`: `a7717efa690fee4c60db655c6dae7bc48a2de26e`
- Scoped to mobile/tablet media queries at `max-width:950px`, `650px` and `390px`; **no desktop CSS or JS/data calculation changes**.
- GR/GS Navigation is now 2-column at <=650px to prevent the old 4-column 112px minimum overflow; shared styling also benefits AI Tutor and Podcast navigation.
- Header source summary and language switch gain reliable width, wrapping and touch-target improvements; maintains TH/EN slider motion.
- Filter actions and pager buttons use larger mobile tap targets; KPI/chart labels can wrap.
- Tables retain original column structure, grouping and filter interactions, with contained horizontal touch scrolling; a dedicated card-view conversion was deliberately avoided to minimize regression risk.
- Criteria/advice modals have safer viewport-constrained sizing and scrolling on mobile.
- Static checks completed: all three HTML files reference new CSS once; all inline script syntax checks passed; course grouping and GR/GS data selector preserved. Actual interactive browser/device screenshot QA (320/375/390/768px, TH/EN) remains a follow-up and must not be claimed as tested.


## 08/10/2569 — Google Session Recovery (Phase 1)

- Issue: Google ID Token was treated as the sole client-side session credential. On expiry, requireAuth() immediately redirected to login; no refresh/re-authentication.
- Implemented in `auth.js` on branch `fix/google-session-recovery`:
  - Attempts a fresh credential via Google Identity Services when stored token is expired, instead of redirecting immediately.
  - Checks again when returning to the tab and schedules renewal shortly before expiry (90 seconds).
  - Re-authentication uses Google Identity Services; no extension of `exp`, bypass of email/domain/audience checks, or fake token.
  - Falls back to the regular Google Sign-In button if silent recovery fails (Google/FedCM/browser-dependent).
  - Preserves destination page, hash and query language in `login.html?next=...` and validates local destination allowlist.
  - Explicit Sign Out disables Google auto selection and skips automatic prompting on that logout visit.
  - Bounded GIS loading/prompt attempts (8 seconds) to avoid infinite loops.
- Client-only validation still decodes JWT without server-side signature verification and is **not equivalent to secure backend access control**. For truly private course data use server-validated sessions and HttpOnly cookies.
- No dashboard HTML, KPI, data, filter, or spreadsheet logic changed.
- QA: JavaScript syntax checked; browser verification on live Google Identity Services still needed.


## 09/10/2569 — Course Profile Count multi-select (AI Tutor / Podcast)

- User approved replacing the single-select `จำนวน Profile` control with a compact checkbox dropdown for **AI Tutor and Podcast only**.
- New shared component `assets/ooe-profile-count-filter.js`, styled by `assets/ooe-profile-count-filter.css`, loaded in `ai-tutor.html` / `podcast.html`. GR/GS and desktop layout outside this filter were not modified.
- Data-dependent options still originate from `groupCourses(DATA).map(g => g.profileCount)`: sorted actual Profile counts, not hard-coded. Course grouping remains **faculty + courseCode**; CourseScore = mean of ProfileScore, unchanged.
- Multi-select semantics: no selected option = `ทั้งหมด` (all); one or more selected counts = OR match, e.g. 1+2 Profile shows courses where `g.profileCount` is 1 **or** 2; selecting every option also normalizes to all. Unchecking the last option returns to all.
- Filter updates immediately on checkbox change. UI summary indicates one Profile or "เลือก N รายการ"; no extra Apply step. Global "ล้างตัวกรอง" resets the multi-select too.
- Dropdown accessible with native checkboxes, keyboard focus, outside-pointer close, Escape close/focus return, Done close; mobile touch targets and scrollable option list. Data refresh reconciles selected counts against available counts.
- `assets/ooe-page-i18n.js` enhanced with TH→EN labels for the new control and selected-count messages. The raw data values / select values for all other filters are unchanged.
- Dynamic table, KPI, faculty chart and donut continue using existing `filtered()` results. KPI, ProfileScore, CourseScore, CSV parsing, course grouping, search, status and faculty filters untouched.
- Branch: `feature/profile-count-checkbox`. QA: JS syntax checks for new shared component, translated adapter and dashboard inline scripts; simulated multi-select interactions (single, multiple, deselect last, option refresh, keyboard Escape, reset) passed. Live authenticated browser/visual tests remain unverified; verify on mobile and TH/EN after GitHub Pages refresh.


## 09/10/2569 — Unified Filter Dropdown UX (GR / GS / AI Tutor / Podcast)

- User requested other Dashboard filters to adopt the attractive styling from the Profile-count checkbox dropdown, **without making every filter a checkbox**.
- Selected UX according to data type:
  - `คณะ / วิทยาลัย` = **single-select with in-dropdown search**, because faculty list is long; selection is exclusive.
  - `ประเภทรายวิชา`, `สถานะ AI Tutor/Podcast`, `ความคืบหน้า`, `สถานะการตรวจสอบ` = **single-select listbox** with a visual checkmark on the current choice, NOT multi-checkbox.
  - `จำนวน Profile` on AI Tutor/Podcast **retains the existing multi-checkbox**, allowing 1 + 2 etc.
  - Text search remains a text input with consistent hover/focus styling.
- Added shared assets `assets/ooe-single-select.css` and `assets/ooe-single-select.js` loaded by `index.html`, `ai-tutor.html`, `podcast.html`.
- The ORIGINAL native `<select>` objects remain present and authoritative (with their IDs, options, values, listeners and programmatic assignments unchanged). JS enhances the presentation; selecting an item writes `select.value` and dispatches a native bubbling `change` event, triggering the existing KPI/filter render path.
- Dashboard `render()` now calls `window.OOESingleSelect?.syncAll()` **only for UI synchronization**, because chart click, KPI click and reset can change select values programmatically without change events. There is no new data filter logic.
- Menu supports outside-click and Escape dismissal, selected value display, keyboard up/down/home/end, accessible labels/roles, no-results messaging, scrollable options, faculty search, mobile touch sizing, reduced-motion preference and viewport-edge-aware positioning.
- Menu presentation is bilingual: `ooe-single-select.js` reads `OOEI18n.getLanguage()` for static UI/status labels, while leaving faculty, course type, and exact raw select values untouched. `assets/ooe-page-i18n.js` skips dynamically owned menu nodes to avoid two translators overwriting each other. GR/GS translations still use the existing `OOEI18n.t()` keys.
- Existing GR/GS, AI Tutor, Podcast CSV sources, faculty+courseCode grouping, ProfileScore/CourseScore, status values, KPI calculations, chart/table rendering and Profile multi-select behavior remain unchanged.
- Branch: `feature/unified-filter-dropdown-ui`. QA: syntax checks for shared JS, i18n adapter and all three inline scripts; mocked native-select interaction verified that picking GS dispatched a change and retained the value, programmatic status selection synced the UI, EN label and searchable faculty filtering worked. Actual authenticated browser and visual/mobile QA remains unverified; check after Pages publishes.


## 09/10/2569 — Hotfix: AI Tutor / Podcast unresponsive after filter redesign

- Symptom reported: AI Tutor and Podcast stopped responding after the unified filter dropdown release (PR #6).
- Root cause: feedback loop between `assets/ooe-page-i18n.js` `MutationObserver(document.body)` and `assets/ooe-single-select.js` `MutationObserver(document.documentElement lang)`.
  1. The translation adapter wrote `document.documentElement.lang` even when unchanged.
  2. The dropdown language observer then called `syncAll()`, which unconditionally assigned the current label `textContent` (creating a fresh DOM mutation even if identical), and sometimes recreated the open option list.
  3. The translation adapter observed this mutation and wrote `lang` again, repeating without stopping and starving page interaction.
- Fix isolated to **2 shared JS files**:
  - `assets/ooe-page-i18n.js`: only assign the HTML language when it actually differs.
  - `assets/ooe-single-select.js`: only write dropdown visible text, placeholder, accessible name and disabled state when different; rebuild options only if source options/selected value changed, or when intentionally opening the menu.
- AI Tutor/Podcast dropdown selection, GR/GS presentation, status/teacher data, CSV, filters, course grouping, CourseScore, KPI and Profile checkbox multi-select logic remain unchanged.
- QA: JS syntax checks passed; isolated interaction simulation confirmed 15 consecutive `syncAll()` calls produce zero redundant visible-label writes, choosing faculty dispatches one change, programmatic status change updates the visible control, and EN translation works.
- Live authenticated browser end-to-end test remains pending; if symptoms persist collect Browser Console errors and reproduce on device.
- Implemented on `fix/dropdown-observer-freeze`, approved emergency fix to be merged to main with Handoff.


## 09/10/2569 — GR/GS dynamic content-progress wording from Google Sheets

- User changed public source progress wording (column `ปริมาณเนื้อหารายวิชา`, mapped to `r.progress` in `GRGS_Public`) from earlier `เนื้อหาและองค์ประกอบมากกว่า/น้อยกว่า 50%` to `พบเนื้อหาในระดับมาก` and `พบเนื้อหาในระดับน้อย`. Previously the GR/GS Dashboard used exact-string status equality, falsely displaying **รอข้อมูล** for recognized new values.
- New shared, pure normalization helper `assets/ooe-progress.js` maps content-progress source text (whitespace/Unicode normalized) into stable **internal keys**: `good`, `low`, `none`, `pending`, `unknown`.
  - Recognized terms: old threshold-based terms and new high/low-volume wording, `ไม่มีเนื้อหา`/`ไม่พบเนื้อหา`, and carefully selected variants. No arbitrary guessing for new semantics.
  - Unrecognized non-empty strings, contradictory phrases or unsupported new category words are **unknown**, NOT silently `pending`, `good`, `low` or `none`.
  - Empty or explicitly pending source status is `pending`.
- `index.html` stores `ข้อความความคืบหน้าต้นฉบับ` per row, plus normalized `ความคืบหน้าการทำ`. GR/GS progress filtering, donut counts, badges and notes use the stable key; Thai badges show each row's original label exactly, and Thai filter/donut legend chooses the most common source label for each semantic category on the active GR or GS tab. English uses stable translated categories from `assets/ooe-i18n.js`, not unvalidated machine translation of novel Thai strings.
- The Dashboard auto-adjusts whenever **fresh CSV is loaded on page open or on `อัปเดตข้อมูล`**; it does not receive push updates while idle. When new source wording carries a recognized semantic signal, labels and status calculations update without GitHub changes.
- Unknown values are separately counted in Donut as gray and show a visible warning beneath the filters with the count and top example raw labels; add `ตรวจสอบข้อความ` / `Unrecognized Status` to the progress filter only when unknown source rows exist, to make auditing possible. Pending rows are also separately filterable when present.
- ***Guardrail:*** If future source text no longer contains any recognized high/low/none signals, a dashboard cannot reliably infer meaning from arbitrary prose. The fallback warning intentionally requires human confirmation or a mapping update instead of false KPI classification.
- Scope: GR/GS only; no changes to faculty KPI pass/review/fail calculations, review status, faculty chart or CSV source, AI Tutor/Podcast, auth or shared select filtering. Updated the localized canonical English/Thai fallback progress labels and explanatory text.
- QA: JS syntax passed for the new module, 3 inline scripts in `index.html`; 24 classification cases passed including old and new labels, ambiguous and unknown statuses, Thai/English variants and missing values; original review KPI predicate unchanged. Browser visual/authenticated end-to-end testing remains pending.


## 09/10/2569 — GR/GS course content volume column title

- User requested the **GR/GS result table column heading only** change from `ความคืบหน้า` to `ปริมาณเนื้อหารายวิชา`, aligning with Google Sheets source column wording.
- Updated `index.html` column `<th data-i18n="table.progress">` Thai text and `assets/ooe-i18n.js` dictionary key `table.progress`: Thai `ปริมาณเนื้อหารายวิชา`, English `Course Content Volume`.
- **Scope intentionally excludes** filter label `ความคืบหน้า`, Donut title, progress classifier, source column keys, CSV parsing, status logic, KPI, GR/GS result rows, AI Tutor/Podcast and styling.
- Validation: HTML inline JS and i18n file syntax passed; table heading anchor updated and filter title unchanged.


## 13/10/2569 — Compact course detail tables and semester-qualified headings

- User requested a cleaner course-details section across all dashboards, using concise headings:
  - GR: `รายละเอียดรายวิชา GR 1/2569`
  - GS: `รายละเอียดรายวิชา GS 1/2569`
  - AI Tutor: `รายละเอียดรายวิชา AI Tutor 1/2569`
  - Podcast: `รายละเอียดรายวิชา Podcast 1/2569`.
- In GR/GS (`index.html`) **remove only the visible results-table columns** `ภาคเรียน` and `ปริมาณเนื้อหารายวิชา` (matching their corresponding table-body cells). Table decreases 12 to 10 columns; its minimum width changes from 1180px to 980px so the reduced table is more usable on smaller screens. `renderTable` still lists all other columns in original order.
- The semester is displayed in the course-details heading using the existing `table.semesterValue` translation: `1/2569` TH / `1/2026` EN. `assets/ooe-i18n.js` changes the `detail.title` template to `รายละเอียดรายวิชา {type} {semester}` / `{type} Course Details {semester}`. The existing GR/GS tab change and TH/EN re-render functions update the title automatically.
- AI Tutor and Podcast **already had neither semester nor content-volume columns** in their course tables; preserve all 8 columns and Profile expand/collapse rows. Change only each static course-details heading. `assets/ooe-page-i18n.js` now translates these complete Thai titles to `AI Tutor Course Details 1/2026` and `Podcast Course Details 1/2026`.
- Keep all source data (including raw content-progress fields), CSV mapping, status normalization, progress filters, GR/GS donut/KPI, AI Tutor/Podcast CourseScore/ProfileScore, grouping, charts, authentication and course navigation unchanged.
- Branch `ui/course-details-heading-semester-2569`. Static QA: GR/GS table has exactly 10 headings and no semester/progress table cells; its filter/donut code still references progress; AI Tutor/Podcast retain eight-column table structures; all inline script syntax and bilingual translation modules pass. Browser-based live/responsive visual verification remains recommended.


## 15/10/2569 — GR/GS course criteria announcement link

- User requested a quick-access button in the **รายละเอียดรายวิชา GR / GS** table header to open the university announcement / course-preparation criteria folder.
- Added an outlined document-style external link button in `index.html`, positioned beside the result count within `.table-actions`.
- Destination (user-provided): `https://drive.google.com/drive/folders/1ROpp-UgUJHhUZ_e5OwFkJ5IUnu6a54FL?usp=sharing`.
- Thai label: `ดูประกาศเกณฑ์การจัดทำรายวิชา`; English label in `assets/ooe-i18n.js`: `View Course Preparation Criteria Announcement`.
- Opens in a new tab with `target="_blank"` + `rel="noopener noreferrer"`. Includes accessible label and a small document icon.
- Responsive behavior: desktop keeps the link on the right side of the course-details header; <=650px stretches the header area and uses a 44px minimum touch target with wrapping text if needed.
- Scope: GR/GS only. No changes to table rows/columns, filters, KPI, charts, CSV mappings, progress logic, authentication, AI Tutor or Podcast.
- Static QA: inline JS syntax passed; link appears once; TH/EN i18n keys present; mobile CSS is scoped to the new button/header area. Live authenticated browser visual QA still recommended.


## 15/10/2569 — Compact GR/GS criteria button and hidden result-count label

- User requested removal of the visible course-count text in the GR/GS course-details header (e.g. `แสดง 40 จาก 40 วิชา`) and a shorter, clearer criteria button label.
- `#resultCount` remains in the DOM but is now `hidden aria-hidden="true"`, so existing loading/error/render JS can safely write to it without showing the text or breaking references.
- Button Thai label changed to `เกณฑ์การจัดทำรายวิชา`; English changed to `Course Preparation Criteria`.
- Mobile `.table-actions` now right-aligns the single visible action button.
- Added a version query to the GR/GS `assets/ooe-i18n.js` script URL to force browsers to fetch the updated dictionary. This addresses the observed case where the page showed the raw key `detail.criteriaAnnouncement` after HTML deployed ahead of cached i18n JS.
- Destination URL, icon, new-tab behavior and all Dashboard logic remain unchanged. Scope: GR/GS header presentation only.


## 15/10/2569 — GR/GS review status: “ไม่พบเนื้อหา”

- Source change confirmed in the live Google Sheet: `69/1-GR` and published `GRGS_Public.reviewStatus` now include a fourth review status `ไม่พบเนื้อหา` (example: ALB235). This is a **review-status value**, distinct from the course-content-volume/progress classifier.
- Prior Dashboard behavior recognized only `ผ่าน`, `อยู่ระหว่างการตรวจสอบ`, `ไม่ผ่าน`; therefore `ไม่พบเนื้อหา` fell through to a dash in the table and was absent from the review-status filter.
- Added `REVIEW.noContent = 'ไม่พบเนื้อหา'` in `index.html`.
  - Included as a selectable `สถานะการตรวจสอบ` filter value.
  - Renders as a gray `ไม่พบเนื้อหา` badge in the GR/GS details table.
  - TH/EN: `ไม่พบเนื้อหา` / `No Content Found`.
- **KPI guardrail:** `ไม่พบเนื้อหา` remains a separate status. It is NOT automatically counted as `ไม่ผ่าน`, `ผ่าน`, or `อยู่ระหว่างการตรวจสอบ` because the user has not defined its KPI treatment. Total-course KPI still includes the row because it is part of the filtered course set; the three review-status KPI cards remain exact-match counts of their original statuses.
- Faculty stacked bars remain Pass/Fail only. Tooltip/ARIA summaries now count `อยู่ระหว่างการตรวจสอบ` and `ไม่พบเนื้อหา` separately instead of lumping both into the old remainder calculation. Chart description explicitly states both excluded statuses.
- Updated `assets/ooe-i18n.js` and versioned the GR/GS i18n script URL so the new bilingual label is not hidden by browser cache.
- Scope: GR/GS only. No change to content-progress normalization, CSV source/mapping, pass/fail KPI definitions, AI Tutor/Podcast, authentication, or table columns.


## 15/10/2569 — GR/GS table: วันที่ระบบสร้างรายวิชา

- User requested a new visible column `วันที่ระบบสร้างรายวิชา` in the GR/GS course-details table, based on the existing source field `createdDate`.
- Current source verified in the exact Google Sheet `GRGS_Public`: header `createdDate` is present and values are timestamps such as `2026-09-10 11:04:56`. `index.html` already mapped this field internally to `วันที่สร้างรายวิชา`; no source schema change was required.
- Added the new table column immediately after `รหัสรายวิชาในระบบ` and before `คณะ / วิทยาลัย`.
- Display is date-only for readability:
  - Thai: `DD/MM/BBBB` (Gregorian source year + 543), e.g. `10/09/2569`.
  - English: `DD/MM/YYYY`, e.g. `10/09/2026`.
  - Missing dates display `—`; an unrecognized non-empty source format falls back to the raw value rather than guessing.
- Added i18n key: TH `วันที่ระบบสร้างรายวิชา`, EN `Course Created Date`. Versioned the GR/GS i18n script URL to avoid a stale dictionary in browser cache.
- GR/GS results table changes from 10 visible columns to 11. Minimum table width changes from 980px to 1100px; existing horizontal scrolling remains available on narrow/mobile screens.
- No changes to CSV source, KPI, filters, review-status logic, progress normalization, charts, pagination, AI Tutor, Podcast, or authentication.


## 16/10/2569 — GR/GS KPI Card: “ไม่พบเนื้อหา”

- User requested a fifth clickable KPI card for review status `ไม่พบเนื้อหา`, using a restrained color not already used by the existing blue / green / amber / red cards.
- Added a **muted slate-violet** KPI card (`--violet: #7467a8`) labeled `ไม่พบเนื้อหา` / `No Content Found`. The card uses the same accessible click/keyboard behavior as existing KPI cards and sets `reviewFilter = REVIEW.noContent`.
- Desktop KPI layout becomes 5 columns. To avoid cramped cards, <=1250px uses 3 columns, <=950px remains 2 columns, <=650px remains 1 column.
- **Current exact source verified 16/10/2569** from Google Sheet ID `1q8Dfe2f79ehjk7NsefGGYP6UduajKJDV7E79w1_fKMg`:
  - Dashboard reads published sheet `GRGS_Public`, column **P** header `reviewStatus`.
  - Upstream GR source is `69/1-GR`, column **W** header `สถานะการตรวจสอบ`.
  - Upstream GS source is `69/1-GS`, column **W** header `สถานะการตรวจสอบ`.
  - Current published data contains **12** `ไม่มีเนื้อหา` rows, all in GR, and **0** literal `ไม่พบเนื้อหา` rows.
- To make the Dashboard resilient to wording drift, `normalizeReviewStatus()` maps BOTH `ไม่มีเนื้อหา` and `ไม่พบเนื้อหา` to canonical internal `REVIEW.noContent = 'ไม่พบเนื้อหา'`. This normalization applies before filtering/KPI/chart/table rendering.
- `setKpis()` now counts exact normalized `REVIEW.noContent` rows into `#noContentKpi`; the card's note uses the same visible-row denominator text as the other review-status KPI cards.
- Existing KPI semantics remain unchanged:
  - `ผ่าน` exact-match count only.
  - `อยู่ระหว่างการตรวจสอบ` exact-match count only.
  - `ไม่ผ่าน` exact-match count only.
  - `ไม่พบเนื้อหา` is separate and is **not** added into `ไม่ผ่าน`.
- Versioned GR/GS i18n asset to `?v=20261016-no-content-kpi`; added TH/EN card tooltip text.
- Scope: GR/GS only. No changes to AI Tutor/Podcast, progress-volume KPI/donut logic, CSV URL, course grouping, authentication, evidence/course links, or table data columns.


## 16/10/2569 — Align GR/GS status colors with KPI cards

- User requested the colors used in the GR/GS **review-status table badges** and **content-progress donut** to follow the same visual direction as the KPI cards.
- Existing alignment retained:
  - `ผ่าน` = green.
  - `อยู่ระหว่างการตรวจสอบ` = amber.
  - `ไม่ผ่าน` = red.
- Changed `ไม่พบเนื้อหา` / normalized `ไม่มีเนื้อหา` visual color from gray/red to the same muted slate-violet used by the KPI card: `--violet: #7467a8`.
  - Review-status table badge `.review-badge.no-content` now uses a pale violet background with violet text.
  - Content-progress Donut segment for `STATUS.none` now uses `var(--violet)` instead of red.
  - Donut legend for `ไม่มีเนื้อหา` / `ไม่พบเนื้อหา` uses `.dot.violet`.
  - Generic content-progress `STATUS.none` badge class is also violet for consistency if that badge is displayed again in future.
- `pending` / unrecognized states remain gray so they are visually distinct from the explicit no-content status.
- Scope is color presentation only. No changes to status normalization, KPI counts, filters, source data, chart denominators, AI Tutor/Podcast, or authentication.
- Static QA: all three inline scripts in `index.html` parse successfully.


## 16/10/2569 — GR/GS failed-course note wording

- User requested a clearer but shorter note for rows where `สถานะการตรวจสอบ = ไม่ผ่าน`.
- Selected Thai wording: `ปรับปรุงรายวิชาตามเกณฑ์` (shorter than `ปรับปรุงรายวิชาให้เป็นไปตามเกณฑ์`, while keeping the action and subject explicit).
- English: `Revise course to meet the criteria`.
- Note priority in `index.html` now checks **review status first**:
  - If `REVIEW.fail` → show `note.reviewFail`.
  - Otherwise fall back to the existing content-progress notes (`ไม่พบเนื้อหาในรายวิชา`, `ควรเพิ่มเนื้อหา`, pending/unknown).
- This prevents failed rows from showing a narrower content-only recommendation such as `ควรเพิ่มเนื้อหา` when the review result indicates broader course improvement is required.
- Scope is GR/GS table note wording/priority only. No change to KPI counts, review-status normalization, filters, charts, source data, evidence links, AI Tutor/Podcast, or authentication.
- Versioned GR/GS i18n asset to `?v=20261016-fail-note` to avoid stale browser translations.


## 16/10/2569 — GR/GS faculty bar includes “ไม่พบเนื้อหา” + balanced chart proportions

- User requested the GR/GS faculty stacked bar to include the result represented by the `ไม่พบเนื้อหา` KPI card and asked the faculty-bar / content-donut presentation to feel more balanced at the same visual level.
- Faculty bar status set is now:
  - `ผ่าน` = green
  - `ไม่ผ่าน` = red
  - `ไม่พบเนื้อหา` (including normalized source `ไม่มีเนื้อหา`) = muted slate-violet `--violet: #7467a8`
  - `อยู่ระหว่างการตรวจสอบ` remains excluded from the bar because it is not a final review result.
- `renderChart()` now treats `REVIEW.noContent` as part of the charted/reviewed denominator used for bar width and faculty row inclusion. A faculty with only no-content outcomes is therefore visible instead of disappearing from the chart.
- Stacked segment order is Pass → Fail → No Content. Tooltip / ARIA summary still reports all four statuses separately.
- Right-side fraction remains `ผ่าน / จำนวนผลตรวจที่แสดงในแท่ง`; the denominator now equals `ผ่าน + ไม่ผ่าน + ไม่พบเนื้อหา`, still excluding under-review rows.
- Chart legend and TH/EN description now explicitly include `ไม่พบเนื้อหา / No Content Found`. Empty-state wording updated accordingly.
- Layout balance:
  - desktop chart columns changed from `2fr : .8fr` to approximately `1.55fr : 1fr`, keeping enough width for faculty labels while giving the donut card more presence.
  - `.charts-grid` now uses `align-items: stretch`; both chart cards occupy the same row height on desktop.
  - the donut card is a vertical flex container and `.donut-body` can expand, so donut content stays visually balanced when the faculty chart is taller.
  - <=1100px behavior remains a single-column chart layout.
- Scope: GR/GS visualization only. No changes to KPI values, source normalization, filters, table data, AI Tutor/Podcast, or authentication.
- Versioned GR/GS i18n asset to `?v=20261016-chart-balance`.


## 16/10/2569 — AI Tutor / Podcast: course criteria button + hidden top result count

- User requested the course-details header on both `ai-tutor.html` and `podcast.html` to match the GR/GS pattern.
- Added the outlined document action **`เกณฑ์การจัดทำรายวิชา`** beside the course-details heading area on both pages.
  - English through `assets/ooe-page-i18n.js`: `Course Preparation Criteria`.
  - Destination is the same user-provided university criteria folder used by GR/GS:
    `https://drive.google.com/drive/folders/1ROpp-UgUJHhUZ_e5OwFkJ5IUnu6a54FL?usp=sharing`.
  - Opens a new tab with `target="_blank"` and `rel="noopener noreferrer"`.
  - Uses the same document icon / outlined blue treatment as the GR/GS action.
- Removed the visible top text such as `แสดง 767 จาก 767 รายวิชา` by keeping each page's `#resultCount` element in the DOM with `hidden aria-hidden="true"`.
  - Existing loading and render functions may continue writing to `#resultCount` safely; no JavaScript references were removed.
  - Bottom pagination/page information (`แสดงคณะ ...`) remains visible because it identifies the current page and faculty range.
- Responsive behavior:
  - Desktop action stays right-aligned in the table header.
  - <=650px table header stacks cleanly; action remains right-aligned with a minimum 44px touch target and wrapping label support.
- Versioned `assets/ooe-page-i18n.js` on both pages to `?v=20261016-course-criteria` so the new translation is not masked by browser cache.
- Scope is presentation only. No changes to AI Tutor/Podcast `ProfileScore`, `CourseScore`, course grouping, profile expand/collapse, filters, KPI, faculty chart, donut, source CSV, FACULTY_PAGE_SIZE, pagination logic, or authentication.
- Static QA: all inline scripts in both pages parse successfully; the criteria URL appears once on each page; `#resultCount` remains addressable but hidden; shared page-i18n syntax passes.


## 16/10/2569 — Reference date updated to 15/10/2569 on all Dashboard pages

- User requested changing the displayed source reference date from `ข้อมูลอ้างอิง ณ วันที่ 05/10/2569` to `ข้อมูลอ้างอิง ณ วันที่ 15/10/2569` **across all Dashboard pages**.
- Updated shared canonical reference date in `assets/ooe-i18n.js`:
  - `REFERENCE_DATE`: `2026-10-05` → `2026-10-15`.
  - TH display produced by `referenceDate()`: `15/10/2569`.
  - EN display: `15/10/2026`.
- Updated static fallback text in:
  - `index.html` (GR/GS)
  - `ai-tutor.html`
  - `podcast.html`
- Updated `assets/ooe-page-i18n.js` static translation mapping for AI Tutor/Podcast to `Data as of 15/10/2026`.
- Versioned the shared i18n assets on the three Dashboard pages to `20261016-reference-date` so browser cache does not retain the old date.
- `login.html` has no source-reference-date element, so no date change is applicable there.
- Repository-wide active HTML/JS scan confirmed no remaining `05/10/2569`, `05/10/2026`, or `2026-10-05` values in runtime files.
- Scope is display/reference-date metadata only. No change to Google Sheets source URLs, KPI calculations, filters, charts, table data, ProfileScore/CourseScore, authentication, or semester labels.


## 16/10/2569 — Mandatory Handoff knowledge-capture responsibility

- User explicitly reaffirmed that **updating Handoff MD and recording newly learned project knowledge is critical and mandatory**, not an optional final step.
- Added section `1E` defining the maintenance roles (Lead Developer, System Architect, Data Analyst, UI/UX Developer, QA Engineer, GitHub Maintainer, Technical Documentation/Knowledge Owner).
- Defined a structured knowledge record: requirement/decision, source/evidence, implementation, validation, issue/risk/follow-up, and PR/commit traceability. Preserve unresolved questions as unresolved; distinguish verified evidence from assumptions and historical notes.
- Confirmed the full lifecycle: read Handoff and latest SHA on `main`, investigate source if relevant, scoped branch change, QA and diff, update Handoff in the same branch/PR, verify mergeability/head SHA, merge and re-fetch `main`.
- **Documentation-only**: no production HTML/JS/CSS, data sources, KPI, auth, filter, chart, pagination, scoring or responsive behavior changed.
- Corrected the document's stale top-line “อัปเดตล่าสุด: 08/10/2569” to `16/10/2569`, consistent with the later dated entries already present.
- Baseline before this documentation update: `main` merge commit `8940de4e2b50b4ab07cc26ad4d32864ee94f2412` (PR #20, reference-date 15/10/2569).


## 25/10/2569 — Update displayed reference date to 25/10/2569 across dashboards

- Requirement: change the displayed header label to `ข้อมูลอ้างอิง ณ วันที่ 25/10/2569` (TH) and `Data as of 25/10/2026` (EN) on all Dashboard pages (GS, GR, AI Tutor, Podcast).
- Canonical date changed only in `assets/ooe-i18n.js`: `REFERENCE_DATE='2026-10-25'` (previously `2026-10-15`); `referenceDate()` remains responsible for Buddhist/Gregorian calendar display.
- Updated static Thai fallback in `index.html`, `ai-tutor.html`, and `podcast.html`; changed the exact Thai→English translation entry in `assets/ooe-page-i18n.js`.
- All Dashboard HTML pages update the i18n asset URL query to `?v=20261025-reference-date` for browser cache-busting; AI Tutor and Podcast update both shared and page adapter asset query versions.
- `login.html` contains no reference-date display; no change required.
- **Scope:** Reference-date display metadata and i18n cache-busting only; no changes to Google Sheets/Public CSV source or source snapshot contents, KPI, `ProfileScore`/`CourseScore`, filters, charts, pagination, authentication, or desktop/mobile layout.
- QA: verified only the expected literal substitutions for the 5 runtime files; date fallback/i18n/canonical values and cache-busting are consistent in TH/EN. Changes do not alter executable JS statements beyond constant string contents. Authenticated browser render and GitHub Pages publish verification should be reported separately.
- Branch: `chore/reference-date-20261025`; PR #22. Baseline main: `39d8d7082a6528ebdd6c4b779309923a880fcb2b` (PR #21).


## 26/10/2569 — Live Google Sheet source mapping and Lab 7 scoring correction

> **Active upstream rule supersedes historical "15 Podcast for every Profile" documentation:** Lab (L) is complete at >=7 Podcast; Theory (T) and other types currently use >=15. Apply per Profile. Dashboard CourseScore continues to average ProfileScore per faculty + courseCode. Do not silently reverse the Lab rule.

### Exact source and changed ranges

- Google Sheet original: Report691_25_10_2569, spreadsheet ID 1q8Dfe2f79ehjk7NsefGGYP6UduajKJDV7E79w1_fKMg.
- AI_Podcast_Result tab (sheetId 44821272) latest columns: A faculty, B shortname, C course profiles, D Max of AI_Tutor (numeric 0/1), E Sum of Podcast, F สถานะ Podcast, G สถานะ AI Tutor.
- 691 AI Tutor (sheetId 539779177), populated rows 2-921: U fetches source D (formerly incorrect C); V fetches source G (formerly incorrect F). W retains the existing row formula IF(U2=1,1,0), which now receives correctly typed numeric counts.
- 691 Podcast (sheetId 1979792174), populated rows 2-921: U fetches source E (formerly incorrect D); V fetches source F (formerly incorrect E); W now uses the new per-Profile score formula shown below, filled relatively through row 921.
- Existing lookup conditions are deliberately unchanged: match faculty (source A to target A) and full shortname (source B to target E), with guard for target T=0 and IFNA fallback to "ไม่พบ". Source AI_Podcast_Result was not edited.
- AI_Tutor_Public and Podcast_Public still derive their displayed rows from these sheets via the original FILTER(HSTACK(...)) mapping; the published data updates without changing CSV URLs or Dashboard JavaScript.

### Podcast ProfileScore row formula (W2)

~~~gs
=IF(ISNUMBER(U2),MIN(MAX(U2,0),IF(TRIM(F2)="(L)",7,15))/IF(TRIM(F2)="(L)",7,15),"")
~~~

- Lab (L): MIN(podcastCount,7)/7; other types: MIN(podcastCount,15)/15, with lower bound 0 and ceiling 1.00.
- Unmatched U/V cells preserve the explicit "ไม่พบ" state. Podcast W is blank when U is not numeric, rather than generating #VALUE! or fabricating a measured count. A source match failure must not be treated as verified zero.
- The source has profile type (TT) too; it still uses the 15 default until an independently verified rule exists.
- AI Tutor W unchanged. All non-target columns, existing cell formatting, validation, source and destination tabs, and Pivot control reports were preserved.

### Live source QA and known follow-ups

- Source audit on 26/10/2569: AI_Podcast_Result 1,436 keyed records, no duplicate faculty+shortname keys observed. Each target sheet has 920 populated records, 891 matched and **29 unmatched** under the existing two-key lookup. Do not hardcode these counts as KPI values.
- Verified post-write cases in 691 Podcast: Lab 8 (row 57) = ทำครบ / 100%; Lab 7 (row 567) = ทำครบ / 100%; Lab 6 (row 648) = จัดทำไม่ครบ / 85.71%; Theory 8 (row 28) = จัดทำไม่ครบ / 53.33%; Theory 15 (row 8) = ทำครบ / 100%; unmatched row 555 = ไม่พบ / blank ProfileScore.
- Verified AI_Tutor_Public row 2 = aiTutor 1, aiStatus ทำ, ProfileScore 100%. Verified Podcast_Public row 2 = podcastCount 17, podcastStatus ทำครบ, ProfileScore 100%.
- First bulk write left 691 AI Tutor U2 temporarily stale; repaired U2 individually and verified its new numeric count and downstream AI_Tutor_Public result. Other sampled rows (3,4,5,555-557,920,921) had expected relative formulas.
- Existing Podcast criteria and advice modals in podcast.html still historically mention a fixed 15-Podcast requirement and may calculate remaining count using 15. **This sheet-only task did not change those UI messages.** Reconcile their Lab advice with the new 7-item source scoring when a Dashboard UI update is requested; verify affected downstream KPI and charts.
- Further investigate the 29 unmatched rows from the live source before interpreting their KPI treatment. No Dashboard runtime HTML, JS, CSS, authentication, pagination, faculty grouping or source CSV URL was changed in this task.
- Knowledge handoff branch: docs/sheet-source-mapping-lab7-20261026. The live Google Sheet was edited in place through the Sheets connector; GitHub PR only updates this Markdown knowledge file.


## 26/10/2569 — Root cause of 29 unmatched course lookups: renamed faculties (formula recommendation)

- User confirmed all previously unmatched 29 records in 691 AI Tutor / 691 Podcast do have activity/status results in the original AI_Podcast_Result.
- Verified in the live original Google Sheet Report691_25_10_2569 (spreadsheet ID 1q8Dfe2f79ehjk7NsefGGYP6UduajKJDV7E79w1_fKMg) on 26/10/2569.
- **Root cause: faculty labels disagree, but full shortname matches.** All 29 target rows say faculty "โลจิสติกส์ การบิน และสมาร์ทโมบิลิตี้"; 12 source rows instead say "การบิน การท่องเที่ยว และการบริการ" and 17 say "โลจิสติกส์และซัพพลายเชน".
- Under the 2-field join (faculty + full shortname), these 29 fail. Under full-shortname-only, **all 29 have exactly one matching source row**, so their existing results can be recovered without guessing values. Example target Podcast row 555 shortname 691GN-CHM111(T)-(T) matches source row 137 (AI Tutor=1, Podcast=14, Podcast status=จัดทำไม่ครบ, AI Tutor status=ทำ). Target row 594 has a Lab result from the former logistics faculty.
- **Critical collision guard:** Across 1,436 source records, 1,423 distinct full shortnames were found; **13 shortnames occur in multiple faculty records** (e.g. same GN or GS profile offered in IC and other faculties). Never globally remove faculty matching or blindly choose the first shortname match; this could corrupt valid IC/other-faculty rows.
- Recommended safe formula strategy: try exact faculty + shortname first; only on no exact match, fallback to shortname alone if COUNTIF(AI_Podcast_Result!B:B, target E row) = 1; otherwise return "ไม่พบ". Preserve IF(T row = 0, existing default) and preserve source mappings:
  - 691 AI Tutor U = source D (numeric AI Tutor), V = source G (AI Tutor status); W unchanged.
  - 691 Podcast U = source E (Podcast count), V = source F (Podcast status); W retains Lab 7 / other 15 scoring.
- Google Sheets formula template (substitute COL = D/G/E/F; ZERO_DEFAULT = 0 for U, "ไม่มี" for V; ROW = current target row):
~~~gs
=IF($T2=0,0,IFNA(INDEX(FILTER(AI_Podcast_Result!$D$2:$D,AI_Podcast_Result!$A$2:$A=$A2,AI_Podcast_Result!$B$2:$B=$E2),1),IF(COUNTIF(AI_Podcast_Result!$B$2:$B,$E2)=1,IFNA(INDEX(FILTER(AI_Podcast_Result!$D$2:$D,AI_Podcast_Result!$B$2:$B=$E2),1),"ไม่พบ"),"ไม่พบ")))
~~~
- **Change status: recommendation/formula provided only. The 4 new U/V fallback formulas have NOT yet been written to the live Google Sheet.** Prior exact-match formulas from the previous task remain until explicitly applied. The repository production JS and Handoff apart from this documentation change are untouched.
- Follow-up verification after actual spreadsheet formula rollout: target 29 rows should resolve; preserve 13 source duplicate-shortname cases by exact faculty; verify U/V/W and public CSV/KPI consistency. Do not count this as implemented or production-verified until then.


## 26/10/2569 — Podcast frontend Lab 7 / Theory 15 status + guidance fix

### Requirement and verified root cause
- User requested correcting Podcast frontend profile status badges and preparation advice, merging to main after QA. BBA31367 Lab (L) count 8 and HMM215 Lab (L) count 14 were wrongly presented as "จัดทำไม่ครบ" although upstream Podcast_Public gives ProfileScore 100% and "ทำครบ".
- Previous podcast.html used a single PODCAST_REQUIRED_COUNT=15 for all profiles in normalizeStatus(v,count); numeric count took precedence over the valid source status. Advice modal and Podcast criteria dialog also hard-coded 15. The issue is **frontend presentation status logic**, not upstream ProfileScore.
- Audited native Podcast_Public: 920 Profile rows; **15 Lab profiles** have Podcast counts 7–14 and source status ทำครบ but old frontend status จัดทำไม่ครบ. Counts are an audit snapshot, **not** a hard-coded KPI.

### Implementation and data contract
- Edited only podcast.html, assets/ooe-page-i18n.js and this Handoff MD. Shared assets/ooe-i18n.js, index.html, ai-tutor.html, Google Sheets, CSV URL, authentication, pagination and CSS layout left unchanged.
- Added PODCAST_LAB_REQUIRED_COUNT=7 and centralized podcastRequiredCount(profileType), selecting 7 only for normalized exact (L) and retaining 15 for (T) and other types including (TT) (until their rule is independently confirmed).
- normalizeStatus(v,count,profileType) now uses the type-specific required count. Passed profileType at all callers: refreshStatusLabels, statusBadge, adviceCell and openPodcastAdvice. Unknown source statuses remain pending if no numeric count can be used.
- **No change to ProfileScore**: still read from published Google Sheet/CSV. **No change to CourseScore**: still AVERAGE(ProfileScore) grouped by faculty + courseCode. No KPI, chart, filter, grouping or pagination calculation changes.
- Updated criteria modal highlight to requirements **per Profile** (Lab L 7 / Theory T 15). Updated advice modal checklist, label "จำนวน Podcast ตามเกณฑ์", per-profile required item total, missing-item computation, status/explanation. Checklist count is populated dynamically for selected Profile; other guidance retained.
- Updated exact Thai-to-English dictionary and dynamic translation patterns in assets/ooe-page-i18n.js. Only podcast.html updates the page-i18n cache URL version to 20261026-podcast-lab7; shared reference-date and global i18n asset untouched.

### Verification
- JavaScript syntax-compiled all inline podcast.html scripts and the complete assets/ooe-page-i18n.js successfully.
- Tested **17 cases** using the actual normalizeStatus/podcastRequiredCount functions (Lab 0/1/6/7/8/14/15, Theory 0/7/14/15/16, TT default, lowercase/whitespace, source not found/pending), all passed.
- Executed actual openPodcastAdvice with stub DOM over **6 cases**: Lab 6→6/7, missing 1; Lab 0→missing 7; Theory 14→14/15, missing 1; complete Lab 7/8 and Theory 15 correctly do not open advice, all passed.
- English translation checked for new criteria, dynamic Lab 6/7 message, selected Profile checklist, and notdone message.
- Regression assertions confirm CSV source URL, course score average, 4-faculty pagination, status callsites and cache-busting.
- HMM215 source has Lab 14→100% complete and Theory 14→93.33% partial; **CourseScore remains 0.966666… displayed 0.97/1 and course status partial**, as required.
- Authenticated desktop/mobile visual QA not done in the isolated code test; verify after GitHub Pages publishes. No separate source mapping/snapshot update in this scope.
- Branch: fix/podcast-lab7-status-advice-20261026; PR #25; baseline main 2beee3ce3372cea5461a330256ffa66a3ef2ac21.


## 26/10/2569 — Podcast criteria modal compact Lab/Theory bullets

- Owner request: in the **Podcast counting criteria modal** under **ตัวตั้ง**, replace the large single-line Lab/Theory statement with compact, easily readable wording, exactly:
  - จำนวนรายวิชา (ระดับปริญญาตรี) โดยมีรายละเอียดดังนี้
  - Lab (L) ทำอย่างน้อย 7 Podcast
  - Theory (T) ทำอย่างน้อย 15 Podcast
- In `podcast.html`, replaced the single `criteria-highlight` banner with a semantic two-item `ul.criteria-profile-rules`. Its text is **12px, weight 650, line-height 1.55**, with compact bullet spacing; originally the single highlight text was 14px, weight 800. The title, denominator card, exclusion list, close control, mobile grid, and other modal elements remain unchanged.
- Added exact EN mapping for all three new strings in `assets/ooe-page-i18n.js`, respectively: "Undergraduate courses, with the following requirements:", "Lab (L): at least 7 Podcast items", and "Theory (T): at least 15 Podcast items".
- Updated only Podcast page's page-i18n cache-busting query to `?v=20261026-compact-criteria` to avoid stale translations. Shared `assets/ooe-i18n.js` and all other Dashboard pages untouched.
- Validation: reverse-substitution comparison against latest `main` confirmed only requested `podcast.html` HTML/CSS text and i18n version changed; i18n adapter only changed the exact relevant translation keys. Compiled all inline Podcast JavaScript and i18n JavaScript successfully; tested Thai→English lookup for all three displayed strings.
- Regression guards: PODCAST_LAB_REQUIRED_COUNT=7, ProfileScore sourced from CSV, CourseScore average, `FACULTY_PAGE_SIZE=4`, table/grouping/filters, authentication and responsive rules unchanged. This is **presentation-only**; it does not modify Business Rules or Google Sheet. Desktop/mobile browser screenshots not independently verified.
- Branch: `fix/podcast-criteria-modal-compact-20261026`, PR #26, baseline `main` merge `76045110bc332f24b9299dda9c5fd161581ce49e`. Merge SHA is verified separately after merge.

## 02/11/2569 — Change Dashboard reference date to 02/11/2569 (all pages)

### Requirement and verified baseline

- User requested changing the source reference date displayed in the header on all Dashboards from **25/10/2569** to **02/11/2569**.
- Thai text: `ข้อมูลอ้างอิง ณ วันที่ 02/11/2569`; English text: `Data as of 02/11/2026`. The shared ISO canonical value is `REFERENCE_DATE='2026-11-02'`.
- Baseline checked from `main` at commit `13fe451a5247bea8301558a3832224c433a47105` and relevant latest file blob SHAs. `index.html` hosts GR/GS; `ai-tutor.html` hosts AI Tutor; `podcast.html` hosts Podcast. `login.html` has no reference-date label and is excluded.

### Implementation and scope

- `assets/ooe-i18n.js`: change only `REFERENCE_DATE` from `2026-10-25` to `2026-11-02`. The existing Buddhist calendar conversion for Thai and Gregorian year for English is preserved.
- `index.html`, `ai-tutor.html`, `podcast.html`: change only the Thai header fallback `ข้อมูลอ้างอิง ณ วันที่ 25/10/2569` → `ข้อมูลอ้างอิง ณ วันที่ 02/11/2569`, and i18n script query versions.
- `assets/ooe-page-i18n.js`: update exact Thai-English static mapping to `02/11/2569` and `02/11/2026`.
- Updated `assets/ooe-i18n.js` URLs in all three HTML files to `?v=20261102-reference-date`; updated `assets/ooe-page-i18n.js` URLs in AI Tutor and Podcast to the same version, including replacing the previously special Podcast `20261026-compact-criteria` cache tag **without changing its actual Podcast criteria translations or JavaScript**.
- **Only display metadata / cache-busting**: Google Sheets/Public CSV source, snapshot dates or contents, KPI, ProfileScore, CourseScore, PDF links, filters, chart calculations, modal status rules, TH/EN toggling, authentication, pagination and desktop/mobile layout are unchanged.

### QA / traceability

- Checked exact substitutions against current source and parsed the existing JS in all three HTML files plus both i18n JS files. The only runtime changes are string literals, script query versions, and shared reference-date constant.
- Regression expectations: all active pages display 02/11/2569 in Thai, 02/11/2026 in English. The central language helper must retain `+543` for the Thai year. No legacy 25/10/2569 source-date strings remain in active runtime files. No historical Handoff changelog entries were rewritten.
- This date change is an **explicit display reference label request**, not confirmation that the upstream CSV / Google Sheets were refreshed on 02/11/2569.
- Branch `chore/reference-date-20261102`; PR #27. Main merge SHA and GitHub Pages publication state must be verified after merge; no authenticated visual browser QA is claimed.

## 03/11/2569 — Set reference date to 03/11/2569 on every Dashboard

### Requirement / latest baseline
- Owner requested changing the Dashboard header reference date from `02/11/2569` to **`03/11/2569`** on every Dashboard. English display **`Data as of 03/11/2026`**.
- Baseline `main` commit: `8972cbf7d626492cf97cdbe8311e865cad7f8e72` (PR #27); Handoff and relevant files were re-read from `main` before modifications.
- The canonical shared date is `REFERENCE_DATE='2026-11-03'` in `assets/ooe-i18n.js`. Preserve the existing `referenceDate()` conversion: Thai year +543, English Gregorian.

### Files / implementation
- `index.html` (GR/GS), `ai-tutor.html` (AI Tutor), and `podcast.html` (Podcast): updated the Thai static fallback header to `ข้อมูลอ้างอิง ณ วันที่ 03/11/2569`.
- `assets/ooe-page-i18n.js`: updated exact TH/EN translation mapping for the new reference-date text.
- All 3 HTML pages now load `assets/ooe-i18n.js?v=20261103-reference-date`; AI Tutor and Podcast also load `assets/ooe-page-i18n.js?v=20261103-reference-date` for browser cache-busting.
- `login.html` has no reference date and was not modified.
- The date update is **display metadata only**: no change to source CSV/Google Sheets, KPI, CourseScore/ProfileScore, Podcast Lab 7/Theory 15, charts, filter/search, course grouping, responsive layout, pagination or authentication.

### QA / documentation
- Runtime code changes constrained to **5 files**: 3 HTML and 2 i18n JavaScript assets. A sixth file, this Handoff, contains the same-round requirement and test record.
- Each source change verified as an exact literal substitution from the latest `main` blob; all existing inline JavaScript and both i18n assets syntax-compiled successfully. Confirm that old `02/11/2569`, `02/11/2026`, `2026-11-02` and `20261102-reference-date` no longer exist in active runtime source.
- Preserve historical Handoff entries verbatim. The reference-date update is **not** evidence that upstream source data was actually refreshed on 03/11/2569; no Google Sheets/CSV snapshot update was performed.
- Feature branch: `chore/reference-date-20261103`; PR #28. Merge SHA and GitHub Pages deployment are verified after merge; browser visual results must be reported separately.

## 16/11/2569 — Update displayed Dashboard reference date to 16/11/2569

### Owner decision / baseline
- Owner explicitly requested changing the **displayed reference date on every Dashboard** from `03/11/2569` to **`16/11/2569`** (English: **`Data as of 16/11/2026`**).
- Read this entire Handoff and fetched relevant source files from `main` prior to editing. Baseline `main` merge SHA: `a4f9f49f853a63dd882cd125f7bc0099af918e38` (PR #28).

### Implementation
- `assets/ooe-i18n.js`: updated shared canonical `REFERENCE_DATE` from `2026-11-03` to `2026-11-16`. Preserve existing Thai Buddhist year +543 conversion and English Gregorian year.
- `index.html` (GR/GS), `ai-tutor.html` (AI Tutor), `podcast.html` (Podcast): changed header fallback to `ข้อมูลอ้างอิง ณ วันที่ 16/11/2569` and shared i18n version to `20261116-reference-date`.
- `assets/ooe-page-i18n.js`: updated exact TH-to-EN date translation pair `16/11/2569` → `16/11/2026`.
- AI Tutor and Podcast page adapter URLs updated to `?v=20261116-reference-date` to invalidate stale browser caches. `login.html` has no reference-date field and remains unchanged.
- The change is **display metadata and cache-busting only**. No Google Sheet/Public CSV snapshot refresh has been performed. No KPI, ProfileScore, CourseScore, Podcast Lab 7/Theory 15 logic, status, faculty mapping, filter, pagination, charts, authentication or Desktop/Mobile UI layout changes.

### Validation / knowledge for next handoff
- Source transformations independently checked for exact substitutions and reversibility against latest code; syntax-checked inline JavaScript in all three HTML pages and both i18n JavaScript assets.
- Verify no old active strings `03/11/2569`, `03/11/2026`, `2026-11-03`, or `20261103-reference-date` remain in runtime files; historic handoff entries are intentionally preserved.
- TH expected: `ข้อมูลอ้างอิง ณ วันที่ 16/11/2569`; EN expected: `Data as of 16/11/2026`.
- Branch: `chore/reference-date-20261116`; PR #29. Merge SHA and GitHub Pages deployment to be verified after merge; authenticated browser UI testing not claimed.

## 17/11/2569 — Read-only GR/GS report vs Raw-data 69/1 audit

### Scope and source of truth

- Owner requested a **read-only audit** of what GR/GS report retains or excludes compared with `Raw-data 69/1`. No changes to spreadsheet data, filter settings, Dashboard runtime code, source CSV or business rules.
- Live native Google Sheet: `Report691_16_11_2569`, spreadsheet ID `1q8Dfe2f79ehjk7NsefGGYP6UduajKJDV7E79w1_fKMg` (read 17/11/2569).
- Compared populated source rows and exact course **URL** as the identity key in `Raw-data 69/1` (A:T), `69/1-GR` (A:X), `69/1-GS` (A:X), and `GRGS_Public` (A:R). Use URL instead of full shortname alone: source has two different `691GS-GEC10367(T)-(T)` courses, one i-Learning (International College) and one d-Learning (วิชาศึกษาทั่วไป). Only the i-Learning record is in the GS report; do not collapse the two into one.
- Publication source in `GRGS_Public!A2` uses `VSTACK(FILTER(HSTACK(...), REGEXMATCH(courseProfile,"^691GR-") * MAP(ROW(...), LAMBDA(r,SUBTOTAL(103,OFFSET(...))))), FILTER(HSTACK(...), REGEXMATCH(courseProfile,"^691GS-") * MAP(ROW(...),LAMBDA(r,SUBTOTAL(103,OFFSET(...))))))`. That means it includes only the relevant GR/GS prefix **and currently visible rows in the two working sheets**. The formula does **not** itself hard-code teacher type, profile T/TT, zero-student exclusion, or faculty.
- `index.html` later reads `GRGS_Public` as CSV and keeps only `group` GR/GS. The other interactive filters (faculty, progress, review status, text search) act on user selection, not fixed permanent exclusions.

### Verified snapshot / reconciliation by course URL (Profile-level rows, NOT distinct courseCode)

| Stage | GR | GS | Total |
| --- | ---: | ---: | ---: |
| `Raw-data 69/1`, all types: 1,521 populated rows; non-GR/GS: 1,323 | 145 | 53 | 198 |
| Present in `69/1-GR` / `69/1-GS` (working tabs) | 130 | 48 | 178 |
| Final published `GRGS_Public` | 125 | 40 | 165 |

- Between Raw and working sheets: **25 Raw rows absent** (GR 20 are all Lab `(L)`; GS 5 = 4 Lab `(L)` plus 1 Theory `(T)` for d-Learning `691GS-GEC10367(T)-(T)`). **Five additional GR rows** occur in working tabs/final report but are absent from Raw: ASM320 (T), ENG118 (T), ENG217 (TT), IAI239 (T), MAT320 (T). This reconciles `198 - 25 + 5 = 178`.
- From working sheets to final Public, **13 rows not published** (GR 5; GS 8). Their work-type data are `อาจารย์พิเศษ` in 10 rows and blank/missing in 3. By profile: Lab `(L)` 4, Theory `(T)` 8, `(TT)` 1. This reconciles `178 - 13 = 165`. These rows' visibility is controlled by source-sheet row visibility used by `SUBTOTAL(103,...)`; the exact human-created sheet filter configuration was not exposed by connector metadata.
- Relative directly to Raw, **38 Raw rows absent from Public** (GR 25, GS 13): `(L)` 28, `(T)` 9, `(TT)` 1. Five additional GR rows in the report were not in Raw, so `198 - 38 + 5 = 165`.
- `GRGS_Public` profile composition: **`(T)` 133, `(TT)` 32, `(L)` 0**. This refutes the claim that the published report retains *only T*. No Lab currently survives publication, but `(TT)` does.
- All 165 published teacher-type strings contain `อาจารย์ประจำ` including subtypes. Exact single `อาจารย์ประจำ`: 148 rows; remaining 17 are combinations or subtypes such as `อาจารย์ประจำแบบมีเงื่อนไข` (3), `อาจารย์ประจำแบบพิเศษ (ไม่จ่ายเงินเดือน)` (4), or multiple permanent instructors. No pure `อาจารย์พิเศษ` or blank teacher-type is in Public; this is an **observed data result** from current visible sheet filters, not a separately hard-coded condition in the Public formula.
- `GRGS_Public` includes **36 GR rows with students = 0** (none in the 40 GS rows). There is **no zero-student exclusion** at the GR/GS publication stage. Review-status composition was `ไม่ผ่าน` 105, `ผ่าน` 54, `ไม่พบเนื้อหา` 6. Thus failed/no-content rows are not removed solely because of status.
- No faculty has a GR/GS Raw record and is entirely absent from Public under its exact label in this snapshot. No universal International College exclusion is applied here.

### Interpretation and guardrails

- Do **not** describe the result as strictly `teacherType="อาจารย์ประจำ"` plus `profileType="(T)"`. Effective selection is a **manual/source-sheet eligibility and row-visibility workflow** before the Public formula; it currently retains `(TT)` and multiple permanent-staff categories. Without the actual filter settings or human policy record, do not assert why each individual Lab or separate d-Learning GEC10367 entry was omitted.
- Do not equate 165 published Profile records with 165 unique courseCodes, or 38 missing Raw rows with 38 deleted unique courses.
- PR #30; audit documentation only. Formula/visibility based source rows may change when users toggle source sheet filters. If revisiting this audit, re-read actual sheet tabs, cell values and links rather than reusing these snapshot counts. **This audit did not modify anything except this Handoff documentation**.

## 17/11/2569 — Independent Dashboard code and source audit (recommendations only)

### Audit scope / immutable baseline
- Read full Handoff `main`, GitHub tree, `index.html`, `ai-tutor.html`, `podcast.html`, `login.html`, `auth.js` and core assets. Main baseline `fe4e442b261df2abb4d5391ba4c9d9d78dd203cd`. GitHub Pages build and deployment run `44031089541` completed successfully.
- Source inspected read-only in native Google Sheet `Report691_16_11_2569` (`1q8Dfe2f79ehjk7NsefGGYP6UduajKJDV7E79w1_fKMg`): `GRGS_Public`, `AI_Tutor_Public`, `Podcast_Public` plus the AI and Podcast working tabs. **No source or UI changes are authorized in this audit**. Web-based rendered login/desktop/mobile audit was unavailable; no authenticated live screenshots or live UI success claimed.
- Independently summarized current public datasets by `faculty + courseCode`: GRGS_Public **165 Profile rows (125 GR, 40 GS)**; AI_Tutor_Public **913 Profile / 762 courses**; Podcast_Public **913 Profile / 762 courses**. The two AI/Podcast working tabs have **913 rows each**, matching corresponding Public tabs by `faculty+courseProfile`.
- Data quality spot/full-record checks: **zero** missing `faculty`, `courseCode`, or `courseProfile` in all three Public tabs, **zero** duplicate full `courseProfile` within the two AI/Podcast Public tabs, **zero** currently empty/invalid AI/Podcast ProfileScore values, **zero** source-status/count mismatches under the active Podcast L7/other15 and AI rules, and **zero** zero-student AI/Podcast rows.
- Recomputed current scores from source ProfileScore at course grain: **AI Tutor sum ≈495 / 762 (≈64.96%)**, **Podcast sum ≈381.47 / 762 (≈50.06%)**. The latest code computes course scores as an average of source ProfileScores; current main has no demonstrated arithmetic mismatch in that formula. Data snapshot counts must not be hard-coded.
- JavaScript syntax parsed for 11 runtime HTML/JS files, all passed. Internal static asset links exist; template-generated dynamic `href` are not static dependencies. No authenticated visual/mobile QA was performed.

### Findings and recommendations, with confidence

1. **Priority P1 — GR/GS eligibility is bound to source sheet row visibility**. `GRGS_Public!A2` uses `REGEXMATCH("^691GR-/^691GS-") * SUBTOTAL(103, OFFSET(...))` to publish currently visible rows. It does not enforce teacher type or profile eligibility in a stable machine-readable rule, so a change in sheet filter visibility can silently alter KPI. Handoff 17/11 source reconciliation is controlling. **Recommend** explicit eligibility/status column or an immutable, versioned publication extract + reconciliation/changed-row alert, without changing rule meaning on assumption.
2. **Priority P1 policy decision — GR/GS zero-student rows**. `GRGS_Public` currently has **36 zero-student GR rows**, no zero-student GS rows; status groups include pass/fail/no-content. This may be intentional; **do not auto-exclude** without owner approval. Confirm numerator/denominator eligibility and document it in the modal/criteria and Handoff.
3. **Priority P2 — Blank/invalid upstream ProfileScore becomes numeric 0** in both `ai-tutor.html` (function `parseProfileScore`, ~line 923) and `podcast.html` (~line 1004). `groupCourses` averages that zero into CourseScore and `courseStatus` may label the course as not done. **No current invalid source rows found**; a latent data-quality risk. Recommend preserving invalid/missing as distinct unknown and showing a quality notice, guarding KPI rather than inventing a measured zero.
4. **Priority P2 — Display rounding can obscure exact KPI score**. `pointsKpi` uses `Math.ceil(points)` on AI Tutor and Podcast pages (existing deliberate presentation decision), while percent, donut and course sums use actual fractional points. Example with current Podcast data: **source sum ≈381.47**, big card could show **382 / 762**, but progress is still about **50.06%**. This is not a confirmed calculation bug; propose a tooltip, label as rounded, or display 2 decimals subject to owner UI policy.
5. **Priority P2 preventative — Advice lookup uses `DATA.find(x=>x.courseProfile===courseProfile)`** in both AI Tutor and Podcast. This will select the first matching row if duplicate `courseProfile` values are introduced across faculty/system; no duplicates in current Public datasets. Recommend keying the clicked row by its unambiguous source-row identifier or `faculty+courseCode+courseProfile+courseLink` rather than `courseProfile` alone.
6. **Priority P2 security boundary — Google login is only a client-side UI gate**. `auth.js` decodes an ID token with `decodeJwt` and checks claims without cryptographic signature verification; static GitHub Pages and public CSV remain public, as already explicitly documented in Handoff §10. This must not be characterized as server-side protected access. If access control / confidentiality is required, move token verification and protected data access server-side. No auth change in this audit.
7. **Priority P3 — Display reference date is manual metadata**, currently `REFERENCE_DATE='2026-11-16'` shared across pages; source update timestamp is not independently established by the displayed label. Recommend reflecting a verified snapshot/import timestamp separately from refresh time before relying on date as evidence of currency.
8. **Priority P3 — Regression QA is predominantly manual/static**. Repository has no dedicated automated test files in current tree; GitHub Pages build/deploy success is not unit, KPI, source, TH/EN, mobile or authenticated browser QA. Propose lightweight fixtures for Lab7/Theory15, exact course grain, invalid score, duplicate advice keys, filtering/pagination, and TH/EN; then browser smoke checks with authorized test account.
9. **Priority P3 — Handoff historical rule text contains 15-for-all statements** in older sections (§1A, §7), while latest active rule is L7 and other profiles15 (October change). Historical entries are retained deliberately; add an explicit *active canonical rules* summary at top rather than altering changelog history, to prevent future regressions.

### Scope / handoff
- This audit is an inspection and recommendation; Dashboard code, authentication, source URLs, Google Sheet cells/formulas/filters, KPI/chart logic, responsive styles and deployed app behavior are unchanged.
- Do not make actual fixes until owner selects scope and business rules. If code changes, create feature branch, test SHA/diff/QA, update this Handoff in the same round, and merge only when authorized.
- Docs-only branch: `docs/dashboard-audit-20261117`, PR #31. No production runtime code modifications; GitHub Pages publication status, if changed by docs-only merge, is separate from app QA.

## 18/11/2569 — AI Tutor / Podcast learner-cohort-aware CourseScore (Owner-approved)

### Owner-approved decisions, overriding historical scoring text

- Scope: **AI Tutor and Podcast only**, all course types GN/GR/GS/GU, keeping **one course = one point** at `faculty + courseCode` grain; fixed source remains `AI_Tutor_Public` / `Podcast_Public`. No edits to the native Google Sheet, upstream formulas, source ProfileScore/links, `index.html` (GR/GS), authentication, reference-date policy, or existing denominator/filter eligibility.
- **Same courseType, same learner cohort:** use `MAX(ProfileScore)` (e.g. GN (T)=1, GN (L)=0 => 1; similarly GR, GS, GU). A lone Profile uses its own source score, including GN (L) 6/7=0.857142..., 7/7=1.
- **Different courseType:** independently score each type, then `AVERAGE` type scores (e.g. GN=1, GS=0 => 0.5). Do not borrow evidence between GN/GR/GS/GU.
- **Different explicitly instructor-suffixed cohort within same courseType:** keep separate and `AVERAGE` cohort scores; within each instructor cohort T/L may still share. Instructor suffix is read only from the `courseProfile` name pattern `(TL)-(T)-liting.pe` or `(T)-(T)-jiraporn.am`; otherwise default `shared` cohort. Never split solely by display instructor names or student counts. `XHM32267` GN two separate cohorts with Podcast scores 1 and 7/15 => **0.733333/1** (not 1). `BBA31367` has both default and suffixed T/L cohort pairs; each pair can share the higher ProfileScore and the group average applies.
- **CourseScore** = `AVERAGE` across course types of [`AVERAGE` across cohorts of (`MAX` ProfileScore within cohort)]; `TotalPoints = SUM(CourseScore)`; `Progress = TotalPoints / uniqueCourses * 100`.
- Keep **profile rows, scores, item counts, source statuses, source links, and profile-level KPI cards unchanged**, even if a course with incomplete Profile(s) is complete under shared-course scoring. Updated Thai/English course-level wording to `ทำครบ` (not `ครบทุก Profile`) and updated criteria modals to explain evidence-sharing.
- Source Podcast thresholds remain **exact (L)=7**, and **(T)/(TT)/other=15**, decided upstream in Google Sheets. Frontend Podcast status/advice still applies this per-Profile threshold; no recalc of ProfileScore or evidence count in Dashboard.

### Implementation and verification

- Baseline: `main@37ef14273898cb6d86b3d22e25f031b8350e0159` (Merge PR #31 after owner rollback). Feature branch `feat/ai-podcast-learner-cohort-scoring-20261118`. PR #32 (AI Tutor / Podcast cohort scoring; no Google Sheet changes).
- Edited `ai-tutor.html` and `podcast.html`: common `groupCourses` now calls `window.OOECourseScore.courseScore(g.profiles)`; status/KPI/graphs/filters consume the recomputed score through their existing pathways. UI structure, filters, count and pagination unchanged.
- Added `assets/ooe-course-score.js`: standalone browser/Node-compatible deterministic shared scoring helper. Uses exact `courseType`, parses explicit trailing instructor suffix (case-insensitive), never infers from display name. Added `tests/ooe-course-score.test.js` with control cases. Updated `assets/ooe-page-i18n.js` for two-language criteria and tooltip/labels. Added cache-busting version only for page i18n and shared score helper (reference date stays owner-controlled).
- Current source verified read-only: Native Google Sheet `Report691_18_11_2569`, spreadsheet ID `1q8Dfe2f79ehjk7NsefGGYP6UduajKJDV7E79w1_fKMg`, `AI_Tutor_Public` / `Podcast_Public`. Each **913 Profile / 762 courses**. No missing or invalid current ProfileScore found in previous source audit; these snapshots are not hard-coded.
- Verified scoring on all current source rows using the **actual new helper**: AI Tutor **495 → 506** total points (+11), progress **64.9606% → 66.4042%**, **22** courses increase, **22** additional completed, none decrease. Podcast **381.469048 → 390.552381** points (+9.083333), progress **50.0616% → 51.2536%**, **30** courses increase, **15** additional completed, none decrease. (The earlier 391.62 projection incorrectly combined all instructor cohorts and must not be used.)
- Verified fixtures 18 assertions: GN/GR/GS/GU shared cohorts, L-only 6/7 and 7/7, GN vs GS separation, XHM32267 instructor cohorts, BBA31367 group pairs, partial scores, clamping and no rows. Both page inline JS scripts compile; both page `groupCourses` functions pass six integration scenarios; Thai and English labels and owner-manual reference date checked; no legacy `ครบทุก Profile` wording remains in changed pages.
- Important: Browser authenticated desktop/mobile visual QA not yet claimed at this snapshot; do not call GitHub Pages deployment success equivalent to complete UI acceptance testing.

### Remaining guardrails

- Explicit instructor suffix currently identifies the 8 International College multi-Profile course cohorts. If future sources add a **genuinely separate learner cohort without a suffix**, do not silently infer separation by instructor display names; seek an explicit stable cohort identifier or owner decision. Never modify score source to hide missing evidence.
- Do not change Google Sheets, source CSV gid, CourseScore denominator, manual as-of date, GR/GS publication flow, authentication or layout while working on this scoring requirement.

## 18/11/2569 — AI Tutor / Podcast clickable Profile Summary cards and GS-style flat Profile View

### Owner request and approved behavior

- Scope: **AI Tutor + Podcast only**, preserving existing Course View as the initial/default view, **no** Google Sheets edits, no published CSV/config changes, and no change to course grading `OOECourseScore.courseScore` from PR #32, course denominator, faculty grouping, auth, GR/GS, or owner-controlled reference date.
- Profile Summary's secondary cards become real keyboard-focusable **buttons** with `aria-pressed`, focused/active styles: **AI** all / done / not done; **Podcast** all / complete / partial / not done. Click one => **Profile View**, select a different status => switches Profile View filter, click active card again => **Course View**. No new mode toggle is required.
- When Profile View is active, detail table switches from faculty/course expandable tree to **one flat row per source Profile**. Reference is GS table design and pagination: columns **ลำดับ, รหัสวิชา, หน่วยกิต, Course Profile, วันที่ระบบสร้างรายวิชา, คณะ / วิทยาลัย, อาจารย์ผู้สอน, คะแนน / AI Tutor|Podcast, สถานะ, คำแนะนำ, รายวิชา**. The profile table has 20 Profile rows per page; GS-style flat rows, horizontal scrolling for narrower screens, no Course tree expand requirement. Course View retains the original 4 faculties/page behavior and original table header.
- AI Profile filter: `ProfileScore >= 0.999999` means complete/done, otherwise notdone, matching existing Profile KPI buckets. Podcast Profile filter: same score split into complete / partial (`0 < score < 1`) / notdone. Table status cells still display the source-linked per-Profile status via existing `statusBadge`; no status/score values overwritten. **Course with shared evidence can be complete while an individual Profile stays notdone**; selecting that Profile still shows it.
- Faculty, courseType and text search are enforced **at Profile row level** in Profile View, not by exposing unrelated Profile rows from a mixed-type course. The existing multi-select course Profile count option remains available and is applied by parent course's Profile count. Mode changes reset pagination to page 1; page navigation does not reset mode. Selecting course-level KPI/status filter reverts to Course View, and Clear Filters returns the default Course View. When Profile View is active, the secondary Profile Summary counts reflect the current faculty/type/search/count options **before** applying the selected secondary status, so cards remain useful for switching. Course KPI, charts, donut and CourseScore are not recalculated from a Profile-only subset; course-level status is cleared when entering Profile View.
- Updated TH/EN labels for Profile View table heading, table column names, user actions, and Profile pagination. Date values are **display-only**; upstream `createdDate` is unmodified, ISO date presentation follows GS TH Buddhist / EN Gregorian format at render time. Existing owner-controlled reference date is unaffected.

### Files, testing, and release boundaries

- Base: `main@bef305df61bd8576867947799f560800e82482b5` (PR #32 merged). Feature branch: `feat/ai-podcast-clickable-profile-view-20261118`.
- Updated only `ai-tutor.html`, `podcast.html`, `assets/ooe-page-i18n.js`, this Handoff. New shared **read-only** selector `assets/ooe-profile-view.js` and tests `tests/ooe-profile-view.test.js`, `tests/ooe-profile-view-pages.test.js`. `assets/ooe-course-score.js` is unchanged.
- Selector assertions **17 passed**. Combined selector and HTML integration/static checks **59 assertions passed**; inline page scripts compile. Tested default course mode path, all/complete/partial/notdone Profile card values, profile count/faculty/type/search filtering, reset handlers, 20 Profile pagination, correct 11-column headers, unchanged CourseScore binding. Full authenticated visual/mobile Browser E2E **not claimed**.
- Existing `Course View` remains the source of truth for KPI and published course-level status. `Profile View` is purely a browser UI mode; no backend changes, no persistence, no mutations of source data or Google Sheets.

## 18/11/2569 — OWNER GS trial: 5 Profile status cards + Course View (GS only)

### Confirmed scope and business boundaries
- OWNER confirmed counting grain: **one course = `faculty + courseCode`**. The same code in different faculties represents different courses; each Course Profile remains a separate record. Do not confuse 149 GR Profiles with 138 GR courses.
- The only published GS/GR input used by the Dashboard is **`GRGS_Public`**, without imposing extra exclusions from Raw-data or working sheets. Profiles with **0 students remain included** in GR/GS KPI/reporting; never auto-exclude them.
- OWNER approved trying the new interaction on **GS only**, then considering GR separately. No implicit CourseScore or status roll-up from AI Tutor/Podcast is authorized for GR/GS. An unresolved mixed-status course must expose its constituent Profile statuses, not be silently classified as pass/fail.
- Verified read-only live spreadsheet `Report691_18_11_2569` (`1q8Dfe2f79ehjk7NsefGGYP6UduajKJDV7E79w1_fKMg`), `GRGS_Public` gid `131857057`: **GS 46 Profile / 46 unique faculty+courseCode**, 36 passed, 10 failed, 0 pending, 0 no-content; **GR 149 Profile / 138 unique faculty+courseCode**. These are a dated snapshot, not hard-coded denominators.

### GS UI behavior accepted and implemented on feature branch
- Add a GS-only, AI Tutor-style secondary **Profile Summary** with five clickable buttons: **Profile ทั้งหมด**, **Profile ผ่าน**, **Profile อยู่ระหว่างตรวจสอบ**, **Profile ไม่ผ่าน**, **Profile ไม่พบเนื้อหา**. Values are computed from the current `GRGS_Public` GS rows after faculty/progress/search filters (excluding the main review-status selection); 0-count statuses remain visible for future data.
- Keep the **existing flat Profile table as the GS default** (20 Profile rows/page). New **รายวิชา / Profile** buttons next to the details table switch views. Clicking a Profile card opens the flat view with that specific status; selecting it again switches to Course View. Profile filter is distinct from main review-status filter and never edits source rows. Preserve filters, pagination/reset and TH/EN.
- Course View groups by **exact faculty + courseCode** (20 courses/page), one row per course. Every row can expand/collapse to reveal original individual Profile names, dates, instructors, source review statuses, notes, course links, and evidence links. If constituent Profile statuses differ, show **each status and count**, rather than assigning a new course-wide result. Blank source review status is treated as pending for **secondary Profile-card filtering/counting only**; original flat-table badge and source status remain unchanged.
- The shared `index.html` remains **GR-compatible**: new cards, view controls and Course View are hidden when activeType=GR; GR flat table, existing KPI/chart/donut, source mapping and GR event flows are otherwise unchanged. Existing main KPI/chart calculations on GS are also unchanged in this trial (their current Profile-row counting should not be interpreted as a new course-level KPI policy). Consider course-level KPI roll-up separately after OWNER status rules are approved.
- Files: `index.html`; new read-only helper `assets/ooe-gs-course-view.js`; regression files `tests/ooe-gs-course-view.test.js`, `tests/ooe-gs-view-pages.test.js`; and this Handoff. No Google Sheet edits, formula/data/filter/source-CSV changes, auth changes, AI Tutor/Podcast edits, GR changes or manual reference-date change.

### Validation / release boundary
- Branch `feat/gs-profile-course-view-20261118` based on `main@f655288e77357d713ee794c0988562aec1a4724b`. Separate feature PR planned for review; **do not claim main/GitHub Pages is updated until merge and deployment are verified**.
- Validated with V8 JavaScript syntax checks for the new GS helper and the complete `index.html` inline dashboard script; both **PASS**. Five helper test cases **5/5 PASS** (status buckets, same/different faculty grouping, zero students, mixed statuses, missing codes). Static integration assertions verified five GS Profile cards, two view buttons, GS-only render guard, retained legacy Profile rendering and unchanged CSV source. Real authenticated desktop/mobile browser testing and GitHub Pages Production verification **NOT YET RUN**.
- Guardrails: keep `faculty + courseCode` as the exact course identity; no inferred GR/GS status rule for multiple Profile statuses; keep original Profile evidence/links, including 0-student records; always check source and handoff again before future GR changes.

### 18/11/2569 — OWNER: approved Dashboard edits must reach main (no Preview workflow)

- OWNER explicitly directed that, when the assistant implements approved OOE Dashboard changes, **finish the work by publishing them to `main` within the same work cycle**, because the OWNER has no usable Preview to inspect. Do not stop with an unmerged PR and call the task finished.
- Keep preflight (read current main Handoff and source), scoped implementation, regression checks, same-cycle Handoff and exact SHA verification. A branch/PR can be used as an intermediate safety/review step, but the intended delivery target for OWNER-approved edits is the live GitHub Pages `main`; do not require the OWNER to manually inspect an unavailable Preview.
- Do not claim GitHub Pages is deployed solely because GitHub accepted the merge. Verify actual Pages workflow/rendered asset when access is available, and explicitly distinguish the GitHub `main` status from the web deployment status.
- For GS pilot PR #34, confirmed merged to `main@bf66b409352e5a70f1579ed67ee570c834013f0f`. GitHub verified `index.html`, the new GS helper and this Handoff on `main`; external Pages live verification was unavailable from the current tools.

## 18/11/2569 — OWNER-approved GS Course View Tree Table (AI Tutor visual baseline)

### Owner decision / current rule, superseding the earlier GS course-table layout
- OWNER approved the GS **Course View** redesign matching the existing AI Tutor hierarchy: **Faculty / College → Course → Course Profile**. This is the intended UI template for future GR work, **but GR has NOT been changed in this task**.
- Faculty groups have a +/- expand/collapse button and a course-count badge. Faculties start expanded, while individual courses start collapsed. Course row shows **only courseCode plus the number of Profiles**. Every other parent-row field is **`—`**: Course Profile, credits, creation date, instructor, review status, notes, course link, evidence link. The parent must not borrow a value from its first Profile or derive a single review status.
- Each course has +/- expand/collapse to reveal inline **one original source Profile per child table row**, with courseProfile, credits, createdDate, instructors, original reviewStatus, existing recommendation/note, original course link and original evidence link. GR future multi-Profile cases (including T/L combinations) must keep all Profile rows visible on expansion; their source statuses remain separate until an explicit course-level decision exists.
- Continue exact grouping on `faculty + courseCode` (course codes in different faculties remain separate), including zero-student records, sourcing read-only from `GRGS_Public` only. Do not create a new GR/GS pass/fail roll-up or apply the AI Tutor/Podcast MAX score logic.
- **Course View pagination now follows AI Tutor: 4 complete faculty groups per page** (filter/search → group courses under faculty → paginate faculties); show each faculty's full eligible course list in the same page, even when it contains over 20 courses. This **supersedes the former GS Course View 20-courses/page wording** above. Existing **Profile View remains flat and defaults to 20 Profiles/page**. On entering GS, Profile View is still the default; the five Profile Summary filters and the course/Profile toggle are retained.
- Tree styling follows the AI Tutor family: soft-blue faculty group rows, light course rows, white Profile rows, small blue plus/minus buttons, connector lines, compact Profile count pills, keyboard-focus visibility, mobile horizontal-scroll table. Course View uses nine columns; no second nested table or extra unapproved parent-level status.
- The shared `index.html` is guarded by `activeType === 'GS'`; GR must continue using its existing flat table and unchanged KPI/chart/donut source/status handling. GS KPI/chart/donut calculations also remain unchanged here; the approved scope is GS **detail display only**.

### Files / regression / release
- Preflight from `main@2e0703dbd7ecf79fd685bc97a61ab6d0a2b3cafd`, reviewed latest Handoff, `index.html`, AI Tutor Tree Table and open PR list (none).
- Scoped change: `index.html` replaces the GS-only Course View row renderer with faculty/course/Profile three-level rows, adds faculty-collapse state and AI Tutor-style course-view faculty pagination. Adds `tests/ooe-gs-tree-table.test.js` to check 9-column rows, parent placeholders, expanded two-Profile source rows, collapsed faculty, pagination and GR isolation. Existing GS helper, source sheet, AI Tutor/Podcast and authentication are unchanged.
- Validation via V8/JavaScript evaluation: `index.html` inline JS PASS; combined GS helper + page integration + new tree tests **14/14 PASS**, including mixed-Profile statuses and zero-student eligibility. Full authenticated desktop/mobile Browser E2E and live GitHub Pages visual validation have NOT been claimed.
- OWNER instructed direct delivery to `main`, not an unmerged Preview. Branch `feat/gs-tree-table-ai-style-20261118`; PR/merge SHA to be confirmed separately after GitHub merge. This is a visual/UI implementation, **not** a new GS/GR business scoring rule.

### Post-merge evidence — 18/11/2569
- OWNER-approved GS Tree Table delivered through **PR #35 (merged)** to `main@d18e4b42fc4747518877553f4ad75380ad81411a`.
- GitHub Actions **pages build and deployment** run [#44290323952](https://github.com/donut204/ooe-dashboard-2569/actions/runs/44290323952), head SHA `d18e4b42fc4747518877553f4ad75380ad81411a`, finished **completed/success**. This confirms the Pages workflow, not an authenticated visual Browser E2E.
- The original GS course layout is replaced only for GS Course View. Main GR table, GS default Profile table, KPIs/charts, Google Sheets and scoring rules remain outside the change.

## 18/11/2569 — OWNER confirmation — GS Tree Table is the approved GR template (implementation deferred)

- OWNER reviewed the **deployed GS Course View Tree Table** from PR #35 and explicitly confirmed: **“นี่แหละที่ผมต้องการ หน้า gr ก็ทำแบบนี้แหละ แต่เดี๋ยวค่อย”**. The current GS design is now the **accepted visual and interaction reference for a future GR Course View**.
- When OWNER later authorizes GR work, mirror the approved **Faculty → Course → Course Profile** hierarchy and AI Tutor-family styling: expandable/collapsible faculty and course rows, course-count and Profile-count pills, child Profile rows retaining the actual source fields, and **all Profile-specific course-parent cells as `—`**. Preserve exact `faculty + courseCode` identity, multiple Profiles under one course, per-Profile results/evidence links, and zero-student inclusion. Review the latest GS implementation and Handoff again at that time.
- **GR implementation is explicitly deferred. Do not modify the GR page now**, do not assume permission to change GR KPIs or derive a mixed-Profile course status, and do not infer/transfer the AI Tutor/Podcast scoring policy. Retain current GR behavior until a separate OWNER request.
- This round is **documentation only**: update `OOE_Dashboard_2569_Handoff_Knowledge.md` on `main` without changing `index.html`, scripts, Google Sheets, source CSV, data, filters or live UI.

## 18/11/2569 — OWNER approved and implemented GR course-grain KPI + GS-standard Tree Table

### Scope and owner decisions (supersedes the 18/11 "GR deferred" note above)
- OWNER explicitly approved implementing GR based on the previously accepted GS Tree Table and GR KPI plan. **This overrides the prior documentation-only GR deferral.** Deliver to `main` in the same work cycle; no Preview-only handoff.
- **Two distinct grains:** `faculty + courseCode` is **one course**; each `courseProfile` is **one Profile**. Never label the Profile count as "รายวิชา". Same code in different faculties counts as different courses; zero-student rows **remain eligible**. Source of truth remains native Google Sheet `Report691_18_11_2569`, sheet `GRGS_Public` (gid 131857057), published CSV URL unchanged.
- **Owner-confirmed course status:** if any Profile is blank, pending or not yet reviewed, **the entire course is `อยู่ระหว่างการตรวจสอบ`** until all its Profiles are reviewed; e.g. HMM215 (T)=ผ่าน, (L)=blank ⇒ HMM215 course=อยู่ระหว่างการตรวจสอบ. When all Profiles share the same verified status (ผ่าน / ไม่ผ่าน / ไม่พบเนื้อหา), that status is the course status. A mixture of *different completed statuses* or unknown values has no Owner-authorized priority; fail closed to `อยู่ระหว่างการตรวจสอบ` rather than invent a pass/fail/no-content winner, preserving each original Profile status. This conservative unresolved-mix path is a guardrail, **not** a declaration of a finalized mixed-completion policy. Never borrow AI Tutor/Podcast MAX/ProfileScore scoring.
- **Top GR KPI cards, GR faculty review bar chart and their click filters are all course-grain.** The GR Profile Summary uses five interactive Profile-grain cards and the existing review status of each Profile; blank reviewStatus is treated as pending **for secondary Profile counts/filter only**, not written to sheet. The GR progress donut is explicitly **Profile-grain**, with Profile unit shown at the center, in each legend count and in the explanatory text; it is not a second course-status KPI.
- **GR Tree Table mirrors GS-approved design**: 3 levels Faculty → Course → original source Profile. Faculties expanded/collapsible, each course collapsed by default and expandable to one child row per Profile. Parent row shows only code and Profile count, all eight Profile-specific cells `—`; includes original status, credits, instructor, date, note, course/evidence links in child rows. Course View paginates by **4 complete faculties/page**; Profile View retains **20 individual Profile rows/page** and is initially active. The same 5 Profile cards + Course/Profile mode controls are shared rather than cloned.
- **Course-level filtering:** combine all original Profiles into the faculty+courseCode course *before* evaluating reviewStatus. Faculty filter operates on course faculty; progress/text filters match when any constituent Profile matches, then retain **all sibling Profiles** in Course View (e.g. search for HMM215(L) still expands both T and L). Main reviewStatus dropdown filters courses by confirmed aggregate status. Clicking Profile Summary cards switches to the flat Profile View and filters individual Profile rows, clearing the main course-status filter; it never deletes/mutates or drops source Profile data.
- **GS is not recalculated**: GS still uses the pre-existing Profile-based KPI/chart/donut and approved Tree Table default/controls. AI Tutor, Podcast, authentication, manual reference date, Google Sheets/native formulas, published CSV URLs and source data are all unchanged.

### Verified read-only source control counts (dated snapshot, never hard-coded)
- 18/11/2569 `GRGS_Public`: GR **149 Profile / 138 courses / 13 faculties**; includes **46 zero-student Profiles**; 11 courses have multiple Profiles. Course-status KPI distribution under the owner-confirmed rule: **19 ผ่าน + 20 อยู่ระหว่างการตรวจสอบ + 94 ไม่ผ่าน + 5 ไม่พบเนื้อหา = 138**.
- GR Profile Summary distribution: **20 ผ่าน + 21 อยู่ระหว่างการตรวจสอบ (blank source reviewStatus) + 102 ไม่ผ่าน + 6 ไม่พบเนื้อหา = 149**.
- Ran **the actual new `OOEGRView.groupCourses / filterCourses / countCourses` helper on all 149 live Google Sheet source rows**, matched 138/149 and both KPI distributions. `HMM215` returns two original Profile rows while whole-course status is pending; searching its (L) Profile retains both T and L.
- GS input was independently 46 Profile / 46 courses in this snapshot. Do not interpret earlier 17/11 GR/GS raw/public counts as current.

### Code, tests, release boundary
- Baseline `main@481ad98c3391c35e7686d2a88461c49d60c754cd`. Feature branch `feat/gr-course-kpis-tree-20261118`.
- Changed `index.html` by adding GR course-grain KPI/chart/filter and Profile-grain donut/unit labels; reusing existing GS Profile Summary, view switch and Tree Table for GR. New `assets/ooe-gr-course-view.js` pure helper reads original source Profiles. Added `tests/ooe-gr-course-view.test.js`, `tests/ooe-gr-page-integration.test.js`, revised legacy GS page/tree regression assertions to cover the newly authorized shared GR layout, plus this MD in the same branch.
- Verified both helpers and full Dashboard inline JavaScript syntax. New GR unit/integration tests plus existing GS regression tests: **29/29 PASS** in an isolated JavaScript harness. Also verified the actual `GRGS_Public` source through the helper (not just a fixture). Full authorized browser E2E, responsive visual QA and GitHub Pages deployment **not yet claimed** at this checkpoint.
- Next release steps: inspect branch-vs-main diff, PR mergeability/head SHA, merge into `main`, verify exact merged code/MD, and check the GitHub Pages deployment status separately. Document confirmed post-merge SHA as evidence; never call a successful merge proof of browser-rendered UI.

### Production merge and GitHub Pages evidence — 18/11/2569
- **PR #36 merged**: `https://github.com/donut204/ooe-dashboard-2569/pull/36`, code merge SHA **`170eede97f024c013346ca10b76b8f7081289461`**. GitHub `main` and both `index.html` and `assets/ooe-gr-course-view.js` confirmed at that merge commit. This Handoff was included in the PR.
- GitHub Pages **pages build and deployment** run **#44321944912**, head SHA `170eede97f024c013346ca10b76b8f7081289461`: **completed / success** with build + deploy jobs completed successfully. Run URL: `https://github.com/donut204/ooe-dashboard-2569/actions/runs/44321944912`.
- Scope checks: changed only `index.html`, new GR helper, relevant GS/GR regression tests and this MD. No Source/Sheet/Auth/AI Tutor/Podcast changes. Automated and live-source arithmetic checks passed; **authenticated desktop/mobile visual browser E2E not performed**, so do not claim visual acceptance beyond GitHub Pages workflow success.

## 19/11/2569 — Owner sets displayed reference date 18/11/2569 on all four Dashboards

### Request and confirmed data-refresh behavior
- OWNER requested displaying **ข้อมูลอ้างอิง ณ วันที่ 18/11/2569** in the upper-right source header of **GR, GS, AI Tutor and Podcast**, with English **Data as of 18/11/2026**. This date is a **manual, owner-controlled display reference**, **not** the automatically detected timestamp of Google Sheet updates, not the current clock date, and not proof that upstream data was last updated on 18 Nov.
- Confirmed from latest `main` code before changing: `index.html` serves both GR and GS from published `GRGS_Public` CSV; `ai-tutor.html` and `podcast.html` each fetch their own published CSV. All three pages perform **cache-busted `fetch(...,{cache:'no-store'})`** on page load and on the Refresh Data button. Data, Profile/Course counts and KPI computations are derived from the newly fetched rows. Thus adding/revising **published** source rows is supported on next load/refresh without redeploying the Dashboard (provided source columns/schema, publication and business rules stay compatible). This is **not** continuous live push/realtime polling while a page remains open. The reference-date text does not automatically change with source data.
- Important existing issue noted but **not changed in this date-only patch**: the GR top-right source summary currently derives its `149 รายวิชา` label from Profile-row count, while the approved units are **138 distinct GR courses and 149 GR Profiles** at the previously checked snapshot. This metadata-date task did not authorize changing that source-summary count or label. Keep the discrepancy visible for a separate scoped correction, without conflating it with the manual date.

### Scope of code changes
- `assets/ooe-i18n.js`: change central immutable `REFERENCE_DATE` from `2026-11-16` → `2026-11-18`; retain Thai `+543` Buddhist calendar conversion and English Gregorian date.
- `index.html` (both GR and GS), `ai-tutor.html`, `podcast.html`: change the static Thai header fallback to `18/11/2569`, and bump shared i18n asset URL to `?v=20261119-refdate-1811` to invalidate stale browser caches. AI Tutor/Podcast page-i18n asset URLs are also bumped to that tag.
- `assets/ooe-page-i18n.js`: update the matching Thai/English date translation pair to `18/11/2569` / `18/11/2026`. `login.html` has no date reference and is untouched.
- Only displayed reference metadata, corresponding translation and versioned asset URLs change. **No change** to Google Sheet cells, `GRGS_Public`/AI/Podcast CSV URLs, course/Profile count rules, KPI/Score equations, statuses, filters, pagination, content source refresh behavior, authentication or responsive UI.

### Verification / delivery
- Baseline: `main@a638aa57ed2d8c6de3d389aac844a05361b71944`, with current `OOE_Dashboard_2569_Handoff_Knowledge.md` reviewed first, and no open PRs at preflight. Feature branch: `chore/reference-date-20261118-all-pages-20261119`.
- Added `tests/ooe-reference-date-20261118.test.js`. **5/5 tests passed** in isolated V8 JS execution: real shared referenceDate() returns Thai `18/11/2569` / EN `18/11/2026`, all active HTML headers and i18n versions match, adapter translation is updated, all inline JS and i18n source compile, and all three published CSV gids remain unchanged. The Handoff is updated in the same PR.
- PR/merge SHA and GitHub Pages deployment to be recorded on release. No authenticated visual browser/E2E claim; do not equate date-label change with a verified source data refresh.

### PR #37 merge / GitHub Pages confirmation — 19/11/2569
- PR [#37](https://github.com/donut204/ooe-dashboard-2569/pull/37) **merged** to `main`; exact code merge SHA `aacd3ef5f9562f6c589e886e6c1f7b2701072c52`. Verified `main` contents of all three HTML files, shared i18n, page-i18n and Handoff; every Dashboard's static fallback now uses 18/11/2569 and shared ISO date is 2026-11-18.
- GitHub Actions [pages build and deployment #44444532245](https://github.com/donut204/ooe-dashboard-2569/actions/runs/44444532245) on the exact merge SHA finished **completed/success** (build and deploy). GitHub Pages CI success is not authenticated desktop/mobile browser visual QA.
- Only the manually controlled **date displayed in the header** has changed. New published Google Sheet rows remain read on page open/Refresh; no hard-coded Profile/Course counts were introduced; the independently noted GR header 149-Profile-as-รายวิชา wording discrepancy remains out of scope.

## 19/11/2569 — GR completed mixed statuses and accurate all-page source summaries (OWNER follow-up)

### Problem found in screenshots and verified source — correction to 18/11 GR precedence note
- OWNER supplied screenshots of GR course-status KPI filtered to **อยู่ระหว่างการตรวจสอบ** showing 2 courses **ENG112** and **ICT203**. Re-read this Handoff, `main` GitHub code and read-only native Google Sheet `Report691_18_11_2569` → `GRGS_Public` (gid `131857057`) on 19 Nov.
- The two course groups each have **2 fully reviewed Profiles**, no pending review at all: ENG112 (T)=`ไม่ผ่าน`, (L)=`ไม่พบเนื้อหา`; ICT203 (T)=`ไม่ผ่าน`, (L)=`ไม่พบเนื้อหา`. **Root cause:** `assets/ooe-gr-course-view.js` old `courseStatus` returned `อยู่ระหว่างการตรวจสอบ` for ANY mixed completed statuses as a fail-closed placeholder (the old Handoff deliberately noted no final priority).
- **Current correction for this OWNER-authorized task, superseding the previous unresolved-mix placeholder:** A GR course remains `อยู่ระหว่างการตรวจสอบ` **only if at least one source Profile is blank/pending/unknown**, or the group is empty. If ALL source Profiles are reviewed: `ผ่าน` only if every Profile passes; `ไม่พบเนื้อหา` only if every Profile has no content; **all other completed outcomes, including `ไม่ผ่าน`+`ไม่พบเนื้อหา`, are `ไม่ผ่าน` at course grain**. Original per-Profile status remains unchanged in the Tree Table and Profile View. This is a **GR course-level review status rule**, not AI Tutor/Podcast CourseScore, and not a Google Sheet write.
- Verified latest `GRGS_Public` rows: GR **138 distinct faculty+courseCode courses / 149 Profiles**; Profile status totals **18 ผ่าน, 118 ไม่ผ่าน, 13 ไม่พบเนื้อหา, 0 pending**. Course status after correction: **17 ผ่าน + 0 อยู่ระหว่างตรวจสอบ + 112 ไม่ผ่าน + 9 ไม่พบเนื้อหา = 138**. ENG112 and ICT203 both become `ไม่ผ่าน`. All these figures are the **19/11 source snapshot, never hard-coded** in the site.
- This corrects the mistaken earlier fallback reflected in the 18 Nov Handoff (19/20/94/5 counts were from the previous 18 Nov data snapshot and MUST NOT be reused as current source counts).

### All four Dashboard pages — source header count review
- OWNER also reported header **`149 รายวิชา`** on GR; root cause is `index.html` `syncSourceSummary()` using `typeRows().length` (Profile rows) despite a `source.courseCount` label claiming course count.
- **Fix GR and GS only:** count unique `faculty + courseCode` from the currently loaded **published** `GRGS_Public` rows using the pre-existing `GS_VIEW.groupCourses(typeRows())` helper; display BOTH units through a new bilingual `source.courseProfileCount` translation, not hard-coded. Verified current source summary: GR **`138 รายวิชา (149 Profile)`**; GS **`46 รายวิชา (46 Profile)`**; EN `138 Courses (149 Profiles)`. Values refresh when the published CSV is loaded/refreshed, and update when switching GR ↔ GS.
- **AI Tutor and Podcast already correct — left untouched.** Both pages use `allCourseCount() { return groupCourses(DATA).length }` with grouping by `faculty + courseCode`, and render `DATA.length` as separate Profile count. Independently read `AI_Tutor_Public` (gid `223035731`) and `Podcast_Public` (gid `149082930`) from the same native Google Sheet: **762 courses / 913 Profiles** EACH (latest checked snapshot). No code change to `ai-tutor.html` or `podcast.html`.
- All three Dashboard HTML shells fetch their source public CSV on open and on the Refresh button using cache-busting query param and `cache:'no-store'`. New rows appear after source publication + refresh; these are **not** push/live updates while browser remains open. Manual reference date `18/11/2569` stays unchanged.

### Implementation, validation and release boundary
- Branch `fix/gr-mixed-status-and-source-course-count-20261119` based on `main@c22677c84fdbc27c82ddee18d09cd3f4f44d4774`; read current Handoff, existing GR/GS and AI/Podcast code, opened PR inventory (none) before change.
- Source files changed: `assets/ooe-gr-course-view.js` (completed mixed status precedence); `index.html` (dynamic GR/GS source summary and cache-busted helper/i18n URLs); `assets/ooe-i18n.js` (only new TH/EN source summary key); `tests/ooe-gr-course-view.test.js`, `tests/ooe-reference-date-20261118.test.js` (regression updates), new `tests/ooe-source-summary-course-count.test.js`; and this Handoff. **No changes** to published Sheet/CSV URLs, source data, GS KPI math, existing Profile statuses/evidence, AI Tutor, Podcast, Score equations, Auth, pagination, reference date, or responsive CSS.
- All current relevant JavaScript inline scripts/helpers compile; **40/40** existing+updated+new isolated JavaScript regression tests pass, including GR mixed status precedence, pending/unknown safety, dynamic source summaries, cache version checks, exact GS Tree, bilingual ref date and non-regression of AI Tutor/Podcast header formulas. Also executed the actual **new** GR course-grain helper on all published 149 GR Profiles and reconciled `17/0/112/9`; verified no removal of 0-student Profiles, same faculty+course identity, and original ENG112/ICT203 source evidence unchanged. This is not an authenticated browser E2E test.
- OWNER workflow: deliver to `main`, not unseen preview. PR number, exact merge SHA and GitHub Pages deployment to be recorded separately once verified.

### PR #38 / main / GitHub Pages verification — 19/11/2569
- [PR #38](https://github.com/donut204/ooe-dashboard-2569/pull/38) **merged** into `main`, exact release code merge SHA `1d9462b9d369b88652988089e14c896c9748abb2`. Verified `main` files: `index.html`, `assets/ooe-gr-course-view.js`, `assets/ooe-i18n.js`, and the updated Handoff all contain the reviewed fix.
- GitHub Actions [Pages workflow #44446955847](https://github.com/donut204/ooe-dashboard-2569/actions/runs/44446955847) has `head_sha=1d9462b9d369b88652988089e14c896c9748abb2` and **completed / success**; all **build, deploy and report-build-status** jobs passed. This verifies successful Pages publication pipeline, not authenticated visual Browser E2E.
- The already-verified raw-sheet counts (GR 138 courses/149 Profiles; GS 46/46; AI Tutor and Podcast each 762/913) remain dynamically sourced and are **not coded as constants**. GR course KPI after fixing mixed-completed review statuses: **17 pass, 0 pending, 112 fail, 9 no-content** on the 19 Nov source snapshot. Source Google Sheet and original evidence remain read-only; manual displayed reference date remains 18/11/2569.

## 19/11/2569 — GR Profile Summary / donut main-filter synchronization

### OWNER-confirmed UI rule (supersedes the previous Profile-card cross-filter exemption)
- OWNER approved fixing GR visual confusion: **GR Profile Summary and GR donut must share the exact same set of original Profile rows AFTER all active main filters (including the course-level reviewStatus filter)**. In other words, the five GR Profile counts are not global totals while the main course-status filter is active. They describe the Profiles inside the currently selected courses, just as the progress donut does.
- Example from read-only `GRGS_Public` source, 19 Nov: **GR 138 courses / 149 Profiles**; source Profile status `ไม่พบเนื้อหา` is **13** globally. But the main filter `ไม่พบเนื้อหา` chooses **9 course groups**, containing **11 Profiles**; these 11 all have Profile status `ไม่พบเนื้อหา`. Two other no-content Profiles, the (L) members of **ENG112 and ICT203**, belong to **ไม่ผ่าน** course groups and are excluded from the filtered view. Expected on main filter=no-content: KPI = 9 courses; Profile Summary = 11 total Profiles, 11 no-content Profiles; donut = 11 Profiles. After resetting the filter: Profile Summary = 149 total and 13 no-content Profiles.
- Clicking a **GR Profile status card** keeps the currently selected **main course-status filter** intact; Profile card selection further intersects its Profile-status filter with those already selected courses, and switching Course/Profile views doesn't alter the main selection. This prevents clicking a Profile card from silently showing out-of-scope courses. The **GS** behavior is intentionally retained unchanged and still clears its main review filter when a Profile card is clicked.
- GR course-status aggregation itself is unchanged: a fully reviewed course with mixed failed/no-content Profiles remains `ไม่ผ่าน`; Profile rows and evidence preserve source statuses. Do not alter `GRGS_Public`, course identity `faculty + courseCode`, 0-student inclusion, GR KPI/chart grain (courses), or GR donut grain (Profiles).

### Technical delta and verification
- Baseline `main@250c37d2004f3a1a48397aae023b0c863148bcb0`; branch `fix/gr-profile-cards-main-filter-sync-20261119`. Read current handoff/source and open PR inventory (none).
- Only `index.html` changes in app code. GR `syncGsControls()` now receives `rows` (the same filtered Profiles passed to `renderDonut(rows)`), and the GR flat Profile View also starts from these `rows`; it no longer invokes `filteredGrCourses(true)` to ignore the active main review filter. The Profile-card click handler clears `reviewFilter` only on GS. Existing 5 status cards, GS Tree Table, course/profile totals, data fetch, source links, reference date, AI Tutor/Podcast all remain in place.
- Updated `tests/ooe-gr-page-integration.test.js` and added `tests/ooe-gr-profile-filter-sync.test.js`, covering 13→11 reconciliation, 9-course filter, GR/Profile/drilldown source alignment, preserved GR review filter on card click, and unchanged GS click behavior. **44/44 targeted existing + new JavaScript tests PASS** in isolated execution, plus inline JS syntax PASS across all Dashboard HTML. Replayed original GR helper against all 149 published source Profile rows: 9 no-content courses, 11 Profiles inside, 2 source no-content Profiles outside because their parent course is fail; unfiltered total 149 / 13. Browser visual E2E not claimed.
- Owner workflow mandates same-task delivery on `main`; record verified PR / merge SHA / GitHub Pages deployment in a follow-up subsection after release.

### PR #39 main merge and Pages proof — 19/11/2569
- [PR #39](https://github.com/donut204/ooe-dashboard-2569/pull/39) **merged to `main`** with exact code merge SHA `4e8664bcba17438ab80e5da596a314a3703b661b`. GitHub `main` `index.html` and this Handoff confirm the GR-only sync logic and retained GS-specific filter reset.
- [GitHub Pages workflow #44450568310](https://github.com/donut204/ooe-dashboard-2569/actions/runs/44450568310), exact head SHA `4e8664bcba17438ab80e5da596a314a3703b661b`, finished **completed / success**. This verifies the deployment pipeline, not browser visual acceptance.
- Regression **44/44 PASS** and native GRGS_Public read-only replay checked main no-content filter: 9 courses / 11 Profiles in both GR Profile cards and donut; global 149 total Profiles / 13 no-content. No Sheet, score, GS/AI Tutor/Podcast or source URL edits.
