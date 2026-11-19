"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const GR=require("../assets/ooe-gr-course-view.js");
const r=(faculty,courseCode,suffix,status,students=0)=>({
  "คณะ":faculty,"รหัสวิชา":courseCode,
  "Course Profile":"691GR-"+courseCode+suffix,
  "สถานะการตรวจสอบ":status,
  "ผู้สอน":"อาจารย์ตัวอย่าง","หน่วยกิต":"3(3-0-6)",
  "ความคืบหน้าการทำ":"good","จำนวนนักศึกษา":students,
  "ลิงก์":"https://example.org/"+faculty+courseCode+suffix
});
const data=[
 r("A","HMM215","(TL)-(T)","ผ่าน",20),
 r("A","HMM215","(TL)-(L)","",0),
 r("A","FAIL","(T)-(T)","ไม่ผ่าน",0),
 r("A","FAIL","(L)-(L)","ไม่ผ่าน",0),
 r("B","FAIL","(T)-(T)","ผ่าน",0),
 r("A","NONE","(T)-(T)","ไม่พบเนื้อหา",0),
 r("A","PENDING","(T)-(T)","",0)
];
test("149 Profile records and course grain are independent; faculty participates in identity",()=>{
 const grouped=GR.groupCourses(data);
 assert.equal(data.length,7);
 assert.equal(grouped.length,5);
 assert.equal(grouped[0].profiles.length,2);
 assert.equal(grouped[1].profiles.length,2);
 assert.equal(grouped[2].faculty,"B");
});
test("any missing/pending Profile keeps entire course under review",()=>{
 const result=GR.groupCourses(data);
 assert.equal(result[0].courseStatus,GR.REVIEWING);
 assert.equal(GR.courseStatus({profiles:[r("A","X","(T)","ผ่าน"),r("A","X","(L)","อยู่ระหว่างการตรวจสอบ")]}),GR.REVIEWING);
});
test("homogeneous completed Profile outcomes become course outcomes",()=>{
 const grouped=GR.groupCourses(data);
 assert.equal(grouped[1].courseStatus,GR.FAIL);
 assert.equal(grouped[2].courseStatus,GR.PASS);
 assert.equal(grouped[3].courseStatus,GR.NO_CONTENT);
 assert.equal(grouped[4].courseStatus,GR.REVIEWING);
});
test("same-cohort completed T/L results share a pass, but no pass means failure",()=>{
 const completedPairs=[
  ["ไม่ผ่าน","ไม่พบเนื้อหา",GR.FAIL],
  ["ผ่าน","ไม่ผ่าน",GR.PASS],
  ["ผ่าน","ไม่พบเนื้อหา",GR.PASS]
 ];
 for(const [first,second,expected] of completedPairs){
   assert.equal(GR.courseStatus({profiles:[r("A","X","(TL)-(T)",first),r("A","X","(TL)-(L)",second)]}),expected);
 }
 assert.equal(GR.courseStatus({profiles:[r("A","X","(TL)-(T)","ผ่าน"),r("A","X","(TL)-(L)","unexpected")]}),GR.REVIEWING);
});
test("HMM221, ICT203, ENG112 same-cohort mixed outcomes pass at course grain",()=>{
 for(const [code,lStatus] of [["HMM221","ไม่ผ่าน"],["ICT203","ไม่พบเนื้อหา"],["ENG112","ไม่พบเนื้อหา"]]){
   const profiles=[
     r("คณะตัวอย่าง",code,"(TL)-(T)","ผ่าน"),
     r("คณะตัวอย่าง",code,"(TL)-(L)",lStatus)
   ];
   const grouped=GR.groupCourses(profiles);
   assert.equal(grouped.length,1);
   assert.equal(grouped[0].courseStatus,GR.PASS);
   assert.equal(grouped[0].profiles.length,2);
   assert.equal(GR.filterCourses(grouped,{review:GR.REVIEWING}).length,0);
   assert.equal(GR.filterCourses(grouped,{review:GR.PASS}).length,1);
   assert.equal(grouped[0].profiles[1]["สถานะการตรวจสอบ"],lStatus);
 }
});
test("main status filter is at course grain; never removes sibling Profile",()=>{
 const grouped=GR.groupCourses(data);
 const pending=GR.filterCourses(grouped,{review:GR.REVIEWING});
 assert.equal(pending.length,2);
 assert.equal(pending[0].profiles.length,2);
 assert.equal(pending[0].profiles[1]["Course Profile"],"691GR-HMM215(TL)-(L)");
 assert.equal(GR.filterCourses(grouped,{review:GR.FAIL}).length,1);
});
test("search matches a child but returns all original Profiles of parent",()=>{
 const grouped=GR.groupCourses(data);
 const result=GR.filterCourses(grouped,{search:"HMM215(TL)-(L)"});
 assert.equal(result.length,1);
 assert.equal(result[0].profiles.length,2);
 const byFaculty=GR.filterCourses(grouped,{faculty:"B",review:GR.PASS});
 assert.equal(byFaculty.length,1);
});
test("course KPI buckets partition course total exactly",()=>{
 const counts=GR.countCourses(GR.groupCourses(data));
 assert.deepEqual(counts,{all:5,"ผ่าน":1,"อยู่ระหว่างการตรวจสอบ":2,"ไม่ผ่าน":1,"ไม่พบเนื้อหา":1});
 assert.equal(counts["ผ่าน"]+counts["อยู่ระหว่างการตรวจสอบ"]+counts["ไม่ผ่าน"]+counts["ไม่พบเนื้อหา"],counts.all);
});
test("zero-student Profiles remain in published GR course and Profile buckets",()=>{
 const grouped=GR.groupCourses(data);
 assert.equal(grouped.reduce((sum,course)=>sum+course.profiles.length,0),7);
 assert.equal(GR.filterCourses(grouped,{search:"FAIL"}).reduce((sum,course)=>sum+course.profiles.length,0),3);
});

test("explicit instructor suffixes match AI/Podcast cohort semantics and never cross-share a pass",()=>{
 const AI=require("../assets/ooe-course-score.js");
 const profiles=[
   r("A","X","(TL)-(T)-alice.pe","ผ่าน"),
   r("A","X","(TL)-(L)-alice.pe","ไม่ผ่าน"),
   r("A","X","(TL)-(T)-bob.pe","ไม่พบเนื้อหา")
 ];
 assert.equal(GR.cohortKey(profiles[0]),AI.cohortKey({courseProfile:profiles[0]["Course Profile"]}));
 assert.equal(GR.cohortKey(profiles[1]),AI.cohortKey({courseProfile:profiles[1]["Course Profile"]}));
 assert.equal(GR.cohortKey(profiles[2]),AI.cohortKey({courseProfile:profiles[2]["Course Profile"]}));
 assert.equal(GR.courseStatus({profiles}),GR.FAIL);
 assert.equal(GR.courseStatus({profiles:profiles.slice(0,2)}),GR.PASS);
 assert.equal(GR.courseStatus({profiles:[profiles[0],r("A","X","(TL)-(L)-bob.pe","ผ่าน")]}),GR.PASS);
});
test("a separate unknown or pending cohort remains pending even if another is passing",()=>{
 const profiles=[r("A","X","(TL)-(T)-alice.pe","ผ่าน"),
                 r("A","X","(TL)-(L)-bob.pe","อยู่ระหว่างการตรวจสอบ")];
 assert.equal(GR.courseStatus({profiles}),GR.REVIEWING);
 assert.equal(GR.courseStatus({profiles:[profiles[0],r("A","X","(TL)-(L)-bob.pe","INVALID")]}),GR.REVIEWING);
});
