import {createEditPlan} from './edit-plan.js';
import {createSourceIndex} from './source-index.js';
import {createPreprocessingContext} from './preprocessing-context.js';
// Generic selection keeps its C order. Translate only the verified keyword
// and default markers belonging to that selection's own association list.
export function planMacroGeneric(source,snapshot,words,{macros,expressionMacros,ownerAllows=(m,t)=>expressionMacros.has(m.id),directives,entries,existingEdits,sourceIndex=createSourceIndex(source,snapshot.tokens),preprocessing=createPreprocessingContext(snapshot,directives).forMacros(macros,{expressionMacros})}){
 const ts=sourceIndex.significant,pairs=sourceIndex.pairs;
 const verified=new Set(snapshot.nodes.filter(n=>n.kind==='GENERIC_SELECTION_EXPR'&&n.location.spelling.file===snapshot.file).map(n=>n.location.spelling.offset));
 const usable=t=>{
  const owners=preprocessing.owners(t);
  return owners.length&&owners.every(m=>ownerAllows(m,t))&&!preprocessing.isExcluded(t)&&source.slice(t.start,t.end)===t.spelling;
 };
 const knownTypes=new Set([...(snapshot.indexedTypeReferences??[]),...snapshot.nodes.filter(n=>n.kind==='TYPE_REF')].filter(n=>n.location.spelling.file===snapshot.file&&n.reference&&ts.some(t=>t.start===n.location.spelling.offset&&t.spelling===n.reference.name&&source.slice(t.start,t.end)===t.spelling)).map(n=>n.location.spelling.offset));
 const edits=[],done=new Set(),unconfirmedTypes=[],held=new Set(),indices=sourceIndex.indices;
 const add=(t,note)=>{if(done.has(t.start)||!usable(t))return;done.add(t.start);edits.push({start:t.start,end:t.end,text:words[t.spelling],kind:'translation',operation:'replacement',ranges:[{start:t.start,end:t.end}],note,order:edits.length});};
 for(const [i,t] of ts.entries()){
  if(t.kind!=='KEYWORD'||t.spelling!=='_Generic'||!verified.has(t.start)||!usable(t)||ts[i+1]?.spelling!=='(')continue;
  const end=pairs.get(i+1);if(end===undefined||!usable(ts[end]))continue;
  const parts=sourceIndex.partition(i+2,end).parts.map(p=>ts.slice(p.start,p.end));if(parts.length<2||parts.some(p=>!p.length))continue;
  // Syntax validity is supplied by Clang; commas inside paired constructs
  // do not split association entries and nested defaults are handled separately.
  add(t,'標準マクロ内の_Generic');
  for(const p of parts.slice(1)){
   if(p[0]?.kind==='KEYWORD'&&p[0].spelling==='default'&&p[1]?.spelling===':'){add(p[0],'標準マクロ内のdefault（型選択の既定候補）');continue;}
   let colon=null;
   for(let j=indices.get(p[0].start);j<ts.length&&ts[j].end<=p.at(-1).end;j++){
    if(pairs.has(j)){j=pairs.get(j);continue;}
    if(ts[j].spelling===':'){colon=ts[j];break;}
   }
   if(!colon)continue;
   const topTypes=[];
   for(let j=indices.get(p[0].start);j<ts.length&&ts[j].end<=colon.start;j++){if(pairs.has(j)){j=pairs.get(j);continue;}topTypes.push(ts[j]);}
   for(const token of topTypes){
    const e=entries.get(token.spelling);
    if(e&&['type','tag'].includes(e.kind)&&usable(token)&&!knownTypes.has(token.start)&&!existingEdits.some(edit=>edit.start===token.start&&edit.end===token.end)&&!held.has(token.start)){held.add(token.start);unconfirmedTypes.push(token);}
   }
  }
 }
 const plan=createEditPlan('macro-generic',edits);
 return {edits:plan.edits,plan,unconfirmedTypes};
}
