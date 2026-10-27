export const PROGRESS_KEY='debdoctor-a75-progress';

function validProgress(value,validIds){
 return Array.isArray(value)&&value.every(id=>typeof id==='string'&&validIds.has(id))&&new Set(value).size===value.length;
}

export function createProgressStore(getStorage,validStageIds){
 const validIds=new Set(validStageIds);let storage=null;let warning='';
 try{storage=getStorage();}catch{warning='El avance se mantendrá durante esta visita, pero no podrá guardarse en este navegador.';}
 const load=()=>{
  if(!storage)return new Set();
  let raw;
  try{raw=storage.getItem(PROGRESS_KEY);}catch{storage=null;warning='El avance se mantendrá durante esta visita, pero no podrá guardarse en este navegador.';return new Set();}
  if(raw===null)return new Set();
  try{const parsed=JSON.parse(raw);if(validProgress(parsed,validIds))return new Set(parsed);}catch{}
  warning='No se pudo recuperar el avance guardado. El recorrido continuará en memoria.';
  return new Set();
 };
 const save=done=>{
  if(!storage)return false;
  try{storage.setItem(PROGRESS_KEY,JSON.stringify([...done]));return true;}
  catch{storage=null;warning='El avance se mantendrá durante esta visita, pero no podrá guardarse en este navegador.';return false;}
 };
 return{load,save,getWarning:()=>warning};
}
