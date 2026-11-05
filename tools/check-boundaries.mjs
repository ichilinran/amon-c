import {loadBrowserResources} from '../src/runtime/resources.js';
import {readFile,writeFile} from 'node:fs/promises';
import {gunzipSync} from 'node:zlib';
import createModule from '../wasm/out/shi-clang.mjs';
import {createWasmAnalyzer,browserSdkRoots} from '../src/runtime/wasm-runtime.js';
import {createTranslator} from '../src/translator.js';
import {analyze,sdkRoots} from '../tests/native-runtime.mjs';
const cases=JSON.parse(await readFile(new URL('../examples/boundary-cases.json',import.meta.url),'utf8'));
const wasmBinary=await readFile(new URL('../wasm/out/shi-clang.wasm',import.meta.url));
const sdkFiles=JSON.parse(gunzipSync(await readFile(new URL('../wasm/out/sdk.json.gz',import.meta.url))));
const optimized=process.argv.includes('--optimized');
const resources=optimized?await loadBrowserResources({fetcher:async url=>new Response(await readFile(url))}):null;
const wasm=createTranslator({analyze:createWasmAnalyzer(resources?{createModule:o=>createModule(resources.createModuleOptions(o)),sdkFiles:resources.sdkFiles,resolveSdk:resources.resolveSdk}:{createModule:o=>createModule({...o,wasmBinary}),sdkFiles}),sdkRoots:browserSdkRoots});
const output=new URL(optimized?'../coverage/boundary-optimized-results.json':'../coverage/boundary-results.json',import.meta.url);
const native=createTranslator({analyze,sdkRoots});
const repair=process.argv.includes('--repair');
const previous=repair?JSON.parse(await readFile(output,'utf8')):[];
const rows=repair?[...previous]:[];
for(const [i,c] of cases.entries()){
 const old=previous.find(r=>r.group===c.group&&r.id===c.id);
 if(repair&&old?.status==='equal'&&(old.valid===old.legacyValid||old.valid===true&&old.legacyValid===false))continue;
 const row={group:c.group,id:c.id};
 try {
  if(c.requiresExternalHeader){row.status='blocked';row.reason='Original fixture used an external temporary include directory whose header bytes are absent.';if(repair){const at=rows.findIndex(r=>r.group===row.group&&r.id===row.id);rows[at]=row;}else rows.push(row);continue;}
  const request={source:c.source,args:c.args,...(c.files?{files:c.files}:{})};
  const [a,e]=await Promise.all([wasm(request),native(request)]);process.exitCode=0;
  const segment=r=>r.segments.map(s=>({text:s.text,ranges:s.ranges}));
  const equal=a.original.reading.text===e.original.reading.text&&a.expanded.reading.text===e.expanded.reading.text&&JSON.stringify(segment(a.original.reading))===JSON.stringify(segment(e.original.reading))&&a.original.analysis.valid===e.original.analysis.valid;
  row.status=equal?'equal':'different';row.valid=a.original.analysis.valid;row.legacyValid=c.legacyValid;row.metrics=a.metrics;
  if(!equal && a.original.reading.text===e.original.reading.text && JSON.stringify(segment(a.original.reading))===JSON.stringify(segment(e.original.reading)) && row.valid===e.original.analysis.valid){
    const times=facts=>facts.tokens.filter(t=>t.location.originChain?.some(p=>p.name==='__TIME__')).map(t=>t.text);
    const at=times(a.facts),et=times(e.facts);
    if(at.length===1&&et.length===1&&/^"[0-9]{2}:[0-9]{2}:[0-9]{2}"$/.test(at[0])&&/^"[0-9]{2}:[0-9]{2}:[0-9]{2}"$/.test(et[0])&&a.expanded.reading.text.replaceAll(at[0],'"ANALYSIS_TIME"')===e.expanded.reading.text.replaceAll(et[0],'"ANALYSIS_TIME"')){row.status='clock-dependent';row.runtimeValues={wasm:at[0],native:et[0]};}
  }
  if(!equal&&row.status==='different')row.difference={wasm:a.original.reading.text,native:e.original.reading.text,wasmExpanded:a.expanded.reading.text,nativeExpanded:e.expanded.reading.text};
 }catch(error){row.status='error';row.error=error.message;}
 if(repair){const at=rows.findIndex(r=>r.group===row.group&&r.id===row.id);if(at>=0)rows[at]=row;else rows.push(row);}else rows.push(row);
 if((i+1)%25===0){await writeFile(output,JSON.stringify(rows,null,2)+'\n');console.log(`${i+1}/${cases.length}`);}
}
await writeFile(output,JSON.stringify(rows,null,2)+'\n');
const counts=rows.reduce((out,r)=>(out[r.status]=(out[r.status]??0)+1,out),{});
console.log(JSON.stringify(counts));process.exitCode=counts.error||counts.different?1:0;
