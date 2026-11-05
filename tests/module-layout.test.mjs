import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import {Worker} from 'node:worker_threads';
import * as api from '../src/index.js';
import createModule from '../wasm/out/shi-clang.mjs';

test('module layout: public API loads the same resources and translates a project',async()=>{
 const seen=[];
 const resources=await api.loadBrowserResources({fetcher:async url=>{seen.push(url.pathname);return new Response(await readFile(url));}});
 assert(seen.every(p=>p.includes('/wasm/out/')));
 const translate=api.createProjectTranslator({analyze:api.createWasmAnalyzer({createModule:o=>createModule(resources.createModuleOptions(o)),sdkFiles:resources.sdkFiles,resolveSdk:resources.resolveSdk}),sdkRoots:api.browserSdkRoots});
 const project={files:{'input.c':'int main(void){return 0;}\n'},translationUnits:[{source:'input.c',args:[]}]};
 const r=await translate(project);process.exitCode=0;assert.equal(r.contextErrors.length,0);assert.equal(r.contexts[0].original.analysis.valid,true);
 assert.equal(r.contexts[0].original.reading.text,'ｾｲｽｳ ﾆﾃ ﾈｶﾞｲﾏｼﾃﾊ(ｳｹﾄﾙﾉﾊ ﾑﾅｼ ﾅﾘ){ｶｴｽﾉﾊ 0 ﾅﾘ;} ﾃﾞﾊ\n');
 const saved=await api.saveProject(r.project),before=JSON.stringify(saved);const loaded=await api.loadProject(saved);assert(loaded);assert.equal(JSON.stringify(saved),before);
});

test('module layout: HTML, UI Worker URL and Worker resource loading connect', {timeout:30000},async t=>{
 const html=await readFile(new URL('../index.html',import.meta.url),'utf8');assert(html.includes('src="./src/ui/main.js"'));
 const main=await readFile(new URL('../src/ui/main.js',import.meta.url),'utf8');assert(main.includes("new Worker(new URL('../runtime/worker.js',import.meta.url)"));
 const workerUrl=new URL('../src/runtime/worker.js',import.meta.url);await access(workerUrl);
 // Node harness supplies browser-style messaging and file-backed fetch only.
 // This executes the actual Worker module; it is not a browser/DOM test.
 const script=`import {parentPort} from 'node:worker_threads';import {readFile} from 'node:fs/promises';globalThis.fetch=async u=>new Response(await readFile(u));globalThis.self={postMessage:r=>parentPort.postMessage(r)};await import(${JSON.stringify(workerUrl.href)});parentPort.on('message',data=>self.onmessage({data}));`;
 const worker=new Worker(new URL('data:text/javascript,'+encodeURIComponent(script)));t.after(()=>worker.terminate());
 const result=new Promise((resolve,reject)=>{worker.once('message',resolve);worker.once('error',reject);worker.once('exit',code=>{if(code)reject(Error('Worker exit '+code));});});
 worker.postMessage({project:{files:{'input.c':'int main(void){return 0;}\n'},translationUnits:[{source:'input.c',args:[]}]}});
 const r=await result;assert.equal(r.ok,true,r.error);assert.equal(r.valid,true);assert(r.views.some(v=>v.text.includes('ﾃﾞﾊ')&&v.segments.some(s=>s.role==='main-end')));
});
