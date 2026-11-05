import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {loadBrowserResources} from '../src/runtime/resources.js';
import {createWasmAnalyzer,browserSdkRoots} from '../src/runtime/wasm-runtime.js';
import {createTranslator} from '../src/translator.js';
import {physicalView,expandedView,sdkPolicy} from '../src/analysis/projection.js';
import {importSaved,saveImported} from '../src/project/import.js';
import {DEFAULT_WORDS} from '../src/vocabulary/reading-config.js';
import {checkReadingView} from '../src/project/analysis-format.js';
import {createDeclarationValidator} from '../src/translation/declaration-validation.js';
import createModule from '../wasm/out/shi-clang.mjs';
const resources=await loadBrowserResources({fetcher:async url=>new Response(await readFile(url))});
const analyze=createWasmAnalyzer({createModule:o=>createModule(resources.createModuleOptions(o)),sdkFiles:resources.sdkFiles,resolveSdk:resources.resolveSdk});
const translate=createTranslator({analyze,sdkRoots:browserSdkRoots});
async function run(source,extra={}){const r=await translate({source,...extra});process.exitCode=0;assert.equal(r.original.analysis.valid,true);for(const v of r.views)checkReadingView(v.analysis);return r;}

test('B1: K&R array and function-pointer parameters do not fail the translation and have explicit holds',async()=>{
 for(const source of ['int main(argc, argv) int argc; char *argv[]; { return argc; }\n','int f(a) int (*a)(int); { return a(1); }\n']){
  const r=await run(source);
  assert(r.original.reading.text.includes('ｶｴｽﾉﾊ'));
  assert(r.original.analysis.declarationSyntax.declarations.some(d=>d.status==='unavailable'&&d.reason==='old-style-definition'));
  assert(r.original.reading.reasons.length>0);
 }
 const source='#include "legacy.h"\nint main(void){return f(0);}\n';
 const r=await run(source,{files:{'input.c':source,'legacy.h':'int f(a) int a[]; { return 0; }\n'}});
 assert(r.views.some(v=>v.file.endsWith('legacy.h')&&v.analysis.declarationSyntax.declarations.some(d=>d.reason==='old-style-definition')));
});

test('B2: inactive branches with alternate closing parentheses/brackets cannot fail the file',async()=>{
 const declaration='void f(int a,\n#ifdef OLD\n int b)\n#else\n int b, int c)\n#endif\n;\n';
 for(const args of [[],['-DOLD']]){
  const r=await run(declaration,{args});
  assert(r.original.analysis.declarationSyntax.declarations.some(d=>d.status==='unavailable'));
  assert(r.original.reading.reasons.length>0);
 }
 const r=await run('int arr[3\n#if 0\n]\n#endif\n];\n');
 assert(r.original.analysis.declarationSyntax.declarations.some(d=>d.status==='unavailable'));
 assert(r.original.reading.reasons.length>0);
});

test('B3: an ellipsis followed by directives is guided or explicitly held, never silently lost',async()=>{
 for(const source of ['#define HAVE_VA\nvoid log_msg(int level,\n#ifdef HAVE_VA\n const char *fmt, ...\n#else\n const char *msg\n#endif\n);\n','int f(int a, ...\n#if 0\n#endif\n);\n']){
  const r=await run(source),reading=r.original.reading;
  assert(/ｵﾖﾋﾞ\s+\.\.\./.test(reading.text)||reading.reasons.length>0);
  assert(r.original.analysis.declarationSyntax.declarations.some(d=>d.reason==='preprocessing-in-declarator'));
  assert(/ｵﾖﾋﾞ\s+\.\.\./.test(r.expanded.reading.text));
 }
});

test('B4: compiler symbol identity connects simple and function-pointer typedefs to TypeLoc',async()=>{
 const r=await run('typedef int T; typedef int (*cb_t)(int);\n');
 for(const name of ['T','cb_t']){
  const node=r.original.analysis.nodes.find(n=>n.kind==='TYPEDEF_DECL'&&n.name===name);
  assert.equal(r.original.analysis.declarationSyntax.declarations.find(d=>d.node===node.id).status,'available');
 }
});

async function documentWithShapes(version=2){
 const doc=JSON.parse(await readFile(new URL('../examples/analysis/project-21.analysis.json',import.meta.url)));
 for(const c of doc.contexts){
  const roots=['/usr/include',...c.args.filter(a=>a.startsWith('-isystem')).map(a=>a.slice(8))];
  const options={flags:c.args,diagnostics:c.nativeDiagnostics??'',isSdkPath:sdkPolicy(roots),declarationSyntaxVersion:version};
  for(const row of c.views){const source=doc.files.find(f=>f.id===row.file).text;row.analysis=await physicalView(c.native,row.instance,source,options);}
  if(c.expandedViews?.length)c.expandedViews=[await expandedView(c.native,options)];
 }
 return doc;
}
async function minimalFunctionDocument(){
 const source='int (*f(void))(int);\n',cap=await analyze({source});process.exitCode=0;
 const result=await createTranslator({analyze:async()=>cap,sdkRoots:browserSdkRoots})({source});
 const template=JSON.parse(await readFile(new URL('../examples/analysis/project-21.analysis.json',import.meta.url)));
 const digest=cap.native.fileDigests.find(f=>f.instance===cap.entryInstance);
 return {format:'shi-analysis',version:2,positionEncoding:'utf-8',selectedContext:0,files:[{id:0,path:result.original.analysis.file,bytes:digest.bytes,sha256:digest.sha256,text:source}],contexts:[{
  ...template.contexts[0],id:0,mainFile:0,directory:'.',args:cap.flags,compiler:cap.native.compiler,valid:cap.native.valid,native:cap.native,
  instanceFiles:cap.native.fileInstances.map(i=>({instance:i.id,file:i.physicalFile?0:null})),
  views:[{instance:cap.entryInstance,file:0,analysis:result.original.analysis}],expandedViews:[{...result.expanded,reading:undefined}],nativeDiagnostics:cap.diagnostics,
 }]};
}

test('B5: saved documents reject missing suffixes and invented unavailable reasons against native evidence',async()=>{
 const doc=await documentWithShapes();await importSaved(doc);
 const minimal=await minimalFunctionDocument();await importSaved(minimal);
 const altered=structuredClone(minimal),functionView=altered.contexts[0].views[0].analysis;
 functionView.declarationSyntax.declarations.find(d=>functionView.nodes[d.node].name==='f').shape.suffixes.pop();
 await assert.rejects(importSaved(altered),/派生情報/);
 const reordered=structuredClone(doc);
 for(const c of reordered.contexts)for(const v of [...c.views,...(c.expandedViews??[])]){const info=v.analysis.declarationSyntax;v.analysis.declarationSyntax={declarations:info.declarations,version:info.version};}
 await importSaved(reordered);
 for(const expanded of [false,true])for(const kind of ['suffix','reason']){
  const bad=structuredClone(doc);
  const views=bad.contexts.flatMap(c=>expanded?c.expandedViews:c.views);
  const row=views.flatMap(v=>v.analysis.declarationSyntax.declarations).find(d=>d.status==='available'&&d.shape.suffixes.some(s=>s.kind==='function'));
  assert(row);
  if(kind==='suffix')row.shape.suffixes.pop();else{row.status='unavailable';row.reason='invented';delete row.shape;}
  await assert.rejects(importSaved(bad),/派生情報/);
 }
 const legacy=JSON.parse(await readFile(new URL('../examples/analysis/hello.analysis.json',import.meta.url)));
 legacy.declarationSyntax={version:2,declarations:[]};
 await assert.rejects(importSaved(legacy),/Clang/);
});

test('saved derived metadata upgrades after verification and custom vocabulary survives save/restore',async()=>{
 const old=await documentWithShapes(1),before=JSON.stringify(old),loaded=await importSaved(old);
 assert.equal(JSON.stringify(old),before,'caller-owned data is not mutated');
 assert(loaded.document.contexts.every(c=>c.views.every(v=>v.analysis.declarationSyntax.version===2)));
 const saved=saveImported(loaded,loaded.selection,{...DEFAULT_WORDS,int:'ﾄﾞｸｼﾞﾉｾｲｽｳ'},{annotations:false});
 const restored=await importSaved(JSON.parse(JSON.stringify(saved)));
 assert.equal(restored.words.int,'ﾄﾞｸｼﾞﾉｾｲｽｳ');assert.equal(restored.display.annotations,false);
 assert(restored.views.some(v=>v.text.includes('ﾄﾞｸｼﾞﾉｾｲｽｳ')));
});

test('a shared row contract rejects geometry/applicability violations and unexpected generator errors still throw',async()=>{
 const r=await run('int (*f(void))(int);\n'),view=r.original.analysis;
 const bad=structuredClone(view.declarationSyntax.declarations.find(d=>d.status==='available'));
 bad.shape.suffixes[0].close=0;
 assert(createDeclarationValidator(view).rowIssue(bad));
 const cap=await analyze({source:'int f(int);\n'});process.exitCode=0;
 const broken=structuredClone(cap),fn=broken.native.astNodes.find(n=>n.kind==='Function');
 broken.native.typeSyntax.find(t=>t.id===fn.typeSyntax).children=null;
 await assert.rejects(createTranslator({analyze:async()=>broken,sdkRoots:browserSdkRoots})({source:'int f(int);\n'}),TypeError);
});
