/* Shared course-level Profile-count multi-select for AI Tutor and Podcast.
   An empty selected set means ALL counts; all calculations remain in each dashboard. */
(function(){
  'use strict';
  function create(element,onChange){
    if(!element) throw new Error('Profile-count filter container is missing');
    let available=[];
    let selected=new Set();
    const panelId=element.id+'Panel';
    element.innerHTML=
      '<button type="button" class="pcf-trigger" aria-haspopup="true" aria-expanded="false" aria-controls="'+panelId+'" aria-label="เลือกจำนวน Profile">'+
        '<span class="pcf-value">ทั้งหมด</span>'+
        '<svg class="pcf-chevron" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 9 6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'+
      '</button>'+
      '<div id="'+panelId+'" class="pcf-panel" role="group" aria-label="จำนวน Profile" hidden>'+
        '<div class="pcf-items">'+
          '<label class="pcf-item pcf-all"><input type="checkbox" data-pcf-all><span>ทั้งหมด</span></label>'+
          '<div class="pcf-divider"></div>'+
          '<div class="pcf-options"></div>'+
        '</div>'+
        '<div class="pcf-foot"><span class="pcf-hint">แสดงทุกจำนวน Profile</span>'+
          '<button class="pcf-done" type="button">เสร็จสิ้น</button>'+
        '</div>'+
      '</div>';
    const trigger=element.querySelector('.pcf-trigger');
    const panel=element.querySelector('.pcf-panel');
    const value=element.querySelector('.pcf-value');
    const all=element.querySelector('[data-pcf-all]');
    const options=element.querySelector('.pcf-options');
    const hint=element.querySelector('.pcf-hint');
    const done=element.querySelector('.pcf-done');

    function sync(){
      const n=selected.size;
      value.textContent=n===0?'ทั้งหมด':n===1?Array.from(selected)[0]+' Profile':'เลือก '+n+' รายการ';
      hint.textContent=n===0?'แสดงทุกจำนวน Profile':'เลือกแล้ว '+n+' รายการ';
      all.checked=n===0;
      for(const input of options.querySelectorAll('[data-pcf-count]')){
        input.checked=selected.has(Number(input.dataset.pcfCount));
      }
    }
    function setOpen(open,restoreFocus=false){
      if(open){
        const rect=trigger.getBoundingClientRect();
        const below=window.innerHeight-rect.bottom;
        panel.classList.toggle('is-up',below<310&&rect.top>below);
      }
      panel.hidden=!open;
      trigger.setAttribute('aria-expanded',String(open));
      if(!open&&restoreFocus)trigger.focus();
    }
    function normalize(counts){
      return [...new Set(counts.map(Number).filter(n=>Number.isSafeInteger(n)&&n>0))].sort((a,b)=>a-b);
    }
    function setOptions(counts){
      available=normalize(counts);
      selected=new Set([...selected].filter(n=>available.includes(n)));
      // Selecting every available category is equivalent to no restriction.
      if(selected.size===available.length)selected.clear();
      options.replaceChildren();
      for(const count of available){
        const row=document.createElement('label');
        row.className='pcf-item';
        const checkbox=document.createElement('input');
        checkbox.type='checkbox';checkbox.dataset.pcfCount=String(count);
        const label=document.createElement('span');
        label.textContent=count+' Profile';
        row.append(checkbox,label);
        options.append(row);
      }
      sync();
    }
    function clear(){
      selected.clear();
      sync();
      setOpen(false);
    }
    function getSelected(){return new Set(selected)}
    function matches(count){return selected.size===0||selected.has(Number(count))}
    trigger.addEventListener('click',()=>setOpen(panel.hidden));
    done.addEventListener('click',()=>setOpen(false,true));
    element.addEventListener('change',event=>{
      const input=event.target;
      if(!(input instanceof HTMLInputElement))return;
      if(input.hasAttribute('data-pcf-all')){
        selected.clear();
      }else if(input.hasAttribute('data-pcf-count')){
        const count=Number(input.dataset.pcfCount);
        if(input.checked)selected.add(count);
        else selected.delete(count);
        if(selected.size===available.length)selected.clear();
      }else return;
      sync();
      if(typeof onChange==='function')onChange();
    });
    document.addEventListener('pointerdown',event=>{
      if(!panel.hidden&&!element.contains(event.target))setOpen(false);
    });
    document.addEventListener('keydown',event=>{
      if(event.key==='Escape'&&!panel.hidden){
        event.preventDefault();setOpen(false,true);
      }
    });
    sync();
    return {setOptions,clear,getSelected,matches,isOpen:()=>!panel.hidden};
  }
  window.OOEProfileCountFilter={create};
})();
