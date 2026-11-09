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
 assert.ok(missing.original.reading.text.includes('ｾｲｽｳ ﾆﾃ f(ｳｹﾄﾙﾉﾊ ﾑﾅｼ ﾅﾘ){ｶｴｽﾉﾊ 0 ﾅﾘ;}'));
 assert.ok(missing.original.reading.reasons.some(r=>r.code==='missing-input'));
 const fallback=await translate({source:'#include <sys/utsname.h>\nvoid f(struct utsname *p){(void)p->sysname;}\n'});process.exitCode=0;
 assert.equal(fallback.original.analysis.valid,true);assert.equal(fallback.metrics.sdkFallback,true);assert.equal(fallback.metrics.headersLoaded,1991);
 const repeated=await translate({source:cases.basic});process.exitCode=0;
 assert.equal(repeated.original.analysis.valid,true);assert.equal(compilations,1);assert.equal(counts['shi-clang.wasm.gz'],1);assert.equal(counts['sdk.json.gz'],1);
});

test('browser translation accepts a pasted fragment without a final newline and partially translates unknown calls',async()=>{
 const resources=await loadBrowserResources({fetcher:async url=>new Response(await readFile(url))});
 const analyze=createWasmAnalyzer({createModule:o=>createModule(resources.createModuleOptions(o)),sdkFiles:resources.sdkFiles});
 const translate=createTranslator({analyze,sdkRoots:browserSdkRoots});
 const source='int main(void){return 0;}';
 const pasted=(await translate({source})).original;
 const withNewline=(await translate({source:source+'\n'})).original;
 assert.equal(pasted.analysis.valid,true);
 assert.equal(pasted.analysis.source,source);
 assert.equal(pasted.reading.text+'\n',withNewline.reading.text);
 assert.ok(pasted.reading.text.includes('ﾈｶﾞｲﾏｼﾃﾊ'));

 const unknown='#define SHOW(x) #x\n#if 0\nint skipped;\n#endif\nint main(void){SHOW(int); UNKNOWN(1); return 0;}';
 const partial=(await translate({source:unknown})).original;process.exitCode=0;
 assert.equal(partial.analysis.valid,false);
 assert.equal(partial.reading.partial,true);
 assert.ok(partial.reading.text.includes('ﾈｶﾞｲﾏｼﾃﾊ(ｳｹﾄﾙﾉﾊ ﾑﾅｼ ﾅﾘ)'));
 assert.ok(partial.reading.text.includes('SHOW(int)'));
 assert.ok(partial.reading.text.includes('UNKNOWN(1); ｶｴｽﾉﾊ 0 ﾅﾘ;} ﾃﾞﾊ'));
 assert.ok(partial.reading.text.includes('int skipped;'));
 const held=partial.reading.reasons.find(r=>r.code==='compiler-diagnostic'&&r.message.includes('UNKNOWN'));
 assert.deepEqual(held?.ranges.map(r=>unknown.slice(r.start,r.end)),['UNKNOWN(1)']);

 const calls=(await translate({source:'#include <stdio.h>\nint f(void){printf("%d", UNKNOWN(1)); printf("%d", 2); return 0;}'})).original;
 process.exitCode=0;
 assert.ok(calls.reading.text.includes('ｱﾗﾜｽﾉﾊ("%d" ﾃﾞ, UNKNOWN(1)) ﾅﾘ; ｱﾗﾜｽﾉﾊ("%d" ﾃﾞ, 2 ｦ) ﾅﾘ;'));

 const broken=(await translate({source:'int main(void){int good=3; UNKNOWN(1; return 0;}\nint g(void){return 1;}'})).original;
 process.exitCode=0;
 assert.ok(broken.reading.text.includes('ｾｲｽｳ good=3 ﾅﾘ; UNKNOWN(1; return 0;}'));
 assert.ok(broken.reading.text.includes('ｶｴｽﾉﾊ 1 ﾅﾘ;'));
 assert.ok(!broken.reading.text.includes('ﾃﾞﾊ'));

 const unfinished=(await translate({source:'int main(void){int good=3; int x ='})).original;
 process.exitCode=0;
 assert.ok(unfinished.reading.text.endsWith('ｾｲｽｳ good=3 ﾅﾘ; int x ='));

 const conditional=(await translate({source:'#include "missing.h"\n#if FLAG\nint f(void){return 1;}\n#endif\nint g(void){return 0;}'})).original;
 process.exitCode=0;
 assert.ok(conditional.reading.text.includes('int f(void){return 1;}'));
 assert.ok(conditional.reading.text.includes('ｶｴｽﾉﾊ 0 ﾅﾘ;'));
 assert.ok(conditional.reading.reasons.some(r=>r.code==='conditional-unconfirmed'));
});
test('already decompressed HTTP .gz bodies do not undergo a second gzip pass',async()=>{
 const {gunzipSync}=await import('node:zlib');
 const resources=await loadBrowserResources({fetcher:async url=>{const bytes=await readFile(url);return new Response(new URL(url).pathname.endsWith('.gz')?gunzipSync(bytes):bytes);},compile:async bytes=>{assert.equal(bytes[0],0);return WebAssembly.compile(bytes);}});
 assert.equal(resources.sdkFiles.length,108);
});
