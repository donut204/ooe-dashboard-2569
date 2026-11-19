"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const root=path.join(__dirname,"..");
const html=fs.readFileSync(path.join(root,"index.html"),"utf8");
const langSrc=fs.readFileSync(path.join(root,"assets/ooe-i18n.js"),"utf8");
const inline=html.match(/<script>\s*\nconst CSV_URL=[\s\S]*?<\/script>/)?.[0].replace(/^<script>/,"").replace(/<\/script>$/,"");
const from=inline.indexOf("function syncPageIdentity(){");
const to=inline.indexOf("\nfunction progressLabel(",from);
assert.ok(from>=0&&to>from,"syncPageIdentity extracted");
const titleSource=inline.slice(from,to);
const windowMock={
  location:{search:"",pathname:"/",hash:""},
  document:{documentElement:{lang:"th"}},
  localStorage:{getItem:()=>null,setItem:()=>{}}
};
new Function("window",langSrc)(windowMock);
const i18n=windowMock.OOEI18n;
function actualHeading(type){
 const nodes={pageTitle:{textContent:""}},doc={title:""};
 new Function("activeType","t","$","document",titleSource+"\nsyncPageIdentity();")(
   type,(key,v)=>i18n.t(key,v),name=>nodes[name],doc);
 return {heading:nodes.pageTitle.textContent,title:doc.title};
}
test("GR Thai heading equals OWNER-approved wording on render and browser tab",()=>{
 i18n.setLanguage("th",{persist:false,updateQuery:false});
 assert.deepEqual(actualHeading("GR"),{
   heading:"Dashboard รายวิชานอกแผน GR",
   title:"Dashboard รายวิชานอกแผน GR | OOE 2569"
 });
});
test("GS Thai heading equals OWNER-approved Fully Online wording",()=>{
 i18n.setLanguage("th",{persist:false,updateQuery:false});
 assert.deepEqual(actualHeading("GS"),{
   heading:"Dashboard รายวิชา Fully Online GS",
   title:"Dashboard รายวิชา Fully Online GS | OOE 2569"
 });
});
test("switching to English uses translated GR/GS labels and tab titles",()=>{
 i18n.setLanguage("en",{persist:false,updateQuery:false});
 assert.deepEqual(actualHeading("GR"),{
   heading:"Non-Plan GR Course Dashboard",
   title:"Non-Plan GR Course Dashboard | OOE 2026"
 });
 assert.deepEqual(actualHeading("GS"),{
   heading:"Fully Online GS Course Dashboard",
   title:"Fully Online GS Course Dashboard | OOE 2026"
 });
});
test("HTML fallback is new GR title and i18n cache tag changes",()=>{
 assert.match(html,/<h1 id="pageTitle">Dashboard รายวิชานอกแผน GR<\/h1>/);
 assert.match(html,/assets\/ooe-i18n\.js\?v=20261119-grgs-header-v1/);
 assert.doesNotMatch(html,/<h1 id="pageTitle">Dashboard รายวิชา GR<\/h1>/);
 assert.match(inline,/syncPageIdentity\(\)/);
});
test("scope remains title-only: published CSV, KPI, filter and GR/GS view logic retained",()=>{
 assert.match(html,/gid=131857057&single=true&output=csv/);
 assert.match(inline,/setKpis\(grCourses\|\|rows\)/);
 assert.match(inline,/syncGsControls\(rows\)/);
 assert.match(inline,/if\(gsViewMode==='course'\)renderGsCourseTable\(rows\)/);
 assert.match(inline,/GR_VIEW\.groupCourses\(typeRows\(\)\)/);
 assert.doesNotThrow(()=>new Function(inline));
 assert.doesNotThrow(()=>new Function(langSrc));
});
