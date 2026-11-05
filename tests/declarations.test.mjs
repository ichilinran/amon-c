import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {loadBrowserResources} from '../src/runtime/resources.js';
import {createWasmAnalyzer,browserSdkRoots} from '../src/runtime/wasm-runtime.js';
import {createTranslator} from '../src/translator.js';
import {physicalView,sdkPolicy} from '../src/analysis/projection.js';
import {checkReadingView} from '../src/project/analysis-format.js';
import {translateAnalysis} from '../src/translation/native-reader.js';
import {planDeclarations} from '../src/translation/declaration-plan.js';
import {createSourceIndex} from '../src/translation/source-index.js';
import createModule from '../wasm/out/shi-clang.mjs';
const resources=await loadBrowserResources({fetcher:async url=>new Response(await readFile(url))});
const analyze=createWasmAnalyzer({createModule:o=>createModule(resources.createModuleOptions(o)),sdkFiles:resources.sdkFiles,resolveSdk:resources.resolveSdk});
const translate=createTranslator({analyze,sdkRoots:browserSdkRoots});
const routes=view=>{const sourceIndex=createSourceIndex(view.source,view.tokens,{normalizeDigraphs:true});return planDeclarations(view.source,view,sourceIndex.pairTokens,{sourceIndex});};
async function run(source){const r=await translate({source});process.exitCode=0;assert.equal(r.original.analysis.valid,true,JSON.stringify(r.original.analysis.diagnostics));return r;}

test('TypeLoc supplies ordinary and nested declarators with Unicode and original comments intact',async()=>{
 const r=await run('/*日本語😀*/\r\nint a[3], *b;\r\nint (*fp)(int a);\r\nint (*f(void))(int);\r\nint g(int a, int (*p)(int), ...){return 0;}\r\n');
 const view=r.original.analysis,plan=routes(view);
 assert.deepEqual(plan.errors,[]);assert(plan.routes.length>=5);
 assert(plan.routes.every(r=>r.backend==='clang-type-syntax'));
 const old=structuredClone(view);delete old.declarationSyntax;
 for(const annotations of [true,false])assert.deepEqual(translateAnalysis(view.source,view,undefined,{annotations}),translateAnalysis(view.source,old,undefined,{annotations}));
 assert(r.original.reading.text.includes('日本語😀'));
});

test('void typedef, qualifiers, parameter arrays, bit fields and atomic specifiers preserve existing readings',async()=>{
 for(const source of ['typedef void V; int f(V);\n','int f(int a[static const 3], int (* const p)(int));\n','struct S{unsigned a:3; int (*p)(int);};\n','_Atomic(int (*)(int)) p;\n']){
  const r=await run(source),view=r.original.analysis,old=structuredClone(view);delete old.declarationSyntax;
  assert.deepEqual(translateAnalysis(view.source,view),translateAnalysis(old.source,old),source);
 }
});

test('legacy snapshots, old-style definitions and macro parameters select explicit compatibility routes',async()=>{
 for(const source of ['int f(a) int a; {return a;}\n','#define V void\nint f(V);\n']){
  const r=await run(source),plan=routes(r.original.analysis);
  assert(plan.routes.some(r=>r.backend==='source-compatibility'&&r.reason));
  const old=structuredClone(r.original.analysis);delete old.declarationSyntax;
  assert(routes(old).routes.every(r=>r.backend==='source-compatibility'));
  assert.deepEqual(translateAnalysis(old.source,old),r.original.reading);
 }
});

test('missing compiler syntax is recorded rather than invented',async()=>{
 const captured=await analyze({source:'int (*fp)(int);\n'});process.exitCode=0;
 const native=structuredClone(captured.native);native.typeSyntax=[];
 const view=await physicalView(native,captured.entryInstance,native.sourceBuffers.find(b=>b.instance===captured.entryInstance).text,{flags:captured.flags,isSdkPath:sdkPolicy(browserSdkRoots)});
 assert(view.declarationSyntax.declarations.every(d=>d.status==='unavailable'&&d.reason==='type-syntax-missing'));
 assert(routes(view).routes.every(d=>d.backend==='source-compatibility'));
});

test('imported compiler-shape data validates name anchors, delimiter pairing and node ownership',async()=>{
 const view=(await run('int (*fp)(int);\n')).original.analysis;
 checkReadingView(view);
 for(const mutate of [
  d=>d.declarationSyntax.declarations[0].shape.nameStart=0,
  d=>d.declarationSyntax.declarations[0].shape.suffixes[0].close=0,
  d=>d.declarationSyntax.declarations[0].node=999999,
  d=>d.declarationSyntax.declarations.push(d.declarationSyntax.declarations[0]),
 ]){const wrong=structuredClone(view);mutate(wrong);assert.throws(()=>checkReadingView(wrong));}
});

test('escaped names, line-spliced tokens and macro-provided types keep physical-source behavior',async()=>{
 for(const source of ['int \\u03b1;\n','in\\\nt x;\n','#define T int\nT (*fp)(int);\n','#include <stdbool.h>\nint f(bool b);\n']){
  const r=await run(source),view=r.original.analysis,old=structuredClone(view);delete old.declarationSyntax;
  assert.deepEqual(translateAnalysis(view.source,view),translateAnalysis(old.source,old),source);
 }
});
