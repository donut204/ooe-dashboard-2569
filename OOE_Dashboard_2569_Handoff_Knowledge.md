# OOE Dashboard 2569 — Handoff & Knowledge Base

> Living handoff note สำหรับส่งต่องาน กู้บริบท และใช้เป็นแหล่งอ้างอิงก่อนแก้ระบบ  
> **อัปเดตล่าสุด: 07/10/2569**  
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
- **Tree alignment ล่าสุด:** เพิ่มระยะระหว่างปุ่ม Expand กับชื่อรายวิชาเล็กน้อย และให้เส้นกิ่งของ Course Profile เริ่มใต้แนวชื่อรายวิชาแล้วลากต่อเนื่องข้ามคอลัมน์ไปถึง Course Profile เพื่อให้ความสัมพันธ์ parent → child ชัดเจน
- **Faculty group count ล่าสุด:** ตัวเลขหลังชื่อคณะ/วิทยาลัยต้องเป็นจำนวนรายวิชาทั้งหมดของคณะนั้นในชุดผลลัพธ์ที่ผ่าน Filter ปัจจุบัน ไม่ใช่จำนวนเฉพาะในหน้าปัจจุบันของ Pagination
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
- Card คะแนน KPI รวมแสดง TotalPoints / TotalCourses + Progress % + horizontal progress bar
- **การแสดง TotalPoints ใน Card ใช้การปัดขึ้นด้วย `Math.ceil()`** ทั้ง AI Tutor และ Podcast เช่น 410.67 → 411, 264.87 → 265
- การปัดขึ้นเป็น **presentation เท่านั้น**; ค่า Progress % และ logic คำนวณ KPI ยังคงใช้คะแนนจริงก่อนปัด
- Card ผลลัพธ์หลักใช้ icon ขนาดใหญ่ขึ้น และวาง **icon ทางซ้าย / label + จำนวนทางขวา** แทนการวางจำนวนใต้ icon
- **GR/GS Active state ใช้สีตามสถานะของ Card**: รายวิชาทั้งหมด = Blue, ผ่าน = Green, อยู่ระหว่างการตรวจสอบ = Amber, ไม่ผ่าน = Red
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
