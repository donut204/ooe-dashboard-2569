"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const root=path.join(__dirname,"..");
const read=p=>fs.readFileSync(path.join(root,p),"utf8");
const pages=["index.html","ai-tutor.html","podcast.html"];
const i18n=read("assets/ooe-i18n.js");
const pageI18n=read("assets/ooe-page-i18n.js");
test("Shared reference date is 18 Nov 2026 with Buddhist/Gregorian conversion",()=>{
  assert.match(i18n,/const REFERENCE_DATE='2026-11-18'/);
  const global={location:{search:"",pathname:"/",hash:""},
    document:{documentElement:{lang:"th"}},
    localStorage:{getItem:()=>null,setItem:()=>{}}
  };
  new Function("window",i18n)(global);
  assert.equal(global.OOEI18n.referenceDateISO,"2026-11-18");
  assert.equal(global.OOEI18n.referenceDate(),"18/11/2569");
  assert.equal(global.OOEI18n.t("source.referenceDate",{date:global.OOEI18n.referenceDate()}),"ข้อมูลอ้างอิง ณ วันที่ 18/11/2569");
  global.OOEI18n.setLanguage("en",{persist:false,updateQuery:false});
  assert.equal(global.OOEI18n.referenceDate(),"18/11/2026");
  assert.equal(global.OOEI18n.t("source.referenceDate",{date:global.OOEI18n.referenceDate()}),"Data as of 18/11/2026");
});
test("All 4 GR/GS/AI Tutor/Podcast pages have updated date fallback and cache-busting",()=>{
  for(const file of pages){
    const page=read(file);
    assert.match(page,/ข้อมูลอ้างอิง ณ วันที่ 18\/11\/2569/);
    assert.match(page,/assets\/ooe-i18n\.js\?v=20261119-refdate-1811/);
    assert.doesNotMatch(page,/ข้อมูลอ้างอิง ณ วันที่ 16\/11\/2569/);
    assert.doesNotMatch(page,/20261116-reference-date/);
    if(file!=="index.html")assert.match(page,/assets\/ooe-page-i18n\.js\?v=20261119-refdate-1811/);
  }
});
test("AI Tutor and Podcast translation adapter maps date, without stale source-date",()=>{
  assert.match(pageI18n,/'ข้อมูลอ้างอิง ณ วันที่ 18\/11\/2569':'Data as of 18\/11\/2026'/);
  assert.doesNotMatch(pageI18n,/ข้อมูลอ้างอิง ณ วันที่ 16\/11\/2569/);
  assert.doesNotMatch(pageI18n,/Data as of 16\/11\/2026/);
});
test("All active inline JS and i18n scripts remain syntactically valid",()=>{
  assert.doesNotThrow(()=>new Function(i18n));
  assert.doesNotThrow(()=>new Function(pageI18n));
  for(const file of pages){
    const source=read(file);
    const inline=[...source.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)]
      .map(match=>match[1].trim()).filter(Boolean);
    assert.ok(inline.length>0,file+" has inline JS");
    for(const code of inline) assert.doesNotThrow(()=>new Function(code),file+" inline JS");
  }
});
test("Current published CSV bindings are unchanged",()=>{
  const urls={
    "index.html":"gid=131857057&single=true&output=csv",
    "ai-tutor.html":"gid=223035731&single=true&output=csv",
    "podcast.html":"gid=149082930&single=true&output=csv"
  };
  for(const [file,fragment] of Object.entries(urls)){
    const page=read(file);
    assert.ok(page.includes(fragment));
    assert.match(page,/cache:'no-store'/);
  }
});
