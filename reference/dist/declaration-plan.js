import {createCompatibilityDeclarator} from './declaration-compat.js';
import {createSourceIndex} from './source-index.js';
// Group original declarations for layout; compiler TypeLoc supplies declarator structure.
// Never infer a typedef by spelling or regenerate declarations from type strings.
const specifiers=new Set('typedef extern static _Thread_local auto register inline _Noreturn void char short int long float double signed unsigned _Bool _Complex _Imaginary const volatile restrict _Atomic'.split(' '));
export function planDeclarations(source,snapshot,pairs,{specifierStarts=new Set(),sourceIndex=createSourceIndex(source,snapshot.tokens)}={}){
 const tokens=sourceIndex.significant,nodes=snapshot.nodes;
 const index=sourceIndex.indices;
 const typeRefs=new Set(nodes.filter(n=>n.kind==='TYPE_REF').map(n=>n.start));
 const errors=[],groups=[],functions=[],routes=[];
 const compilerShapes=new Map((snapshot.declarationSyntax?.declarations??[]).map(row=>[row.node,row]));
 const oldStyleHeaders=new Map(),oldStyleParameters=new Set();
 for(const n of nodes.filter(n=>n.kind==='FUNCTION_DECL'&&n.hasWrittenPrototype===false)){
  const body=nodes.find(c=>c.parent===n.id&&c.kind==='COMPOUND_STMT');if(!body)continue;
  const params=nodes.filter(c=>c.parent===n.id&&c.kind==='PARM_DECL');
  const nameIndex=tokens.findIndex(t=>t.start===n.location.expansion.offset),open=tokens[nameIndex+1],close=open&&pairs.get(open.start);
  if(open?.spelling!=='('||!close)continue;
  const declared=params.filter(p=>p.start>=close.end&&p.end<=body.start);
  if(declared.length){oldStyleHeaders.set(n.id,Math.min(...declared.map(p=>p.start)));for(const p of declared)oldStyleParameters.add(p.id);}
 }
 const afterPair=i=>{const end=pairs.get(tokens[i]?.start);return end?index.get(end.start)+1:null;};
 function prefix(start,end){
  let i=start,hasDefinition=false;
  while(i<end){const t=tokens[i],s=t.spelling;
   if(s==='_Alignas'||s==='_Atomic'&&tokens[i+1]?.spelling==='('){const j=afterPair(i+1);if(j==null||j>end)return null;i=j;continue;}
   if(['struct','union','enum'].includes(s)){i++;if(tokens[i]?.kind==='IDENTIFIER')i++;if(['{','<%'].includes(tokens[i]?.spelling)){const j=afterPair(i);if(j==null||j>end)return null;i=j;hasDefinition=true;}continue;}
   if(specifiers.has(s)||typeRefs.has(t.start)||specifierStarts.has(t.start)){i++;continue;}
   break;
  }
  return {end:i,hasDefinition};
 }
 function parts(start,end,separator=','){
  const split=sourceIndex.partition(start,end,separator);
  if(!split.balanced)throw new Error('括弧の区間が不明');
  return split.parts;
 }
 const declarator=createCompatibilityDeclarator({tokens,typeRefs,oldStyleHeaders,nodes,parts,prefix,afterPair});
 // This path consumes TypeLoc structure; it does not recognize declarator grammar.
 function compilerDeclarator(shape,start,end){
  const name=shape.nameStart===null?null:tokens[index.get(shape.nameStart)];
  if(name&&(index.get(name.start)<start||index.get(name.start)>=end))throw Error('取得した宣言名が区間外です');
  const suffixes=shape.suffixes.map(s=>{
   const open=tokens[index.get(s.open)],close=tokens[index.get(s.close)];
   if(!open||!close||index.get(open.start)<start||index.get(close.start)>=end||pairs.get(open.start)?.start!==close.start)throw Error('取得した宣言の括弧が区間外です');
   return {kind:s.kind,open,close,parameters:s.parameters.map(p=>p.ellipsis!==undefined?{ellipsis:tokens[index.get(p.ellipsis)]}:{declarator:compilerDeclarator(p.shape,index.get(open.start)+1,index.get(close.start))})};
  });
  return {name,suffixes,start,end};
 }
 const candidates=new Set('VAR_DECL TYPEDEF_DECL FUNCTION_DECL FIELD_DECL STRUCT_DECL UNION_DECL ENUM_DECL'.split(' '));
 const maps=new Map();
 function ownDeclaration(n){
  if(oldStyleParameters.has(n.id))return true;
  const parent=nodes[n.parent];
  if(['STRUCT_DECL','UNION_DECL','ENUM_DECL'].includes(n.kind)&&parent?.role==='expression')return false;
  if(parent&&['VAR_DECL','TYPEDEF_DECL','PARM_DECL','FUNCTION_DECL','FIELD_DECL'].includes(parent.kind))return false;
  // Local variables live under DECL_STMT; fields and anonymous member types
  // under their record; tags and file declarations can share one semicolon.
  if(n.kind==='FUNCTION_DECL'&&nodes.some(c=>c.parent===n.id&&c.kind==='COMPOUND_STMT'))return false;
  return true;
 }
 function closingSemi(n){
  let i=tokens.findIndex(t=>t.start>=n.end);if(i<0)return null;
  if(tokens[i-1]?.spelling===';'&&tokens[i-1].end===n.end)return tokens[i-1];
  for(;i<tokens.length;i++){
   const s=tokens[i].spelling;if(s===';')return tokens[i];
   if(['}','%>'].includes(s))return null;
   if(['(','[','{','<%'].includes(s)){const j=afterPair(i);if(j==null)return null;i=j-1;}
  }
  return null;
 }
 for(const n of nodes)if((candidates.has(n.kind)||oldStyleParameters.has(n.id))&&ownDeclaration(n)){
  const semi=closingSemi(n);if(!semi)continue;
  const key=`${n.parent}:${semi.start}`;if(!maps.has(key))maps.set(key,{start:n.start,end:semi.end,semi,nodes:[]});
  const g=maps.get(key);g.start=Math.min(g.start,n.start);g.nodes.push(n);
 }
 function plan(start,end,owner){
  const p=prefix(start,end);if(!p||p.end===start)throw new Error('共通の型指定子を確認できません');
  const declarations=[];
  for(const part of parts(p.end,end)){
   // Limit declarators to the prefix before an initializer or bit-field width.
   let stop=part.end;
   for(let i=part.start;i<part.end;i++){
    if(['(','[','{','<%'].includes(tokens[i].spelling)){i=afterPair(i)-1;continue;}
    if(['=',':'].includes(tokens[i].spelling)){stop=i;break;}
   }
   const owners=owner.nodes.filter(n=>n.name&&n.location.expansion.offset>=tokens[part.start]?.start&&n.location.expansion.offset<(tokens[stop]?.start??source.length));
   const row=owners.length===1?compilerShapes.get(owners[0].id):null;
   let d;
   if(row?.status==='available'&&!oldStyleHeaders.has(owners[0].id)){
    d=compilerDeclarator(row.shape,part.start,stop);routes.push({start:tokens[part.start]?.start,end:tokens[stop]?.start??source.length,backend:'clang-type-syntax'});
   }else{
    const reason=oldStyleHeaders.has(owners[0]?.id)?'old-style-definition':row?.reason??(snapshot.declarationSyntax?'declaration-owner-unavailable':'legacy-view-without-type-syntax');
    routes.push({start:tokens[part.start]?.start,end:tokens[stop]?.start??source.length,backend:'source-compatibility',reason});d=declarator(part.start,stop);
   }
   if(d.end!==stop)throw new Error('宣言子の残りが未対応');
   declarations.push({...part,declarator:d,startOffset:tokens[part.start]?.start??tokens[p.end-1].end});
  }
  return {...owner,prefixStart:tokens[start].start,prefixEnd:tokens[p.end-1].end,prefixTokens:tokens.slice(start,p.end),hasDefinition:p.hasDefinition,declarations};
 }
 const physical=new Map();for(const g of maps.values()){const key=`${g.start}:${g.end}`;if(!physical.has(key))physical.set(key,g);else physical.get(key).nodes.push(...g.nodes);}
 for(const g of physical.values())try{
  const start=index.get(g.start),end=index.get(g.semi.start);if(start==null||end==null)throw new Error('原文トークン境界を確認できません');
  groups.push(plan(start,end,g));
 }catch(error){errors.push({start:g.start,end:g.end,message:error.message});groups.push({...g,declarations:[],unresolved:true});}
 // Definitions do not end in a declaration semicolon: inspect their signature
 // up to the body, using its original token boundary.
 for(const n of nodes.filter(n=>n.kind==='FUNCTION_DECL')){
  const body=nodes.find(c=>c.parent===n.id&&c.kind==='COMPOUND_STMT');if(!body)continue;
  try{const start=index.get(n.start),end=index.get(oldStyleHeaders.get(n.id)??body.start);if(start==null||end==null)throw new Error('関数の境界が未対応');functions.push(plan(start,end,{start:n.start,end:body.start,nodes:[n],definition:n,body}));}
  catch(error){errors.push({start:n.start,end:body.start,message:error.message});}
 }
 return {groups,functions,errors,tokens,routes};
}
