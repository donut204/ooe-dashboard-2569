"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const GR=require("../assets/ooe-gr-course-view.js");
const GS=require("../assets/ooe-gs-course-view.js");
const page=fs.readFileSync(path.join(__dirname,"../index.html"),"utf8");
const script=page.match(/<script>\s*\nconst CSV_URL=[\s\S]*?<\/script>/)?.[0].replace(/^<script>/,"").replace(/<\/script>$/,"");
const match=(needle)=>{assert.ok(script.includes(needle),"missing "+needle)};
// 9 entire courses have no content: seven with one Profile and two with two.
// Two additional non-passing courses each contain a no-content (L) sibling.
const row=(faculty,code,suffix,status)=>({
  "คณะ":faculty,"รหัสวิชา":code,"Course Profile":code+suffix,
  "สถานะการตรวจสอบ":status,"จำนวนนักศึกษา":0
});
const source=[
 ...Array.from({length:7},(_,i)=>row("F","NONE"+i,"-T","ไม่พบเนื้อหา")),
 ...["N7","N8"].flatMap(code=>[
  row("F",code,"-T","ไม่พบเนื้อหา"),row("F",code,"-L","ไม่พบเนื้อหา")
 ]),
 row("ศิลปศาสตร์","ENG112","-T","ไม่ผ่าน"),
 row("ศิลปศาสตร์","ENG112","-L","ไม่พบเนื้อหา"),
 row("เทคโนโลยีสารสนเทศ","ICT203","-T","ไม่ผ่าน"),
 row("เทคโนโลยีสารสนเทศ","ICT203","-L","ไม่พบเนื้อหา")
];
test("live-source-shaped example: 13 no-content Profiles, 9 courses, 11 Profiles in main filter",()=>{
 const groups=GR.groupCourses(source);
 assert.equal(GS.countProfiles(source)[GS.NO_CONTENT],13);
 const selected=GR.filterCourses(groups,{review:GR.NO_CONTENT});
 const donutRows=selected.flatMap(course=>course.profiles);
 const cards=GS.countProfiles(donutRows);
 assert.equal(selected.length,9);
 assert.equal(donutRows.length,11);
 assert.equal(cards.all,11);
 assert.equal(cards[GS.NO_CONTENT],11);
 assert.equal(cards[GS.FAIL],0);
 assert.equal(GR.filterCourses(groups,{review:GR.FAIL}).length,2);
});
test("GR Profile Summary and GR flat Profile View consume same main-filtered rows as donut",()=>{
 match("const rows=grCourses?grCourses.flatMap(course=>course.profiles):filtered();");
 match("renderDonut(rows);");
 match("syncGsControls(activeType==='GR'?rows:filtered(true));");
 match("const sourceProfiles=activeType==='GR'?rows:filtered(true);");
 match("GS_VIEW.filterProfiles(sourceProfiles,gsProfileStatus)");
 assert.doesNotMatch(script,/syncGsControls\(activeType==='GR'\?filteredGrCourses\(true\)/);
 assert.doesNotMatch(script,/const sourceProfiles=activeType==='GR'\?filteredGrCourses\(true\)/);
});
test("clicking a GR Profile card preserves the main course-status filter; GS retains old reset",()=>{
 const from=script.indexOf("$('gsProfileSummary').addEventListener('click',event=>{");
 const to=script.indexOf("\n$('gsViewTools').addEventListener",from);
 assert.ok(from>=0&&to>from);
 const handler=script.slice(from,to);
 for(const [type,expected] of [["GR","ไม่พบเนื้อหา"],["GS",""]]){
   const review={value:"ไม่พบเนื้อหา"},card={dataset:{gsStatus:"ไม่พบเนื้อหา"}};
   const target={closest:()=>card};
   const listeners={};
   const env={
     $:id=>id==="gsProfileSummary"?{addEventListener:(name,fn)=>{listeners[name]=fn}}:review,
     activeType:type,
     render:()=>{env.rendered=(env.rendered||0)+1}
   };
   const result=new Function("env","event",`
     const $=env.$,activeType=env.activeType,render=env.render;
     let gsViewMode='course',gsProfileStatus=null;
     ${handler}
     env.listeners=1;
     env.final=()=>({gsViewMode,gsProfileStatus});
     `)(env,{target});
   // Register handler against the fake summary node, then invoke through a genuine simulated click.
   // The registration happened before final() is consulted.
   assert.equal(typeof listeners.click,"function");
   listeners.click({target});
   assert.equal(review.value,expected);
   assert.equal(env.rendered,1);
   assert.deepEqual(env.final(),{gsViewMode:"profile",gsProfileStatus:"ไม่พบเนื้อหา"});
 }
});
test("main filter stays course-grain; GS calculation path and published CSV remain unchanged",()=>{
 match("const grCourses=activeType==='GR'?filteredGrCourses():null;");
 match("setKpis(grCourses||rows);");
 match("renderChart(grCourses||rows);");
 assert.match(page,/gid=131857057&single=true&output=csv/);
 assert.match(script,/activeType==='GS'\)\$\('reviewFilter'\)\.value=''/);
});
