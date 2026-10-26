export const RELATION_TYPES=new Set(['reglamenta','modifica','sustituye','incorpora','complementa','deroga']);
export const REVIEW_STATES=new Set(['VERIFICADO','PARCIAL','PENDIENTE']);

export function validateGraph(graph){
 if(!graph||graph.candidate!==true||!Array.isArray(graph.nodes)||!Array.isArray(graph.edges))throw Error('Grafo candidato inválido');
 const ids=new Set();
 for(const node of graph.nodes){
  if(!node.id||ids.has(node.id))throw Error(`Nodo inválido o duplicado: ${node.id||'sin ID'}`);
  ids.add(node.id);
  for(const field of ['identification','text_review','relation_review','version_reconstructed'])if(!REVIEW_STATES.has(node[field]))throw Error(`Estado inválido en ${node.id}.${field}`);
  if(!Array.isArray(node.topics)||!node.source?.startsWith('https://'))throw Error(`Procedencia inválida en ${node.id}`);
 }
 const edgeIds=new Set();
 for(const edge of graph.edges){
  if(!edge.id||edgeIds.has(edge.id)||!ids.has(edge.from)||!ids.has(edge.to))throw Error(`Conexión inválida: ${edge.id||'sin ID'}`);
  edgeIds.add(edge.id);
  if(!RELATION_TYPES.has(edge.type)||!['verified','pending'].includes(edge.status)||!edge.evidence)throw Error(`Contrato de conexión inválido: ${edge.id}`);
 }
 if(!ids.has(graph.center)||graph.zero_complete_versions!==true)throw Error('Núcleo o estado de versiones inválido');
 return graph;
}

export function graphCounts(graph){
 return {
  nodes:graph.nodes.length,
  identified:graph.nodes.filter(n=>n.identification==='VERIFICADO').length,
  textVerified:graph.nodes.filter(n=>n.text_review==='VERIFICADO').length,
  verified:graph.edges.filter(e=>e.status==='verified').length,
  pending:graph.edges.filter(e=>e.status==='pending').length,
  reconstructed:graph.nodes.filter(n=>n.version_reconstructed==='VERIFICADO').length
 };
}

export function selectGraph(graph,{topic='',showPending=true,group='core'}={}){
 const normalized=topic.toLocaleLowerCase('es');
 const branchIds=new Set(graph.nodes.filter(node=>!normalized&&group!=='core'&&node.group===group).map(node=>node.id));
 const relatedIds=new Set(branchIds);
 for(const edge of graph.edges)if(branchIds.has(edge.from)||branchIds.has(edge.to)){relatedIds.add(edge.from);relatedIds.add(edge.to);}
 const visibleNodes=graph.nodes.filter(node=>node.id===graph.center||node.group==='core'||(normalized?node.topics.some(t=>t.toLocaleLowerCase('es')===normalized):group==='core'?node.group==='core':relatedIds.has(node.id)));
 const nodeIds=new Set(visibleNodes.map(n=>n.id));
 const visibleEdges=graph.edges.filter(edge=>nodeIds.has(edge.from)&&nodeIds.has(edge.to)&&(showPending||edge.status==='verified'));
 return {nodes:visibleNodes,edges:visibleEdges};
}

export function connectionText(edge,nodeById){
 return `${nodeById.get(edge.from)?.label||edge.from} ${edge.type} ${nodeById.get(edge.to)?.label||edge.to}: ${edge.articles}`;
}
