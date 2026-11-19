"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const GS=require("../assets/ooe-gs-course-view.js");
const GR=require("../assets/ooe-gr-course-view.js");
const page=fs.readFileSync(path.join(__dirname,"../index.html"),"utf8");
const widget=fs.readFileSync(path.join(__dirname,"../assets/ooe-profile-count-filter.js"),"utf8");
const i18n=fs.readFileSync(path.join(__dirname,"../assets/ooe-i18n.js"),"utf8");
const script=page.match(/<script>\s*\nconst CSV_URL=[\s\S]*?<\/script>/)?.[0].replace(/^<script>/,"").replace(/<\/script>$/,"");
const begin=script.indexOf("function filteredGrCourses(ignoreReview=false){");
const end=script.indexOf("function setKpis(rows){",begin);
assert.ok(begin>=0&&end>begin,"filter functions exist");
const methods=script.slice(begin,end);
const row=(type,faculty,code,suffix,review)=>({
 "ประเภท":type,"คณะ":faculty,"รหัสวิชา":code,"Course Profile":code+suffix,
 "สถานะการตรวจสอบ":review,"ความคืบหน้าการทำ":"ดี",
 "ชื่อรายวิชา":"Example","ผู้สอน":"Teacher","หน่วยกิต":"3","ลิงก์":"https://example.org/"+code+suffix
});
const GR_ROWS=[
 row("GR","A","HMM221","-T","ผ่าน"),row("GR","A","HMM221","-L","ไม่ผ่าน"),
 row("GR","B","ICT203","-T","ผ่าน"),row("GR","B","ICT203","-L","ไม่พบเนื้อหา"),
 row("GR","A","SINGLE","-T","ผ่าน")
];
const GS_ROWS=[
 row("GS","A","GSX","-T","ผ่าน"),row("GS","A","GSX","-L","ไม่ผ่าน"),
 row("GS","B","GSY","-T","ผ่าน")
];
function runFilter(data,selected=[],filters={}){
 const controls=Object.fromEntries(["facultyFilter","statusFilter","reviewFilter","searchBox"].map(id=>[id,{
   value:filters[id]||""
 }]));
 const selectedSet=new Set(selected);
 const env={
   $:id=>controls[id], typeRows:()=>data,GS_VIEW:GS,GR_VIEW:GR,
   profileCountFilter:{matches:n=>selectedSet.size===0||selectedSet.has(n)}
 };
 const f=new Function("env",`
 const {$,typeRows,GS_VIEW,GR_VIEW,profileCountFilter}=env;
 ${methods}
 return {filteredGrCourses,filtered};
 `)(env);
 return f;
}
test("GR parent count filter selects original 2-Profile courses, including mixed-status siblings",()=>{
 const groups=runFilter(GR_ROWS,[2]).filteredGrCourses();
 assert.equal(groups.length,2);
 assert.deepEqual(groups.map(g=>g.courseCode),["HMM221","ICT203"]);
 assert.equal(groups.reduce((n,g)=>n+g.profiles.length,0),4);
 assert.deepEqual(groups.map(g=>g.courseStatus),["ไม่ผ่าน","ไม่ผ่าน"]);
});
test("GR count filter composes with parent review-status and keeps source siblings",()=>{
 const filters={reviewFilter:"ไม่ผ่าน",searchBox:"ICT203-L"};
 const groups=runFilter(GR_ROWS,[2],filters).filteredGrCourses();
 assert.equal(groups.length,1);
 assert.equal(groups[0].courseCode,"ICT203");
 assert.equal(groups[0].profiles.length,2);
 assert.equal(runFilter(GR_ROWS,[1],filters).filteredGrCourses().length,0);
});
test("GR a one-Profile selection never mutates source or global course-grain count",()=>{
 const groups=runFilter(GR_ROWS,[1]).filteredGrCourses();
 assert.equal(groups.length,1);
 assert.equal(groups[0].courseCode,"SINGLE");
 assert.equal(GR.groupCourses(GR_ROWS).length,3);
 assert.equal(GR_ROWS.length,5);
});
test("GS count criteria derive from original courses, before individual Profile review filters",()=>{
 const selected=runFilter(GS_ROWS,[2],{reviewFilter:"ผ่าน"}).filtered();
 assert.equal(selected.length,1);
 assert.equal(selected[0]["Course Profile"],"GSX-T");
 const other=runFilter(GS_ROWS,[2],{reviewFilter:"ไม่ผ่าน"}).filtered();
 assert.equal(other.length,1);
 assert.equal(other[0]["Course Profile"],"GSX-L");
 assert.equal(runFilter(GS_ROWS,[1],{reviewFilter:"ไม่ผ่าน"}).filtered().length,0);
});
test("GS mode with no count selection preserves original Profile-level review filtering",()=>{
 const filtered=runFilter(GS_ROWS,[],{reviewFilter:"ผ่าน"}).filtered();
 assert.equal(filtered.length,2);
 assert.equal(GS.groupCourses(GS_ROWS).length,2);
});
test("available choices from any dataset are unique Profile counts, including future 3+ counts",()=>{
 const kinds=[GR_ROWS,GS_ROWS,[...GS_ROWS,row("GS","A","GSX","-X","ผ่าน")]];
 assert.deepEqual(kinds.map(rows=>[...new Set(GS.groupCourses(rows).map(g=>g.profiles.length))].sort()),[[1,2],[1,2],[1,3]]);
 assert.match(script,/profileCountFilter\.setOptions\(GS_VIEW\.groupCourses\(typeRows\(\)\)\.map\(course=>course\.profiles\.length\)\)/);
});
test("GR and GS use same shared AI Tutor/Podcast component, and reset it on tab and clear",()=>{
 assert.match(page,/assets\/ooe-profile-count-filter\.css/);
 assert.match(page,/assets\/ooe-profile-count-filter\.js\?v=20261119-grgs-v1/);
 assert.match(page,/id="profileCountFilter"/);
 assert.match(page,/data-i18n="filters.profileCount"/);
 assert.match(script,/profileCountFilter\.matches\(course\.profiles\.length\)/);
 assert.match(script,/eligibleProfiles\.has\(d\)/);
 assert.ok((script.match(/profileCountFilter\.clear\(\)/g)||[]).length>=3);
 assert.match(page,/@media\(max-width:1370px\)\{\.filters\{grid-template-columns:repeat\(3,minmax\(0,1fr\)\)\}\}/);
});
test("TH/EN label and widget localization supported without changing source Score or review",()=>{
 assert.match(i18n,/'filters.profileCount':'จำนวน Profile'/);
 assert.match(i18n,/'filters.profileCount':'Profile Count'/);
 assert.match(widget,/function setLanguage\(lang\)/);
 assert.match(widget,/return \{setOptions,clear,getSelected,matches,setLanguage/);
 assert.match(page,/assets\/ooe-i18n\.js\?v=20261119-grgs-profile-count-v1/);
 assert.doesNotThrow(()=>new Function(script));
 assert.doesNotThrow(()=>new Function(widget));
 assert.doesNotThrow(()=>new Function(i18n));
});
