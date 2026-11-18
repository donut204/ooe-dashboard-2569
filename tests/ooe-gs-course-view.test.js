"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const GS=require("../assets/ooe-gs-course-view.js");
const row=(faculty,code,profile,status,students=0)=>({
  "คณะ":faculty,"รหัสวิชา":code,"Course Profile":profile,
  "สถานะการตรวจสอบ":status,"จำนวนนักศึกษา":students,"ลิงก์":"https://example.org/"+profile
});
test("Profile counts distinguish pass, fail, no content, blank review and all",()=>{
 const rows=[row("A","A1","1","ผ่าน"),row("A","A2","2","ไม่ผ่าน"),
 row("A","A3","3","ไม่พบเนื้อหา"),row("A","A4","4",""),row("A","A5","5","อยู่ระหว่างการตรวจสอบ")];
 assert.deepEqual(GS.countProfiles(rows),{all:5,"ผ่าน":1,"อยู่ระหว่างการตรวจสอบ":2,"ไม่ผ่าน":1,"ไม่พบเนื้อหา":1});
 assert.equal(GS.filterProfiles(rows,"").length,5);
 assert.equal(GS.filterProfiles(rows,GS.REVIEWING).length,2);
 assert.equal(GS.filterProfiles(rows,GS.PASS).length,1);
});
test("Course identity is faculty plus courseCode; same faculty T/L merge, different faculty do not",()=>{
 const rows=[
 row("คณะ ก","A100","691GS-A100(T)-(T)","ผ่าน"),
 row("คณะ ก","A100","691GS-A100(L)-(L)","ไม่ผ่าน"),
 row("คณะ ข","A100","691GS-A100(T)-(T)","ผ่าน"),
 row("คณะ ก","A101","691GS-A101(T)-(T)","")
 ];
 const grouped=GS.groupCourses(rows);
 assert.equal(grouped.length,3);
 assert.equal(grouped[0].profiles.length,2);
 assert.deepEqual(grouped[0].statuses,["ผ่าน","ไม่ผ่าน"]);
 assert.equal(grouped[1].profiles.length,1);
 assert.equal(grouped[2].profiles.length,1);
 assert.equal(grouped[2].counts["อยู่ระหว่างการตรวจสอบ"],1);
 assert.equal(rows[0]["สถานะการตรวจสอบ"],"ผ่าน");
});
test("Zero-student Profiles remain eligible; duplicate courseCode never overcounts",()=>{
 const rows=[
 row("A","GS1","GS1-T","ผ่าน",0),
 row("A","GS1","GS1-L","ไม่ผ่าน",0),
 row("A","GS2","GS2-T","ไม่พบเนื้อหา",0)
 ];
 assert.equal(GS.groupCourses(rows).length,2);
 assert.equal(GS.countProfiles(rows).all,3);
});
test("No course-level pass/fail is invented for mixed statuses",()=>{
 const rows=[row("A","GS1","GS1-T","ผ่าน"),row("A","GS1","GS1-L","")];
 const group=GS.groupCourses(rows)[0];
 assert.deepEqual(group.statuses,["ผ่าน","อยู่ระหว่างการตรวจสอบ"]);
 assert.equal(Object.hasOwn(group,"overallStatus"),false);
});
test("Different missing course codes are not silently grouped",()=>{
 const rows=[row("A","","x","ผ่าน"),row("A","","y","ไม่ผ่าน")];
 assert.equal(GS.groupCourses(rows).length,2);
});
