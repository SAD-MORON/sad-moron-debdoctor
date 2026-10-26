export function normalize(value=''){return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/(\d)[.,](?=\d)/g,'$1').toLowerCase().trim();}
export function selectRecords(records,{query='',topic='',kind='',scope=''}={}){
 const words=normalize(query).split(/\s+/).filter(Boolean);
 return records.filter(r=>(!topic||r.topic===topic)&&(!kind||r.family===kind)&&(!scope||r.scope===scope)&&words.every(w=>normalize([r.id,r.title,r.kind,r.jurisdiction,r.topic,r.summary,r.relation].join(' ')).includes(w)));
}
export function canOpenSource(record){try{return !!record.url&&new URL(record.url).protocol==='https:';}catch{return false;}}
