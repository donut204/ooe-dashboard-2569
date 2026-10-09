/* Shared accessible single-choice filter UI.
   Original <select> is authoritative; option values and change events are preserved. */
(function(){
  'use strict';
  const filters=['facultyFilter','typeFilter','statusFilter','reviewFilter'];
  const instances=[];
  const sourceLabel={
    'เนื้อหาและองค์ประกอบมากกว่า 50%':'progress.good',
    'เนื้อหาและองค์ประกอบน้อยกว่า 50%':'progress.low',
    'ไม่มีเนื้อหา':'progress.none',
    'ผ่าน':'kpi.pass',
    'ไม่ผ่าน':'kpi.fail',
    'อยู่ระหว่างการตรวจสอบ':'kpi.reviewing'
  };
  function language(){return window.OOEI18n?.getLanguage?.()||document.documentElement.lang||'th'}
  function t(key){return window.OOEI18n?.t?.(key)||key}
  function allText(){return language()==='en'?'All':'ทั้งหมด'}
  function textFor(select,option){
    if(!option.value)return allText();
    const raw=option.textContent.trim();
    if(select.id==='statusFilter'&&['complete','partial','notdone'].includes(option.value)){
      const podcast=location.pathname.includes('podcast.html');
      if(language()==='en'){
        if(option.value==='complete')return podcast?'Completed':'Complete for All Profile';
        if(option.value==='partial')return 'Partially Completed';
        return 'Not Completed';
      }
      if(option.value==='complete')return podcast?'ทำครบ':'ทำครบทุก Profile';
      if(option.value==='partial')return 'จัดทำไม่ครบ';
      return 'ไม่ทำ';
    }
    if(sourceLabel[option.value]) return t(sourceLabel[option.value]);
    return raw;
  }
  function init(select){
    if(!select||select.dataset.ooeEnhanced==='true')return;
    select.dataset.ooeEnhanced='true';
    select.classList.add('ooe-native-select');
    select.tabIndex=-1;
    select.setAttribute('aria-hidden','true');
    const label=select.closest('.field')?.querySelector('label');
    const labelId='ooe-label-'+select.id;
    if(label){
      label.id=label.id||labelId;
    }
    const holder=document.createElement('div');
    holder.className='ooe-single';
    holder.dataset.ooeNoTranslate='true';
    holder.innerHTML=
      '<button type="button" class="ss-trigger" id="ss-trigger-'+select.id+'" aria-haspopup="listbox" aria-expanded="false" aria-controls="ss-panel-'+select.id+'">'+
        '<span class="ss-value" id="ss-value-'+select.id+'">ทั้งหมด</span>'+
        '<svg class="ss-chevron" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 9 6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'+
      '</button>'+
      '<div class="ss-panel" id="ss-panel-'+select.id+'" hidden>'+
        '<div class="ss-search-wrap" hidden><input class="ss-search" type="search" autocomplete="off" aria-label="ค้นหาคณะ"></div>'+
        '<div class="ss-options" role="listbox"></div>'+
      '</div>';
    select.insertAdjacentElement('afterend',holder);
    const trigger=holder.querySelector('.ss-trigger');
    const panel=holder.querySelector('.ss-panel');
    const searchWrap=holder.querySelector('.ss-search-wrap');
    const search=holder.querySelector('.ss-search');
    const list=holder.querySelector('.ss-options');
    const value=holder.querySelector('.ss-value');
    const searchable=select.id==='facultyFilter';
    searchWrap.hidden=!searchable;
    if(label){
      list.setAttribute('aria-labelledby',label.id);
      trigger.setAttribute('aria-labelledby',label.id+' '+value.id);
      if(label.hasAttribute('for')){
        label.setAttribute('for',trigger.id);
      }else{
        label.addEventListener('click',()=>trigger.focus());
      }
    }else{
      trigger.setAttribute('aria-label',select.id);
    }
    const checkSvg='<svg class="ss-check" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m5 12 4.5 4.5L19 7" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    let optionsFingerprint='';
    let latestOptions=[];
    function renderList(){
      const query=searchable?search.value.trim().toLocaleLowerCase():'';
      list.replaceChildren();
      let visible=0;
      latestOptions.forEach((option,i)=>{
        const display=textFor(select,option);
        if(query&&!display.toLocaleLowerCase().includes(query)&&!option.value.toLocaleLowerCase().includes(query))return;
        visible++;
        const row=document.createElement('button');
        row.type='button';
        row.className='ss-option';
        row.id='ss-'+select.id+'-'+i;
        row.setAttribute('role','option');
        row.setAttribute('aria-selected',String(select.value===option.value));
        row.tabIndex=-1;
        const name=document.createElement('span');
        name.className='ss-option-name';
        name.textContent=display;
        row.appendChild(name);
        row.insertAdjacentHTML('beforeend',checkSvg);
        row.addEventListener('click',()=>choose(option.value));
        list.appendChild(row);
      });
      if(!visible){
        const empty=document.createElement('div');
        empty.className='ss-empty';
        empty.textContent=language()==='en'?'No matching options':'ไม่พบตัวเลือกที่ตรงกัน';
        list.appendChild(empty);
      }
    }
    function sync(){
      latestOptions=[...select.options].map(o=>({value:o.value,textContent:o.textContent}));
      const next=language()+'|'+latestOptions.map(o=>JSON.stringify([o.value,o.textContent])).join('|');
      const selected=latestOptions.find(o=>o.value===select.value);
      value.textContent=selected?textFor(select,selected):allText();
      if(next!==optionsFingerprint||!panel.hidden){
        optionsFingerprint=next;
        renderList();
      }
      trigger.disabled=select.disabled;
      if(searchable){
        search.placeholder=language()==='en'?'Search faculty or college…':'ค้นหาคณะ / วิทยาลัย…';
        search.setAttribute('aria-label',language()==='en'?'Search faculty or college':'ค้นหาคณะ / วิทยาลัย');
      }
    }
    function setOpen(open,focusTrigger=false){
      if(open){
        instances.forEach(item=>{
          if(item.panel!==panel&&!item.panel.hidden)item.close();
        });
        const bounds=trigger.getBoundingClientRect();
        const below=window.innerHeight-bounds.bottom;
        panel.classList.toggle('is-up',below<320&&bounds.top>below);
        if(searchable)search.value='';
        panel.hidden=false;
        sync();
        if(searchable)search.focus();
        else (list.querySelector('[aria-selected="true"]')||list.querySelector('.ss-option'))?.focus();
      }else{
        panel.hidden=true;
        if(focusTrigger)trigger.focus();
      }
      trigger.setAttribute('aria-expanded',String(open));
    }
    function choose(chosen){
      if(![...select.options].some(o=>o.value===chosen))return;
      const changed=select.value!==chosen;
      select.value=chosen;
      setOpen(false,true);
      sync();
      if(changed) select.dispatchEvent(new Event('change',{bubbles:true}));
    }
    trigger.addEventListener('click',()=>setOpen(panel.hidden));
    trigger.addEventListener('keydown',e=>{
      if(['ArrowDown','ArrowUp','Enter',' '].includes(e.key)&&panel.hidden){
        e.preventDefault();setOpen(true);
      }
    });
    search.addEventListener('input',renderList);
    search.addEventListener('keydown',e=>{
      if(e.key==='ArrowDown'){
        const first=list.querySelector('.ss-option');
        if(first){e.preventDefault();first.focus();}
      }
    });
    list.addEventListener('keydown',e=>{
      if(!['ArrowDown','ArrowUp','Home','End'].includes(e.key))return;
      const candidates=[...list.querySelectorAll('.ss-option')];
      if(!candidates.length)return;
      e.preventDefault();
      const current=candidates.indexOf(document.activeElement);
      const next=e.key==='Home'?0:e.key==='End'?candidates.length-1:
        e.key==='ArrowDown'?Math.min(current+1,candidates.length-1):Math.max(current-1,0);
      candidates[next].focus();
    });
    select.addEventListener('change',sync);
    const observer=new MutationObserver(sync);
    observer.observe(select,{subtree:true,childList:true,characterData:true});
    instances.push({holder,panel,trigger,sync,close:()=>setOpen(false)});
    sync();
  }
  function syncAll(){instances.forEach(x=>x.sync())}
  function start(){
    filters.forEach(id=>init(document.getElementById(id)));
    document.addEventListener('pointerdown',e=>{
      for(const item of instances){
        if(!item.panel.hidden&&!item.holder.contains(e.target)){
          item.panel.hidden=true;
          item.trigger.setAttribute('aria-expanded','false');
        }
      }
    });
    document.addEventListener('keydown',e=>{
      if(e.key!=='Escape')return;
      for(const item of instances){
        if(!item.panel.hidden){
          e.preventDefault();
          item.close();
          item.trigger.focus();
        }
      }
    });
    new MutationObserver(syncAll).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    syncAll();
  }
  window.OOESingleSelect={syncAll};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
