import {createDeclarationValidator} from '../reference/dist/declaration-validation.js';
class DeclarationUnavailable extends Error {}
const unavailable=reason=>{throw new DeclarationUnavailable(reason);};
// Project compiler TypeLoc structure onto physical source tokens. No C parser,
// Japanese wording, or reconstruction from semantic type strings lives here.
export function projectDeclarationSyntax(native,nodes,{instanceId,coordinates,physical,view,legacy=false}){
 const syntax=new Map((native.typeSyntax??[]).map(row=>[row.id,row]));
 const byByte=new Map(physical.map(t=>[t.start,t]));
 const byUnit=new Map(physical.map(t=>[coordinates.unitForByte(t.start),t]));
 const baseKinds=new Set(['Builtin','Typedef','Record','Enum','Elaborated','Atomic','Complex']);
 const arrayKinds=new Set(['ConstantArray','IncompleteArray','VariableArray','DependentSizedArray']);
 const declarations=[],validator=createDeclarationValidator(view);
 const declared=new Map((native.declarations??[]).map(d=>[d.id,d]));
 const macroCalls=(native.macros??[]).filter(m=>m.call.expansionInstance===instanceId&&!m.call.macro);
 const nativeNodes=new Map(native.astNodes.map(n=>[n.originalNativeNode??n.id,n]));
 function point(p,expected){
  if(!p?.valid||p.macro||p.expansionInstance!==instanceId||p.spellingInstance!==instanceId||p.expansionByte!==p.spellingByte)unavailable('nonphysical-type-location');
  const t=byByte.get(p.expansionByte),at=coordinates.unitForByte(p.expansionByte);
  if(!t||at===undefined||expected&&!expected.includes(t.text))unavailable('type-token-unavailable');
  return at;
 }
 function shape(root,nameStart,depth=0){
  if(depth>256)unavailable('type-syntax-depth-limit');
  const suffixes=[],visited=new Set();let id=root;
  while(id){
   if(visited.has(id)||visited.size>256)unavailable('type-syntax-cycle-or-depth-limit');visited.add(id);
   const row=syntax.get(id);if(!row)unavailable('type-syntax-missing');
   if(baseKinds.has(row.kind))break;
   if(['FunctionProto','FunctionNoProto'].includes(row.kind)){
    const open=point(row.leftParen,['(']),close=point(row.rightParen,[')']);
    if(legacy&&macroCalls.some(m=>m.call.expansionByte>row.leftParen.expansionByte&&m.call.expansionByte<row.rightParen.expansionByte))unavailable('macro-in-parameter-list');
    const parameters=row.children.filter(c=>c.role==='parameter').sort((a,b)=>a.index-b.index).map(c=>({shape:shape(c.syntax,null,depth+1)}));
    // TypeLoc omits the special (void) parameter and the ellipsis. Preserve the
    // existing hold for a void typedef whose reference was not emitted by Clang.
    const inside=physical.filter(t=>t.start>row.leftParen.expansionByte&&t.start<row.rightParen.expansionByte&&t.kind!=='comment');
    if(row.kind==='FunctionProto'&&!parameters.length&&inside.length&&inside.at(-1).text!=='...'){
     if(inside.length!==1||inside[0].text!=='void')unavailable('void-parameter-reference-unavailable');
     parameters.push({shape:{nameStart:null,suffixes:[]}});
    }
    if(inside.at(-1)?.text==='...')parameters.push({ellipsis:coordinates.unitForByte(inside.at(-1).start)});
    suffixes.push({kind:'function',open,close,parameters});
   }else if(arrayKinds.has(row.kind))suffixes.push({kind:'array',open:point(row.leftBracket,['[','<:']),close:point(row.rightBracket,[']',':>']),parameters:[]});
   else if(row.kind==='Pointer')point(row.star,['*']);
   else if(row.kind==='Paren'){point(row.leftParen,['(']);point(row.rightParen,[')']);}
   else if(row.kind!=='Qualified')unavailable('unsupported-type-syntax-kind:'+row.kind);
   const inner=row.children.filter(c=>c.role==='inner');
   if(inner.length!==1)unavailable('type-syntax-inner-unavailable');id=inner[0].syntax;
  }
  return {nameStart,suffixes};
 }
 for(const node of nodes){
  if(!['VAR_DECL','FUNCTION_DECL','TYPEDEF_DECL','FIELD_DECL','PARM_DECL'].includes(node.kind))continue;
  try{
   const root=node.typeSyntax??(legacy?undefined:declared.get(nativeNodes.get(node.nativeNode)?.symbol?.id)?.typeSyntax);
   if(!syntax.has(root))unavailable('type-syntax-missing');
   const nameStart=node.name?node.location.spelling.offset:null;
   if(node.name&&(nameStart===null||node.origin!=='source'||node.location.spelling.offset!==node.location.expansion.offset))unavailable('declaration-name-unavailable');
   if(node.name&&byUnit.get(nameStart)?.text!==node.name)unavailable('physical-name-spelling');
   const row={node:node.id,status:'available',shape:shape(root,nameStart)};
   const issue=legacy?null:validator.rowIssue(row);if(issue)unavailable(issue);
   declarations.push(row);
  }catch(error){if(!(error instanceof DeclarationUnavailable))throw error;declarations.push({node:node.id,status:'unavailable',reason:error.message});}
 }
 return {version:legacy?1:2,declarations};
}
