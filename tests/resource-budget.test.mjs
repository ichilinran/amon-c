import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {gzipSync} from 'node:zlib';
import {boundedBytes,boundedTextSink} from '../src/runtime/resource-budget.js';
import {loadBrowserResources} from '../src/runtime/resources.js';
import {normalizeInput,normalizeProject} from '../src/project/project.js';
test('stream budget accepts the exact boundary and cancels an oversized stream',async()=>{
 assert.deepEqual(await boundedBytes(new Blob(['1234']).stream(),4,'test'),new TextEncoder().encode('1234'));
 let cancelled=false;const stream=new ReadableStream({pull(c){c.enqueue(new Uint8Array(3));},cancel(){cancelled=true;}});
 await assert.rejects(boundedBytes(stream,4,'test'),/上限/);assert.equal(cancelled,true);
});
test('text sink counts UTF-8 and separators before retaining a line',()=>{
 const sink=boundedTextSink(5,'report');sink.append('あ');sink.append('x');assert.equal(sink.bytes,5);assert.equal(sink.text(),'あ\nx');
 assert.throws(()=>sink.append(''),/上限/);assert.equal(sink.text(),'あ\nx');
});
const normal=async url=>new Response(await readFile(url));
test('gzip expansion is bounded before SDK JSON parsing or Wasm compilation',async()=>{
 let compiled=false;
 await assert.rejects(loadBrowserResources({fetcher:async url=>new URL(url).pathname.endsWith('sdk-core.json.gz')?new Response(gzipSync(Buffer.alloc(1024*1024+1,32))):normal(url),compile:()=>{compiled=true;}}),/上限/);
 assert.equal(compiled,false);
});
test('body limit does not trust absent or understated Content-Length',async()=>{
 for(const headers of [{},{'content-length':'2'}])await assert.rejects(loadBrowserResources({fetcher:async url=>new URL(url).pathname.endsWith('sdk-index.json')?new Response(new Uint8Array(1024*1024+1),{headers}):normal(url),compile:()=>{throw Error('must not compile');}}),/上限/);
});
test('declared oversize is rejected before reading the asset',async()=>{
 await assert.rejects(loadBrowserResources({fetcher:async url=>new URL(url).pathname.endsWith('sdk-index.json')?new Response('{}',{headers:{'content-length':String(1024*1024+1)}}):normal(url)}),/上限/);
});
test('input and project budgets reject boundary excess before analysis',()=>{
 assert.equal(normalizeInput({source:' '.repeat(40000)}).source.length,40000);
 assert.throws(()=>normalizeInput({source:' '.repeat(40001)}),/長さ/);
 const files=Object.fromEntries(Array.from({length:512},(_,i)=>[i+'.c','']));assert.equal(Object.keys(normalizeInput({entry:'0.c',files}).files).length,512);
 assert.throws(()=>normalizeInput({entry:'0.c',files:{...files,'extra.c':''}}),/資源上限/);
 const large=Object.fromEntries(Array.from({length:211},(_,i)=>[i+'.c',' '.repeat(40000)]));assert.throws(()=>normalizeInput({entry:'0.c',files:large}),/資源上限/);
 const units=Array.from({length:64},()=>({source:'input.c'}));assert.equal(normalizeProject({files:{'input.c':''},translationUnits:units}).translationUnits.length,64);
 assert.throws(()=>normalizeProject({files:{'input.c':''},translationUnits:[...units,units[0]]}),/64/);
});
test('a report limit caught by Emscripten remains visible at the adapter boundary',async()=>{
 const {createWasmAnalyzer}=await import('../src/runtime/wasm-runtime.js');
 for(const stream of ['print','printErr']){
  let runs=0;
  const analyze=createWasmAnalyzer({sdkFiles:[],createModule:async options=>({FS:{mkdirTree(){},writeFile(){},chdir(){}},callMain(){
   if(runs++===0){try{options[stream]('x'.repeat(stream==='print'?32*1024*1024+1:256*1024+1));}catch{}return;}
   options.print(JSON.stringify({fileInstances:[{file:'/shi/input/input.c',id:1}],diagnostics:[]}));
  }})});
  await assert.rejects(analyze({source:'int x;\n'}),stream==='print'?/解析報告.*上限/:/診断.*上限/);
  assert.equal((await analyze({source:'int x;\n'})).entryInstance,1);
 }
});
test('missing output reports an actionable error rather than a JSON parse failure',async()=>{
 const {createWasmAnalyzer}=await import('../src/runtime/wasm-runtime.js');
 const analyze=createWasmAnalyzer({sdkFiles:[],createModule:async()=>({FS:{mkdirTree(){},writeFile(){},chdir(){}},callMain(){}})});
 await assert.rejects(analyze({source:'int x;\n'}),/入力を小さくして再実行/);
});
test('Wasm growth guard rejects before allocation and latches the cause',async()=>{
 const {guardWasmImports,MAX_WASM_GROWTH_REQUEST}=await import('../src/runtime/resource-budget.js');let called=0,cause;
 const env={emscripten_resize_heap:()=>{called++;return 1;}},imports={env,wasi_snapshot_preview1:env};
 guardWasmImports(imports,error=>{cause=error;});assert.equal(env.emscripten_resize_heap(MAX_WASM_GROWTH_REQUEST),1);assert.equal(called,1);
 assert.throws(()=>env.emscripten_resize_heap(MAX_WASM_GROWTH_REQUEST+1),/メモリ上限/);assert.equal(called,1);assert.match(cause.message,/メモリ上限/);
 assert.throws(()=>guardWasmImports({env:{}}),/メモリ制御/);
});
test('retained surfaces have transactional count and UTF-8 byte budgets',async()=>{
 const {createSurfaceBudget}=await import('../src/runtime/resource-budget.js');
 const budget=createSurfaceBudget({maxItems:2,maxBytes:8});budget.accept(['あ']);assert.equal(budget.bytes,5);assert.equal(budget.count,1);
 assert.throws(()=>budget.accept(['abc']),/表示データ/);assert.equal(budget.bytes,5);assert.equal(budget.count,1);
 budget.accept(['x']);assert.equal(budget.bytes,8);assert.equal(budget.count,2);
 assert.throws(()=>budget.accept(['']),/表示件数/);assert.equal(budget.count,2);
});
