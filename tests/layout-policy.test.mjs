import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {loadBrowserResources} from '../src/runtime/resources.js';
import {createWasmAnalyzer,browserSdkRoots} from '../src/runtime/wasm-runtime.js';
import {createTranslator} from '../src/translator.js';
import {importSaved} from '../src/project/import.js';
import {lineStarts} from '../src/ui/view.js';
import {codeColumn} from '../src/translation/declaration-layout.js';
import {DEFAULT_WORDS} from '../src/vocabulary/reading-config.js';
import createModule from '../wasm/out/shi-clang.mjs';
const resources=await loadBrowserResources({fetcher:async u=>new Response(await readFile(u))});
const translate=createTranslator({analyze:createWasmAnalyzer({createModule:o=>createModule(resources.createModuleOptions(o)),sdkFiles:resources.sdkFiles,resolveSdk:resources.resolveSdk}),sdkRoots:browserSdkRoots});
const rows=[];
async function run(id,source,extra={}){
 const r=await translate({source,...extra});process.exitCode=0;
 assert(r.original.analysis.valid,JSON.stringify(r.original.analysis.diagnostics));
 for(const v of r.views){
  assert(!v.reading.reasons.some(x=>x.code==='edit-conflict'),id);
  assert.deepEqual(v.reading.text.match(/\r\n|\r|\n/g),v.analysis.source.match(/\r\n|\r|\n/g),id+' physical newlines');
  const starts=lineStarts({source:v.analysis.source,segments:v.reading.segments});assert(starts,id+' line numbers');
  assert.deepEqual([...starts.values()],v.analysis.source.split('\n').map((_,i)=>i+1),id);
 }
 rows.push({id,source,args:extra.args??[],...(extra.words?{words:extra.words}:{}),...(extra.display?{display:extra.display}:{}),text:r.original.reading.text});
 return r.original.reading.text;
}

test('layout: one-line declarations and fields stay on the same line',async()=>{
 assert.equal(await run('one','int a,b;\n'),'ｾｲｽｳ a ﾅﾘ; ｾｲｽｳ b ﾅﾘ;\n');
 assert.equal(await run('fields','struct P { int x, y; };\n'),'ｺｳｿﾞｳﾀｲ P { ｾｲｽｳ x ﾅﾘ; ｾｲｽｳ y ﾅﾘ; } ﾅﾘ;\n');
 assert.equal(await run('no-guides','int a,b;\n',{display:{annotations:false}}),'ｾｲｽｳ a; ｾｲｽｳ b;\n');
});
test('layout: continuation declarations align with the first translated type',async()=>{
 assert.equal(await run('continuation','int a,\n    b,\n        c;\n'),'ｾｲｽｳ a ﾅﾘ;\nｾｲｽｳ b ﾅﾘ;\nｾｲｽｳ c ﾅﾘ;\n');
 assert.equal(await run('midline','struct P { int x,\n              y; };\n'),'ｺｳｿﾞｳﾀｲ P { ｾｲｽｳ x ﾅﾘ;\n            ｾｲｽｳ y ﾅﾘ; } ﾅﾘ;\n');
 const out=await run('prior-split','int a,b; int c,\n d;\n');assert.equal(out.split('\n')[1],' '.repeat(22)+'ｾｲｽｳ d ﾅﾘ;');
});
test('layout: tabs and custom wide words determine the rendered starting column',async()=>{
 const tabs=await run('tabs','void f(void){\n\tint a,\n\t\t b;\n}\n');assert(tabs.includes('\n\tｾｲｽｳ a ﾅﾘ;\n\tｾｲｽｳ b ﾅﾘ;'));
 const wide=await run('wide','struct P { int x,\n y; };\n',{words:{...DEFAULT_WORDS,struct:'漢字'}});assert.equal(wide.split('\n')[1],' '.repeat(9)+'ｾｲｽｳ y ﾅﾘ; } ﾅﾘ;');
 const emoji=await run('emoji','/*😀*/ struct P { int x,\n y; };\n');assert.equal(emoji.split('\n')[1],' '.repeat(19)+'ｾｲｽｳ y ﾅﾘ; } ﾅﾘ;');
 assert.equal(codeColumn('ｺｳｿﾞｳﾀｲ P { '),12);assert.equal(codeColumn('\t漢字'),8);assert.equal(codeColumn('😀'),2);
});
test('layout: comments remain once, on their original lines, before the copied type',async()=>{
 assert.equal(await run('comment','int a, /* first */\n    b;\n'),'ｾｲｽｳ a ﾅﾘ; /* first */\nｾｲｽｳ b ﾅﾘ;\n');
 assert.equal(await run('comment-before','int a,\n /* note */ b;\n'),'ｾｲｽｳ a ﾅﾘ;\n /* note */ ｾｲｽｳ b ﾅﾘ;\n');
 const line=await run('line-comment','int a, // first\n    b;\n');assert(line.includes('ｾｲｽｳ a ﾅﾘ; // first\nｾｲｽｳ b ﾅﾘ;'));
 const blank=await run('blank-comment','int a,\n /* keep\n here */\n    b;\n');assert(blank.includes('/* keep\n here */\nｾｲｽｳ b ﾅﾘ;'));
 const field=await run('comment-in-field','struct P { int a,\n /*c*/ b; };\n');assert.equal(field.split('\n')[1],' /*c*/'+' '.repeat(6)+'ｾｲｽｳ b ﾅﾘ; } ﾅﾘ;');
});
test('layout: CRLF is preserved and prototypes copy types before declaration guides',async()=>{
 assert.equal(await run('crlf','int a,\r\n    b;\r\n'),'ｾｲｽｳ a ﾅﾘ;\r\nｾｲｽｳ b ﾅﾘ;\r\n');
 assert.equal(await run('prototypes','int f(void),\n g(void);\n'),'ｾｲｽｳ ﾆﾃ f(ｳｹﾄﾙﾉﾊ ﾑﾅｼ ﾅﾘ) ﾅﾘ;\nｾｲｽｳ ﾆﾃ g(ｳｹﾄﾙﾉﾊ ﾑﾅｼ ﾅﾘ) ﾅﾘ;\n');
});
test('layout: for declarations and type definitions are not newly split',async()=>{
 const out=await run('for','void f(void){for(int a=0,b=1;a<b;a++){} }\n');assert(out.includes('ｾｲｽｳ a=0,b=1'));assert(!out.includes('ｾｲｽｳ b'));
 const tag=await run('tag','struct S {int x;} a,b;\n');assert(tag.includes('} a,b ﾅﾘ;'));
});
test('layout: one-line main and body/closing-brace sharing a line put the ending after the brace',async()=>{
 assert.equal(await run('main-one','int main(void) { return 0; }\n'),'ｾｲｽｳ ﾆﾃ ﾈｶﾞｲﾏｼﾃﾊ(ｳｹﾄﾙﾉﾊ ﾑﾅｼ ﾅﾘ) { ｶｴｽﾉﾊ 0 ﾅﾘ; } ﾃﾞﾊ\n');
 const out=await run('main-body-close','int main(void)\n{\n    return 0; } // end\n');assert(out.endsWith('    ｶｴｽﾉﾊ 0 ﾅﾘ; } ﾃﾞﾊ // end\n'));
});
test('layout: main ending precedes line comments and skips comment-only lines',async()=>{
 const end=await run('main-comment','int main(void)\n{\n    return 0; // done\n}\n');assert(end.includes('    ｶｴｽﾉﾊ 0 ﾅﾘ; ﾃﾞﾊ // done\n}'));
 const only=await run('main-comment-only','int main(void)\n{\n    return 0;\n    // done\n/* tail */ }\n');assert(only.includes('    ｶｴｽﾉﾊ 0 ﾅﾘ; ﾃﾞﾊ\n    // done\n/* tail */ }'));
});
test('layout: empty main, trailing directives, macros and line continuation use the closing boundary',async()=>{
 const empty=await run('main-empty','int main(void)\n{\n}\n');assert(empty.endsWith('} ﾃﾞﾊ\n'));
 for(const args of [[],['-DX']]){
  const pp=await run('main-pp'+args.length,'int main(void)\n{\n#ifdef X\n return 1;\n#endif\n}\n',{args});assert(pp.endsWith('} ﾃﾞﾊ\n'));
 }
 const macro=await run('main-macro','#define RET return 0\nint main(void)\n{\n RET;\n}\n');assert(macro.endsWith('} ﾃﾞﾊ\n'));assert(!macro.includes('RET; ﾃﾞﾊ'));
 const splice=await run('main-splice','int main(void)\n{\n return 0; \\\n //done\n}\n');assert(splice.endsWith('} ﾃﾞﾊ\n'));
});
test('layout: main ending supports digraphs, strings containing braces, and annotation-off mode',async()=>{
 const digraph=await run('main-digraph','int main(void)<%return 0;%>\n');assert(digraph.endsWith(';%> ﾃﾞﾊ\n'));
 const str=await run('main-string','int main(void){char *s="} //";return s[0];}\n');assert(str.includes('"} //"'));assert(str.endsWith(';} ﾃﾞﾊ\n'));
 const off=await run('main-off','int main(void){return 0;}\n',{display:{annotations:false}});assert(!off.includes('ﾃﾞﾊ'));assert.equal(off,'ｾｲｽｳ ﾈｶﾞｲﾏｼﾃﾊ(ﾑﾅｼ){ｶｴｽﾉﾊ 0;}\n');
});
test('layout: saved compiler facts render the new ending and preserve caller-owned data',async()=>{
 const data=JSON.parse(await readFile(new URL('./fixtures/legacy-reading-document.json',import.meta.url)));const before=JSON.stringify(data);
 const r=await importSaved(data),v=r.views.find(v=>v.key==='0:source:1');assert(v.text.endsWith(';} ﾃﾞﾊ\n'));assert(v.text.includes('/* ｛〈（）〉｝ */'));
 assert.equal(v.text.split('\n').length,v.source.split('\n').length);assert(lineStarts(v));assert.equal(JSON.stringify(data),before);
});
if(process.env.SHI_LAYOUT_OBSERVATIONS)test.after(async()=>writeFile(process.env.SHI_LAYOUT_OBSERVATIONS,JSON.stringify(rows,null,2)+'\n'));
