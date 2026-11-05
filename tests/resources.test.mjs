import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {loadBrowserResources} from '../src/runtime/resources.js';
import {createTranslator} from '../src/translator.js';
import {createWasmAnalyzer,browserSdkRoots} from '../src/runtime/wasm-runtime.js';
import createModule from '../wasm/out/shi-clang.mjs';
import cases from './cases.mjs';
test('compressed resources compile once; core SDK retains standard headers and full fallback',async()=>{
 const counts={};let compilations=0;
 const base=new URL('../wasm/out/',import.meta.url);
 const resources=await loadBrowserResources({base,fetcher:async url=>{const key=new URL(url).pathname.split('/').at(-1);counts[key]=(counts[key]??0)+1;return new Response(await readFile(url));},compile:async bytes=>{compilations++;return WebAssembly.compile(bytes);}});
 const translate=createTranslator({analyze:createWasmAnalyzer({createModule:o=>createModule(resources.createModuleOptions(o)),sdkFiles:resources.sdkFiles,resolveSdk:resources.resolveSdk}),sdkRoots:browserSdkRoots});
 const first=await translate({source:cases.allHeaders});process.exitCode=0;
 assert.equal(first.original.analysis.valid,true);assert.equal(first.metrics.headersLoaded,108);assert.ok(first.metrics.heapBytes>0);
 const missing=await translate({source:'#include "my-missing.h"\nint f(void){return 0;}\n'});process.exitCode=0;
 assert.equal(missing.original.analysis.valid,false);assert.equal(counts['sdk.json.gz'],undefined);
 const fallback=await translate({source:'#include <sys/utsname.h>\nvoid f(struct utsname *p){(void)p->sysname;}\n'});process.exitCode=0;
 assert.equal(fallback.original.analysis.valid,true);assert.equal(fallback.metrics.sdkFallback,true);assert.equal(fallback.metrics.headersLoaded,1991);
 const repeated=await translate({source:cases.basic});process.exitCode=0;
 assert.equal(repeated.original.analysis.valid,true);assert.equal(compilations,1);assert.equal(counts['shi-clang.wasm.gz'],1);assert.equal(counts['sdk.json.gz'],1);
});
test('already decompressed HTTP .gz bodies do not undergo a second gzip pass',async()=>{
 const {gunzipSync}=await import('node:zlib');
 const resources=await loadBrowserResources({fetcher:async url=>{const bytes=await readFile(url);return new Response(new URL(url).pathname.endsWith('.gz')?gunzipSync(bytes):bytes);},compile:async bytes=>{assert.equal(bytes[0],0);return WebAssembly.compile(bytes);}});
 assert.equal(resources.sdkFiles.length,108);
});
