import {currentWord} from "../vocabulary/vocabulary-current.js";
import {createEditPlan} from './edit-plan.js';
import {createPreprocessingContext} from './preprocessing-context.js';
// Only compiler-established predefined uses; never a spelling-only name rewrite.
export const PREDEFINED_WORDS=[
 ['builtin:__FILE__','__FILE__'],['builtin:__LINE__','__LINE__'],
 ['builtin:__DATE__','__DATE__'],['builtin:__TIME__','__TIME__'],
 ['builtin:__STDC__','__STDC__'],['builtin:__STDC_HOSTED__','__STDC_HOSTED__'],
 ['builtin:__STDC_VERSION__','__STDC_VERSION__'],['builtin:__func__','__func__'],
 ['builtin:__STDC_ISO_10646__','__STDC_ISO_10646__'],
 ['builtin:__STDC_MB_MIGHT_NEQ_WC__','__STDC_MB_MIGHT_NEQ_WC__'],
 ['builtin:__STDC_UTF_16__','__STDC_UTF_16__'],
 ['builtin:__STDC_UTF_32__','__STDC_UTF_32__'],
 ['builtin:__STDC_ANALYZABLE__','__STDC_ANALYZABLE__'],
 ['builtin:__STDC_IEC_559__','__STDC_IEC_559__'],
 ['builtin:__STDC_IEC_559_COMPLEX__','__STDC_IEC_559_COMPLEX__'],
 ['builtin:__STDC_LIB_EXT1__','__STDC_LIB_EXT1__'],
 ['builtin:__STDC_NO_ATOMICS__','__STDC_NO_ATOMICS__'],
 ['builtin:__STDC_NO_COMPLEX__','__STDC_NO_COMPLEX__'],
 ['builtin:__STDC_NO_THREADS__','__STDC_NO_THREADS__'],
 ['builtin:__STDC_NO_VLA__','__STDC_NO_VLA__'],

 ['pragma:STDC','pragma STDC'],['pragma:FENV_ACCESS','FENV_ACCESS'],
 ['pragma:FP_CONTRACT','FP_CONTRACT'],['pragma:CX_LIMITED_RANGE','CX_LIMITED_RANGE'],
 ['pragma:ON','pragma ON'],['pragma:OFF','pragma OFF'],['pragma:DEFAULT','pragma DEFAULT'],
].map(([key,label])=>[key,label,currentWord(key)]);
export function planPredefined(source,snapshot,words,directives,{preprocessing=createPreprocessingContext(snapshot,directives).forMacros(snapshot.nodes.filter(n=>n.kind==='MACRO_INSTANTIATION'))}={}){
 const entries=new Map(PREDEFINED_WORDS.filter(([k])=>k.startsWith('builtin:')).map(([key,name])=>[name,key]));
 const edits=[],recognizedMacros=new Set(),done=new Set();
 for(const t of snapshot.tokens){
  const key=entries.get(t.spelling);if(!key||source.slice(t.start,t.end)!==t.spelling||preprocessing.isExcluded(t))continue;
  const owners=preprocessing.intersecting(t);
  const m=owners.find(m=>m.start===t.start&&m.name===t.spelling);
  let established=false;
  if(t.spelling==='__func__')established=!owners.length&&snapshot.nodes.some(n=>n.kind==='STRING_LITERAL'&&n.start===t.start&&n.end===t.end&&n.origin==='source');
  else established=!!m&&owners.length===1&&(m.builtinMacro===true||m.reference?.sdkOrigin===true);
  if(!established||done.has(t.start))continue;done.add(t.start);if(m)recognizedMacros.add(m.id);
  edits.push({start:t.start,end:t.end,text:words[key],kind:'translation',operation:'replacement',ranges:[{start:t.start,end:t.end}],note:'定義済みの名前 '+t.spelling,order:edits.length});
 }
 const plan=createEditPlan('predefined',edits);
 return {edits:plan.edits,plan,recognizedMacros};
}
