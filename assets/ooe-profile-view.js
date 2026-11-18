/* Shared, read-only Profile View selectors for AI Tutor and Podcast dashboards.
   CourseScore and course-level filters are not altered by this module. */
(function(root){
  'use strict';
  function status(profile,mode){
    const score=Number(profile.profileScore);
    const value=Number.isFinite(score)?score:0;
    if(mode==='ai')return value>=0.999999?'complete':'notdone';
    return value>=0.999999?'complete':value>0?'partial':'notdone';
  }
  function rows(groups,options={}){
    const faculty=String(options.faculty||'');
    const type=String(options.type||'');
    const query=String(options.query||'').trim().toLowerCase();
    const selectedStatus=String(options.status||'');
    const mode=options.mode==='podcast'?'podcast':'ai';
    const profileCountMatches=options.profileCountMatches||(()=>true);
    return groups.filter(group=>
      (!faculty||group.faculty===faculty)&&profileCountMatches(group.profileCount)
    ).flatMap(group=>group.profiles).filter(profile=>{
      if(type&&profile.courseType!==type)return false;
      if(selectedStatus&&status(profile,mode)!==selectedStatus)return false;
      if(!query)return true;
      return [
        profile.faculty,profile.courseCode,profile.courseName,
        profile.courseProfile,profile.instructors
      ].some(value=>String(value||'').toLowerCase().includes(query));
    });
  }
  function counts(profiles,mode){
    const result={all:profiles.length,complete:0,partial:0,notdone:0};
    profiles.forEach(profile=>{result[status(profile,mode)]++;});
    return result;
  }
  const api={status,rows,counts};
  if(root)root.OOEProfileView=api;
  if(typeof module==='object'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:typeof globalThis!=='undefined'?globalThis:null);
