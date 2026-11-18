/* Run with: node tests/ooe-course-score.test.js */
const assert=require('node:assert/strict');
const {courseScore,cohortKey}=require('../assets/ooe-course-score.js');
const p=(courseType,profileType,score,suffix='',code='CTH211')=>({
  courseType,
  courseProfile:'691'+courseType+'-'+code+'(TL)-('+profileType+')'+(suffix?'-'+suffix:''),
  profileScore:score
});
const close=(actual,expected,label)=>assert.ok(Math.abs(actual-expected)<1e-9,label+': '+actual+' !== '+expected);
close(courseScore([p('GN','L',0),p('GN','T',1)]),1,'CTH211 shared T');
close(courseScore([p('GN','L',1),p('GN','T',0)]),1,'BUS231 shared L');
close(courseScore([p('GR','L',0),p('GR','T',1)]),1,'ENG112 GR shared');
close(courseScore([p('GS','L',1),p('GS','T',0)]),1,'GS same type');
close(courseScore([p('GU','L',1),p('GU','T',0)]),1,'GU same type');
close(courseScore([p('GN','L',6/7)]),6/7,'single GN L Podcast 6 of 7');
close(courseScore([p('GN','L',1)]),1,'single GN L Podcast 7 of 7');
close(courseScore([p('GN','T',1),p('GS','T',0)]),.5,'GN vs GS independent');
close(courseScore([p('GN','L',1),p('GN','T',0),p('GS','T',0)]),.5,'max within type, mean across types');
close(courseScore([p('GN','T',1,'jiraporn.am','XHM32267'),p('GN','T',7/15,'liting.pe','XHM32267')]),(1+7/15)/2,'XHM32267 distinct instructors');
close(courseScore([p('GN','L',1,'','BBA31367'),p('GN','T',1,'','BBA31367'),p('GN','T',8/15,'liting.pe','BBA31367'),p('GN','L',1,'liting.pe','BBA31367')]),1,'BBA31367 cohort sharing');
close(courseScore([p('GN','T',13/15,'kanjana.hn','BSC11367'),p('GN','T',0,'Linkai.xi','BSC11367')]),(13/15)/2,'BSC11367 instructors remain distinct');
close(courseScore([p('GN','T',0),p('GN','T',0)]),0,'not done');
close(courseScore([p('GN','T',14/15),p('GN','L',0)]),14/15,'partial score does not become complete');
close(courseScore([]),0,'empty array');
close(courseScore([p('GN','T',1.2)]),1,'score clamped upper');
assert.equal(cohortKey(p('GN','T',1,'Liting.Pe')),'instructor:liting.pe');
assert.equal(cohortKey(p('GN','T',1)),'shared');
console.log('PASS: 18 course-score assertions');
