// Common project envelope. v1 remains a separate, verified compatibility route.
import {createSourceBoundaries,byteOffsetToUTF16,utf16OffsetToByte} from './source-coordinates.js';
import {checkAnalysis,verifyAnalysis,checkReadingView,verifyReadingView} from './analysis-format.js';

export const DOCUMENT_LIMITS=Object.freeze({files:512,contexts:64,instances:8192,records:250000,fileBytes:1048576,totalBytes:8388608});
const encoder=new TextEncoder();
const fail=message=>{throw new Error('支位解析データ：'+message);};
const integer=x=>Number.isSafeInteger(x)&&x>=0;
const array=(x,max,label)=>{if(!Array.isArray(x)||x.length>max)fail(label+'の件数が不正です。');return x;};
const string=(x,max,label)=>{if(typeof x!=='string'||x.length>max)fail(label+'が不正です。');return x;};
const hash=x=>typeof x==='string'&&/^[a-f0-9]{64}$/.test(x);
const bool=x=>typeof x==='boolean';
function table(rows,label){const map=new Map();for(const row of rows){if(!row||!integer(row.id)||map.has(row.id))fail(label+'のIDが不正または重複しています。');map.set(row.id,row);}return map;}
function acyclic(map,children,label){const state=new Map();for(const first of map.keys()){const stack=[[first,false]];while(stack.length){const [id,leave]=stack.pop();if(!map.has(id))fail(label+'に存在しない参照があります。');if(leave){state.set(id,2);continue;}if(state.get(id)===1)fail(label+'に循環があります。');if(state.get(id)===2)continue;state.set(id,1);stack.push([id,true]);for(const child of children(map.get(id)))stack.push([child,false]);}}}

export function sourceBoundaries(text){
 string(text,DOCUMENT_LIMITS.fileBytes,'原文');
 try{return createSourceBoundaries(text);}catch{fail('原文に不正なUnicode文字があります。');}
}
export function byteToUTF16(map,byte){
 if(!integer(byte))fail('バイト位置が不正です。');
 try{return byteOffsetToUTF16(map,byte);}catch{fail('位置がUTF-8文字の途中です。');}
}
export function utf16ToByte(map,unit){
 if(!integer(unit))fail('UTF-16位置が不正です。');
 try{return utf16OffsetToByte(map,unit);}catch{fail('位置がUnicode文字の途中です。');}
}

function checkNative(native,context,files){
 if(!native||!(native.format==='shi-clang-cpp'&&native.version===1)||!bool(native.valid)||!bool(native.truncated))fail('解析器の取得情報が不正です。');
 const count=Object.values(native).filter(Array.isArray).reduce((n,a)=>n+a.length,0);if(count>DOCUMENT_LIMITS.records)fail('取得情報が資源上限を超えています。');
 const instances=table(array(native.fileInstances,DOCUMENT_LIMITS.instances,'読込み回'),'読込み回');
 const bindings=new Map(context.instanceFiles.map(row=>[row.instance,row])),boundaryMaps=new Map();
 if(bindings.size!==instances.size||[...instances.keys()].some(id=>!bindings.has(id)))fail('読込み回とファイル対応が一致しません。');
 acyclic(instances,row=>row.parent?[row.parent]:[],'読込み回');
 const point=at=>{
  if(!at||!bool(at.valid))fail('位置情報が不正です。');if(!at.valid)return;
  for(const side of ['spelling','expansion']){
   const id=at[side+'Instance'],instance=instances.get(id);if(!instance||!integer(at[side+'Byte']))fail('位置の読込み回が不正です。');
   string(at[side+'File'],4096,'位置のファイル');
   const record=bindings.get(id);
   if(at[side+'File']!==instance.file)fail('位置と読込み回のファイルが一致しません。');
   if(record.file!==null){const file=files.get(record.file);if(!file||file.path!==instance.file||at[side+'Byte']>file.bytes)fail('原文の範囲外の位置です。');if(file.text!==null){if(!boundaryMaps.has(file.id))boundaryMaps.set(file.id,sourceBoundaries(file.text));byteToUTF16(boundaryMaps.get(file.id),at[side+'Byte']);}}
  }
  for(const key of ['macro','system','spellingSystem','expansionSystem','originChainTruncated'])if(!bool(at[key]))fail('位置の由来が不正です。');
 };
 const symbols=table(array(native.symbols??[],DOCUMENT_LIMITS.records,'宣言の識別'),'宣言の識別');
 const symbol=target=>{if(!target||target.id===undefined)return;const actual=symbols.get(target.id);if(!actual||actual.name!==target.name||actual.kind!==target.kind||actual.usr!==target.usr||actual.union!==target.union||JSON.stringify(actual.location)!==JSON.stringify(target.location))fail('宣言の識別参照が不正です。');};
 for(const row of symbols.values()){if(!['ordinary','tag','member','label'].includes(row.namespace))fail('宣言の名前空間が不正です。');point(row.location);}
 const types=table(array(native.semanticTypes,DOCUMENT_LIMITS.records,'型'),'型'),syntax=table(array(native.typeSyntax,DOCUMENT_LIMITS.records,'型記述'),'型記述');
 for(const row of types.values()){symbol(row.symbol);for(const edge of row.edges??[])symbol(edge.symbol);if(!types.has(row.canonical)||types.get(row.canonical).canonical!==row.canonical)fail('型の正規化参照が不正です。');for(const edge of array(row.edges,DOCUMENT_LIMITS.records,'型の辺'))if(!types.has(edge.type))fail('型の参照が不正です。');for(const k of ['const','volatile','restrict','supportedKind'])if(!bool(row[k]))fail('型の修飾が不正です。');}
 acyclic(syntax,row=>array(row.children,DOCUMENT_LIMITS.records,'型記述の子').map(edge=>edge.syntax),'型記述');
 for(const row of syntax.values()){if(!types.has(row.semantic))fail('型記述の意味参照が不正です。');point(row.begin);point(row.end);point(row.localBegin);point(row.localEnd);for(const edge of row.children)symbol(edge.symbol);}
 const definitions=table(array(native.definitions,DOCUMENT_LIMITS.records,'マクロ定義'),'マクロ定義');
 for(const row of array(native.macros,DOCUMENT_LIMITS.records,'マクロ呼出し')){if(!definitions.has(row.definitionID))fail('マクロ定義の参照が不正です。');point(row.call);point(row.end);}
 for(const row of array(native.tokens,DOCUMENT_LIMITS.records,'展開語')){string(row.text,65536,'展開語');point(row.location);}
 for(const row of array(native.declarations,DOCUMENT_LIMITS.records,'宣言')){point(row.location);if(row.semanticType!==undefined&&!types.has(row.semanticType))fail('宣言の型参照が不正です。');if(row.typeSyntax!==undefined&&!syntax.has(row.typeSyntax))fail('宣言の型記述参照が不正です。');}
 if(native.astNodes!==undefined){
  const nodes=table(array(native.astNodes,DOCUMENT_LIMITS.records,'構文'),'構文');
  acyclic(nodes,row=>row.parent===-1?[]:[row.parent],'構文');
  for(const row of nodes.values()){
   for(const edge of row.childRoles??[]){string(edge.role,100,'子の役割');if(!bool(edge.absent)||edge.absent&&edge.node!==null||edge.node!==null&&!nodes.has(edge.node))fail('構文の子の役割が不正です。');}
   string(row.kind,100,'構文の種類');if(!['declaration','expression','statement','type-reference'].includes(row.category))fail('構文の役割が不正です。');
   if(row.semanticTypeUnavailable!==undefined&&(row.semanticTypeUnavailable!==true||row.semanticType!==undefined))fail('型の取得不足情報が不正です。');
   symbol(row.symbol);symbol(row.reference);point(row.location);for(const k of ['begin','last','afterLast'])point(row.range?.[k]);
   if(row.semanticType!==undefined&&!types.has(row.semanticType)||row.typeSyntax!==undefined&&!syntax.has(row.typeSyntax))fail('構文の型参照が不正です。');
   if(row.reference){string(row.reference.name,65536,'参照名');point(row.reference.location);}
  }
 }
 const ends=new Map();
 for(const row of array(native.originalTokens??[],DOCUMENT_LIMITS.records,'原文語')){
  const binding=bindings.get(row.instance),file=binding&&files.get(binding.file);
  if(!file||!integer(row.start)||!integer(row.end)||row.end<row.start||row.end>file.bytes||row.start<(ends.get(row.instance)??0))fail('原文語の範囲が不正です。');
  string(row.text,65536,'原文語');string(row.kind,100,'原文語の種類');ends.set(row.instance,row.end);
  if(file.text!==null){const map=boundaryMaps.get(file.id)??sourceBoundaries(file.text);boundaryMaps.set(file.id,map);byteToUTF16(map,row.start);byteToUTF16(map,row.end);}
 }
 for(const digest of native.fileDigests??[]){const file=files.get(bindings.get(digest.instance)?.file);if(!file||file.bytes!==digest.bytes||file.sha256!==digest.sha256)fail('解析時のファイル確認値が一致しません。');}
 for(const buffer of native.sourceBuffers??[]){const file=files.get(bindings.get(buffer.instance)?.file);if(!file||file.text!==buffer.text)fail('解析時の原文バッファが一致しません。');}
 return {point};
}

export function checkDocument(data){
 if(data?.format==='shi-analysis'&&data.version===1)return {kind:'legacy',document:checkAnalysis(data)};
 if(data?.format!=='shi-analysis'||data.version!==2||data.positionEncoding!=='utf-8')fail('対応していない形式です。');
 const files=table(array(data.files,DOCUMENT_LIMITS.files,'ファイル'),'ファイル');let total=0;
 for(const file of files.values()){string(file.path,4096,'ファイル名');if(!hash(file.sha256)||!integer(file.bytes)||file.bytes>DOCUMENT_LIMITS.fileBytes||!(file.text===null||typeof file.text==='string'))fail('ファイルの内容情報が不正です。');if(file.text!==null&&sourceBoundaries(file.text).length!==file.bytes)fail('原文のバイト長が一致しません。');total+=file.text===null?0:file.bytes;}
 if(total>DOCUMENT_LIMITS.totalBytes)fail('原文の合計が資源上限を超えています。');
 const contexts=table(array(data.contexts,DOCUMENT_LIMITS.contexts,'解析文脈'),'解析文脈');if(!contexts.size)fail('解析文脈がありません。');
 for(const context of contexts.values()){
  if(!files.has(context.mainFile)||files.get(context.mainFile).text===null||!bool(context.valid))fail('解析単位が不正です。');
  array(context.args,1024,'解析引数').forEach(arg=>string(arg,4096,'解析引数'));string(context.compiler,1024,'解析器');
  if(!context.capabilities||typeof context.capabilities!=='object')fail('能力情報がありません。');
  for(const cap of Object.values(context.capabilities)){if(!cap||!['complete','partial','unavailable'].includes(cap.status)||cap.status!=='complete'&&!(typeof cap.reason==='string'&&cap.reason.length>0))fail('能力の取得状態が不正です。');}
  const bindings=table(array(context.instanceFiles,DOCUMENT_LIMITS.instances,'ファイル対応').map(row=>({...row,id:row.instance})),'ファイル対応');
  for(const row of bindings.values())if(row.file!==null&&!files.has(row.file))fail('読込み回のファイル参照が不正です。');
  for(const key of ['source','semanticTypes','typeSyntax','macroDefinitions','includeInstances','expandedTokens','originalBody','expandedBody','exactContributors'])if(!context.capabilities[key])fail('能力情報が不足しています。');
  const {point}=checkNative(context.native,context,files);const symbolsForContext=new Map((context.native.symbols??[]).map(s=>[s.id,s]));
  if(context.valid!==context.native.valid)fail('解析の成否が一致しません。');
  for(const expanded of array(context.expandedViews??[],DOCUMENT_LIMITS.contexts,'展開ビュー')){
   const view=checkReadingView(expanded.analysis);for(const node of view.nodes)if(node.reference?.symbolId!==undefined&&!symbolsForContext.has(node.reference.symbolId))fail('展開ビューの宣言参照が不正です。');const map=sourceBoundaries(view.source);let end=0;
   const ast=new Map(context.native.astNodes.map(n=>[n.id,n]));for(const node of view.nodes){if(node.nativeNode===undefined)continue;const actual=ast.get(node.nativeNode);if(!actual||node.semanticType!==actual.semanticType||node.typeSyntax!==actual.typeSyntax||node.reference?.symbolId!==actual.reference?.id)fail('展開ビューの構文・型の参照が不正です。');}
   if(expanded.positionEncoding!=='utf-8'||!['partial','complete'].includes(expanded.status))fail('展開ビューの形式が不正です。');
   const origins=array(expanded.tokenOrigins,DOCUMENT_LIMITS.records,'展開由来');
   if(origins.length!==context.native.tokens.length||origins.length!==view.tokens.length)fail('展開語の数が一致しません。');
   for(const [i,row] of origins.entries()){
    if(row.token!==i||!integer(row.start)||!integer(row.end)||row.start<end||row.end<row.start||row.end>map.length)fail('展開語の対応位置が不正です。');
    const start=byteToUTF16(map,row.start),finish=byteToUTF16(map,row.end),t=view.tokens[i];
    if(t.start!==start||t.end!==finish||view.source.slice(start,finish)!==context.native.tokens[i].text||JSON.stringify(row.origin)!==JSON.stringify(context.native.tokens[i].location))fail('展開語と由来が一致しません。');
    point(row.origin);end=row.end;
   }
  }
  const astByID=new Map(context.native.astNodes.map(n=>[n.id,n]));
  for(const row of array(context.views,DOCUMENT_LIMITS.files,'互換ビュー')){const file=files.get(row.file);if(!file||file.text===null)fail('ビューのファイルが不正です。');const view=row.analysis?.format==='shi-reading-view'?checkReadingView(row.analysis):checkAnalysis(row.analysis);if(view.format==='shi-reading-view')for(const node of view.nodes){if(node.nativeNode===undefined)continue;const actual=astByID.get(node.nativeNode);if(node.reference?.symbolId!==undefined&&!symbolsForContext.has(node.reference.symbolId))fail('表示ビューの宣言参照が不正です。');if(!actual||node.semanticType!==actual.semanticType||node.typeSyntax!==actual.typeSyntax||node.reference?.symbolId!==actual.reference?.id)fail('表示ビューの構文・型の参照が不正です。');}if(row.instance!==undefined&&!context.instanceFiles.some(i=>i.instance===row.instance&&i.file===row.file))fail('ビューの読込み回が不正です。');if(view.source!==file.text||view.file!==file.path||view.sha256!==file.sha256)fail('ビューと原文が一致しません。');}
 }
 if(!contexts.has(data.selectedContext))fail('選択した解析文脈がありません。');
 return {kind:'project',document:data};
}

export async function verifyDocument(data){
 const result=checkDocument(data);if(result.kind==='legacy'){await verifyAnalysis(data);return result;}
 for(const file of data.files){if(file.text===null)continue;const digest=await crypto.subtle.digest('SHA-256',encoder.encode(file.text));const actual=Array.from(new Uint8Array(digest),n=>n.toString(16).padStart(2,'0')).join('');if(actual!==file.sha256)fail('原文のハッシュが一致しません。');}
 for(const context of data.contexts){for(const view of context.views)await (view.analysis.format==='shi-reading-view'?verifyReadingView:verifyAnalysis)(view.analysis);for(const view of context.expandedViews??[])await verifyReadingView(view.analysis);}
 return result;
}
export function compatibilityView(result,{contextId,fileId,instanceId}={}){
 if(result.kind==='legacy')return result.document;
 const context=result.document.contexts.find(row=>row.id===(contextId??result.document.selectedContext));if(!context)fail('解析文脈がありません。');
 const view=context.views.find(row=>row.file===(fileId??context.mainFile)&&(instanceId===undefined||row.instance===instanceId));if(!view)fail('このファイルの互換ビューはありません。');return view.analysis;
}
