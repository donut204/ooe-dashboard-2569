"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const GS=require("../assets/ooe-gs-course-view.js");
const root=path.join(__dirname,"..");
const read=p=>fs.readFileSync(path.join(root,p),"utf8");
const grgs=read("index.html");
const ai=read("ai-tutor.html");
const podcast=read("podcast.html");
const dashboardJS=grgs.match(/<script>\s*\nconst CSV_URL=[\s\S]*?<\/script>/)?.[0].replace(/^<script>/,"").replace(/<\/script>$/,"");
const extract=(src,begin,end)=>{
  const a=src.indexOf(begin);
  assert.ok(a>=0,"missing "+begin);
  const b=src.indexOf(end,a+begin.length);
  assert.ok(b>a,"missing "+end);
  return src.slice(a,b);
};
const mk=(faculty,code,status,profile)=>({
 "คณะ":faculty,"รหัสวิชา":code,"สถานะการตรวจสอบ":status,"Course Profile":profile
});
const profiles=[
 mk("A","A1","ผ่าน","A1-T"),mk("A","A1","ไม่ผ่าน","A1-L"),
 mk("A","A2","ไม่ผ่าน","A2-T"),mk("B","B1","ผ่าน","B1-T"),mk("B","B2","ไม่พบเนื้อหา","B2-T")
];
function grgsKpis(type,selected,faculty=""){
  const nodes=Object.fromEntries(["totalKpi","passKpi","reviewingKpi","failKpi","noContentKpi",
    "totalNote","passNote","reviewingNote","failNote","noContentNote"].map(k=>[k,{textContent:""}]));
  const GR={groupCourses:items=>{
      const groups=new Map();
      for(const p of items){const k=JSON.stringify([p["คณะ"],p["รหัสวิชา"]]);if(!groups.has(k))groups.set(k,[]);groups.get(k).push(p)}
      return [...groups.values()].map(group=>({profiles:group,courseStatus:group.every(x=>x["สถานะการตรวจสอบ"]==="ผ่าน")?"ผ่าน":"ไม่ผ่าน"}));
    },countCourses:items=>{
      const counts={"ผ่าน":0,"อยู่ระหว่างการตรวจสอบ":0,"ไม่ผ่าน":0,"ไม่พบเนื้อหา":0};
      for(const item of items)counts[item.courseStatus]++;
      return counts;
    }};
  const env={activeType:type,GR_VIEW:GR,GS_VIEW:GS,typeRows:()=>profiles,
    REVIEW:{pass:"ผ่าน",reviewing:"อยู่ระหว่างการตรวจสอบ",fail:"ไม่ผ่าน",noContent:"ไม่พบเนื้อหา"},
    fmt:n=>String(n),t:(k,v)=>k+":"+v.count,$:k=>k==="facultyFilter"?{value:faculty}:nodes[k]};
  const body=extract(dashboardJS,"function setKpis(rows){","function renderChart(rows){");
  new Function("rows","e",`
    const {activeType,GR_VIEW,GS_VIEW,typeRows,REVIEW,fmt,t,$}=e;
    ${body}
    setKpis(rows);
  `)(selected,env);
  return nodes;
}
function mediaKpis(html,faculty=""){
 const js=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)]
  .map(m=>m[1]).find(s=>s.includes("function setKpis(rows){"));
 assert.ok(js,"media KPI script");
 const body=extract(js,"function setKpis(rows){","function renderChart(rows){");
 const nodes=new Proxy({}, {get:(obj,k)=>{
   if(!(k in obj))obj[k]={textContent:"",style:{width:""}};
   return obj[k];
 }});
 const allProfiles=[
  {faculty:"A",courseCode:"A1"},{faculty:"A",courseCode:"A1"},
  {faculty:"A",courseCode:"A2"},{faculty:"B",courseCode:"B1"},{faculty:"B",courseCode:"B1"}
 ];
 const groups=[{score:1,profiles:[allProfiles[0],allProfiles[1]]},
               {score:0,profiles:[allProfiles[2]]},
               {score:0.5,profiles:[allProfiles[3],allProfiles[4]]}];
 const env={
   DATA:allProfiles,allCourseCount:()=>groups.length,
   groupCourses:items=>[...new Set(items.map(d=>JSON.stringify([d.faculty,d.courseCode])))].map(key=>({key})),
   courseStatus:n=>n===1?"complete":n===0?"notdone":"partial",
   $:k=>k==="facultyFilter"?{value:faculty}:nodes[k]
 };
 new Function("rows","e",`
    const {DATA,allCourseCount,groupCourses,courseStatus,$}=e;
    ${body}
    setKpis(rows);
 `)([groups[0]],env);
 return {nodes,groups,allProfiles};
}
test("GR without faculty preserves global course total under status filtering",()=>{
 const selected=[{courseStatus:"ไม่ผ่าน",profiles:[profiles[0],profiles[1]]}];
 const nodes=grgsKpis("GR",selected);
 assert.equal(nodes.totalKpi.textContent,"4");
 assert.equal(nodes.failKpi.textContent,"1");
 assert.equal(nodes.passKpi.textContent,"0");
 assert.equal(nodes.totalNote.textContent,"kpi.totalNote:4");
});
test("GS totals distinct source courses even with multiple Profiles per course",()=>{
 const nodes=grgsKpis("GS",profiles.filter(x=>x["สถานะการตรวจสอบ"]==="ไม่พบเนื้อหา"));
 assert.equal(nodes.totalKpi.textContent,"4");
 assert.equal(nodes.noContentKpi.textContent,"1");
 assert.equal(nodes.failKpi.textContent,"0");
 assert.equal(nodes.totalNote.textContent,"kpi.totalNote:4");
});
test("AI Tutor total course card and its Profile note stay global under filtering",()=>{
 const {nodes}=mediaKpis(ai);
 assert.equal(nodes.totalKpi.textContent,"3");
 assert.equal(nodes.totalNote.textContent,"จาก 5 Profile");
 assert.equal(nodes.completeCourseKpi.textContent,"1");
});
test("Podcast total course card and its Profile note stay global under filtering",()=>{
 const {nodes}=mediaKpis(podcast);
 assert.equal(nodes.totalKpi.textContent,"3");
 assert.equal(nodes.totalNote.textContent,"จาก 5 Profile");
 assert.equal(nodes.completeCourseKpi.textContent,"1");
});
test("GR and GS both use the exact Profile population as their donut after main filtering",()=>{
 assert.match(dashboardJS,/renderDonut\(rows\);\s*\/\/ GR and GS Profile Summary must use the exact main-filtered Profile population as the donut\.\s*syncGsControls\(rows\);/);
 assert.match(dashboardJS,/const sourceProfiles=rows;/);
 assert.doesNotMatch(dashboardJS,/syncGsControls\(activeType==='GR'\?rows:filtered\(true\)\)/);
 assert.doesNotMatch(dashboardJS,/\$\('reviewFilter'\)\.value='';\s*render\(\);\s*\}\);\s*\$\('gsViewTools'\)/);
});
test("all four total cards still use the existing main filter click handlers",()=>{
 assert.match(dashboardJS,/function applyKpiCardFilter\(card\)/);
 for(const html of [ai,podcast])assert.match(html,/function applyKpiCardFilter\(card\)/);
});


test("GR and GS Total Courses count only faculty scope, not review filter",()=>{
 const grSelected=[{courseStatus:"ไม่ผ่าน",profiles:profiles.slice(0,2)}];
 const gr=grgsKpis("GR",grSelected,"A");
 assert.equal(gr.totalKpi.textContent,"2");
 assert.equal(gr.totalNote.textContent,"kpi.totalNote:2");
 assert.equal(gr.failKpi.textContent,"1");
 const gsSelected=profiles.filter(d=>d["คณะ"]==="A"&&d["สถานะการตรวจสอบ"]==="ไม่ผ่าน");
 const gs=grgsKpis("GS",gsSelected,"A");
 assert.equal(gs.totalKpi.textContent,"2");
 assert.equal(gs.totalNote.textContent,"kpi.totalNote:2");
 assert.equal(gs.failKpi.textContent,"2");
 assert.equal(grgsKpis("GR",grSelected,"B").totalKpi.textContent,"2");
 assert.equal(grgsKpis("GS",gsSelected,"B").totalKpi.textContent,"2");
});
for(const [label,html] of [["AI Tutor",ai],["Podcast",podcast]]){
 test(label+" Total Courses and Profile note follow only faculty, not status/type",()=>{
   const a=mediaKpis(html,"A").nodes;
   const b=mediaKpis(html,"B").nodes;
   assert.equal(a.totalKpi.textContent,"2");
   assert.equal(a.totalNote.textContent,"จาก 3 Profile");
   assert.equal(b.totalKpi.textContent,"1");
   assert.equal(b.totalNote.textContent,"จาก 2 Profile");
   assert.equal(a.completeCourseKpi.textContent,"1");
 });
}
test("faculty chart click sets faculty dropdown and refreshes each dashboard",()=>{
 const jsOf=html=>[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)]
    .map(m=>m[1]).find(s=>s.includes("function selectFacultyFromChart(faculty){"));
 for(const [label,src] of [["GR/GS",dashboardJS],["AI",jsOf(ai)],["Podcast",jsOf(podcast)]]){
   const body=extract(src,"function selectFacultyFromChart(faculty){","function bindFacultyChartFilter(){");
   const control={value:"",options:[{value:""},{value:"A"},{value:"B"}]};
   const env={calls:0,$:key=>{assert.equal(key,"facultyFilter");return control}};
   env.render=()=>env.calls++;
   const code="const $=env.$,render=env.render; let currentPage=4;\n"+body+"\nselectFacultyFromChart(faculty); return currentPage;";
   const page=new Function("env","faculty",code)(env,"A");
   assert.equal(control.value,"A",label);
   assert.equal(page,1,label);
   assert.equal(env.calls,1,label);
 }
});
test("Total Courses status-card clicks preserve faculty selection",()=>{
 assert.match(dashboardJS,/function applyKpiCardFilter\(card\)/);
 for(const html of [ai,podcast])assert.match(html,/function applyKpiCardFilter\(card\)/);
});
test("GR and GS Profile Summary and donut still share the same filtered Profile rows",()=>{
 assert.match(dashboardJS,/syncGsControls\(rows\)/);
 assert.match(dashboardJS,/renderDonut\(rows\)/);
 assert.match(dashboardJS,/const sourceProfiles=rows;/);
});
test("global source summary remains independent of faculty selected",()=>{
 assert.match(dashboardJS,/const profiles=typeRows\(\);/);
 assert.match(dashboardJS,/GS_VIEW\.groupCourses\(profiles\)\.length/);
});
