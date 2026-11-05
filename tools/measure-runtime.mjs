import {readFile} from 'node:fs/promises';
import {gunzipSync} from 'node:zlib';
import {performance} from 'node:perf_hooks';
import createModule from '../wasm/out/shi-clang.mjs';
import {createTranslator} from '../src/translator.js';
import {createWasmAnalyzer,browserSdkRoots} from '../src/runtime/wasm-runtime.js';
import {loadBrowserResources} from '../src/runtime/resources.js';
import cases from '../tests/cases.mjs';
const mode=process.argv[2],start=performance.now();let analyzer;
if(mode==='optimized'){
 const resources=await loadBrowserResources({fetcher:async url=>new Response(await readFile(url))});
 analyzer=createWasmAnalyzer({createModule:o=>createModule(resources.createModuleOptions(o)),sdkFiles:resources.sdkFiles,resolveSdk:resources.resolveSdk});
}else{
 const wasmBinary=await readFile(new URL('../wasm/out/shi-clang.wasm',import.meta.url));
 const sdkFiles=JSON.parse(gunzipSync(await readFile(new URL('../wasm/out/sdk.json.gz',import.meta.url))));
 analyzer=createWasmAnalyzer({createModule:o=>createModule({...o,wasmBinary}),sdkFiles});
}
const setup=performance.now()-start;
const translate=createTranslator({analyze:analyzer,sdkRoots:browserSdkRoots});
const timings=[],metrics=[];
for(let i=0;i<2;i++){const at=performance.now();const r=await translate({source:cases.allHeaders});if(!r.original.analysis.valid)throw new Error('Expected valid C');timings.push(Math.round(performance.now()-at));metrics.push(r.metrics);}
console.log(JSON.stringify({mode,setupMilliseconds:Math.round(setup),analysisMilliseconds:timings,metrics,maxRssKiB:process.resourceUsage().maxRSS,node:process.version,environment:'Linux Node, local asset reads; not network or smartphone measurements'}));
