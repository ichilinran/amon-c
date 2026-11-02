import {createSourceIndex} from './source-index.js';
const kinds=new Set(['VAR_DECL','FUNCTION_DECL','TYPEDEF_DECL','FIELD_DECL','PARM_DECL']);
// Shared applicability/geometry contract for generated and imported declarations.
// This is not a proof of compiler provenance or completeness; saved v2 derived
// data must additionally be compared with a projection of its native report.
export function createDeclarationValidator(view){
 const index=createSourceIndex(view.source,view.tokens,{normalizeDigraphs:true}),tokens=index.byStart;
 const offset=at=>Number.isInteger(at)&&tokens.has(at);
 function inspect(row,legacy=false){
  let count=0;
  const n=view.nodes[row?.node];
  if(!Number.isInteger(row?.node)||!n||!kinds.has(n.kind)||!['available','unavailable'].includes(row.status))return {issue:'declaration-owner-unavailable',count};
  if(row.status==='unavailable')return {issue:typeof row.reason==='string'&&row.reason.length>0&&row.reason.length<=200&&row.shape===undefined?null:'invalid-unavailable-record',count};
  if(!legacy&&n.kind==='FUNCTION_DECL'&&n.hasWrittenPrototype===false&&view.nodes.some(c=>c.parent===n.id&&c.kind==='COMPOUND_STMT'))return {issue:'old-style-definition',count};
  if(row.shape?.nameStart!==(n.name?n.location.spelling.offset:null)||n.name&&(n.origin!=='source'||n.location.spelling.offset!==n.location.expansion.offset||tokens.get(row.shape.nameStart)?.spelling!==n.name))return {issue:'declaration-name-unavailable',count};
  function shape(value,start,end,depth=0){
   if(!value||depth>256||++count>60000||!(value.nameStart===null||offset(value.nameStart)&&value.nameStart>=start&&value.nameStart<end)||!Array.isArray(value.suffixes)||value.suffixes.length>60000)return 'invalid-shape-range';
   const opens=new Set();
   for(const s of value.suffixes){
    if(!s||!['function','array'].includes(s.kind)||!offset(s.open)||!offset(s.close)||s.open<start||s.close>=end||s.close<=s.open||opens.has(s.open)||index.pairTokens.get(s.open)?.start!==s.close||tokens.get(s.open).spelling!==(s.kind==='function'?'(':'[')||!Array.isArray(s.parameters)||s.parameters.length>60000||s.kind==='array'&&s.parameters.length)return 'declarator-delimiter-or-range';
    opens.add(s.open);
    if(!legacy&&index.significant.some(t=>t.start>s.open&&t.start<s.close&&['#','%:','??='].includes(t.spelling)))return 'preprocessing-in-declarator';
    if(!legacy&&s.kind==='function'&&view.nodes.some(m=>m.kind==='MACRO_INSTANTIATION'&&m.start>s.open&&m.start<s.close))return 'macro-in-parameter-list';
    for(const p of s.parameters){
     if(p?.ellipsis!==undefined){if(++count>60000||!offset(p.ellipsis)||p.ellipsis<=s.open||p.ellipsis>=s.close||tokens.get(p.ellipsis).spelling!=='...'||p.shape!==undefined)return 'invalid-ellipsis-range';}
     else{const issue=shape(p?.shape,tokens.get(s.open).end,s.close,depth+1);if(issue)return issue;}
    }
   }
   return null;
  }
  const issue=shape(row.shape,n.start,n.end);return {issue,count};
 }
 return {
  rowIssue:row=>inspect(row).issue,
  tableIssue(info){
   if(![1,2].includes(info?.version)||!Array.isArray(info.declarations)||info.declarations.length>60000)return 'invalid-declaration-table';
   const seen=new Set();let total=0;
   for(const row of info.declarations){if(seen.has(row?.node))return 'duplicate-declaration';seen.add(row?.node);const result=inspect(row,info.version===1);if(result.issue)return result.issue;total+=result.count;if(total>60000)return 'declaration-budget';}
   return null;
  }
 };
}
