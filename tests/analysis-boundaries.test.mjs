import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {loadBrowserResources} from '../src/runtime/resources.js';
import {createWasmAnalyzer,browserSdkRoots} from '../src/runtime/wasm-runtime.js';
import {createTranslator,createProjectTranslator,runProjectContexts} from '../src/translator.js';
import {contextSurfaces} from '../src/project/surfaces.js';
import {checkReadingView} from '../src/project/analysis-format.js';
import {DEFAULT_WORDS} from '../src/vocabulary/reading-config.js';
import createModule from '../wasm/out/shi-clang.mjs';

const resources=await loadBrowserResources({fetcher:async url=>new Response(await readFile(url))});
const analyze=createWasmAnalyzer({createModule:o=>createModule(resources.createModuleOptions(o)),sdkFiles:resources.sdkFiles,resolveSdk:resources.resolveSdk});
const dependencies={analyze,sdkRoots:browserSdkRoots};
const translate=createTranslator(dependencies);
const reading=async request=>{const result=await translate(request);process.exitCode=0;assert.equal(result.original.analysis.valid,true);return result;};
const functionSource=name=>`int ${name}(int n,...){va_list ap;va_start(ap,n);int r=va_arg(ap,int);va_end(ap);return r;}\n`;
const typeAt=(source,from=0)=>source.indexOf('va_arg(ap,int)',from)+'va_arg(ap,'.length;
const replacementAt=(result,at)=>result.original.reading.segments.find(s=>s.kind==='translation'&&s.ranges?.some(r=>r.start===at&&r.end===at+3))?.text;

test('F1: valid 1135-character macro source retains original when expanded output exceeds its own budget',async()=>{
 const source='#define S "'+'a'.repeat(100)+'"\nconst char *s[] = {'+'S,'.repeat(500)+'};\n';
 const r=await reading({source});
 assert.equal(source.length,1135);assert.equal(r.facts.truncated,false);
 assert.equal(r.expanded,null);assert.equal(r.expandedIssue.code,'expanded-output-limit');
 assert.ok(r.original.reading.text.includes(DEFAULT_WORDS.char));
 const surfaces=contextSurfaces({id:0,unit:{source:'input.c'},...r});
 assert.equal(surfaces.length,1);assert.equal(surfaces[0].source,source);
 assert.ok(surfaces[0].issues.includes(r.expandedIssue.message));
 assert.ok(surfaces[0].segments.filter(s=>s.kind==='translation').every(s=>s.ranges.every(a=>source.slice(a.start,a.end).length>0)));
});

test('F1: two individually valid headers retain all physical views when the combined expansion is too long',async()=>{
 const files={'input.c':'#include "one.h"\n#include "two.h"\nint f(void){return 0;}\n','one.h':'static const char *a[]={'+('"'+'a'.repeat(1000)+'",').repeat(21)+'};\n','two.h':'static const char *b[]={'+('"'+'b'.repeat(1000)+'",').repeat(21)+'};\n'};
 const r=await reading({files,entry:'input.c'});
 assert.equal(r.views.length,3);assert.equal(r.expanded,null);
 assert.equal(r.expandedIssue.code,'expanded-output-limit');
 for(const view of r.views)assert.equal(view.analysis.valid,true);
 assert.ok(r.original.reading.text.includes(DEFAULT_WORDS.return));
});

test('expanded output budget has an exact boundary and does not mask unexpected projection failures',async()=>{
 const request={source:'int f(void){return 0;}\n'};
 const base=await reading(request),length=base.expanded.analysis.source.length;
 const exact=await createTranslator({...dependencies,expandedCharacterLimit:length})(request);process.exitCode=0;
 assert.ok(exact.expanded);assert.equal(exact.expandedIssue,null);
 const below=await createTranslator({...dependencies,expandedCharacterLimit:length-1})(request);process.exitCode=0;
 assert.equal(below.expanded,null);assert.equal(below.expandedIssue.code,'expanded-output-limit');
 // A broken optional report is explicitly flagged; it is never called a size limit.
 const captured=await analyze(request);process.exitCode=0;
 const broken={...captured,native:{...captured.native,tokens:[{text:null}]}};
 const r=await createTranslator({...dependencies,analyze:async()=>broken})(request);
 assert.ok(r.original.reading.text.includes(DEFAULT_WORDS.return));
 assert.equal(r.expanded,null);assert.equal(r.expandedIssue.code,'expanded-view-failed');
});

test('F2: future define/undef cannot change an earlier va_arg type or its original anchor',async()=>{
 const source='#include <stdarg.h>\n'+functionSource('f');
 const before=await reading({source});
 const after=await reading({source:source+'#define int long\n#undef int\n'});
 const at=typeAt(source);
 assert.equal(replacementAt(before,at),DEFAULT_WORDS.int);
 assert.equal(replacementAt(after,at),DEFAULT_WORDS.int);
 assert.equal(after.expanded.reading.text,before.expanded.reading.text);
 assert.deepEqual(after.original.analysis.keywordMacroUses,[]);
});

test('F2: actual keyword macro use remains raw; undef restores later type translation',async()=>{
 const first=functionSource('first'),second=functionSource('second');
 const source='#include <stdarg.h>\n#define int long\n'+first+'#undef int\n'+second;
 const r=await reading({source});
 assert.equal(replacementAt(r,typeAt(source)),undefined);
 assert.equal(replacementAt(r,typeAt(source,source.indexOf('#undef'))),DEFAULT_WORDS.int);
 const use=r.original.analysis.keywordMacroUses.find(m=>m.start===typeAt(source));
 assert.equal(use.name,'int');assert.ok(r.facts.definitions.some(d=>d.id===use.definitionId&&d.name==='int'));
 const corrupt=structuredClone(r.original.analysis);corrupt.keywordMacroUses[0].end++;
 assert.throws(()=>checkReadingView(corrupt));
});

test('F2: repeated header instances and inactive definitions do not contaminate the next occurrence',async()=>{
 const source='#include <stdarg.h>\n#define KEY_ON\n#include "key.h"\n'+functionSource('first')+'#undef KEY_ON\n#include "key.h"\n'+functionSource('second')+'#if 0\n#define int short\n#endif\n';
 const r=await reading({files:{'input.c':source,'key.h':'#ifdef KEY_ON\n#define int long\n#else\n#undef int\n#endif\n'},entry:'input.c'});
 assert.equal(replacementAt(r,typeAt(source)),undefined);
 assert.equal(replacementAt(r,typeAt(source,source.indexOf('#undef KEY_ON'))),DEFAULT_WORDS.int);
 const headers=r.views.filter(v=>v.file.endsWith('/key.h'));
 assert.equal(headers.length,2);assert.notEqual(headers[0].instance,headers[1].instance);
});

test('F2: command-line keyword macros and Unicode source offsets are respected',async()=>{
 const source='/* 日本語😀 */\n#include <stdarg.h>\n'+functionSource('f');
 const r=await reading({source,args:['-Dint=long']});
 assert.equal(replacementAt(r,typeAt(source)),undefined);
 assert.ok(r.original.analysis.keywordMacroUses.some(m=>m.start===typeAt(source)));
});

test('project contexts keep previous results and continue after a translation or consumer failure',async()=>{
 const project={files:{'input.c':'int f(void){return 0;}'},translationUnits:[{source:'input.c'},{source:'input.c',args:['-DBROKEN']},{source:'input.c'}]};
 const captured=await analyze({source:project.files['input.c']});process.exitCode=0;
 const result=await createProjectTranslator({...dependencies,analyze:async request=>{
  if(request.args.includes('-DBROKEN'))throw new Error('test analysis failure');return captured;
 }})(project);
 assert.deepEqual(result.contexts.map(c=>c.id),[0,2]);
 assert.deepEqual(result.contextErrors.map(e=>[e.id,e.code]),[[1,'context-analysis-failed']]);
 const seen=[];
 const failures=await runProjectContexts(project,async()=>({}),context=>{if(context.id===1)throw new Error('surface failure');seen.push(context.id);});
 assert.deepEqual(seen,[0,2]);assert.equal(failures[0].message,'surface failure');
});
