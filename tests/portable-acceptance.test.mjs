import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir,writeFile} from 'node:fs/promises';
import {loadBrowserResources} from '../src/runtime/resources.js';
import {createWasmAnalyzer,browserSdkRoots} from '../src/runtime/wasm-runtime.js';
import {createProjectTranslator} from '../src/translator.js';
import {contextSurfaces} from '../src/project/surfaces.js';
import {physicalView,expandedView,sdkPolicy} from '../src/analysis/projection.js';
import {translateAnalysis} from '../src/translation/native-reader.js';
import {DEFAULT_WORDS} from '../src/vocabulary/reading-config.js';
import createModule from '../wasm/out/shi-clang.mjs';
import {literalFormat} from '../src/translation/format-literal.js';
const resources=await loadBrowserResources({fetcher:async url=>new Response(await readFile(url))});
const analyze=createWasmAnalyzer({createModule:o=>createModule(resources.createModuleOptions(o)),sdkFiles:resources.sdkFiles,resolveSdk:resources.resolveSdk});
const projectTranslate=createProjectTranslator({analyze,sdkRoots:browserSdkRoots});

test('portable project execution exposes 16 surfaces with valid macro history and origin anchors',async()=>{
 const project=JSON.parse(await readFile(new URL('../examples/project-acceptance.json',import.meta.url)));
 const result=await projectTranslate(project);process.exitCode=0;
 assert.deepEqual(result.contextErrors,[]);
 const views=result.contexts.flatMap(contextSurfaces);
 assert.equal(views.length,16);
 const expanded=views.find(v=>v.key==='2:expanded');assert.ok(expanded.originAnchors.some(a=>a.length));
 const history=expanded.macros.filter(m=>m.name==='CREATE_SLOT');assert.ok(history.length);
 assert.ok(history[0].replacement.length);assert.ok(history[0].arguments.length);
 for(const view of views)for(const row of view.originAnchors??[])for(const a of row){const target=views.find(v=>v.key===a.key);assert.ok(target);assert.ok(a.start>=0&&a.end>=a.start&&a.end<=target.source.length);}
 const source=views.find(v=>v.key==='2:source:1');assert.ok(source.reasons.length);assert.ok(source.macros.length);
});

test('portable user math.h remains untrusted and custom vocabulary survives save input normalization',async()=>{
 const result=await projectTranslate({files:{'main.c':'#include <math.h>\ndouble f(double x){return sqrt(x);}\n','include/math.h':'double sqrt(double x);\n'},translationUnits:[{source:'main.c',args:['-Iinclude']}],words:{...DEFAULT_WORDS,double:'ﾄﾞｸｼﾞｼｮｳｽｳ'}});process.exitCode=0;
 assert.deepEqual(result.contextErrors,[]);
 const output=result.contexts[0].original.reading.text;
 assert.ok(output.includes('sqrt'));assert.ok(!output.includes('ﾍｲﾎｳｺﾝ'));assert.ok(output.includes('ﾄﾞｸｼﾞｼｮｳｽｳ'));
});

test('all 76 stored projections and 152 readings match fixed expectations',async()=>{
 const fixtures=JSON.parse(await readFile(new URL('./fixtures/projection-expectations.json',import.meta.url)));
 const root=new URL('../examples/analysis/',import.meta.url);let documents=0,views=0,readings=0;
 for(const filename of (await readdir(root)).filter(f=>f.endsWith('.json'))){
  const document=JSON.parse(await readFile(new URL(filename,root)));if(document.version!==2||!document.contexts)continue;documents++;
  for(const context of document.contexts){
   const options={flags:context.args,diagnostics:context.nativeDiagnostics??'',isSdkPath:sdkPolicy(['/usr/include',...context.args.filter(f=>f.startsWith('-isystem')).map(f=>f.slice(8))])};
   for(const row of context.views){
    const source=document.files.find(f=>f.id===row.file).text,actual=await physicalView(context.native,row.instance,source,options);
    const expected=fixtures.find(f=>f.filename===filename&&f.context===context.id&&f.kind==='physical'&&f.instance===row.instance);assert(expected,filename);
    assert.deepEqual(actual,expected.analysis,filename+': physical');
    for(const r of expected.readings){assert.deepEqual(translateAnalysis(source,actual,undefined,{annotations:r.annotations}),r.reading,filename);readings++;}views++;
   }
   const actual=await expandedView(context.native,options),expected=fixtures.find(f=>f.filename===filename&&f.context===context.id&&f.kind==='expanded');assert(expected,filename);
   assert.deepEqual(actual,expected.view,filename+': expanded');
   for(const r of expected.readings){assert.deepEqual(translateAnalysis(actual.analysis.source,actual.analysis,undefined,{annotations:r.annotations}),r.reading,filename);readings++;}views++;
  }
 }
 assert.equal(documents,3);assert.equal(views,76);assert.equal(readings,152);assert.equal(fixtures.length,76);
});
