"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const GS=require("../assets/ooe-gs-course-view.js");
const GR=require("../assets/ooe-gr-course-view.js");
const root=path.join(__dirname,"..");
const read=p=>fs.readFileSync(path.join(root,p),"utf8");
const page=read("index.html");
const inline=page.match(/<script>\s*\nconst CSV_URL=[\s\S]*?<\/script>/)?.[0]
 .replace(/^<script>/,"").replace(/<\/script>$/,"");
const start=inline.indexOf("function syncSourceSummary(){");
const end=inline.indexOf("function syncLanguageUI(){",start);
const body=inline.slice(start,end);
const profile=(faculty,code,status="ผ่าน")=>({"คณะ":faculty,"รหัสวิชา":code,"สถานะการตรวจสอบ":status});
function sourceSummary(rows){
  const summary={dataset:{state:"ready"},textContent:""};
  const env={
    $:name=>{assert.equal(name,"sourceSummary");return summary},
    typeRows:()=>rows,
    GS_VIEW:GS,
    t:(key,v)=>{assert.equal(key,"source.courseProfileCount");return `${v.courses} รายวิชา (${v.profiles} Profile)`},
    fmt:x=>String(x)
  };
  new Function("env",`const {$,typeRows,GS_VIEW,t,fmt}=env; ${body} syncSourceSummary();`)(env);
  return summary.textContent;
}
test("GR source header counts unique faculty + courseCode and current Profile rows separately",()=>{
 const rows=[profile("A","ENG112"),profile("A","ENG112","ไม่พบเนื้อหา"),
             profile("B","ICT203"),profile("B","ICT203","ไม่พบเนื้อหา"),
             profile("C","ONLY")];
 assert.equal(sourceSummary(rows),"3 รายวิชา (5 Profile)");
 assert.equal(sourceSummary([...rows,profile("D","ONLY")]),"4 รายวิชา (6 Profile)");
});
test("GS source header uses the same dynamic grouping instead of fixed 46 or raw rows",()=>{
 assert.equal(sourceSummary([profile("A","GS1"),profile("A","GS2")]),"2 รายวิชา (2 Profile)");
 assert.equal(sourceSummary([profile("A","GS1"),profile("A","GS1","ไม่ผ่าน")]),"1 รายวิชา (2 Profile)");
});
test("Both TH/EN reference text and source summary unit have translations",()=>{
 const code=read("assets/ooe-i18n.js");
 assert.match(code,/'source.courseProfileCount':'{courses} รายวิชา \({profiles} Profile\)'/);
 assert.match(code,/'source.courseProfileCount':'{courses} Courses \({profiles} Profiles\)'/);
 assert.match(page,/assets\/ooe-i18n\.js\?v=20261119-grgs-profile-count-v1/);
 assert.match(page,/assets\/ooe-gr-course-view\.js\?v=20261119-reviewed-mix-v1/);
});
test("AI Tutor/Podcast already use grouped courses and source Profile total, unchanged",()=>{
 for(const name of ["ai-tutor.html","podcast.html"]){
   const src=read(name);
   assert.match(src,/function allCourseCount\(\)\{return groupCourses\(DATA\).length\}/);
   assert.match(src,/\$\{allCourseCount\(\)\.toLocaleString\('th-TH'\)\} รายวิชา \(\$\{DATA.length.toLocaleString\('th-TH'\)\} Profile\)/);
 }
});
test("KPI status and profile review source statuses remain different units",()=>{
 const rows=[profile("A","ENG112","ไม่ผ่าน"),profile("A","ENG112","ไม่พบเนื้อหา"),
             profile("B","ICT203","ไม่ผ่าน"),profile("B","ICT203","ไม่พบเนื้อหา")];
 const courses=GR.groupCourses(rows);
 assert.equal(GR.countCourses(courses).all,2);
 assert.equal(GR.countCourses(courses)[GR.FAIL],2);
 assert.equal(GR.countCourses(courses)[GR.REVIEWING],0);
 assert.equal(GS.countProfiles(rows).all,4);
 assert.equal(GS.countProfiles(rows)[GS.NO_CONTENT],2);
});
