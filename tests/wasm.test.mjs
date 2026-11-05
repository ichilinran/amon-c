import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {gunzipSync} from 'node:zlib';
import {performance} from 'node:perf_hooks';
import createModule from '../wasm/out/shi-clang.mjs';
import {createWasmAnalyzer,browserSdkRoots} from '../src/runtime/wasm-runtime.js';
import {createTranslator} from '../src/translator.js';
import {analyze,sdkRoots} from './native-runtime.mjs';
import cases from './cases.mjs';
const wasmBinary=await readFile(new URL('../wasm/out/shi-clang.wasm',import.meta.url));
const sdkFiles=JSON.parse(gunzipSync(await readFile(new URL('../wasm/out/sdk.json.gz',import.meta.url))));
const measurements=[];
const wasm=createWasmAnalyzer({createModule:options=>createModule({...options,wasmBinary}),sdkFiles});
const browserTranslate=createTranslator({analyze:wasm,sdkRoots:browserSdkRoots});
const nativeTranslate=createTranslator({analyze,sdkRoots});
for(const [name,source] of Object.entries(cases))test('Wasm vs native reading: '+name,async()=>{
  const start=performance.now();
  const actual=await browserTranslate({source});
  const ms=performance.now()-start;
  // Emscripten propagates intentional C diagnostic exit codes to Node.
  // They are asserted below, rather than treated as runner failures.
  process.exitCode=0;
  const expected=await nativeTranslate({source});
  assert.equal(actual.original.analysis.valid,expected.original.analysis.valid);
  assert.equal(actual.original.reading.text,expected.original.reading.text);
  assert.equal(actual.expanded.reading.text,expected.expanded.reading.text);
  assert.deepEqual(actual.original.reading.segments.map(s=>({text:s.text,ranges:s.ranges})),expected.original.reading.segments.map(s=>({text:s.text,ranges:s.ranges})));
  measurements.push({name,milliseconds:Math.round(ms),valid:actual.original.analysis.valid,compiler:actual.facts.compiler});
});
test('record runtime measurements',async()=>{
  await writeFile(new URL('../wasm/measurements.json',import.meta.url),JSON.stringify({environment:'Node.js WebAssembly; not browser QA',wasmBytes:wasmBinary.length,cases:measurements},null,2)+'\n');
});
