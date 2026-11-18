/* GR course-level read-only KPI and filtering, using the shared GS identity grain. */
(function(root){
  "use strict";
  const GS=root.OOEGSCourseView||(typeof require==="function"?require("./ooe-gs-course-view.js"):null);
  if(!GS)throw Error("GS course identity helper is required before GR");
  const {PASS,REVIEWING,FAIL,NO_CONTENT}=GS;
  const STATUS_ORDER=Object.freeze([PASS,REVIEWING,FAIL,NO_CONTENT]);
  function courseStatus(group){
    const profiles=group?.profiles||[];
    if(!profiles.length)return REVIEWING;
    const states=profiles.map(GS.profileStatus);
    // All Profiles must be reviewed before a course can receive a completed status.
    if(states.some(s=>s===REVIEWING||!STATUS_ORDER.includes(s)))return REVIEWING;
    const unique=new Set(states);
    // Different reviewed outcomes need an explicit policy, not a guessed pass/fail priority.
    return unique.size===1?states[0]:REVIEWING;
  }
  function groupCourses(rows){
    return GS.groupCourses(rows).map(group=>({...group,courseStatus:courseStatus(group)}));
  }
  function filterCourses(groups,{faculty="",progress="",review="",search=""}={}){
    const q=String(search).trim().toLocaleLowerCase();
    const fields=["รหัสวิชา","หน่วยกิต","Course Profile","ชื่อรายวิชา","คณะ","ผู้สอน"];
    return (groups||[]).filter(course=>
      (!faculty||course.faculty===faculty)&&
      (!progress||course.profiles.some(row=>row["ความคืบหน้าการทำ"]===progress))&&
      (!review||course.courseStatus===review)&&
      (!q||course.profiles.some(row=>fields.some(field=>String(row[field]||"").toLocaleLowerCase().includes(q))))
    );
  }
  function countCourses(groups){
    const counts={all:(groups||[]).length,[PASS]:0,[REVIEWING]:0,[FAIL]:0,[NO_CONTENT]:0};
    for(const course of groups||[]){
      const status=course.courseStatus||courseStatus(course);
      if(Object.hasOwn(counts,status))counts[status]++;
      else counts[REVIEWING]++;
    }
    return counts;
  }
  const api=Object.freeze({PASS,REVIEWING,FAIL,NO_CONTENT,STATUS_ORDER,courseStatus,groupCourses,filterCourses,countCourses});
  root.OOEGRView=api;
  if(typeof module!=="undefined"&&module.exports)module.exports=api;
})(typeof window!=="undefined"?window:globalThis);
