"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const vm=require("node:vm");
const path=require("node:path");
const GR=require("../assets/ooe-gr-course-view.js");
const page=fs.readFileSync(path.join(__dirname,"../index.html"),"utf8");
const script=page.match(/<script>\s*\nconst CSV_URL=[\s\S]*?<\/script>/)?.[0].replace(/^<script>/,"").replace(/<\/script>$/,"");
const extract=(from,to)=>script.slice(script.indexOf(from),script.indexOf(to,script.indexOf(from)));
const row=(faculty,course,profile,status)=>({
  "คณะ":faculty,"รหัสวิชา":course,"Course Profile":profile,"สถานะการตรวจสอบ":status,
  "ความคืบหน้าการทำ":"good","ลิงก์":"https://example.org/"+profile
});
const source=[
 row("A","C1","C1(T)","ผ่าน"),row("A","C1","C1(L)",""),
 row("A","C2","C2(T)","ไม่ผ่าน"),row("B","C2","C2(T)","ผ่าน"),
 row("B","C3","C3(T)","ไม่พบเนื้อหา")
];
function runKpis(type,rows){
 const nodes=Object.fromEntries(["totalKpi","passKpi","reviewingKpi","failKpi","noContentKpi",
   "totalNote","passNote","reviewingNote","failNote","noContentNote"].map(x=>[x,{textContent:""}]));
 const env={activeType:type,GR_VIEW:GR,
  REVIEW:{pass:"ผ่าน",reviewing:"อยู่ระหว่างการตรวจสอบ",fail:"ไม่ผ่าน",noContent:"ไม่พบเนื้อหา"},
  typeRows:()=>source,fmt:v=>String(v),t:(key)=>key,
  $:key=>nodes[key]};
 const body=extract("function setKpis(rows){","function renderChart(rows){");
 const fn=new Function("rows","env",`
 const {activeType,GR_VIEW,REVIEW,typeRows,fmt,t,$}=env;
 ${body}
 setKpis(rows);
 `);
 fn(rows,env);return nodes;
}
test("GR and GS shared inline JavaScript compiles; both helpers loaded in order",()=>{
 assert.doesNotThrow(()=>new vm.Script(script));
 assert.ok(page.indexOf("assets/ooe-gs-course-view.js")<page.indexOf("assets/ooe-gr-course-view.js"));
});
test("GR main KPI cards count 4 distinct courses and normalize partial review",()=>{
 const nodes=runKpis("GR",GR.groupCourses(source));
 assert.equal(nodes.totalKpi.textContent,"4");
 assert.equal(nodes.passKpi.textContent,"1");
 assert.equal(nodes.reviewingKpi.textContent,"1");
 assert.equal(nodes.failKpi.textContent,"1");
 assert.equal(nodes.noContentKpi.textContent,"1");
});
test("GS KPI code path still counts original source Profile rows",()=>{
 const nodes=runKpis("GS",source);
 assert.equal(nodes.totalKpi.textContent,"5");
 assert.equal(nodes.passKpi.textContent,"2");
 assert.equal(nodes.reviewingKpi.textContent,"0");
 assert.equal(nodes.failKpi.textContent,"1");
});
test("GR chart receives course group/status, donut receives Profiles",()=>{
 assert.match(script,/renderChart\(grCourses\|\|rows\)/);
 assert.match(script,/renderDonut\(rows\)/);
 assert.match(script,/activeType==='GR'\?d\.faculty:d\['คณะ'\]/);
 assert.match(script,/activeType==='GR'\?d\.courseStatus:d\['สถานะการตรวจสอบ'\]/);
 assert.match(script,/donutUnitLabel'\)\.textContent=activeType==='GR'\?'Profile'/);
});
test("GR Profile Summary and Course View share the GS-approved tree and controls",()=>{
 assert.match(script,/syncGsControls\(activeType==='GR'/);
 assert.match(script,/if\(gsViewMode==='course'\)renderGsCourseTable\(rows\)/);
 assert.match(script,/gsViewMode='course';gsProfileStatus=null/);
 assert.match(script,/gsProfileStatus!==null\?GS_VIEW\.filterProfiles\(sourceProfiles,gsProfileStatus\):rows/);
 assert.match(page,/data-gs-count="all"/);
 assert.equal((page.match(/class="gs-profile-card"/g)||[]).length,5);
 assert.match(page,/gs-faculty-group-row/);
});
test("Published source URL remains the same; zero-student exclusion is absent",()=>{
 assert.match(page,/gid=131857057&single=true&output=csv/);
 assert.doesNotMatch(extract("function filteredGrCourses(ignoreReview=false){","function filtered(ignoreReview=false){"),/students|นักศึกษา|จำนวนผู้เรียน/);
 assert.match(script,/return GR_VIEW\.filterCourses\(GR_VIEW\.groupCourses\(typeRows\(\)\),criteria\)/);
});
test("GR selected course search retains sibling Profiles while Profile card can subset explicitly",()=>{
 const filtered=GR.filterCourses(GR.groupCourses(source),{search:"C1(L)"});
 assert.equal(filtered.length,1);
 assert.equal(filtered[0].profiles.length,2);
 assert.match(script,/const sourceProfiles=activeType==='GR'\?rows:filtered\(true\)/);
 assert.match(script,/syncGsControls\(activeType==='GR'\?rows:filtered\(true\)\)/);
});
