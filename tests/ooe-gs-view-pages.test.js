"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const vm=require("node:vm");
const path=require("node:path");
const page=fs.readFileSync(path.join(__dirname,"../index.html"),"utf8");
const script=page.match(/<script>\s*\nconst CSV_URL=[\s\S]*?<\/script>/)?.[0]
  .replace(/^<script>/,"").replace(/<\/script>$/,"");
test("GS and GR dashboard inline JavaScript compiles",()=>{
 assert.ok(script);
 assert.doesNotThrow(()=>new vm.Script(script));
});
test("five GS Profile filter buttons and two view switches are present",()=>{
 assert.equal((page.match(/class="gs-profile-card"/g)||[]).length,5);
 assert.equal((page.match(/class="gs-mode"/g)||[]).length,2);
 for(const status of ['""','"ผ่าน"','"ไม่ผ่าน"','"อยู่ระหว่างการตรวจสอบ"','"ไม่พบเนื้อหา"']){
   assert.ok(page.includes('data-gs-status='+status));
 }
 assert.match(page,/gsProfileSummary[^>]*hidden/);
 assert.match(page,/gsViewTools[^>]*hidden/);
});
test("new rendering remains limited to GS; old Profile rendering is retained",()=>{
 assert.match(script,/if\(activeType==='GS'&&gsViewMode==='course'\)renderGsCourseTable\(rows\)/);
 assert.match(script,/let gsViewMode='profile'/);
 assert.match(script,/renderTable\(profileRows\)/);
 assert.match(script,/gsViewMode='profile';gsProfileStatus=null;gsExpandedCourses.clear\(\)/);
 assert.match(script,/I18N\.apply\(\$\('courseTableHead'\)\)/);
});
test("GS source and all-page course KPI rules outside this scope stay untouched",()=>{
 assert.match(page,/gid=131857057&single=true&output=csv/);
 assert.match(script,/const rows=filtered\(\);\s*setKpis\(rows\);\s*renderChart\(rows\);\s*renderDonut\(rows\);/);
 assert.match(script,/function syncGsControls\(baseRows\)/);
 assert.match(script,/GS_VIEW\.filterProfiles\(filtered\(true\),gsProfileStatus\)/);
 assert.doesNotMatch(script,/ProfileScore|OOECourseScore/);
});
