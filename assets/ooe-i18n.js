(function(global){
  'use strict';

  const STORAGE_KEY='ooe_dashboard_language_v1';
  const REFERENCE_DATE='2026-10-05';
  const SUPPORTED=['th','en'];

  const translations={
    th:{
      'language.switcher':'เลือกภาษา',
      'language.th':'ภาษาไทย',
      'language.en':'English',
      'page.dashboardCourse':'Dashboard รายวิชา {type}',
      'page.documentTitle':'Dashboard รายวิชา {type} | OOE 2569',
      'header.subtitle':'ปีการศึกษา 2569 · ภาคการศึกษา 1',
      'header.office':'สำนักการจัดการศึกษาออนไลน์ (OOE)',
      'source.loading':'กำลังโหลดข้อมูลออนไลน์...',
      'source.loadError':'ไม่สามารถโหลดข้อมูลออนไลน์ได้',
      'source.referenceDate':'ข้อมูลอ้างอิง ณ วันที่ {date}',
      'source.courseCount':'{count} รายวิชา',
      'nav.aria':'เลือกหน้าประเภทรายวิชา',
      'nav.gs':'หน้า GS',
      'nav.gr':'หน้า GR',
      'nav.aiTutor':'AI Tutor',
      'nav.podcast':'Podcast',
      'filters.faculty':'คณะ / วิทยาลัย',
      'filters.progress':'ความคืบหน้า',
      'filters.reviewStatus':'สถานะการตรวจสอบ',
      'filters.search':'ค้นหารหัสวิชาหรือรหัสรายวิชาในระบบ',
      'filters.searchPlaceholder':'เช่น ICT401 หรือ 691GS...',
      'filters.all':'ทั้งหมด',
      'filters.refresh':'อัปเดตข้อมูล',
      'filters.refreshing':'กำลังอัปเดต...',
      'filters.reset':'ล้างตัวกรอง',
      'kpi.total':'รายวิชาทั้งหมด',
      'kpi.pass':'ผ่าน',
      'kpi.reviewing':'อยู่ระหว่างการตรวจสอบ',
      'kpi.fail':'ไม่ผ่าน',
      'kpi.totalNote':'จาก {count} รายวิชาทั้งหมด',
      'kpi.visibleNote':'จาก {count} รายวิชาที่แสดง',
      'kpi.titleAll':'แสดงทุกสถานะการตรวจสอบ',
      'kpi.titlePass':'กรองเฉพาะรายวิชาที่ผ่าน',
      'kpi.titleReviewing':'กรองเฉพาะรายวิชาที่อยู่ระหว่างการตรวจสอบ',
      'kpi.titleFail':'กรองเฉพาะรายวิชาที่ไม่ผ่าน',
      'kpi.cueFilter':'กดเพื่อกรอง →',
      'kpi.cueShowAll':'กดเพื่อแสดงทั้งหมด →',
      'kpi.cueFiltering':'กำลังกรอง ✓',
      'kpi.cueAllShown':'แสดงทั้งหมด ✓',
      'chart.title':'ผลการตรวจแยกตามคณะ — {type}',
      'chart.description':'แสดงผลการตรวจเฉพาะ “ผ่าน / ไม่ผ่าน” แยกตามคณะ · รายวิชาที่อยู่ระหว่างการตรวจสอบยังไม่รวมในแท่งกราฟ',
      'chart.pass':'ผ่าน',
      'chart.fail':'ไม่ผ่าน',
      'chart.reviewing':'อยู่ระหว่างการตรวจสอบ',
      'chart.reviewed':'{count} ตรวจแล้ว',
      'chart.filterFaculty':'คลิกเพื่อกรองคณะนี้',
      'faculty.unspecified':'ไม่ระบุคณะ',
      'chart.summary':'{faculty} · {total} รายวิชา · ผ่าน {pass} · ไม่ผ่าน {fail} · อยู่ระหว่างการตรวจสอบ {reviewing}',
      'chart.facultyTotal':'{faculty} · {total} รายวิชา',
      'chart.statusLine':'ผ่าน {pass} · ไม่ผ่าน {fail} · อยู่ระหว่างการตรวจสอบ {reviewing}',
      'chart.empty':'ยังไม่มีรายวิชาที่มีผลตรวจ “ผ่าน / ไม่ผ่าน” ตามตัวกรองนี้',
      'donut.title':'สัดส่วนความคืบหน้าของเนื้อหา — {type}',
      'donut.description':'คำนวณตามตัวกรองที่เลือก',
      'donut.centerLabel':'รายวิชา',
      'progress.good':'พบเนื้อหาในระดับมาก',
      'progress.low':'พบเนื้อหาในระดับน้อย',
      'progress.none':'ไม่มีเนื้อหา',
      'progress.pending':'รอข้อมูล',
      'progress.unknown':'ตรวจสอบข้อความ',
      'progress.noticeTitle':'พบข้อความความคืบหน้าที่ไม่รู้จัก {count} รายวิชา',
      'progress.noticeHelp':'กรุณาตรวจสอบข้อความใน Google Sheets: รายการเหล่านี้ยังไม่ถูกจัดเป็นมาก / น้อย / ไม่มีเนื้อหา',
      'progress.item':'{count} วิชา ({pct}%)',
      'sourceQr.title':'ข้อมูลออนไลน์จาก Google Sheets',
      'sourceQr.description':'สแกน QR Code เพื่อเปิดข้อมูลที่เผยแพร่สำหรับ Dashboard โดยตรง',
      'sourceQr.alt':'QR Code สำหรับเปิดข้อมูลออนไลน์',
      'detail.title':'รายละเอียดรายวิชา {type}',
      'detail.description':'รายวิชาใน d-Learning / i-Learning · ดึงข้อมูลออนไลน์จาก Google Sheets',
      'table.order':'ลำดับ',
      'table.courseCode':'รหัสวิชา',
      'table.credits':'หน่วยกิต',
      'table.courseProfile':'รหัสรายวิชาในระบบ',
      'table.faculty':'คณะ / วิทยาลัย',
      'table.instructors':'อาจารย์ผู้สอน',
      'table.semester':'ภาคเรียน',
      'table.progress':'ความคืบหน้า',
      'table.reviewStatus':'สถานะการตรวจสอบ',
      'table.note':'หมายเหตุ',
      'table.course':'รายวิชา',
      'table.evidence':'หลักฐานการตรวจ',
      'table.open':'เปิด ↗',
      'table.viewEvidence':'ดูหลักฐาน ↗',
      'table.semesterValue':'1/2569',
      'note.none':'ไม่พบเนื้อหาในรายวิชา',
      'note.low':'ควรเพิ่มเนื้อหา',
      'note.pending':'รอข้อมูลความคืบหน้า',
      'note.unknown':'พบข้อความสถานะใหม่ กรุณาตรวจสอบ',
      'result.showing':'แสดง {shown} จาก {total} วิชา',
      'pager.showing':'แสดง {start}–{end} จาก {total} รายวิชา',
      'pager.empty':'ไม่พบข้อมูล',
      'pager.prev':'ก่อนหน้า',
      'pager.next':'ถัดไป',
      'footer.note':'หน้าข้อมูล GR และ GS แยกจากกันโดยสมบูรณ์ · ข้อมูลโหลดจาก Google Sheets เมื่อเปิดหน้าเว็บหรือกด “อัปเดตข้อมูล” · ตัวเลขทั้งหมดเป็นจำนวนรายวิชา',
      'error.chart':'โหลดข้อมูลจาก Google Sheets ไม่สำเร็จ กรุณาลองกด “อัปเดตข้อมูล” อีกครั้ง',
      'error.result':'โหลดข้อมูลไม่สำเร็จ',
      'auth.account':'บัญชีผู้ใช้',
      'auth.signOut':'ออกจากระบบ'
    },
    en:{
      'language.switcher':'Language',
      'language.th':'Thai',
      'language.en':'English',
      'page.dashboardCourse':'{type} Course Dashboard',
      'page.documentTitle':'{type} Course Dashboard | OOE 2026',
      'header.subtitle':'Academic Year 2026 · Semester 1',
      'header.office':'Office of Online Education (OOE)',
      'source.loading':'Loading online data...',
      'source.loadError':'Unable to load online data',
      'source.referenceDate':'Data as of {date}',
      'source.courseCount':'{count} Courses',
      'nav.aria':'Select dashboard',
      'nav.gs':'GS',
      'nav.gr':'GR',
      'nav.aiTutor':'AI Tutor',
      'nav.podcast':'Podcast',
      'filters.faculty':'Faculty / College',
      'filters.progress':'Content Progress',
      'filters.reviewStatus':'Review Status',
      'filters.search':'Search Course Code or Course Profile',
      'filters.searchPlaceholder':'e.g. ICT401 or 691GS...',
      'filters.all':'All',
      'filters.refresh':'Refresh Data',
      'filters.refreshing':'Refreshing...',
      'filters.reset':'Clear Filters',
      'kpi.total':'Total Courses',
      'kpi.pass':'Passed',
      'kpi.reviewing':'Under Review',
      'kpi.fail':'Not Passed',
      'kpi.totalNote':'From {count} total courses',
      'kpi.visibleNote':'From {count} displayed courses',
      'kpi.titleAll':'Show all review statuses',
      'kpi.titlePass':'Filter courses that passed review',
      'kpi.titleReviewing':'Filter courses currently under review',
      'kpi.titleFail':'Filter courses that did not pass review',
      'kpi.cueFilter':'Click to filter →',
      'kpi.cueShowAll':'Click to show all →',
      'kpi.cueFiltering':'Filtering ✓',
      'kpi.cueAllShown':'Showing all ✓',
      'chart.title':'Review Results by Faculty — {type}',
      'chart.description':'Shows only reviewed courses with “Passed / Not Passed” results by faculty · Courses under review are not included in the bars',
      'chart.pass':'Passed',
      'chart.fail':'Not Passed',
      'chart.reviewing':'Under Review',
      'chart.reviewed':'{count} reviewed',
      'chart.filterFaculty':'Click to filter this faculty',
      'faculty.unspecified':'Unspecified Faculty',
      'chart.summary':'{faculty} · {total} courses · Passed {pass} · Not Passed {fail} · Under Review {reviewing}',
      'chart.facultyTotal':'{faculty} · {total} Courses',
      'chart.statusLine':'Passed {pass} · Not Passed {fail} · Under Review {reviewing}',
      'chart.empty':'No courses with “Passed / Not Passed” results match the current filters',
      'donut.title':'Content Progress Distribution — {type}',
      'donut.description':'Calculated from the selected filters',
      'donut.centerLabel':'Courses',
      'progress.good':'High Content Volume',
      'progress.low':'Low Content Volume',
      'progress.none':'No Content',
      'progress.pending':'Pending Data',
      'progress.unknown':'Unrecognized Status',
      'progress.noticeTitle':'Unrecognized progress for {count} courses',
      'progress.noticeHelp':'Please review the source text in Google Sheets. These courses were not assigned to High / Low / No Content.',
      'progress.item':'{count} Courses ({pct}%)',
      'sourceQr.title':'Online Data from Google Sheets',
      'sourceQr.description':'Scan the QR code to open the published dashboard data directly',
      'sourceQr.alt':'QR code for opening the online dashboard data',
      'detail.title':'{type} Course Details',
      'detail.description':'Courses in d-Learning / i-Learning · Online data loaded from Google Sheets',
      'table.order':'No.',
      'table.courseCode':'Course Code',
      'table.credits':'Credits',
      'table.courseProfile':'Course Profile',
      'table.faculty':'Faculty / College',
      'table.instructors':'Instructor(s)',
      'table.semester':'Semester',
      'table.progress':'Content Progress',
      'table.reviewStatus':'Review Status',
      'table.note':'Notes',
      'table.course':'Course',
      'table.evidence':'Review Evidence',
      'table.open':'Open ↗',
      'table.viewEvidence':'View Evidence ↗',
      'table.semesterValue':'1/2026',
      'note.none':'No course content found',
      'note.low':'More content should be added',
      'note.pending':'Waiting for progress data',
      'note.unknown':'New progress wording: please review',
      'result.showing':'Showing {shown} of {total} courses',
      'pager.showing':'Showing {start}–{end} of {total} courses',
      'pager.empty':'No data found',
      'pager.prev':'Previous',
      'pager.next':'Next',
      'footer.note':'GR and GS are displayed as separate datasets · Data is loaded from Google Sheets when the page opens or when “Refresh Data” is selected · All figures represent course counts',
      'error.chart':'Unable to load data from Google Sheets. Please select “Refresh Data” and try again.',
      'error.result':'Unable to load data',
      'auth.account':'User account',
      'auth.signOut':'Sign Out'
    }
  };

  let language='th';

  function normalizeLanguage(value){
    const v=String(value||'').trim().toLowerCase();
    return SUPPORTED.includes(v)?v:'th';
  }

  function readInitialLanguage(){
    try{
      const search=String(global.location&&global.location.search||'');
      const match=search.match(/[?&]lang=([^&]+)/i);
      const query=match?decodeURIComponent(match[1].replace(/\+/g,' ')).toLowerCase():'';
      if(query&&SUPPORTED.includes(query))return query;
    }catch(e){}
    try{
      const saved=global.localStorage.getItem(STORAGE_KEY);
      if(saved&&SUPPORTED.includes(saved))return saved;
    }catch(e){}
    return 'th';
  }

  function interpolate(text,vars){
    return String(text).replace(/\{([^}]+)\}/g,(m,key)=>Object.prototype.hasOwnProperty.call(vars,key)?String(vars[key]):m);
  }

  function t(key,vars={}){
    const table=translations[language]||translations.th;
    const fallback=translations.th[key];
    return interpolate(table[key]??fallback??key,vars);
  }

  function number(value,options){
    const n=Number(value);
    return Number.isFinite(n)?n.toLocaleString(language==='en'?'en-US':'th-TH',options):String(value??'');
  }

  function referenceDate(){
    const parts=REFERENCE_DATE.split('-').map(Number);
    const year=language==='th'?parts[0]+543:parts[0];
    return `${String(parts[2]).padStart(2,'0')}/${String(parts[1]).padStart(2,'0')}/${year}`;
  }

  function updateUrl(){
    try{
      const search=String(global.location&&global.location.search||'').replace(/^\?/,'');
      const parts=search?search.split('&').filter(Boolean):[];
      const kept=parts.filter(part=>!/^lang=/i.test(part));
      kept.push('lang='+encodeURIComponent(language));
      const pathname=String(global.location&&global.location.pathname||'');
      const hash=String(global.location&&global.location.hash||'');
      global.history.replaceState(global.history.state,'',pathname+'?'+kept.join('&')+hash);
    }catch(e){}
  }

  function setLanguage(next,{persist=true,updateQuery=true}={}){
    language=normalizeLanguage(next);
    if(global.document&&global.document.documentElement){
      global.document.documentElement.lang=language==='en'?'en':'th';
    }
    if(persist){
      try{global.localStorage.setItem(STORAGE_KEY,language);}catch(e){}
    }
    if(updateQuery)updateUrl();
    return language;
  }

  function apply(root){
    if(!root||!root.querySelectorAll)return;
    root.querySelectorAll('[data-i18n]').forEach(el=>{
      el.textContent=t(el.dataset.i18n);
    });
    root.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
      el.setAttribute('placeholder',t(el.dataset.i18nPlaceholder));
    });
    root.querySelectorAll('[data-i18n-title]').forEach(el=>{
      el.setAttribute('title',t(el.dataset.i18nTitle));
    });
    root.querySelectorAll('[data-i18n-aria-label]').forEach(el=>{
      el.setAttribute('aria-label',t(el.dataset.i18nAriaLabel));
    });
    root.querySelectorAll('[data-i18n-alt]').forEach(el=>{
      el.setAttribute('alt',t(el.dataset.i18nAlt));
    });
  }

  function faculty(name){
    // Keep source faculty names until an official SPU English-name mapping is approved.
    return String(name??'');
  }

  language=readInitialLanguage();
  setLanguage(language,{persist:false,updateQuery:false});

  global.OOEI18n={
    t,
    number,
    referenceDate,
    faculty,
    apply,
    setLanguage,
    getLanguage:()=>language,
    referenceDateISO:REFERENCE_DATE,
    supportedLanguages:[...SUPPORTED]
  };
})(window);
