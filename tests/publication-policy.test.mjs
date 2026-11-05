import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {buildMainDocs} from '../tools/build-main-docs.mjs';
import {segmentClass} from '../src/ui/view.js';
import {loadBrowserResources} from '../src/runtime/resources.js';
import {createWasmAnalyzer,browserSdkRoots} from '../src/runtime/wasm-runtime.js';
import {createTranslator} from '../src/translator.js';
import {importSaved} from '../src/project/import.js';
import createModule from '../wasm/out/shi-clang.mjs';
const read=name=>readFile(new URL('../'+name,import.meta.url));
const resources=await loadBrowserResources({fetcher:async u=>new Response(await readFile(u))});
const translate=createTranslator({analyze:createWasmAnalyzer({createModule:o=>createModule(resources.createModuleOptions(o)),sdkFiles:resources.sdkFiles,resolveSdk:resources.resolveSdk}),sdkRoots:browserSdkRoots});
const run=async source=>{const r=await translate({source});process.exitCode=0;assert(r.original.analysis.valid,JSON.stringify(r.original.analysis.diagnostics));return r.original;};

test('publication: current README five examples match actual Wasm output',async()=>{
 const text=(await read('README.md')).toString(),blocks=[...text.matchAll(/```(c|text)\n([\s\S]*?)```/g)];
 assert.equal(blocks.length,10);
 for(let i=0;i<blocks.length;i+=2){assert.equal(blocks[i][1],'c');assert.equal(blocks[i+1][1],'text');assert.equal((await run(blocks[i][2])).reading.text.trimEnd(),blocks[i+1][2].trimEnd());}
});
test('publication: approved RULES examples exist and match actual output',async()=>{
 const text=(await read('RULES.md')).toString(),rows=JSON.parse(await read('tests/fixtures/documentation-examples.json'));
 for(const row of rows){assert(text.includes('```text\n'+row.input+'\n↓\n'+row.expected+'\n```'),row.id+' present');const v=await run(row.source);assert(v.reading.text.includes(row.expected+'\n'),row.id+'\n'+v.reading.text);}
});
test('publication: only main ending guide uses the existing function yellow',async()=>{
 for(const source of ['int main(void){return 0;} // ﾃﾞﾊ\n','int main(void)\n{\nreturn 0; // done\n}\n','int main(void){}\n']){
  const v=await run(source),view={source:v.analysis.source};
  const main=v.reading.segments.find(s=>s.kind==='translation'&&s.text==='ﾈｶﾞｲﾏｼﾃﾊ');
  const ending=v.reading.segments.find(s=>s.role==='main-end');
  assert(main);assert(ending);assert.equal(segmentClass(view,main),'c-function');assert.equal(segmentClass(view,ending),'c-function');
  assert.equal(segmentClass(view,{...ending,text:' CUSTOM '}),'c-function');
  assert.equal(segmentClass(view,{...ending,note:'Changed explanatory text'}),'c-function');
  assert.equal(segmentClass(view,{...ending,role:undefined}),'s-guide');
  for(const s of v.reading.segments.filter(s=>s.kind==='annotation'&&s!==ending))assert.equal(segmentClass(view,s),'s-guide');
 }
 const html=(await read('index.html')).toString();assert(html.includes('--c-function:#f3e35b'));assert(html.includes('.c-function{color:var(--c-function)}'));
 const saved=JSON.parse(await read('tests/fixtures/legacy-reading-document.json')),before=JSON.stringify(saved),r=await importSaved(saved);process.exitCode=0;
 assert.equal(JSON.stringify(saved),before);
 // Import returns displayed views; the same role-based rule applies to saved data.
 const views=r.views??r.document?.views;assert(views);
 assert(views.some(v=>v.segments?.some(s=>s.role==='main-end'&&segmentClass(v,s)==='c-function')));
});
test('publication: frozen published metadata and image are carried into source',async()=>{
 const expected=JSON.parse(await read('tests/fixtures/publication-metadata.json')),html=(await read('index.html')).toString();
 assert(html.includes('<title>'+expected.title+'</title>'));
 for(const meta of expected.meta)assert(html.includes(meta),meta);
 assert.equal(createHash('sha256').update(await read('ogp.png')).digest('hex'),expected.ogp_sha256);
 const policy=JSON.parse(await read('release/file-policy.json'));assert(policy.pagesAssets.includes('ogp.png'));assert(policy.manualAssetEdges.some(e=>e.from==='index.html'&&e.to==='ogp.png'));
 const status=JSON.parse(await read('compliance/release-status.json'));assert.equal(status.publicReleaseCleared,false);assert.equal(status.candidate.published,false);assert(status.evidence.includes('compliance/project-license.json'));
});

test('publication: public-main documents have only valid links and no development history',async()=>{
 const report=await buildMainDocs();assert.equal(report.status,'passed');assert.equal(report.files.length,5);assert.equal(report.published,false);
 const limited=(await read('LIMITATIONS.md')).toString(),rules=(await read('RULES.md')).toString(),main=(await read('build/public-main/README.md')).toString();
 assert(limited.includes('## 8. 画面の表示について'));assert(limited.includes('HTTPS'));
 assert(!/v\d+\.\d+|第\s*[\d一二三四五六七八九十]+\s*段階|(?:第三者)?レビュー|(?:確認|作業)記録|関連\s*\d+\s*検査/.test(limited));
 const headings=[...limited.matchAll(/^## (\d+)\. .+$/gm)];assert.deepEqual(headings.map(m=>Number(m[1])),[1,2,3,4,5,6,7,8]);assert.equal((limited.match(/^## /gm)??[]).length,8);
 assert(!rules.includes('黄色'));assert(!rules.includes('## 保存済み解析の表示'));
 assert(rules.includes('次の例は、`DEBUG` が定義されている場合です。'));
 assert(!main.includes('## ソースから配信候補を生成する'));assert(!main.includes('docs/DEVELOPMENT.md'));assert(!main.includes('LICENSE-SCOPE.md'));
 assert(limited.includes('読込み元の保存データも変更しません'));
});
