"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const GS=require("../assets/ooe-gs-course-view.js");
const html=fs.readFileSync(path.join(__dirname,"../index.html"),"utf8");
const a=html.indexOf("function renderGsCourseTable(rows){");
const b=html.indexOf("\nfunction render(reset=true){",a);
const renderer=html.slice(a,b);
const mk=(faculty,code,profile,status)=>({
  "คณะ":faculty,"รหัสวิชา":code,"Course Profile":profile,"สถานะการตรวจสอบ":status,
  "หน่วยกิต":"3(3-0-6)","วันที่สร้างรายวิชา":"2026-09-01",
  "ผู้สอน":"อาจารย์ตัวอย่าง","ลิงก์":"https://example.org/course/"+profile,
  "หลักฐานการตรวจ":"https://example.org/evidence/"+profile,"ความคืบหน้าการทำ":""
});
const rows=[mk("คณะ ก","ABC100","ABC100-T","ผ่าน"),mk("คณะ ก","ABC100","ABC100-L","ไม่ผ่าน"),
            mk("คณะ ข","ABC100","ABC100-X","ผ่าน"),
            mk("คณะ ค","ABC200","ABC200-T","ไม่ผ่าน"),
            mk("คณะ ง","ABC300","ABC300-T","ผ่าน"),
            mk("คณะ จ","ABC400","ABC400-T","ผ่าน")];
function render(data,opts={}){
  const nodes={
    courseTableHead:{innerHTML:"",closest:()=>({classList:{add:()=>{}}})},
    courseRows:{innerHTML:""},resultCount:{textContent:""},pageInfo:{textContent:""},
    prevBtn:{disabled:null},nextBtn:{disabled:null}
  };
  const env={
    GS_VIEW:GS,GS_FACULTY_PAGE_SIZE:4,
    gsCollapsedFaculties:new Set(opts.collapsed||[]),
    gsExpandedCourses:new Set(opts.expanded||[]),
    I18N:{getLanguage:()=>opts.lang||"th",faculty:value=>value},
    gsText:key=>({course:"รายวิชา",view:"ดู Profile",hide:"ซ่อน Profile",empty:"ไม่พบรายวิชา"})[key],
    gsFacultyToggleLabel:(closed,f)=>closed?"ขยายคณะ "+f:"ย่อคณะ "+f,
    gsFacultyPager:(start,end,total,count)=>`แสดงคณะ ${start}–${end} จาก ${total} คณะ · ${count} รายวิชา`,
    t:key=>key,fmt:value=>String(value),esc:value=>String(value).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;"),
    td:(v,c)=>`<td class="${c||""}">${v}</td>`,
    formatCreatedDate:v=>v,reviewBadge:s=>`<span class="review-badge">${s}</span>`,
    note:()=> "—",typeRows:()=>data,$:key=>nodes[key]
  };
  const fn=new Function("rows","env",`
    let currentPage=env.page;
    const {GS_VIEW,GS_FACULTY_PAGE_SIZE,gsCollapsedFaculties,gsExpandedCourses,I18N,
      gsText,gsFacultyToggleLabel,gsFacultyPager,t,fmt,esc,td,formatCreatedDate,reviewBadge,note,typeRows,$}=env;
    ${renderer}
    renderGsCourseTable(rows);
    return currentPage;`);
  env.page=opts.page||1;
  const finalPage=fn(data,env);
  return {nodes,finalPage};
}
test("GS tree produces three levels and masks every Profile-specific parent field",()=>{
  const {nodes}=render(rows);
  assert.equal((nodes.courseRows.innerHTML.match(/class="gs-faculty-group-row"/g)||[]).length,4);
  assert.equal((nodes.courseRows.innerHTML.match(/class="gs-course-row"/g)||[]).length,4);
  assert.equal((nodes.courseRows.innerHTML.match(/class="gs-profile-row"/g)||[]).length,0);
  assert.equal((nodes.courseRows.innerHTML.match(/class="gs-parent-placeholder">—<\/td>/g)||[]).length,32);
  assert.match(nodes.courseRows.innerHTML,/class="gs-profile-count">2 Profile/);
  assert.match(nodes.courseRows.innerHTML,/colspan="9"/);
  assert.match(nodes.pageInfo.textContent,/แสดงคณะ 1–4 จาก 5 คณะ/);
  assert.equal(nodes.nextBtn.disabled,false);
});
test("Course expand renders every original Profile with status, links, credit, instructor",()=>{
  const key=JSON.stringify(["คณะ ก","ABC100"]);
  const {nodes}=render(rows,{expanded:[key]});
  assert.equal((nodes.courseRows.innerHTML.match(/class="gs-profile-row"/g)||[]).length,2);
  assert.match(nodes.courseRows.innerHTML,/ABC100-T/);
  assert.match(nodes.courseRows.innerHTML,/ABC100-L/);
  assert.match(nodes.courseRows.innerHTML,/3\(3-0-6\)/);
  assert.match(nodes.courseRows.innerHTML,/อาจารย์ตัวอย่าง/);
  assert.match(nodes.courseRows.innerHTML,/https:\/\/example.org\/evidence\/ABC100-L/);
  assert.match(nodes.courseRows.innerHTML,/ไม่ผ่าน/);
  assert.equal((nodes.courseRows.innerHTML.match(/class="gs-parent-placeholder">—<\/td>/g)||[]).length,32);
});
test("Faculty collapse leaves faculty visible but hides its courses and Profiles",()=>{
  const key=JSON.stringify(["คณะ ก","ABC100"]);
  const {nodes}=render(rows,{collapsed:["คณะ ก"],expanded:[key]});
  assert.equal((nodes.courseRows.innerHTML.match(/class="gs-faculty-group-row"/g)||[]).length,4);
  assert.equal((nodes.courseRows.innerHTML.match(/class="gs-course-row"/g)||[]).length,3);
  assert.equal((nodes.courseRows.innerHTML.match(/class="gs-profile-row"/g)||[]).length,0);
});
test("Faculty pagination displays remaining groups and never splits a faculty",()=>{
  const {nodes}=render(rows,{page:2});
  assert.equal((nodes.courseRows.innerHTML.match(/class="gs-faculty-group-row"/g)||[]).length,1);
  assert.match(nodes.pageInfo.textContent,/แสดงคณะ 5–5 จาก 5 คณะ/);
  assert.equal(nodes.prevBtn.disabled,false);
  assert.equal(nodes.nextBtn.disabled,true);
});
test("GR now shares GS tree rendering; GS Profile-row source and KPI path stays unchanged",()=>{
  assert.match(html,/if\(gsViewMode==='course'\)renderGsCourseTable\(rows\)/);
  assert.match(html,/else\s*\{\s*\$\('courseTableHead'\).closest\('table'\).classList.remove\('gs-tree-table'\)/);
  assert.match(html,/gid=131857057&single=true&output=csv/);
  assert.match(html,/let gsViewMode='profile'/);
  assert.match(html,/setKpis\(grCourses\|\|rows\);\s*renderChart\(grCourses\|\|rows\);\s*renderDonut\(rows\);/);
});
