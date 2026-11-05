import {createEditPlan,reviseEdit,isStandardMacroEdit} from './edit-plan.js';
import {createSourceIndex,rangesOverlap} from './source-index.js';
import {createPreprocessingContext} from './preprocessing-context.js';
// Expanded AST extents often collapse to the macro head. Only a verified
// operator at its physical spelling position is moved. A bounded C unary /
// postfix reader finds its physical operand; cast roles come from Clang.
export function planMacroUnary(source,snapshot,words,{macros,expressionMacros,ownerAllows=(m,t)=>expressionMacros.has(m.id),directives,existingEdits,sourceIndex=createSourceIndex(source,snapshot.tokens),preprocessing=createPreprocessingContext(snapshot,directives).forMacros(macros,{expressionMacros})}){
 const tokens=sourceIndex.significant,pairs=sourceIndex.pairs;
 const verified=new Set(snapshot.nodes.filter(n=>n.kind==='CXX_UNARY_EXPR'&&n.location.spelling.file===snapshot.file).map(n=>n.location.spelling.offset));
 const safeAliases=new Set(existingEdits.filter(e=>isStandardMacroEdit(e,'alignof')&&verified.has(e.start)).map(e=>e.start));
 const casts=new Set(snapshot.nodes.filter(n=>n.kind==='CSTYLE_CAST_EXPR'&&n.location.spelling.file===snapshot.file).map(n=>n.location.spelling.offset));
 const edits=[],revisions=[];
 const group=i=>pairs.get(i)===undefined?null:pairs.get(i)+1;
 function postfix(j){
  while(j!==null&&j<tokens.length){
   const op=tokens[j].spelling;
   if(['(','[','<:'].includes(op)){j=group(j);continue;}
   if(['{','<%'].includes(op)&&tokens[j-1]?.spelling===')'){j=group(j);continue;}
   if(['.','->'].includes(op)){if(tokens[j+1]?.kind!=='IDENTIFIER')return null;j+=2;continue;}
   if(['++','--'].includes(op)){j++;continue;}
   break;
  }
  return j;
 }
 function cast(i,depth){
  if(depth>128||!tokens[i])return null;
  if(tokens[i].spelling==='('&&casts.has(tokens[i].start)){
   const j=group(i);return j===null?null:cast(j,depth+1);
  }
  return unary(i,depth+1);
 }
 function unary(i,depth=0){
  if(depth>128||!tokens[i])return null;
  const t=tokens[i],op=t.spelling;
  if(['++','--'].includes(op))return unary(i+1,depth+1);
  if(['*','&','+','-','!','~'].includes(op))return cast(i+1,depth+1);
  if(['sizeof','_Alignof','alignof'].includes(op)&&verified.has(t.start)){
   if(tokens[i+1]?.spelling==='('){const j=group(i+1);return op==='sizeof'?postfix(j):j;}
   return op==='sizeof'?unary(i+1,depth+1):null;
  }
  if(op==='(')return postfix(group(i));
  if(op==='_Generic'&&tokens[i+1]?.spelling==='(')return postfix(group(i+1));
  if(t.kind==='IDENTIFIER')return postfix(i+1);
  if(t.kind==='LITERAL'){
   let j=i+1;const string=t.spelling.includes('"');
   if(string)while(tokens[j]?.kind==='LITERAL'&&tokens[j].spelling.includes('"'))j++;
   return postfix(j);
  }
  return null;
 }
 const intersects=rangesOverlap;
 for(const [i,t] of tokens.entries()){
  const aliasEdit=t.spelling==='alignof'?existingEdits.find(e=>e.start===t.start&&e.end===t.end&&isStandardMacroEdit(e,'alignof')):null;
  if(!(t.kind==='KEYWORD'&&['sizeof','_Alignof'].includes(t.spelling)||aliasEdit)||source.slice(t.start,t.end)!==t.spelling||!verified.has(t.start))continue;
  const owners=preprocessing.owners(t).filter(m=>!(aliasEdit&&m.start===t.start&&m.name==='alignof'));
  if(!owners.length||owners.some(m=>!ownerAllows(m,t)))continue;
  const open=tokens[i+1],end=unary(i),close=end===null?null:tokens[end-1];
  if(!open||!close||end<=i+1||['IDENTIFIER','KEYWORD','LITERAL'].includes(tokens[end]?.kind))continue;
  const span={start:t.start,end:close.end};
  if(tokens.slice(i,end).some(p=>source.slice(p.start,p.end)!==p.spelling))continue;
  const parenthesized=open.spelling==='('&&pairs.get(i+1)===end-1;

  if(owners.some(m=>close.end>m.end||!ownerAllows(m,close))||preprocessing.isExcluded(span))continue;
  if(macros.some(m=>!owners.some(o=>o.id===m.id)&&!(aliasEdit&&m.start===t.start&&m.name==='alignof')&&intersects(span,m)&&!expressionMacros.has(m.id)&&!(m.name==='alignof'&&safeAliases.has(m.start))))continue;
  if(macros.some(m=>m.start===tokens[end]?.start))continue;
  // A continuation can belong to a generated macro token. Requiring physical
  // delimiters and rejecting postfixes avoids ending sizeof before its operand.
  const value=aliasEdit?.text??words[t.spelling];
  if(aliasEdit)revisions.push(reviseEdit(aliasEdit,{text:'',kind:'removed',ranges:[]}));
  else edits.push({start:t.start,end:t.end,text:'',kind:'removed',operation:'replacement',ranges:[],note:'標準マクロ内の'+t.spelling+'を移動',order:edits.length});
  if(open.start>t.end&&/^[ \t]+$/.test(source.slice(t.end,open.start)))edits.push({start:t.end,end:open.start,text:'',kind:'layout',operation:'replacement',ranges:[],note:'表示用の空白',order:edits.length});
  const operandRange={start:open.start,end:close.end};
  if(!parenthesized){
   edits.push({start:open.start,end:open.start,text:'(',kind:'translation',operation:'layout',ranges:[operandRange],note:'対象をまとめる表示用の括弧',order:-i*2});
   edits.push({start:close.end,end:close.end,text:')',kind:'translation',operation:'layout',ranges:[operandRange],note:'対象をまとめる表示用の括弧',order:-i*2});
  }
  const gap=close.end<source.length&&/[\p{L}\p{N}_]/u.test(source[close.end])?' ':'';
  edits.push({start:close.end,end:close.end,text:value+gap,kind:'translation',operation:'move',ranges:[{start:t.start,end:t.end}],note:aliasEdit?'標準マクロ名 alignof':'標準マクロ内の'+t.spelling+'：対象の後へ移動',order:-i*2+1});
 }
 const plan=createEditPlan('macro-unary',edits,revisions);
 return {edits:plan.edits,plan};
}
