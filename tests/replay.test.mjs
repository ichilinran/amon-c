import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {gunzipSync} from 'node:zlib';
import createModule from '../wasm/out/shi-clang.mjs';
import {createProjectTranslator} from '../src/translator.js';
import {createWasmAnalyzer,browserSdkRoots} from '../src/runtime/wasm-runtime.js';
import {analyze,sdkRoots} from './native-runtime.mjs';
const wasmBinary=await readFile(new URL('../wasm/out/shi-clang.wasm',import.meta.url));
const sdkFiles=JSON.parse(gunzipSync(await readFile(new URL('../wasm/out/sdk.json.gz',import.meta.url))));
const browser=createProjectTranslator({analyze:createWasmAnalyzer({createModule:o=>createModule({...o,wasmBinary}),sdkFiles}),sdkRoots:browserSdkRoots});
const native=createProjectTranslator({analyze,sdkRoots});
const index=JSON.parse(await readFile(new URL('../coverage/replay-index.json',import.meta.url),'utf8'));
const results=[];
for(const item of index)test('fresh native and Wasm replay: '+item.fixture,async()=>{
 const project=JSON.parse(await readFile(new URL('../examples/replay/'+item.fixture,import.meta.url),'utf8'));
 const actual=await browser(project);process.exitCode=0;
 const expected=await native(project);
 let views=0;
 assert.equal(actual.contexts.length,item.contexts);
 for(let i=0;i<item.contexts;i++){
  const a=actual.contexts[i],e=expected.contexts[i];
  assert.equal(a.original.analysis.valid,true,JSON.stringify(a.original.analysis.diagnostics));
  assert.equal(a.views.length,e.views.length);
  for(let j=0;j<a.views.length;j++){
   assert.equal(a.views[j].reading.text,e.views[j].reading.text,`${item.fixture} ${i} view ${j}`);
   assert.deepEqual(a.views[j].reading.segments.map(s=>({text:s.text,ranges:s.ranges})),e.views[j].reading.segments.map(s=>({text:s.text,ranges:s.ranges})));
   views++;
  }
  assert.equal(a.expanded.reading.text,e.expanded.reading.text,`${item.fixture} ${i} expanded`);views++;
 }
 results.push({...item,views});
});
test('save replay counts',async()=>{
 await writeFile(new URL('../coverage/replay-results.json',import.meta.url),JSON.stringify(results,null,2)+'\n');
});
