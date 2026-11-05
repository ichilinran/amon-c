import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {loadBrowserResources} from '../src/runtime/resources.js';
import {createWasmAnalyzer,browserSdkRoots} from '../src/runtime/wasm-runtime.js';
import {createTranslator} from '../src/translator.js';
import {lineStarts} from '../src/ui/view.js';
import createModule from '../wasm/out/shi-clang.mjs';
const resources=await loadBrowserResources({fetcher:async url=>new Response(await readFile(url))});
const analyze=createWasmAnalyzer({createModule:o=>createModule(resources.createModuleOptions(o)),sdkFiles:resources.sdkFiles,resolveSdk:resources.resolveSdk});
const translate=createTranslator({analyze,sdkRoots:browserSdkRoots});
const lineAt=(source,at)=>source.slice(0,at).split('\n').length;

// Every C line gets exactly one number, in order, and each numbered output line
// really begins with text that came from that C line.
function check(view,label){
 const starts=lineStarts(view);
 assert.ok(starts,label+': numbering unavailable');
 assert.deepEqual([...starts.values()],Array.from({length:view.source.split('\n').length},(_,i)=>i+1),label);
 let at=0;const spans=view.segments.map(s=>{const r=[at,s];at+=s.text.length;return r;});
 for(const [pos,n] of starts){
  const hit=spans.find(([o,s])=>pos>=o&&pos<o+s.text.length);
  if(!hit)continue; // a final empty line has no text
  const [o,s]=hit,src=s.kind==='raw'?s.start+(pos-o):s.start;
  assert.equal(lineAt(view.source,src),n,label+': line '+n);
 }
 return view.segments.some(s=>s.operation==='split'||s.note==='mainの終わりの案内語');
}

test('支位 line numbers and output lines follow the original C lines without added layout lines',async()=>{
 const cases=JSON.parse(await readFile(new URL('../examples/boundary-cases.json',import.meta.url)));
 let views=0,inserted=0;
 for(const c of cases)for(const annotations of [true,false]){
  const r=await translate({source:c.source,args:c.args??[],display:{annotations}});process.exitCode=0;
  for(const v of r.views){assert.equal(v.reading.text.split('\n').length,v.analysis.source.split('\n').length,c.group+'/'+c.id);inserted+=check({source:v.analysis.source,segments:v.reading.segments},c.group+'/'+c.id)?1:0;views++;}
 }
 assert.ok(views>=900);assert.ok(inserted>0,'cases with added lines are covered');
});

test('declaration splitting and the main ending stay on their original numbered lines',async()=>{
 const source='int a, b;\nint main(void){\n  return a; }\n';
 const r=await translate({source});process.exitCode=0;
 const view={source,segments:r.original.reading.segments},starts=lineStarts(view);
 const text=r.original.reading.text,lines=text.split('\n');
 const numbered=new Map([...starts].map(([pos,n])=>[text.slice(0,pos).split('\n').length-1,n]));
 assert.equal(lines.length,4);
 assert.deepEqual([...numbered.entries()],[[0,1],[1,2],[2,3],[3,4]]);
 assert(text.includes('ｾｲｽｳ a ﾅﾘ; ｾｲｽｳ b ﾅﾘ;'));
 assert(text.includes('ｶｴｽﾉﾊ a ﾅﾘ; } ﾃﾞﾊ'));
});
