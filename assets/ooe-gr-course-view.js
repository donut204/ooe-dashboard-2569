/* GR course-level read-only KPI and filtering, using the shared GS identity grain. */
(function(root){
  "use strict";
  const GS=root.OOEGSCourseView||(typeof require==="function"?require("./ooe-gs-course-view.js"):null);
  if(!GS)throw Error("GS course identity helper is required before GR");
  const {PASS,REVIEWING,FAIL,NO_CONTENT}=GS;
  const STATUS_ORDER=Object.freeze([PASS,REVIEWING,FAIL,NO_CONTENT]);
  // Matches OOECourseScore.cohortKey for AI Tutor/Podcast. Explicit suffixes
  // distinguish instructor cohorts; T and L Profiles without a suffix share
  // the same learner cohort. Do not infer separation from display names.
  function cohortKey(row){
    const name=String(row?.["Course Profile"]??"").trim();
    const match=name.match(/\([A-Z]+\)-\([A-Z]+\)-([a-z][a-z0-9._-]*)$/i);
    return match?"instructor:"+match[1].toLowerCase():"shared";
  }
  function courseStatus(group){
    const profiles=group?.profiles||[];
    if(!profiles.length)return REVIEWING;
    const states=profiles.map(GS.profileStatus);
    // Pending, blank or unknown results must not be masked by another Profile.
    if(states.some(s=>s===REVIEWING||!STATUS_ORDER.includes(s)))return REVIEWING;
    // Within one shared cohort, a passing T/L Profile confirms the cohort,
    // as with MAX(ProfileScore) in AI Tutor/Podcast. Separate instructor
    // cohorts must each pass; this is a review-status rule, not CourseScore.
    const cohorts=new Map();
    profiles.forEach((row,i)=>{
      const key=cohortKey(row);
      if(!cohorts.has(key))cohorts.set(key,[]);
      cohorts.get(key).push(states[i]);
    });
    const outcomes=[...cohorts.values()].map(values=>
      values.includes(PASS)?PASS:values.includes(FAIL)?FAIL:NO_CONTENT
    );
    if(outcomes.every(s=>s===PASS))return PASS;
    if(outcomes.every(s=>s===NO_CONTENT))return NO_CONTENT;
    return FAIL;
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
  const api=Object.freeze({PASS,REVIEWING,FAIL,NO_CONTENT,STATUS_ORDER,cohortKey,courseStatus,groupCourses,filterCourses,countCourses});
  root.OOEGRView=api;
  if(typeof module!=="undefined"&&module.exports)module.exports=api;
})(typeof window!=="undefined"?window:globalThis);
