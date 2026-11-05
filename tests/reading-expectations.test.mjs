// Expectations are hand-written examples, independent of profile-generated
// probes and differential baselines. They cover selected behavior, not all C17.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {loadBrowserResources} from '../src/runtime/resources.js';
import {createWasmAnalyzer,browserSdkRoots} from '../src/runtime/wasm-runtime.js';
import {createTranslator} from '../src/translator.js';
import {translateAnalysis} from '../src/translation/native-reader.js';
import createModule from '../wasm/out/shi-clang.mjs';
const resources=await loadBrowserResources({fetcher:async url=>new Response(await readFile(url))});
const analyze=createWasmAnalyzer({createModule:o=>createModule(resources.createModuleOptions(o)),sdkFiles:resources.sdkFiles,resolveSdk:resources.resolveSdk});
const translate=createTranslator({analyze,sdkRoots:browserSdkRoots});
const run=async source=>{const result=await translate({source});process.exitCode=0;assert.equal(result.original.analysis.valid,true,JSON.stringify(result.original.analysis.diagnostics));assert.deepEqual(result.original.reading.issues,[]);return result.original;};
const freeze=value=>{if(value&&typeof value==='object'){Object.values(value).forEach(freeze);Object.freeze(value);}return value;};

test('a simple function has a complete expected reading and accepts frozen analysis facts',async()=>{
 const source='int f(void){return 0;}\n',r=await run(source);
 const expected='ｾｲｽｳ ﾆﾃ f(ｳｹﾄﾙﾉﾊ ﾑﾅｼ ﾅﾘ){ｶｴｽﾉﾊ 0 ﾅﾘ;}\n';
 assert.equal(r.reading.text,expected);
 const facts=freeze(structuredClone(r.analysis));assert.equal(translateAnalysis(source,facts).text,expected);
});

test('split declarations preserve each name once and attach explicit split anchors',async()=>{
 const r=await run('int a,b;\n');assert.equal(r.reading.text,'ｾｲｽｳ a ﾅﾘ; ｾｲｽｳ b ﾅﾘ;\n');
 const split=r.reading.segments.find(s=>s.operation==='split'&&s.note==='分割した宣言の型');
 assert.deepEqual(split.ranges,[{start:5,end:6},{start:0,end:3}]);
 assert.equal(translateAnalysis(r.analysis.source,r.analysis,undefined,{annotations:false}).text,'ｾｲｽｳ a; ｾｲｽｳ b;\n');
});

test('alignof is moved after its argument and points back to the original macro name',async()=>{
 const source='#include <stdalign.h>\nint f(void){return alignof(int);}\n',r=await run(source);
 assert.ok(r.reading.text.includes('ｶｴｽﾉﾊ (ｾｲｽｳ ﾉ) ﾉﾊｲﾁ ﾅﾘ;'));
 const at=source.indexOf('alignof'),moved=r.reading.segments.find(s=>s.operation==='move'&&s.ranges.some(a=>a.start===at&&a.end===at+7));
 assert.equal(moved.text,' ﾉﾊｲﾁ');assert.deepEqual(moved.ranges,[{start:at,end:at+7}]);
});

test('sizeof has a hand-written postfix reading without changing its operand',async()=>{
 const r=await run('int f(void){return sizeof(int);}\n');
 assert.equal(r.reading.text,'ｾｲｽｳ ﾆﾃ f(ｳｹﾄﾙﾉﾊ ﾑﾅｼ ﾅﾘ){ｶｴｽﾉﾊ (ｾｲｽｳ)ﾉｵｵｷｻ ﾅﾘ;}\n');
});

test('printf precision and value roles have independently specified suffixes',async()=>{
 const r=await run('#include <stdio.h>\nvoid f(double x){printf("%.*f",2,x);}\n');
 assert.ok(r.reading.text.includes('ｱﾗﾜｽﾉﾊ("%.*f" ﾃﾞ,2 ﾉｾｲﾄﾞﾃﾞ,x ｦ) ﾅﾘ;'));
});

test('a bound NULL suppresses mblen supplements while a real pointer keeps them',async()=>{
 const nullCall=await run('#include <stdlib.h>\nint f(void){return mblen(NULL,16);}\n');
 assert.ok(nullCall.reading.text.includes('ﾀﾀﾓｼﾞﾉﾅｶﾞｻ(ｶﾗｱｷ,16)'));
 const pointerCall=await run('#include <stdlib.h>\nint f(const char *s){return mblen(s,16);}\n');
 assert.ok(pointerCall.reading.text.includes('ﾀﾀﾓｼﾞﾉﾅｶﾞｻ(s ﾉ,16 ﾊﾞｲﾄﾏﾃﾞ)'));
});

test('round keeps its value suffix for a nested noun-form call',async()=>{
 const plain=await run('#include <math.h>\ndouble f(double x){return round(x);}\n');
 assert.ok(plain.reading.text.includes('ﾓﾖﾘﾉ_ｾｲｽｳﾆ_ﾏﾙﾒﾙﾉﾊ(x ｦ)'));
 const nested=await run('#include <math.h>\ndouble f(double x){return round(sqrt(x));}\n');
 assert.ok(nested.reading.text.includes('ﾓﾖﾘﾉ_ｾｲｽｳﾆ_ﾏﾙﾒﾙﾉﾊ(ﾍｲﾎｳｺﾝ(x) ｦ)'));
});
