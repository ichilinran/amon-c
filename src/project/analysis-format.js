import {createDeclarationValidator} from '../translation/declaration-validation.js';
// The snapshot is data, never executable code. Positions are UTF-16 units.
export function checkAnalysis(data){
 if(data?.format!=='shi-analysis'||data?.profile?.backend!=='libclang')throw new Error('支位解析JSONの形式が正しくありません。');
 return checkViewShape(data);
}
export function checkReadingView(data,{wrapperLength=0}={}){
 if(data?.format!=='shi-reading-view'||data?.profile?.backend!=='clang-cpp')throw new Error('支位表示ビューの形式が正しくありません。');
 return checkViewShape(data,wrapperLength);
}
function checkViewShape(data,wrapperLength=0){
 const fail=()=>{throw new Error('支位解析JSONの形式・位置情報が正しくありません。');};
 if(!data||!['shi-analysis','shi-reading-view'].includes(data.format)||data.version!==1||data.positionEncoding!=='utf-16'||typeof data.source!=='string'||data.source.length>40000+wrapperLength||!/^([a-f0-9]{64})$/.test(data.sha256)||typeof data.valid!=='boolean')fail();
 if(typeof data.filename!=='string'||typeof data.file!=='string'||!['libclang','clang-cpp'].includes(data.profile?.backend)||data.profile.standard!=='c17'||typeof data.profile.version!=='string'||!Array.isArray(data.profile.args)||!data.profile.args.every(x=>typeof x==='string'))fail();
 const span=x=>x&&Number.isInteger(x.start)&&Number.isInteger(x.end)&&x.start>=0&&x.end>=x.start&&x.end<=data.source.length;
 const loc=x=>x&&['spelling','expansion'].every(k=>x[k]&&(x[k].file===null||typeof x[k].file==='string')&&typeof x[k].system==='boolean'&&Number.isInteger(x[k].line)&&Number.isInteger(x[k].column)&&(x[k].offset===null||Number.isInteger(x[k].offset)&&x[k].offset>=0&&x[k].offset<=data.source.length));
 if(data.typeReferenceIndexStatus!==undefined&&!['complete','unavailable'].includes(data.typeReferenceIndexStatus))fail();
 if(data.typeReferenceIndexMessage!==undefined&&(typeof data.typeReferenceIndexMessage!=='string'||data.typeReferenceIndexMessage.length>500))fail();
 if(data.typeReferenceIndexStatus==='unavailable'&&data.indexedTypeReferences?.length)fail();
 if(data.indexedTypeReferences!==undefined){
  if(!Array.isArray(data.indexedTypeReferences)||data.indexedTypeReferences.length>60000)fail();
  for(const n of data.indexedTypeReferences){
   const r=n?.reference;if(!n||!loc(n.location)||!r||!['TYPEDEF_DECL','STRUCT_DECL','UNION_DECL','ENUM_DECL'].includes(r.kind)||typeof r.name!=='string'||typeof r.usr!=='string'||!loc(r.location))fail();
   if(r.standardHeaders!==undefined&&(!Array.isArray(r.standardHeaders)||r.standardHeaders.length>29||!r.standardHeaders.every(s=>typeof s==='string'&&s.length<=30)))fail();
  }
 }
 if(data.keywordMacroUses!==undefined&&(!Array.isArray(data.keywordMacroUses)||data.keywordMacroUses.length>60000||!data.keywordMacroUses.every(m=>span(m)&&typeof m.name==='string'&&Number.isInteger(m.definitionId)&&m.definitionId>0&&data.source.slice(m.start,m.end)===m.name)))fail();
 if(data.keywordMacroNames!==undefined&&(!Array.isArray(data.keywordMacroNames)||data.keywordMacroNames.length>100||!data.keywordMacroNames.every(s=>typeof s==='string'&&s.length<=100)))fail();
 for(const k of ['tokens','nodes','scopes','skipped','diagnostics'])if(!Array.isArray(data[k])||data[k].length>60000)fail();
 let end=0;
 for(const t of data.tokens){if(!span(t)||t.start<end||typeof t.spelling!=='string'||!['COMMENT','IDENTIFIER','LITERAL','PUNCTUATION','KEYWORD'].includes(t.kind))fail();end=t.end;}
 const shape=(t,depth=0)=>{if(!t||depth>24||typeof t.kind!=='string'||typeof t.spelling!=='string'||!['const','volatile','restrict'].every(k=>typeof t[k]==='boolean'))fail();for(const k of ['pointee','element','result','value','canonical','named'])if(t[k])shape(t[k],depth+1);if(t.arguments){if(!Array.isArray(t.arguments)||t.arguments.length>4000)fail();t.arguments.forEach(a=>shape(a,depth+1));}};
 for(const [i,n] of data.nodes.entries()){
  if(!span(n)||n.id!==i||(n.parent!==null&&(!Number.isInteger(n.parent)||n.parent<0||n.parent>=i))||typeof n.kind!=='string'||typeof n.name!=='string'||!loc(n.location)||!['ordinary','tag','member','label'].includes(n.namespace)||!['source','macro'].includes(n.origin)||!['preprocessing','type-reference','reference','declaration','expression','statement','other'].includes(n.role))fail();
  if(n.scope!==null&&(!Number.isInteger(n.scope)||!data.scopes[n.scope]))fail();
  if(n.reference&&(typeof n.reference.kind!=='string'||typeof n.reference.name!=='string'||!loc(n.reference.location)))fail();
  if(n.reference?.sdkOrigin!==undefined&&typeof n.reference.sdkOrigin!=='boolean')fail();
  if(n.reference?.standardHeaders!==undefined&&(!Array.isArray(n.reference.standardHeaders)||n.reference.standardHeaders.length>29||!n.reference.standardHeaders.every(s=>typeof s==='string'&&s.length<=30)))fail();
  if(n.assertIgnored!==undefined&&typeof n.assertIgnored!=='boolean')fail();
  if(n.builtinMacro!==undefined&&typeof n.builtinMacro!=='boolean')fail();
  if(n.forParts!==undefined&&(n.kind!=='FOR_STMT'||!n.forParts||Object.keys(n.forParts).length!==3||!['initial','condition','update'].every(k=>typeof n.forParts[k]==='boolean')))fail();
  if(n.includedFile!==undefined&&(typeof n.includedFile!=='string'||typeof n.includedSystem!=='boolean'))fail();
  shape(n.type);
 }
 for(const [i,s] of data.scopes.entries())if(!span(s)||s.id!==i||(s.parent!==null&&(!Number.isInteger(s.parent)||s.parent<0||s.parent>=i))||!data.nodes[s.owner])fail();
 for(const s of data.skipped)if(!span(s))fail();
 for(const d of data.diagnostics)if(!Number.isInteger(d.severity)||d.severity<0||d.severity>4||typeof d.message!=='string'||!loc(d.location))fail();
 if(data.valid!==!data.diagnostics.some(d=>d.severity>=3))fail();
 if(data.declarationSyntax!==undefined)checkDeclarationSyntax(data,fail);
 return data;
}
function checkDeclarationSyntax(data,fail){
 if(createDeclarationValidator(data).tableIssue(data.declarationSyntax))fail();
}
export async function verifyAnalysis(data){
 checkAnalysis(data);
 return verifyViewHash(data);
}
export async function verifyReadingView(data){
 checkReadingView(data);
 return verifyViewHash(data);
}
async function verifyViewHash(data){
 const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(data.source));
 const hex=Array.from(new Uint8Array(digest),x=>x.toString(16).padStart(2,'0')).join('');
 if(hex!==data.sha256)throw new Error('解析結果の原文と確認用ハッシュが一致しません。再解析してください。');
 return data;
}
export {applyReadingEdits,originalReading} from '../translation/edit-plan.js';
