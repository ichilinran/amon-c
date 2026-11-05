import {sha256} from '../shared/hash.js';
import {ExpandedViewLimitError} from '../runtime/limits.js';
import {createSourceCoordinates} from '../translation/source-coordinates.js';
import {projectDeclarationSyntax} from './declaration-syntax.js';
import {projectLiteralNames} from './literal-facts.js';
// Browser-safe projection of Clang facts. No C parsing, host paths, or I/O here.
const encoder = new TextEncoder();
const headers = new Set('assert complex ctype errno fenv float inttypes iso646 limits locale math setjmp signal stdalign stdarg stdatomic stdbool stddef stdint stdio stdlib stdnoreturn string tgmath threads time uchar wchar wctype'.split(' ').map(s => s + '.h'));
const keywords = new Set('auto break case char const continue default do double else enum extern float for goto if inline int long register restrict return short signed sizeof static struct switch typedef union unsigned void volatile while _Alignas _Alignof _Atomic _Bool _Complex _Generic _Imaginary _Noreturn _Static_assert _Thread_local'.split(' '));
const kinds = {MemberExpr:'MEMBER_REF_EXPR',OffsetOfMember:'MEMBER_REF',OffsetOfExpr:'UNEXPOSED_EXPR',CompoundAssignOperator:'COMPOUND_ASSIGNMENT_OPERATOR',AtomicExpr:'UNEXPOSED_EXPR',Function:'FUNCTION_DECL',Var:'VAR_DECL',ParmVar:'PARM_DECL',Field:'FIELD_DECL',Typedef:'TYPEDEF_DECL',Enum:'ENUM_DECL',EnumConstant:'ENUM_CONSTANT_DECL',StaticAssert:'STATIC_ASSERT',TypeReference:'TYPE_REF',UnaryExprOrTypeTraitExpr:'CXX_UNARY_EXPR',ImplicitCastExpr:'UNEXPOSED_EXPR',PredefinedExpr:'STRING_LITERAL',CStyleCastExpr:'CSTYLE_CAST_EXPR'};
const kind = row => row.kind === 'Record' ? (row.union ? 'UNION_DECL' : 'STRUCT_DECL') : kinds[row.kind] ?? row.kind.replace(/(?!^)([A-Z])/g,'_$1').toUpperCase();
const tokenKind = t => t.kind === 'comment' ? 'COMMENT' : ['identifier','raw_identifier'].includes(t.kind) ? 'IDENTIFIER' : keywords.has(t.kind) ? 'KEYWORD' : t.kind.includes('literal') || t.kind === 'numeric_constant' ? 'LITERAL' : 'PUNCTUATION';
const basename = path => path.split('/').at(-1);

// SDK roots are supplied by the runtime, never inferred from a header's name.
function normalizedPath(path) {
  const parts=[];
  for(const part of path.split('/')) {
    if(part==='..') parts.pop();
    else if(part && part!=='.') parts.push(part);
  }
  return '/' + parts.join('/');
}
export function sdkPolicy(roots) {
  const normalized = roots.map(normalizedPath);
  return path => typeof path === 'string' && path.startsWith('/') && normalized.some(root => normalizedPath(path) === root || normalizedPath(path).startsWith(root + '/'));
}

export async function physicalView(native, instanceId, source, {flags=[],diagnostics='',isSdkPath,declarationSyntaxVersion=2}) {
  if(typeof isSdkPath !== 'function') throw new Error('Explicit SDK provenance policy required');
  const instances = new Map(native.fileInstances.map(i => [i.id,i]));
  const instance = instances.get(instanceId);
  if(!instance) throw new Error('Unknown file instance');
  const path=instance.file, raw=encoder.encode(source),coordinates=createSourceCoordinates(source);
  const boundaries={get:coordinates.unitForByte,has:byte=>coordinates.unitForByte(byte)!==undefined};
  const pos=byte=>{const unit=coordinates.unitForByte(byte);if(unit===undefined)throw new Error('Position is not a UTF-8 boundary');return unit;};
  const side = (p,s) => {
    const b=p[s+'Instance']===instanceId ? p[s+'Byte'] : null;
    const offset=coordinates.unitForByte(b) ?? null;
    const at=offset===null?{line:p.presumedLine??0,column:0}:coordinates.lineColumn(offset);
    return {file:p[s+'File']??null,offset,system:!!(p[s+'System'] || s==='spelling' && p.system),...at};
  };
  const location = p => ({spelling:side(p,'spelling'),expansion:side(p,'expansion')});
  const owners = p => {
    if(!isSdkPath(p.system ? p.expansionFile : p.spellingFile)) return [];
    const result=new Set(), seen=new Set();let at=p.system ? p.expansionInstance : p.spellingInstance;
    while(at && !seen.has(at)) {seen.add(at);const row=instances.get(at);if(!row)break;const name=basename(row.file);if(row.systemHeader && isSdkPath(row.file) && headers.has(name))result.add(name);at=row.parent;}
    return [...result].sort();
  };
  const reference = r => {
    const out={kind:kind(r),name:r.name,usr:r.usr??'',location:location(r.location),sdkOrigin:!!(r.location.system && isSdkPath(r.location.expansionFile))};
    if('id' in r)out.symbolId=r.id;
    if(out.location.spelling.system)out.standardHeaders=owners(r.location);
    return out;
  };
  const physical=native.originalTokens.filter(t=>t.instance===instanceId),byStart=new Map(physical.map(t=>[t.start,t]));
  const span = r => {
    const a=r.begin,z=r.afterLast;
    if(a.expansionInstance!==instanceId)return null;
    const start=a.expansionByte;let end=z.expansionInstance===instanceId ? z.expansionByte??null : null;
    if(end===null || end<start)end=r.last.expansionInstance===instanceId ? byStart.get(r.last.expansionByte)?.end??null : null;
    return boundaries.has(start) && boundaries.has(end) && end>=start ? {start:pos(start),end:pos(end)} : null;
  };
  const nodes=[],scopes=[],nodeIds=new Map(),scopeIds=new Map();
  const base = (k,name,loc,extent,parent=null,scope=null,role='preprocessing') => ({id:nodes.length,parent,scope,kind:k,name,...extent,location:location(loc),type:{kind:'UNAVAILABLE',spelling:'',const:false,volatile:false,restrict:false},namespace:['STRUCT_DECL','UNION_DECL','ENUM_DECL'].includes(k)?'tag':['FIELD_DECL','MEMBER_REF_EXPR','MEMBER_REF'].includes(k)?'member':['GOTO_STMT','LABEL_STMT'].includes(k)?'label':'ordinary',usr:'',origin:loc.macro?'macro':'source',role});
  const definitions=new Map(native.definitions.map(d=>[d.id,d]));
  for(const m of native.macros) {
    const p=m.call,t=byStart.get(m.end.expansionByte);
    if(p.expansionInstance!==instanceId || p.macro || !boundaries.has(p.expansionByte) || !t)continue;
    const d=definitions.get(m.definitionID),n=base('MACRO_INSTANTIATION',m.name,p,{start:pos(p.expansionByte),end:pos(t.end)});
    n.reference={...reference({kind:'MACRO_DEFINITION',name:m.name,location:d.location}),kind:'MACRO_DEFINITION'};
    n.builtinMacro=!!(d.builtin || d.location.presumedFile==='<built-in>' && !(instances.get(d.location.spellingInstance)?.physicalFile??true));n.origin='source';
    if(m.name==='assert' && d.parameters.length===1)n.assertIgnored=!d.replacement.some(t=>t.text===d.parameters[0]);
    nodes.push(n);
  }
  for(const inc of native.includes) {
    const p=inc.location;if(p.expansionInstance!==instanceId)continue;
    let end=raw.indexOf(10,p.expansionByte);if(end<0)end=raw.length;
    const n=base('INCLUSION_DIRECTIVE',inc.written,p,{start:pos(p.expansionByte),end:pos(end)});
    n.includedFile=inc.resolved;n.includedSystem=[...instances.values()].some(i=>i.file===inc.resolved && i.systemHeader && isSdkPath(i.file));nodes.push(n);
  }
  for(const row of native.astNodes) {
    const parent=nodeIds.get(row.parent)??null;let scope=scopeIds.get(row.parent)??null;
    const extent=span(row.range);
    if(!extent || row.implicit) {nodeIds.set(row.id,parent);scopeIds.set(row.id,scope);continue;}
    const k=kind(row),n=base(k,row.name??'',row.location,extent,parent,scope,row.category);
    if(row.reference) {n.reference=reference(row.reference);if(k==='TYPE_REF' && ['STRUCT_DECL','UNION_DECL','ENUM_DECL'].includes(n.reference.kind))n.namespace='tag';}
    for(const key of ['semanticType','typeSyntax','hasWrittenPrototype'])if(key in row)n[key]=row[key];
    if(k==='FOR_STMT') {const roles=new Map((row.childRoles??[]).map(r=>[r.role,r]));if(['initial','condition','update'].every(key=>roles.has(key)))n.forParts=Object.fromEntries(['initial','condition','update'].map(key=>[key,!roles.get(key).absent]));}
    n.nativeNode=row.originalNativeNode??row.id;nodeIds.set(row.id,n.id);nodes.push(n);
    if(['FUNCTION_DECL','COMPOUND_STMT','FOR_STMT'].includes(k)) {scope=scopes.length;scopes.push({id:scope,parent:n.scope,owner:n.id,...extent});}
    scopeIds.set(row.id,scope);
  }
  let ds=(native.diagnostics??[]).map(d=>({severity:d.severity,message:d.message,location:location(d.location),category:d.message.includes('file not found')?'missing-input':'compiler-diagnostic'}));
  if(!native.valid && !ds.some(d=>d.severity>=3))ds=[{severity:3,message:diagnostics.trim()||'Cの解析でエラーが発生しました。',location:location({}),category:'compiler-diagnostic'}];
  const digest=await sha256(raw);
  const keywordMacroNames=[...new Set(native.definitions.filter(d=>keywords.has(d.name)).map(d=>d.name))].sort();
  // MacroExpands records the definition actually used at this occurrence.
  // A later definition, another include instance, or an inactive definition
  // cannot protect an earlier physical token. No textual PP simulation here.
  const keywordMacroUses=native.macros.flatMap(m=>{
    if(!keywords.has(m.name)||m.call.spellingInstance!==instanceId)return [];
    const t=byStart.get(m.call.spellingByte);
    return t?.text===m.name?[{name:m.name,start:pos(t.start),end:pos(t.end),definitionId:m.definitionID}]:[];
  });
  const tokens=physical.map(t=>({kind:tokenKind(t),spelling:t.text,start:pos(t.start),end:pos(t.end)}));
  const declarationSyntax=projectDeclarationSyntax(native,nodes,{instanceId,coordinates,physical,view:{source,nodes,tokens},legacy:declarationSyntaxVersion===1});
  return {format:'shi-reading-view',version:1,positionEncoding:'utf-16',source,filename:basename(path),file:path,sha256:digest,profile:{backend:'clang-cpp',version:native.compiler,standard:'c17',args:flags},valid:native.valid,tokens,nodes:projectLiteralNames(native,nodes),scopes,skipped:(native.skipped??[]).map(span).filter(Boolean),diagnostics:ds,keywordMacroNames,...(keywordMacroNames.length?{keywordMacroUses}:{}),typeReferenceIndexStatus:'complete',indexedTypeReferences:[],instance:instanceId,declarationSyntax};
}

export async function expandedView(native, options) {
  if(Number.isFinite(options.maxCharacters)) {
    let characters=0;
    for(const t of native.tokens) {
      characters+=t.text.length+1; // Every generated separator is one UTF-16 unit.
      if(characters>options.maxCharacters)throw new ExpandedViewLimitError();
    }
  }
  const id=Math.max(...native.fileInstances.map(i=>i.id))+1,path='shi-expanded://translation-unit';
  const pieces=[],original=[],origins=[],positions=new Map();let cursor=0,parens=0;
  native.tokens.forEach((t,index)=>{
    const start=cursor,end=start+encoder.encode(t.text).length;
    original.push({instance:id,start,end,text:t.text,kind:t.kind});
    if(!positions.has(t.location.rawEncoding))positions.set(t.location.rawEncoding,[]);positions.get(t.location.rawEncoding).push([start,end]);
    origins.push({token:index,start,end,origin:t.location});
    if(t.text==='(')parens++;if(t.text===')')parens=Math.max(0,parens-1);
    const separator=['{','}'].includes(t.text)||t.text===';'&&parens===0?'\n':' ';
    pieces.push(t.text,separator);cursor=end+separator.length;
  });
  const at=byte=>({valid:true,macro:false,rawEncoding:byte+1,spellingFile:path,expansionFile:path,spellingByte:byte,expansionByte:byte,spellingInstance:id,expansionInstance:id,system:false,spellingSystem:false,expansionSystem:false,originChain:[],originChainTruncated:false});
  const lookup=(p,end=false)=>{const candidates=positions.get(p.rawEncoding)??[];return candidates.length===1?candidates[0][end?1:0]:null;};
  const projected=[],parents=new Map(),omissions=[],unavailable=new Set();
  for(const row of native.astNodes) {
    if(unavailable.has(row.parent)) {unavailable.add(row.id);omissions.push({node:row.id,reason:'ancestor-final-token-range-unavailable'});continue;}
    const begin=lookup(row.range.begin),end=lookup(row.range.last,true),loc=lookup(row.location),parent=parents.get(row.parent)??-1;
    if(begin===null||end===null||loc===null||begin>end) {parents.set(row.id,parent);unavailable.add(row.id);omissions.push({node:row.id,reason:'ambiguous-or-absent-final-token-range'});continue;}
    const copy={...row,originalNativeNode:row.id,id:projected.length,parent,location:at(loc),range:{begin:at(begin),last:at(lookup(row.range.last)),afterLast:at(end)}};
    parents.set(row.id,copy.id);projected.push(copy);
  }
  // TypeLoc positions use the same unique final-token mapping as AST nodes.
  // Ambiguous/missing tokens remain unavailable; no nearest-token guessing.
  const syntaxPoints=['begin','end','localBegin','localEnd','star','leftParen','rightParen','leftBracket','rightBracket'];
  const typeSyntax=(native.typeSyntax??[]).map(row=>{
    const copy={...row};
    for(const key of syntaxPoints)if(row[key]){const byte=lookup(row[key]);copy[key]=byte===null?{valid:false}:at(byte);}
    return copy;
  });
  const report={...native,typeSyntax,astNodes:projected,originalTokens:original,macros:[],includes:[],skipped:[],fileInstances:[...native.fileInstances,{id,file:path,physicalFile:false,systemHeader:false,parent:0,includeByte:-1}]};
  const view=await physicalView(report,id,pieces.join(''),options);view.keywordMacroNames=[];
  return {analysis:view,positionEncoding:'utf-8',tokenOrigins:origins,omittedNodes:omissions,status:omissions.length||native.truncated?'partial':'complete',description:'User-code final tokens from one translation unit; SDK declarations are omitted. Not standalone C.'};
}
