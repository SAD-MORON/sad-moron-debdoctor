import {normalize,canOpenSource} from './catalog.mjs';

export const LITERAL_ACTIONS={DEROGAR:'derogar',DEJAR_SIN_EFECTO:'dejar sin efecto',RECTIFICAR:'rectificar',MODIFICAR:'modificar',APROBAR_REGLAMENTACION:'aprobar la reglamentación'};
// "Deja sin efecto" se conserva como categoría propia: no se equipara a una derogación.
export const INTERPRETED_EFFECTS={DEROGACION_TOTAL:'Derogación total',DEROGACION_PARCIAL:'Derogación parcial',MODIFICACION:'Modificación',RECTIFICACION:'Rectificación',DEJA_SIN_EFECTO:'Deja sin efecto (no se equipara a derogación)',REGLAMENTACION:'Reglamentación',REORGANIZACION:'Reorganización'};
export const SCOPES={TOTAL_NORMA:'Norma completa',TOTAL_INSTRUMENTO:'Instrumento completo',PARCIAL_ARTICULO:'Parcial: artículo',PARCIAL_ESTRUCTURAL:'Parcial: estructura',LEY_MEDIANTE_ANEXO:'Ley mediante anexo',UNKNOWN:'No documentado'};
export const STATUSES={VERIFIED:'verificada',INFERRED:'inferida',UNKNOWN:'no verificada'};
const SOURCE_KINDS={OFFICIAL_RECORD:'Registro oficial',OFFICIAL_UPDATED_TEXT:'Texto actualizado oficial',OFFICIAL_PDF:'PDF oficial',SIGNED_PDF_COPY:'Copia de PDF firmado',DOCUMENT_COPY:'Copia documental',WORKBOOK:'Matriz de trabajo interna',PDF_LOCAL_COPY:'Copia local del documento'};
const WORKBOOK_CELL=/^[A-ZÁÉÍÓÚ]+![A-Z]+\d+(?::[A-Z]+\d+)?\s*[:;]?\s*/;

export function validateEffects(data){
 if(!data||data.candidate!==true||data.consolidated_validity_declared!==false||!Array.isArray(data.relations)||!Array.isArray(data.norms)||!Array.isArray(data.sources)||!Array.isArray(data.document_conflicts))throw Error('Candidato de efectos normativos inválido');
 const norms=new Set(data.norms.map(n=>n.id)),sources=new Set(data.sources.map(s=>s.id));
 for(const relation of data.relations){
  if(!['VERIFIED','UNKNOWN'].includes(relation.verification))throw Error(`Estado inválido: ${relation.id}`);
  if((relation.origin_id!==null&&!norms.has(relation.origin_id))||(relation.affected_id!==null&&!norms.has(relation.affected_id))||!relation.source_ids.every(id=>sources.has(id)))throw Error(`Referencia inválida: ${relation.id}`);
 }
 return data;
}

function sourceView(source){
 const local=source.access==='LOCAL_READ_ONLY';
 return {kind:SOURCE_KINDS[source.kind]||'Fuente documental',url:!local&&canOpenSource(source)?source.url:'',local};
}

export function describeRelation(relation,data){
 const normById=new Map(data.norms.map(n=>[n.id,n])),sourceById=new Map(data.sources.map(s=>[s.id,s]));
 const sources=relation.source_ids.map(id=>sourceView(sourceById.get(id)));
 // Las celdas de la matriz de trabajo no se publican: sólo se muestra la descripción de la evidencia.
 const fromWorkbook=relation.source_ids.some(id=>sourceById.get(id).kind==='WORKBOOK');
 const evidence=fromWorkbook?relation.evidence_reference.replace(WORKBOOK_CELL,''):relation.evidence_reference;
 const status=value=>STATUSES[value]||STATUSES.UNKNOWN;
 return {
  id:relation.id,
  state:relation.verification==='VERIFIED'?'verified':'pending',
  origin:relation.origin_id?normById.get(relation.origin_id).label:'Norma de origen no identificada',
  originCatalogId:relation.origin_id?normById.get(relation.origin_id).catalog_id:null,
  affected:relation.affected_id?normById.get(relation.affected_id).label:'Norma afectada no identificada',
  affectedCatalogId:relation.affected_id?normById.get(relation.affected_id).catalog_id:null,
  provision:relation.affected_provision||'Disposición no documentada',
  literal:relation.literal_action?LITERAL_ACTIONS[relation.literal_action]||relation.literal_action:'No verificada',
  literalStatus:status(relation.literal_action_status),
  interpretation:INTERPRETED_EFFECTS[relation.interpreted_effect]||relation.interpreted_effect,
  interpretationStatus:status(relation.interpretation_status),
  scope:SCOPES[relation.scope]||relation.scope,
  scopeStatus:status(relation.scope_status),
  disposition:fromWorkbook?'Matriz de trabajo interna':relation.source_disposition,
  evidence,
  effectiveDate:relation.effective_date&&relation.effective_date_status==='VERIFIED'?relation.effective_date:'No verificada',
  pending:relation.pending||'',
  sources
 };
}

export function describeConflict(conflict,data){
 const sourceById=new Map(data.sources.map(s=>[s.id,s]));
 return {id:conflict.id,expected:conflict.expected_document,linked:conflict.linked_document,evidence:conflict.exact_reference,sources:conflict.source_ids.map(id=>sourceView(sourceById.get(id)))};
}

export function relationsForRecord(data,recordId){
 return data.relations.map(relation=>describeRelation(relation,data)).filter(view=>view.originCatalogId===recordId||view.affectedCatalogId===recordId);
}

export function selectEffects(data,{query='',state=''}={}){
 const words=normalize(query).split(/\s+/).filter(Boolean);
 return data.relations.map(relation=>describeRelation(relation,data)).filter(view=>(!state||view.state===state)&&words.every(word=>normalize([view.id,view.origin,view.affected,view.provision,view.literal,view.interpretation,view.scope,view.evidence].join(' ')).includes(word)));
}
