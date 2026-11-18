/* Run: node tests/ooe-profile-view.test.js */
const assert=require('node:assert/strict');
const P=require('../assets/ooe-profile-view.js');
const d=(code,type,profile,score,faculty='Business')=>({
 faculty,courseCode:code,courseName:code,courseProfile:profile,
 courseType:type,profileScore:score,instructors:'Lecturer '+profile
});
const a=d('CTH211','GN','GN-CTH211-(L)',0);
const b=d('CTH211','GN','GN-CTH211-(T)',1);
const c=d('LLB21167','GS','GS-LLB21167-(T)',0.5);
const e=d('LLB21167','GN','GN-LLB21167-(T)',1);
const f=d('ENG112','GR','GR-ENG112-(L)',0,'Arts');
const groups=[
 {faculty:'Business',courseCode:'CTH211',profileCount:2,profiles:[a,b]},
 {faculty:'Business',courseCode:'LLB21167',profileCount:2,profiles:[c,e]},
 {faculty:'Arts',courseCode:'ENG112',profileCount:1,profiles:[f]}
];
assert.equal(P.status(a,'ai'),'notdone');
assert.equal(P.status(b,'ai'),'complete');
assert.equal(P.status(c,'podcast'),'partial');
assert.equal(P.status(c,'ai'),'notdone');
assert.equal(P.rows(groups,{mode:'ai'}).length,5);
assert.deepEqual(P.counts(P.rows(groups,{mode:'ai'}),'ai'),{all:5,complete:2,partial:0,notdone:3});
assert.deepEqual(P.counts(P.rows(groups,{mode:'podcast'}),'podcast'),{all:5,complete:2,partial:1,notdone:2});
assert.deepEqual(P.rows(groups,{faculty:'Arts',mode:'ai'}),[f]);
assert.deepEqual(P.rows(groups,{type:'GS',mode:'podcast'}),[c]);
assert.deepEqual(P.rows(groups,{type:'GN',mode:'ai',status:'notdone'}),[a]);
assert.deepEqual(P.rows(groups,{query:'CTH211',mode:'ai'}),[a,b]);
assert.deepEqual(P.rows(groups,{query:'lecturer GN-LLB21167-(T)',mode:'ai'}),[e]);
assert.deepEqual(P.rows(groups,{mode:'ai',profileCountMatches:n=>n===1}),[f]);
assert.deepEqual(P.rows(groups,{mode:'podcast',status:'partial'}),[c]);
assert.deepEqual(P.rows(groups,{mode:'podcast',status:'complete'}),[b,e]);
assert.deepEqual(P.rows(groups,{mode:'podcast',status:'notdone'}),[a,f]);
assert.equal(P.rows(groups,{mode:'ai',status:'complete'}).length,2);
console.log('PASS: 17 Profile View selector assertions');
