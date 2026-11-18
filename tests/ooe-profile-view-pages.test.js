/* Run with: node tests/ooe-profile-view-pages.test.js */
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
for(const [name,expectedStatuses,subject] of [
  ['ai-tutor.html',['','complete','notdone'],'AI Tutor'],
  ['podcast.html',['','complete','partial','notdone'],'Podcast']
]){
  const html=fs.readFileSync(path.join(__dirname,'..',name),'utf8');
  const statuses=[...html.matchAll(/<button type="button" class="profile-mini[^"]*" data-profile-status="([^"]*)"/g)].map(m=>m[1]);
  assert.deepEqual(statuses,expectedStatuses,name+' Profile card selectors');
  assert.match(html,/function renderProfileTable\(rows\)/);
  assert.match(html,/function syncProfileTableMode\(\)/);
  assert.match(html,/function applyProfileCardFilter\(card\)/);
  assert.match(html,/profileViewStatus===target\?null:target/);
  assert.match(html,/profileViewStatus=null;render\(\)/);
  assert.match(html,/renderProfileTable\(profileRows\(profileViewStatus\)\)/);
  assert.match(html,/window\.OOEProfileView\.counts\(allProfiles,PROFILE_MODE\)/);
  assert.match(html,/window\.OOECourseScore\.courseScore\(g\.profiles\)/);
  assert.match(html,/const PROFILE_PAGE_SIZE=20/);
  assert.match(html,/วันที่ระบบสร้างรายวิชา/);
  assert.match(html,/class="profile-flat-row"/);
  assert.match(html,/data-profile-status="complete"/);
  assert.match(html,/profileViewStatus===null/);
  assert.match(html,/src="assets\/ooe-profile-view\.js\?v=20261118-profile-view-v1"/);
  assert.match(html,new RegExp('รายละเอียด Profile '+subject));
  assert.equal((html.match(/<button type="button" class="profile-mini/g)||[]).length,expectedStatuses.length);
  for(const block of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)){
    if(block[1].trim())assert.doesNotThrow(()=>new Function(block[1]),name+' inline script compiles');
  }
}
console.log('PASS: AI Tutor and Podcast Profile View structural regressions');
