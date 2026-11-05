import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir,writeFile} from 'node:fs/promises';
import {gunzipSync} from 'node:zlib';
import {createTranslator,createProjectTranslator} from '../src/translator.js';
import {normalizeProject,normalizeInput,saveProject,loadProject,analysisArgs} from '../src/project/project.js';
import {createWasmAnalyzer,browserSdkRoots} from '../src/runtime/wasm-runtime.js';
import createModule from '../wasm/out/shi-clang.mjs';
import {analyze,sdkRoots} from './native-runtime.mjs';
const wasmBinary=await readFile(new URL('../wasm/out/shi-clang.wasm',import.meta.url));
const sdkFiles=JSON.parse(gunzipSync(await readFile(new URL('../wasm/out/sdk.json.gz',import.meta.url))));
const browser=createProjectTranslator({analyze:createWasmAnalyzer({createModule:o=>createModule({...o,wasmBinary}),sdkFiles}),sdkRoots:browserSdkRoots});
const native=createProjectTranslator({analyze,sdkRoots});
const files={};
const fixture=new URL('../reference/next/cases/acceptance/',import.meta.url);
for(const name of await readdir(fixture))if(/\.[ch]$/.test(name))files[name]=await readFile(new URL(name,fixture),'utf8');
const manifest=JSON.parse(await readFile(new URL('project.json',fixture),'utf8'));
const project={files,translationUnits:manifest.translationUnits};

test('multi-file and two conditions: every physical include instance and expanded output matches',async()=>{
 const actual=await browser(project);process.exitCode=0;
 const expected=await native(project);
 assert.equal(actual.contexts.length,4);
 let views=0;
 for(let i=0;i<4;i++) {
  const a=actual.contexts[i],e=expected.contexts[i];
  assert.equal(a.original.analysis.valid,true,JSON.stringify(a.original.analysis.diagnostics));
  assert.equal(a.views.length,e.views.length);
  for(let j=0;j<a.views.length;j++){
   assert.equal(a.views[j].reading.text,e.views[j].reading.text);
   assert.deepEqual(a.views[j].reading.segments.map(s=>({text:s.text,ranges:s.ranges})),e.views[j].reading.segments.map(s=>({text:s.text,ranges:s.ranges})));
   views++;
  }
  assert.equal(a.expanded.reading.text,e.expanded.reading.text);views++;
 }
 assert.notEqual(actual.contexts[0].original.reading.text,actual.contexts[1].original.reading.text);
 const worker=actual.contexts[2];
 const slots=worker.views.filter(v=>v.file.endsWith('/slot.h'));
 assert.ok(slots.length>=2);assert.ok(new Set(slots.map(v=>v.instance)).size>=2);
 const record={contexts:4,displayViews:views,repeatedHeaderInstances:slots.length};
 await writeFile(new URL('../wasm/project-comparison.json',import.meta.url),JSON.stringify(record,null,2)+'\n');
});

test('relative include directory and user header named math.h do not become trusted SDK',async()=>{
 const input={files:{'main.c':'#include <math.h>\ndouble f(double x){return sqrt(x);}\n','include/math.h':'double sqrt(double x);\n'},translationUnits:[{source:'main.c',args:['-Iinclude']}]};
 const actual=await browser(input);process.exitCode=0;
 const expected=await native(input);
 assert.equal(actual.contexts[0].original.analysis.valid,true);
 assert.equal(actual.contexts[0].original.reading.text,expected.contexts[0].original.reading.text);
 assert.ok(actual.contexts[0].original.reading.text.includes('sqrt'));
 assert.ok(!actual.contexts[0].original.reading.text.includes('ﾍｲﾎｳｺﾝ'));
});

test('portable project restores files, flags, custom vocabulary, display and selection',async()=>{
 const first=normalizeProject(project);first.words.int='ﾃｽﾄｾｲｽｳ';first.display.annotations=false;
 const saved=await saveProject(first,'2:expanded');
 const restored=await loadProject(JSON.parse(JSON.stringify(saved)));
 assert.equal(restored.vocabularyVersion,12);assert.deepEqual(restored.project,first);assert.equal(restored.selection,'2:expanded');
 const result=await browser(restored.project);process.exitCode=0;
 assert.ok(result.contexts[0].original.reading.text.includes('ﾃｽﾄｾｲｽｳ'));
 const tampered=structuredClone(saved);tampered.project.files['main.c']+=' ';
 await assert.rejects(loadProject(tampered),/確認値/);
});

test('file bounds, flags and malformed manifests fail before invoking compiler',()=>{
 for(const name of ['../outside.c','/etc/passwd','a/../../b.h','C:\\file.c'])assert.throws(()=>normalizeInput({files:{[name]:'x'},entry:name}));
 for(const args of [['-Xclang','-load'],['-I','/usr/include'],['-I../outside'],['-include','../outside.h'],['-D'],['-isystem']])assert.throws(()=>analysisArgs(args));
 assert.throws(()=>normalizeInput({source:'a'.repeat(40001)}));
 assert.throws(()=>normalizeProject({files:{'a.c':''},translationUnits:[]}));
 assert.throws(()=>normalizeProject({files:{'input.c':''},translationUnits:[{}]}));
});
