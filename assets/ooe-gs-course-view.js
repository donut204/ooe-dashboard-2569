/* GS-only, read-only course grouping / Profile View helpers. No status roll-up policy is inferred. */
(function(root){
  "use strict";
  const PASS="ผ่าน", REVIEWING="อยู่ระหว่างการตรวจสอบ", FAIL="ไม่ผ่าน", NO_CONTENT="ไม่พบเนื้อหา";
  const STATUSES=Object.freeze([PASS,REVIEWING,FAIL,NO_CONTENT]);
  function profileStatus(row){
    const raw=String(row?.["สถานะการตรวจสอบ"]??"").trim();
    if(!raw||raw===REVIEWING)return REVIEWING;
    return raw==="ไม่มีเนื้อหา"?NO_CONTENT:raw;
  }
  function countProfiles(rows){
    const counts={all:0,[PASS]:0,[REVIEWING]:0,[FAIL]:0,[NO_CONTENT]:0};
    for(const row of rows||[]){
      counts.all++;
      const status=profileStatus(row);
      if(Object.hasOwn(counts,status))counts[status]++;
    }
    return counts;
  }
  function filterProfiles(rows,status){
    if(status===null||status===undefined||status==="")return (rows||[]).slice();
    return (rows||[]).filter(row=>profileStatus(row)===status);
  }
  function groupCourses(rows){
    const groups=new Map();
    for(const [index,row] of (rows||[]).entries()){
      const faculty=String(row?.["คณะ"]??"").trim();
      const code=String(row?.["รหัสวิชา"]??"").trim();
      // A missing course code must never collapse unrelated Profiles into one course.
      const identity=code||String(row?.["ลิงก์"]??"").trim()||"missing-code-"+index;
      const key=JSON.stringify([faculty,identity]);
      if(!groups.has(key))groups.set(key,{key,faculty,courseCode:code,profiles:[]});
      groups.get(key).profiles.push(row);
    }
    return [...groups.values()].map(group=>{
      const statuses=countProfiles(group.profiles);
      const statusValues=STATUSES.filter(status=>statuses[status]>0);
      return {...group,counts:statuses,statuses:statusValues,hasUnknownStatus:statuses.all>statusValues.reduce((s,v)=>s+statuses[v],0)};
    });
  }
  const api=Object.freeze({PASS,REVIEWING,FAIL,NO_CONTENT,STATUSES,profileStatus,countProfiles,filterProfiles,groupCourses});
  root.OOEGSCourseView=api;
  if(typeof module!=="undefined"&&module.exports)module.exports=api;
})(typeof window!=="undefined"?window:globalThis);
