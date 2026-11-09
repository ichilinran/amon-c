import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import {Worker} from 'node:worker_threads';
import * as api from '../src/index.js';
import {lineStarts} from '../src/ui/view.js';
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
 const complete={files:{'input.c':'int main(void){return 0;}\n'},translationUnits:[{source:'input.c',args:[]}]};
 const source='int x = 3;\nreturn x * x;';
 const unknown='// 日本語\nUNKNOWN(1);\nreturn 0;';
 const atLimit='return 0; //'.padEnd(40000,' ');
 const body={files:{'body.c':source,'unknown.c':unknown,'void.c':'return;','pointer.c':'int *p = 0;\nreturn p;','limit.c':atLimit},
  translationUnits:['body.c','unknown.c','void.c','pointer.c','limit.c'].map(source=>({source,functionBody:true}))};
 const saved=await api.saveProject(body);
 assert.equal((await api.loadProject(saved)).project.translationUnits[0].functionBody,true);
 const project={files:{...complete.files,...body.files},translationUnits:[...complete.translationUnits,...body.translationUnits]};
 const result=new Promise((resolve,reject)=>{worker.once('message',resolve);worker.once('error',reject);worker.once('exit',code=>{if(code)reject(Error('Worker exit '+code));});});
 worker.postMessage({project});
 const r=await result;assert.equal(r.ok,true,r.error);assert.deepEqual(r.contextErrors,[]);
 assert(r.views.some(v=>v.source===complete.files['input.c']&&v.valid&&v.text.includes('ﾃﾞﾊ')&&v.segments.some(s=>s.role==='main-end')));
 const view=r.views.find(v=>v.source===source);
 assert.equal(view?.valid,true);
 assert.equal(view.text,'ｾｲｽｳ x = 3 ﾅﾘ;\nｶｴｽﾉﾊ x * x ﾅﾘ;');
 assert.deepEqual([...lineStarts(view).values()],[1,2]);
 assert(view.segments.every(s=>s.ranges.every(span=>span.start>=0&&span.end<=source.length)));
 const partial=r.views.find(v=>v.source===unknown);
 assert.equal(partial?.text,'// 日本語\nUNKNOWN(1);\nｶｴｽﾉﾊ 0 ﾅﾘ;');
 const reason=partial.reasons.find(r=>r.message.includes('unknown.c:2')&&r.message.includes('UNKNOWN'));
 assert.deepEqual(reason?.ranges.map(span=>unknown.slice(span.start,span.end)),['UNKNOWN(1)']);
 assert(r.views.some(v=>v.source==='return;'&&v.valid&&v.text==='ｶｴｽﾉﾊ ﾑﾅｼ ﾅﾘ;'));
 assert(r.views.some(v=>v.source===body.files['pointer.c']&&v.valid&&v.text.endsWith('ｶｴｽﾉﾊ p ﾅﾘ;')));
 assert(r.views.some(v=>v.source===atLimit&&v.valid&&v.text==='ｶｴｽﾉﾊ 0 ﾅﾘ;'+atLimit.slice('return 0;'.length)));
});
