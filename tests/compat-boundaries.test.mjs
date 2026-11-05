import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {lex} from '../src/translation/lexical.js';
import {translate,validateEntries,migrateV1,DEFAULT_ENTRIES} from '../src/compat/lexical.js';
import {restoreWords} from '../src/compat/word-settings.js';
import {LEGACY_V10_WORDS} from '../src/compat/vocabulary-v10.js';
import {DEFAULT_WORDS,validateWords,VOCABULARY_VERSION} from '../src/vocabulary/settings.js';
import {readLearningSave} from '../src/compat/learning-save.js';
import {importSaved,saveImported,saveProject,loadProject} from '../src/index.js';
import {normalizeProject} from '../src/project/input.js';

test('compat: current tokenizer is independent of old dictionaries and legacy replacement is retained',async()=>{
 const code=await readFile(new URL('../src/translation/lexical.js',import.meta.url),'utf8');assert(!code.includes('compat/'));assert(!code.includes('DEFAULT_ENTRIES'));assert(!code.includes('migrateV1'));
 assert.equal(lex('int a; // unchanged').tokens.find(t=>t.logical==='int').category,'keyword');
 const entries=validateEntries([{source:'int',target:'ｾｲｽｳ',kind:'identifier'}]);assert(translate('int x;',entries).text.includes('ｾｲｽｳ'));assert.equal(DEFAULT_ENTRIES.length>100,true);
 const migrated=migrateV1([{source:'int',target:'ﾄﾞｸｼﾞ',kind:'identifier'}]);assert(migrated.some(e=>e.source==='int'&&e.target==='ﾄﾞｸｼﾞ'));
});
test('compat: settings migration preserves custom values and validates input',()=>{
 assert.equal(VOCABULARY_VERSION,12);
 const input={...LEGACY_V10_WORDS,int:'ﾄﾞｸｼﾞ'};const before=JSON.stringify(input),words=restoreWords(input,10);assert.equal(words.int,'ﾄﾞｸｼﾞ');assert.equal(JSON.stringify(input),before);
 assert.deepEqual(restoreWords(DEFAULT_WORDS,12),DEFAULT_WORDS);assert.equal(validateWords({int:' ﾄﾞｸｼﾞ '}).int,'ﾄﾞｸｼﾞ');assert.throws(()=>restoreWords({bad:'x'},10));
});
test('compat: old learning input is normalized without editing the caller data',async()=>{
 const data=Object.freeze({format:'c-kotoba-learning',version:1,vocabularyVersion:10,source:'int n;\n',filename:'old.c',words:Object.freeze({int:'ﾄﾞｸｼﾞ'}),annotations:false});
 const before=JSON.stringify(data),state=readLearningSave(data),result=await importSaved(data);
 assert.deepEqual(result,state.projectResult);assert.equal(result.project.words.int,'ﾄﾞｸｼﾞ');assert.equal(result.project.display.annotations,false);assert.equal(JSON.stringify(data),before);
 await assert.rejects(importSaved({...data,version:2}),/旧学習保存形式/);await assert.rejects(importSaved({...data,analysis:{},analysisDocument:{}}),/重複/);
});
test('compat: current project save stays at its existing format and vocabulary version',async()=>{
 const input=normalizeProject({files:{'input.c':'int main(void){return 0;}\n'},translationUnits:[{source:'input.c',args:[]}],words:{...DEFAULT_WORDS,int:'ﾄﾞｸｼﾞ'}});
 const saved=await saveProject(input,'0:source:1');assert.equal(saved.format,'shi-browser-project');assert.equal(saved.version,1);assert.equal(saved.vocabularyVersion,12);
 const before=JSON.stringify(saved),result=await loadProject(saved);assert.deepEqual(result.project,input);assert.equal(JSON.stringify(saved),before);
 await assert.rejects(loadProject({...saved,sha256:'0'.repeat(64)}),/確認値/);
});
test('compat: saved analysis still round-trips through the legacy serializer with no reanalysis',async()=>{
 const data=JSON.parse(await readFile(new URL('./fixtures/legacy-reading-document.json',import.meta.url)));const before=JSON.stringify(data),result=await importSaved(data);
 const saved=saveImported(result,result.selection),serialized=JSON.stringify(saved),again=await importSaved(saved);
 assert.equal(saved.format,'c-kotoba-learning');assert.equal(saved.version,1);assert.deepEqual(again.views,result.views);assert.equal(JSON.stringify(saved),serialized);assert.equal(JSON.stringify(data),before);
});
