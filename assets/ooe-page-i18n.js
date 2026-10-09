/* OOE AI Tutor / Podcast bilingual presentation layer.
   Translation never changes CSV rows, select values, KPI equations or data attributes. */
(function(){
'use strict';
const I=window.OOEI18n;if(!I)return;
const D={
'ปีการศึกษา 2569 · ภาคการศึกษา 1':'Academic Year 2026 · Semester 1',
'สำนักการจัดการศึกษาออนไลน์ (OOE)':'Office of Online Education (OOE)',
'กำลังโหลดข้อมูลออนไลน์...':'Loading online data...',
'ข้อมูลอ้างอิง ณ วันที่ 05/10/2569':'Data as of 05/10/2026',
'หน้า GS':'GS','หน้า GR':'GR',
'คณะ / วิทยาลัย':'Faculty / College','ทั้งหมด':'All',
'ประเภทรายวิชา':'Course Type','สถานะ AI Tutor':'AI Tutor Status','สถานะ Podcast':'Podcast Status',
'ทำครบทุก Profile':'Complete for All Profile','ครบทุก Profile':'Complete for All Profile',
'ทำครบ':'Completed','จัดทำไม่ครบ':'Partially Completed','ไม่ทำ':'Not Completed','ทำ':'Completed',
'จำนวน Profile':'Number of Profile','ค้นหารหัสวิชาหรือรหัสรายวิชาในระบบ':'Search Course Code or Course Profile',
'อัปเดตข้อมูล':'Refresh Data','ล้างตัวกรอง':'Clear Filters','รายวิชาทั้งหมด':'Total Courses','รายวิชา':'Courses',
'ข้อมูลระดับ Profile':'Profile Overview','อัปเดตตามข้อมูล Google Sheet และตัวกรองปัจจุบัน':'Updated from Google Sheets using the current filters',
'Profile ทั้งหมด':'Total Profile','Profile ที่ทำ':'Completed Profile','Profile ที่ทำครบ':'Completed Profile',
'Profile ที่จัดทำไม่ครบ':'Partially Completed Profile','Profile ที่ไม่ทำ':'Not Completed Profile',
'จำนวนรายวิชา AI Tutor แยกตามคณะ':'AI Tutor Courses by Faculty',
'จำนวนรายวิชา Podcast แยกตามคณะ':'Podcast Courses by Faculty',
'แสดงจำนวนรายวิชาในแต่ละสถานะตามคณะจากผลตามตัวกรองปัจจุบัน':'Courses by faculty and completion status based on the current filters',
'คะแนน KPI รวม':'Overall KPI Score','คะแนนที่ได้ / คะแนนเต็ม':'Achieved Score / Maximum Score',
'ความคืบหน้า':'Progress','ความคืบหน้า AI Tutor':'AI Tutor Progress','ความคืบหน้า Podcast':'Podcast Progress',
'คะแนนเต็ม 1 คะแนนต่อรายวิชา และหารตามจำนวน Profile':'Each course is worth 1 point, averaged across its Profile',
'รายละเอียดรายวิชา — AI Tutor':'AI Tutor Course Details','รายละเอียดรายวิชา — Podcast':'Podcast Course Details',
'1 รหัสวิชา = 1 รายวิชา · กด + เพื่อดูผลแต่ละ Profile':'1 course code = 1 course · Select + to view individual Profile',
'คณะ / วิทยาลัย · รายวิชา':'Faculty / College · Course',
'อาจารย์ผู้สอน':'Instructor(s)','คะแนน / AI Tutor':'AI Tutor Score','คะแนน / Podcast':'Podcast Score',
'สถานะ':'Status','คำแนะนำ':'Guidance','ก่อนหน้า':'Previous','ถัดไป':'Next',
'ข้อมูลจะอัปเดตเมื่อเปิดหน้าเว็บหรือกด “อัปเดตข้อมูล” · ไม่มีการเผยแพร่อีเมลผู้สอนใน Dashboard':'Data updates when the page opens or when Refresh Data is selected · Instructor email addresses are not published',
'เกณฑ์การนับรายวิชาสำหรับ AI Tutor':'AI Tutor Course Counting Criteria',
'เกณฑ์การนับรายวิชาสำหรับ Podcast':'Podcast Course Counting Criteria',
'ตัวตั้ง':'Numerator','ตัวหาร':'Denominator','จำนวนรายวิชา (ระดับปริญญาตรี)':'Number of Undergraduate Courses',
'หนึ่งรายวิชาต้องมี 1 AI Tutor':'Each course must have 1 AI Tutor',
'หนึ่งรายวิชาต้องมี 15 Podcast':'Each course must have 15 Podcast items',
'ไม่นับ รายวิชาที่':'Excluded Courses',
'สอนโดยอาจารย์พิเศษท่านเดียว':'Taught solely by one adjunct instructor',
'รายวิชาโครงงาน / เตรียมโครงงาน':'Project / Project Preparation courses',
'รายวิชาสหกิจศึกษา / เตรียมสหกิจ':'Cooperative Education / Preparation courses',
'รายวิชาสัมมนา':'Seminar courses','รายวิชาอื่น ๆ ที่ไม่ได้สอนในห้องเรียน':'Other courses without classroom instruction',
'รายวิชาที่นักศึกษาเป็นศูนย์':'Courses with zero students',
'วิชาที่ได้รับให้ดำเนินการในรูปแบบอื่น ๆ เช่น':'Courses approved for alternative delivery, such as',
'ห้ามแสดงอีก':'Do not show again','เข้าใจแล้ว':'Got it',
'คำแนะนำการจัดทำ AI Tutor':'AI Tutor Preparation Guidelines','คำแนะนำการจัดทำ Podcast':'Podcast Preparation Guidelines',
'สถานะ: ไม่ทำ':'Status: Not Completed',
'ยังไม่พบการจัดทำ AI Tutor ในรายวิชานี้ กรุณาจัดทำให้เป็นไปตามเกณฑ์ที่กำหนด':'No AI Tutor has been found for this course. Please complete it according to the specified criteria.',
'เกณฑ์การจัดทำ AI Tutor':'AI Tutor Preparation Criteria',
'AI Tutor สามารถให้คำแนะนำเนื้อหาของบทเรียนทั้งรายวิชา':'AI Tutor should provide guidance on lesson content throughout the course',
'AI Tutor สามารถให้คำแนะนำวิธีการเรียนของรายวิชา':'AI Tutor should provide guidance on how to study the course',
'สามารถใช้ SPU AI หรือรูปแบบอื่นตามความเหมาะสมกับลักษณะรายวิชา':'SPU AI or another suitable tool may be used depending on the course',
'แนวทางการจัดทำ':'Preparation Guidelines',
'ตั้งชื่อ Label โดยระบุคำว่า “AI Tutor” เพื่อให้ง่ายต่อตรวจสอบ':'Include “AI Tutor” in the Label name for easier verification',
'จำนวนสัปดาห์ที่กำหนด':'Required Weeks','จำนวน Podcast ที่พบ':'Podcast Items Found','รายการที่ต้องจัดทำเพิ่ม':'Remaining Items',
'เกณฑ์การจัดทำ Podcast':'Podcast Preparation Criteria',
'จัดทำ Podcast ให้ครบตามเกณฑ์คงที่ 15 สัปดาห์':'Prepare Podcast items for all 15 required weeks',
'Podcast อย่างน้อย 1 คลิปเสียง โดยความยาวรวมไม่น้อยกว่า 10 นาที':'At least one Podcast audio clip with a total duration of at least 10 minutes',
'บันทึกเนื้อหา podcast ตามรายละเอียด File PDF เอกสารประกอบการสอน':'Record Podcast content based on the PDF course materials',
'ใช้เนื้อหาจาก File PDF ของแต่ละสัปดาห์เป็นข้อมูลหลัก':'Use each week’s PDF material as the main source',
'สามารถใช้เครื่องมือ AI เช่น Google NotebookLM ช่วยจัดทำ Podcast':'AI tools such as Google NotebookLM may assist with Podcast preparation',
'ตั้งชื่อ Label โดยระบุคำว่า “Podcast” เพื่อให้ง่ายต่อตรวจสอบ เช่น “Podcast Week 1”':'Include “Podcast” in the Label name for easier verification, e.g., “Podcast Week 1”',
'ตรวจสอบจำนวน Podcast ให้ครบ 15 รายการตามเกณฑ์ก่อนส่งรายวิชา':'Verify that all 15 Podcast items are complete before submission',
'ปิด':'Close','ออกจากระบบ':'Sign Out','บัญชีผู้ใช้':'User account',
'คำแนะนำการจัดทำ':'Preparation Guidance','ดูคำแนะนำ':'View Guidance',
'กดเพื่อกรอง →':'Click to filter →','กดเพื่อแสดงทั้งหมด →':'Click to show all →',
'กำลังกรอง ✓':'Filtering ✓','แสดงทั้งหมด ✓':'Showing all ✓',
'เปิด ↗':'Open ↗','รอข้อมูล':'Pending Data','ไม่พบข้อมูล':'No data found',
'ไม่พบข้อมูลตามตัวกรอง':'No data matches the current filters',
'คลิกเพื่อกรองคณะนี้':'Click to filter this faculty',
'กดเพื่อกรองคณะนี้':'Select to filter this faculty',
'คะแนนที่ได้':'Achieved Score','คะแนนที่ยังขาด':'Remaining Score',
'ครบ':'Complete','วิชา':'Courses',
'กำลังอัปเดต...':'Refreshing...',
'เลือกจำนวน Profile':'Select Profile count',
'เสร็จสิ้น':'Done',
'แสดงทุกจำนวน Profile':'Showing all Profile counts'
};
const patterns=[
[/^เลือก (\d+) รายการ$/,'$1 selected'],
[/^เลือกแล้ว (\d+) รายการ$/,'$1 selected'],
[/^จาก ([\d,]+) Profile$/,'From $1 Profile'],
[/^([\d,]+) รายวิชา \(([\d,]+) Profile\)$/,'$1 Courses ($2 Profile)'],
[/^([\d,]+) รายวิชา$/,'$1 Courses'],
[/^([\d,]+) วิชา$/,'$1 Courses'],
[/^([\d,]+) ตรวจแล้ว$/,'$1 reviewed'],
[/^แสดง ([\d,]+) จาก ([\d,]+) รายวิชา$/,'Showing $1 of $2 Courses'],
[/^แสดงคณะ ([\d,]+)[–-]([\d,]+) จาก ([\d,]+) คณะ · ([\d,]+) รายวิชา$/,'Faculties $1–$2 of $3 · $4 Courses'],
[/^([^·]+) · ([\d,]+) รายวิชา$/,'$1 · $2 Courses'],
[/^ครบ ([\d,]+) · จัดทำไม่ครบ ([\d,]+) · ไม่ทำ ([\d,]+)$/,'Complete $1 · Partial $2 · Not Completed $3'],
[/^(.+?) · ([\d,]+) รายวิชา · ครบ ([\d,]+) · จัดทำไม่ครบ ([\d,]+) · ไม่ทำ ([\d,]+)$/,'$1 · $2 Courses · Complete $3 · Partial $4 · Not Completed $5'],
[/^แสดง ([\d,]+) จาก ([\d,]+) วิชา$/,'Showing $1 of $2 Courses'],
[/^สถานะ: (.+)$/,'Status: $1'],
[/^(.+) · ภาคการศึกษา 1\/2569$/,'$1 · Semester 1/2026'],
[/^พบการจัดทำ Podcast แล้ว ([\d,]+) จาก ([\d,]+) รายการ กรุณาจัดทำเพิ่มเติมอีก ([\d,]+) รายการให้ครบตามเกณฑ์ 15 สัปดาห์$/,'Found $1 of $2 Podcast items. Please create $3 more to meet the 15-week requirement.'],
[/^ยังไม่พบการจัดทำ Podcast จากเกณฑ์ที่กำหนด ([\d,]+) รายการ กรุณาจัดทำ Podcast ให้เป็นไปตามเกณฑ์ที่กำหนด$/,'No Podcast items were found. Please prepare all $1 items according to the criteria.']
];
const originals=new WeakMap();
let observer=null;let running=false;
function translate(s){
  if(D[s]!==undefined)return D[s];
  for(const [re,repl] of patterns){if(re.test(s))return s.replace(re,repl)}
  return s;
}
function localizeNode(node){
  if(node.nodeType!==3)return;
  const parent=node.parentElement;if(!parent||parent.closest('script,style,textarea,option[data-source-code],.lang-switch,.ooe-single'))return;
  const raw=originals.has(node)?originals.get(node):node.nodeValue;
  if(!originals.has(node))originals.set(node,raw);
  const trimmed=raw.trim();if(!trimmed)return;
  const output=I.getLanguage()==='en'?translate(trimmed):trimmed;
  const next=raw.replace(trimmed,output);
  if(node.nodeValue!==next)node.nodeValue=next;
}
function process(root){
  if(root.nodeType===3){localizeNode(root);return}
  if(root.nodeType!==1&&root.nodeType!==9)return;
  if(root.nodeType===1&&root.matches('script,style,textarea'))return;
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;
  while(n=walker.nextNode())localizeNode(n);
  if(root.nodeType===1)syncAttrs(root);
  root.querySelectorAll?.('[title],[aria-label],[placeholder],option').forEach(syncAttrs);
}
const attrs=new WeakMap();
function syncAttrs(el){
  if(el.matches('.lang-switch,.lang-btn')||el.closest('.ooe-single'))return;
  let saved=attrs.get(el);if(!saved){saved={};for(const key of ['title','aria-label','placeholder'])if(el.hasAttribute(key))saved[key]=el.getAttribute(key);attrs.set(el,saved)}
  for(const [key,value] of Object.entries(saved)){
    const next=I.getLanguage()==='en'?translate(value):value;
    if(el.getAttribute(key)!==next)el.setAttribute(key,next);
  }
}
function update(){
  if(running)return;
  running=true;
  if(observer)observer.disconnect();
  process(document.body);
  const source=document.getElementById('sourceReferenceText');
  if(source)source.textContent=I.t('source.referenceDate',{date:I.referenceDate()});
  // Changing lang triggers other observers; skip the write if already correct.
  if(document.documentElement.lang!==I.getLanguage())document.documentElement.lang=I.getLanguage();
  document.querySelectorAll('.lang-btn').forEach(btn=>{
    const on=btn.dataset.lang===I.getLanguage();btn.classList.toggle('is-active',on);btn.setAttribute('aria-pressed',String(on));
  });
  const sw=document.querySelector('.lang-switch');if(sw)sw.dataset.active=I.getLanguage();
  if(observer)observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['title','aria-label','placeholder']});
  running=false;
}
function start(){
  const sw=document.querySelector('.lang-switch');
  if(sw)sw.addEventListener('click',e=>{
    const b=e.target.closest('button[data-lang]');if(!b)return;
    if(b.dataset.lang!==I.getLanguage()){I.setLanguage(b.dataset.lang);update()}
  });
  observer=new MutationObserver(()=>{if(!running)update()});
  update();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();