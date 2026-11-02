import {createEditPlan,resolveEditPlans} from './edit-plan.js';
import {createSourceIndex} from './source-index.js';
import {createPreprocessingContext,standardOrigin} from './preprocessing-context.js';
import {planMacroGeneric} from './macro-generic-reader.js';
import {planMacroUnary} from './macro-unary-reader.js';
import {STANDARD_NAMES} from './standard-catalog.js';
import {macroArgumentRole} from './standard-macro-policy.js';
// Translate physical uses bound to configured SDK headers; never infer by name alone.
export function planStandardNames(source,snapshot,words,directives=[],{sourceIndex=createSourceIndex(source,snapshot.tokens)}={}){
 const callHeads=[],entries=new Map(STANDARD_NAMES.map(e=>[e.source,e])),edits=[],done=new Set(),recognizedMacros=new Set(),specifierStarts=new Set();
 const context=createPreprocessingContext(snapshot,directives);
 const tokensByStart=sourceIndex.byStart,physicalTokens=sourceIndex.significant;
 let macros=snapshot.nodes.filter(n=>n.kind==='MACRO_INSTANTIATION');
 // Verified standard expression macros open their arguments. This is a role policy,
 // not permission to inspect arbitrary macro replacement lists.
 // Some SDKs define expression-call names as object-like aliases. Clang
 // records only their head. Extend the display protection to the physical call,
 // even if its definition origin is uncertain (protection is not translation).
 // The expanded AST extent is not changed or trusted.
 macros=macros.map(m=>{
  const e=entries.get(m.name),head=tokensByStart.get(m.start);
  if(macroArgumentRole(e)!=='expression'||head?.end!==m.end||head.spelling!==e.source||source.slice(head.start,head.end)!==e.source)return m;
  const i=sourceIndex.indexAt(head.start),open=physicalTokens[i+1];
  if(open?.spelling!=='('||source.slice(open.start,open.end)!=='(')return m;
  const close=sourceIndex.parentheses.get(open.start);
  if(close&&source.slice(close.start,close.end)===')'&&!context.isExcluded({start:m.start,end:close.end}))return {...m,end:close.end};
  return m;
 });
 const assertArgumentModes=new Map();
 const conditionNodes=new Set('DECL_REF_EXPR INTEGER_LITERAL FLOATING_LITERAL CHARACTER_LITERAL STRING_LITERAL CXX_UNARY_EXPR'.split(' '));
 for(const m of macros){
  const e=entries.get(m.name);if(m.name!=='assert'||!standardOrigin(m.reference,e)||m.reference?.kind!=='MACRO_DEFINITION')continue;
  const ts=sourceIndex.within(m);
  const complete=ts[0]?.spelling==='assert'&&ts[1]?.spelling==='('&&ts.at(-1)?.spelling===')';
  const proof=complete&&snapshot.nodes.some(n=>conditionNodes.has(n.kind)&&n.location.spelling.file===snapshot.file&&n.location.spelling.offset>=ts[1].end&&n.location.spelling.offset<ts.at(-1).start);
  assertArgumentModes.set(m.id,m.assertIgnored===true?'ignored':proof?'verified':'unknown');
 }
 const expressionMacros=new Set(macros.filter(m=>{
  const e=entries.get(m.name),t=tokensByStart.get(m.start);
  return m.reference?.kind==='MACRO_DEFINITION'&&standardOrigin(m.reference,e)&&
   (macroArgumentRole(e)==='expression'||assertArgumentModes.get(m.id)==='verified')&&
   t?.spelling===e.source&&source.slice(t.start,t.end)===e.source&&
   !context.isExcluded(m);
 }).map(m=>m.id));

 // Explicit type positions also work inside an allowed expression macro.
 // Do not open offsetof's entire member designator or va_arg's value position here.
 // Bound offsetof fields are handled separately below.
 const typeArguments=[],memberArguments=[];
 const argumentRegions=[];
 const preprocessing=context.forMacros(macros,{expressionMacros,argumentRegions});
 const {owners,ownerAllows,keywordProtected}=preprocessing;
 for(const m of macros){
  const e=entries.get(m.name);
  if(!['va_arg','offsetof','alignas','alignof','static_assert'].includes(m.name)||m.reference?.kind!=='MACRO_DEFINITION'||!standardOrigin(m.reference,e))continue;
  const ts=sourceIndex.within(m);
  if(ts[0]?.spelling!==m.name||source.slice(ts[0].start,ts[0].end)!==m.name||ts[1]?.spelling!=='('||ts.at(-1)?.spelling!==')')continue;
  const firstIndex=sourceIndex.indexAt(ts[0].start);
  const split=sourceIndex.partition(firstIndex+2,sourceIndex.indexAt(ts.at(-1).start));
  const commas=split.parts.filter(p=>p.separator!==null).map(p=>p.separator-firstIndex);
  if(!split.balanced||commas.length!==(['alignas','alignof'].includes(m.name)?0:1))continue;
  const region=part=>{if(part.length)argumentRegions.push({macro:m,start:part[0].start,end:part.at(-1).end});};
  if(['alignas','alignof'].includes(m.name)){region(ts.slice(2,-1));continue;}
  if(m.name==='static_assert'){region(ts.slice(2,commas[0]));continue;}
  const cut=commas[0],part=m.name==='va_arg'?ts.slice(cut+1,-1):ts.slice(2,cut);
  if(part.length){typeArguments.push({macro:m,start:part[0].start,end:part.at(-1).end});region(part);}
  if(m.name==='va_arg')region(ts.slice(2,cut));
  if(m.name==='offsetof'&&ts.length>cut+2)memberArguments.push({macro:m,start:ts[cut+1].start,end:ts.at(-2).end});
 }
 for(const n of snapshot.nodes){
  const ref=n.reference,entry=entries.get(ref?.name),macro=n.kind==='MACRO_INSTANTIATION';
  if(!entry||!standardOrigin(ref,entry))continue;
  if(macro){if(ref.kind!=='MACRO_DEFINITION')continue;}
  else if(n.kind==='DECL_REF_EXPR'){if(!(['function','macro','constant'].includes(entry.kind)&&['FUNCTION_DECL','VAR_DECL','ENUM_CONSTANT_DECL'].includes(ref.kind)))continue;}
  else if(n.kind==='TYPE_REF'){if(!(entry.kind==='type'&&ref.kind==='TYPEDEF_DECL'||entry.kind==='tag'&&['STRUCT_DECL','UNION_DECL','ENUM_DECL'].includes(ref.kind)))continue;}
  else if(['MEMBER_REF_EXPR','MEMBER_REF'].includes(n.kind)){if(entry.kind!=='member'||ref.kind!=='FIELD_DECL')continue;}
  else continue;
  // Expansion coordinates can point at the outer macro head. Use physical
  // spelling for verified expression arguments, and never emit generated names.
  const physical=n.location.spelling.file===snapshot.file?tokensByStart.get(n.location.spelling.offset):null;
  const insideExpression=!macro&&physical&&owners(physical).length>0&&owners(physical).every(m=>ownerAllows(m,physical));
  const at=macro?n.start:insideExpression?physical.start:n.location.expansion.offset;
  const t=tokensByStart.get(at);
  if(!t||context.isExcluded(t))continue;
  if(owners(t).some(m=>m.id!==n.id&&!ownerAllows(m,t)))continue;
  if(!macro&&n.origin!=='source'&&!insideExpression)continue;
  if(!t||t.spelling!==entry.source||source.slice(t.start,t.end)!==entry.source||done.has(t.start))continue;
  callHeads.push({start:t.start,key:entry.key,source:entry.source,disabled:macro&&assertArgumentModes.get(n.id)==='ignored'});
  done.add(t.start);if(macro){recognizedMacros.add(n.id);if(['bool','noreturn','thread_local','complex','imaginary'].includes(entry.source))specifierStarts.add(t.start);}
  edits.push({start:t.start,end:t.end,text:words[entry.key],binding:{kind:macro?'standard-macro':'standard-reference',name:entry.source},kind:'translation',operation:'replacement',ranges:[{start:t.start,end:t.end}],note:'標準'+(entry.kind==='type'?'型名':macro?'マクロ名':'参照名')+' '+entry.source,order:edits.length});
 }
 const indexedUnconfirmedOrigins=[];
 // Index callbacks expose type-name positions omitted by AST traversal,
 // including generic association types. Bindings, not spelling, decide translation.
 for(const n of snapshot.indexedTypeReferences??[]){
  const r=n.reference,e=entries.get(r?.name),at=n.location.spelling.offset,t=tokensByStart.get(at);
  if(!t||n.location.spelling.file!==snapshot.file||t.spelling!==r.name||source.slice(t.start,t.end)!==r.name||!e)continue;
  if(!(e.kind==='type'&&r.kind==='TYPEDEF_DECL'||e.kind==='tag'&&['STRUCT_DECL','UNION_DECL','ENUM_DECL'].includes(r.kind)))continue;
  if(done.has(t.start)||context.isExcluded(t)||owners(t).some(m=>!ownerAllows(m,t)))continue;
  if(!r.location.spelling.system)continue;
  if(!standardOrigin(r,e)){indexedUnconfirmedOrigins.push(t);continue;}
  done.add(t.start);edits.push({start:t.start,end:t.end,text:words[e.key],kind:'translation',operation:'replacement',ranges:[{start:t.start,end:t.end}],note:'標準'+(e.kind==='type'?'型名':'参照名')+' '+e.source,order:edits.length});
 }
 // Two standard macros have explicit type-name arguments. Only these roles
 // are opened; value arguments and member designators remain untouched.
 const typeWords=new Set('void char short int long float double signed unsigned _Bool _Complex _Imaginary const volatile restrict _Atomic struct union enum'.split(' '));
 const addTypeEdit=(t,value,note)=>{if(done.has(t.start))return;done.add(t.start);edits.push({start:t.start,end:t.end,text:value,kind:'translation',operation:'replacement',ranges:[{start:t.start,end:t.end}],note,order:edits.length});};
 // Type keywords in a C expression (e.g. a cast) retain their physical role.
 // Operators needing a reordered reading still stay raw with an explicit reason.
 for(const t of snapshot.tokens)if(owners(t).length&&owners(t).every(m=>ownerAllows(m,t))&&!typeArguments.some(a=>a.start<=t.start&&t.end<=a.end)&&t.kind==='KEYWORD'&&typeWords.has(t.spelling)&&!keywordProtected(t)&&source.slice(t.start,t.end)===t.spelling&&!done.has(t.start))addTypeEdit(t,words[t.spelling],'標準式マクロの型指定 '+t.spelling);
 for(const a of typeArguments){
  if(!recognizedMacros.has(a.macro.id))continue;
  const usable=t=>t.start>=a.start&&t.end<=a.end&&owners(t).every(m=>ownerAllows(m,t));
  for(const t of snapshot.tokens)if(usable(t)&&t.kind==='KEYWORD'&&typeWords.has(t.spelling)&&!keywordProtected(t)&&source.slice(t.start,t.end)===t.spelling)addTypeEdit(t,words[t.spelling],'標準マクロの型指定 '+t.spelling);
  for(const n of snapshot.nodes){
   const r=n.reference,e=entries.get(r?.name),at=n.location.spelling.offset,t=tokensByStart.get(at);
   if(n.kind!=='TYPE_REF'||!e||!t||!usable(t)||n.location.spelling.file!==snapshot.file||t.spelling!==e.source||source.slice(t.start,t.end)!==e.source||!r.location.spelling.system)continue;
   if(!(e.kind==='type'&&r.kind==='TYPEDEF_DECL'||e.kind==='tag'&&['STRUCT_DECL','UNION_DECL','ENUM_DECL'].includes(r.kind)))continue;
   if(standardOrigin(r,e))addTypeEdit(t,words[e.key],'標準'+(e.kind==='type'?'型名':'参照名')+' '+e.source);
  }
 }
 // offsetof members are bindings acquired from OffsetOfExpr, not names guessed
 // from the designator. Other names or index expressions stay protected here.
 for(const n of snapshot.nodes){
  if(n.kind!=='MEMBER_REF'||n.reference?.kind!=='FIELD_DECL')continue;
  const r=n.reference,e=entries.get(r.name),t=tokensByStart.get(n.location.spelling.offset);
  if(!e||e.kind!=='member'||!standardOrigin(r,e)||!t||n.location.spelling.file!==snapshot.file||t.spelling!==r.name||source.slice(t.start,t.end)!==r.name||done.has(t.start))continue;
  if(context.isExcluded(t))continue;
  const region=memberArguments.find(a=>recognizedMacros.has(a.macro.id)&&a.start<=t.start&&t.end<=a.end);
  if(!region||owners(t).some(m=>m.id!==region.macro.id&&!ownerAllows(m,t)))continue;
  addTypeEdit(t,words[e.key],'標準メンバー '+e.source);
 }
 const namesPlan=createEditPlan('standard-names',edits);
 const generic=planMacroGeneric(source,snapshot,words,{macros,expressionMacros,ownerAllows,directives,entries,existingEdits:namesPlan.edits,sourceIndex,preprocessing});
 const unary=planMacroUnary(source,snapshot,words,{macros,expressionMacros,ownerAllows,directives,existingEdits:resolveEditPlans([namesPlan,generic.plan]).edits,sourceIndex,preprocessing});
 const plans=[namesPlan,generic.plan,unary.plan];
 return {preprocessing,edits:resolveEditPlans(plans).edits,plans,callHeads,recognizedMacros,specifierStarts,macros,assertArgumentModes,genericUnconfirmedTypes:generic.unconfirmedTypes,indexedUnconfirmedOrigins};
}
