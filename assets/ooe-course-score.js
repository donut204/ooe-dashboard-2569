/* Shared AI Tutor / Podcast course scoring. Input ProfileScore is the published 0–1 value.
   Cohorts of the same courseType share evidence only when they belong to the same learner group.
   Explicit instructor suffixes in courseProfile identify separate learner groups.
   Do not infer group separation from display names or combine evidence across course types. */
(function(root){
  'use strict';
  function cohortKey(profile){
    const name=String(profile?.courseProfile??'').trim();
    const match=name.match(/\([A-Z]+\)-\([A-Z]+\)-([a-z][a-z0-9._-]*)$/i);
    return match?'instructor:'+match[1].toLowerCase():'shared';
  }
  function courseScore(profiles){
    if(!Array.isArray(profiles)||profiles.length===0)return 0;
    const byType=new Map();
    profiles.forEach(profile=>{
      const type=String(profile.courseType??'').trim();
      const cohort=cohortKey(profile);
      if(!byType.has(type))byType.set(type,new Map());
      const cohorts=byType.get(type);
      if(!cohorts.has(cohort))cohorts.set(cohort,[]);
      const value=Number(profile.profileScore);
      cohorts.get(cohort).push(Number.isFinite(value)?Math.min(1,Math.max(0,value)):0);
    });
    const typeScores=[...byType.values()].map(cohorts=>{
      const cohortScores=[...cohorts.values()].map(scores=>Math.max(...scores));
      return cohortScores.reduce((sum,score)=>sum+score,0)/cohortScores.length;
    });
    return typeScores.reduce((sum,score)=>sum+score,0)/typeScores.length;
  }
  const API={courseScore,cohortKey};
  if(root)root.OOECourseScore=API;
  if(typeof module==='object'&&module.exports)module.exports=API;
})(typeof window!=='undefined'?window:typeof globalThis!=='undefined'?globalThis:null);
