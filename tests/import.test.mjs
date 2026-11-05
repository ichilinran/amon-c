import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {importSaved,saveImported} from '../src/project/import.js';
import {DEFAULT_WORDS} from '../src/vocabulary/reading-config.js';
import {translateAnalysis} from '../src/translation/native-reader.js';
const load=async name=>JSON.parse(await readFile(new URL('../examples/analysis/'+name+'.analysis.json',import.meta.url),'utf8'));
test('v1 analysis imports without inventing macro history or reanalyzing',async()=>{
 const data=await load('hello'),result=await importSaved(data);
 assert.equal(result.mode,'analysis');assert.equal(result.views.length,1);
 assert.equal(result.views[0].text,translateAnalysis(data.source,data).text);
 assert.deepEqual(result.views[0].macros,[]);
 const saved=saveImported(result,result.selection);
 assert.equal((await importSaved(saved)).views[0].text,result.views[0].text);
 const corrupt=structuredClone(data);corrupt.source+=' ';
 await assert.rejects(importSaved(corrupt));
});
test('v2 imports all contexts; expanded selection survives old learning save round-trip',async()=>{
 const data=await load('project-21'),result=await importSaved(data);
 assert.equal(result.views.length,16);
 const expanded=result.views.find(v=>v.key==='2:expanded');
 assert.ok(expanded.originAnchors.some(a=>a.length));assert.ok(expanded.macros.length);
 for(const anchors of expanded.originAnchors)for(const a of anchors){const target=result.views.find(v=>v.key===a.key);assert.ok(target);assert.ok(a.start>=0&&a.end<=target.source.length);}
 const saved=saveImported(result,expanded.key,{...DEFAULT_WORDS,int:'ﾃｽﾄｾｲｽｳ'},{annotations:false});
 const restored=await importSaved(JSON.parse(JSON.stringify(saved)));
 assert.equal(restored.selection,expanded.key);assert.equal(restored.words.int,'ﾃｽﾄｾｲｽｳ');assert.equal(restored.display.annotations,false);
 assert.ok(restored.views.some(v=>v.text.includes('ﾃｽﾄｾｲｽｳ')));
 const wrong=structuredClone(saved);wrong.source+=' ';
 await assert.rejects(importSaved(wrong),/原文/);
 const corrupt=structuredClone(data);corrupt.files.find(f=>f.text!==null).text+=' ';
 await assert.rejects(importSaved(corrupt));
});
test('old learning settings migrate known defaults and keep custom words',async()=>{
 const result=await importSaved({format:'c-kotoba-learning',version:1,vocabularyVersion:10,source:'int main(void){return 0;}\n',filename:'old.c',words:{...DEFAULT_WORDS,int:'ﾄﾞｸｼﾞｾｲｽｳ'},annotations:false});
 assert.equal(result.mode,'project');assert.equal(result.project.words.int,'ﾄﾞｸｼﾞｾｲｽｳ');assert.equal(result.project.display.annotations,false);
 await assert.rejects(importSaved({format:'c-kotoba-learning',version:1,vocabularyVersion:99,source:''}));
});
