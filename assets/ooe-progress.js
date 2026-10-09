/* GR/GS progress normalization — raw sheet labels are data, not status IDs.
   Never infer an unrecognized value: surface it as unknown for review. */
(function(){
  'use strict';
  const STATUS=Object.freeze({good:'good',low:'low',none:'none',pending:'pending',unknown:'unknown'});
  function classify(value){
    const text=String(value??'').normalize('NFKC')
      .replace(/[\u200B-\u200D\uFEFF]/g,'')
      .replace(/\s+/g,' ').trim().toLowerCase();
    if(!text)return STATUS.pending;
    const compact=text.replace(/\s+/g,'');
    // Negative content signals take priority over a general "พบเนื้อหา".
    if(/ไม่มีเนื้อหา|ไม่พบเนื้อหา|ไม่ปรากฏเนื้อหา|ไม่มีการจัดทำเนื้อหา|ไม่พบการจัดทำเนื้อหา|^no.?content$|^not.?started$/.test(compact)){
      return STATUS.none;
    }
    if(/^(รอข้อมูล|รอการตรวจสอบข้อมูล|ยังไม่มีข้อมูล|ไม่ระบุ|pending|n\/a|-|—)$/.test(compact))return STATUS.pending;
    const high=/ระดับมาก|ปริมาณ(?:ของ)?เนื้อหา(?:อยู่ใน)?ระดับมาก|เนื้อหา(?:และองค์ประกอบ)?มากกว่า(?:ร้อยละ)?50(?:%|เปอร์เซ็นต์)?|มากกว่า(?:ร้อยละ)?50(?:%|เปอร์เซ็นต์)?|เกิน(?:ร้อยละ)?50(?:%|เปอร์เซ็นต์)?|^highcontent(?:volume)?$|^ทำครบ$/.test(compact);
    const low=/ระดับน้อย|ปริมาณ(?:ของ)?เนื้อหา(?:อยู่ใน)?ระดับน้อย|เนื้อหา(?:และองค์ประกอบ)?น้อยกว่า(?:ร้อยละ)?50(?:%|เปอร์เซ็นต์)?|น้อยกว่า(?:ร้อยละ)?50(?:%|เปอร์เซ็นต์)?|ต่ำกว่า(?:ร้อยละ)?50(?:%|เปอร์เซ็นต์)?|ไม่ถึง(?:ร้อยละ)?50(?:%|เปอร์เซ็นต์)?|^lowcontent(?:volume)?$|^ทำบ้าง$/.test(compact);
    // Contradictory wording must be reviewed rather than guessed.
    if((high&&/น้อย|ต่ำกว่า|lowcontent/.test(compact))||(low&&/มาก|สูงกว่า|highcontent/.test(compact)))return STATUS.unknown;
    if(high&&!low)return STATUS.good;
    if(low&&!high)return STATUS.low;
    // Recognize a few common paraphrases while still requiring explicit content wording.
    const highAlt=/(?:เนื้อหา|ปริมาณเนื้อหา)(?:มี|อยู่ใน)?(?:ระดับ)?(?:มาก|สูง|เยอะ)|^(?:high|complete|completed)$/i.test(compact);
    const lowAlt=/(?:เนื้อหา|ปริมาณเนื้อหา)(?:มี|อยู่ใน)?(?:ระดับ)?(?:น้อย|ต่ำ)|(?:เนื้อหา)(?:บางส่วน)|^(?:low|partial|partiallycompleted)$/i.test(compact);
    if(highAlt&&!lowAlt&&!/น้อย|ต่ำ|บางส่วน/.test(compact))return STATUS.good;
    if(lowAlt&&!highAlt&&!/มาก|สูง|เยอะ/.test(compact))return STATUS.low;
    return STATUS.unknown;
  }
  function commonLabel(rows,category){
    const values=new Map();
    (rows||[]).forEach(row=>{
      if(row['ความคืบหน้าการทำ']!==category)return;
      const text=String(row['ข้อความความคืบหน้าต้นฉบับ']||'').trim();
      if(text)values.set(text,(values.get(text)||0)+1);
    });
    const sorted=[...values.entries()].sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0],'th'));
    return sorted[0]?.[0]||'';
  }
  function unknownValues(rows){
    const m=new Map();
    (rows||[]).forEach(row=>{
      if(row['ความคืบหน้าการทำ']!==STATUS.unknown)return;
      const v=String(row['ข้อความความคืบหน้าต้นฉบับ']||'').trim();
      m.set(v,(m.get(v)||0)+1);
    });
    return [...m.entries()].sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0],'th'));
  }
  window.OOEProgress={STATUS,classify,commonLabel,unknownValues};
})();
