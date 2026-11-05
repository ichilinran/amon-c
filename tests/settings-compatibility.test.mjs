import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {DEFAULT_WORDS,restoreWords,VOCABULARY_VERSION} from '../src/vocabulary/reading-config.js';
import {LEGACY_V11_WORDS} from '../src/compat/vocabulary-v11.js';
import {CALL_PROFILES} from '../src/translation/usage-profiles.js';
import {translateAnalysis} from '../src/translation/native-reader.js';
import {planUsageReadings,argumentSpecs} from '../src/translation/usage-reading.js';
import {lex} from '../src/translation/lexical.js';
const changes=JSON.parse(fs.readFileSync(new URL('./fixtures/settings-migration.json',import.meta.url)));
const expectations=JSON.parse(fs.readFileSync(new URL('./fixtures/settings-expectations.json',import.meta.url)));
test('registered defaults and all argument parameters match fixed expectations',()=>{
 assert.equal(changes.length,95);assert.equal(Object.keys(DEFAULT_WORDS).length,1213);assert.deepEqual(DEFAULT_WORDS,expectations.words);
 assert.deepEqual(Object.keys(DEFAULT_WORDS).filter(k=>DEFAULT_WORDS[k]!==LEGACY_V11_WORDS[k]).sort(),changes.map(c=>c.key).sort());
 for(const c of changes){assert.equal(LEGACY_V11_WORDS[c.key],c.before);assert.equal(DEFAULT_WORDS[c.key],c.after);}
 for(const [key,p] of Object.entries(CALL_PROFILES)){
  const expected=expectations.parameters[key];
  assert.deepEqual(p.parameters,expected,key);
 }
});
test('saved default settings migrate; custom and current settings survive',()=>{
 assert.equal(VOCABULARY_VERSION,12);assert.deepEqual(restoreWords(LEGACY_V11_WORDS,11),DEFAULT_WORDS);
 for(const c of changes){const custom={...LEGACY_V11_WORDS,[c.key]:'ﾄﾞｸｼﾞﾉﾖﾐ'};assert.equal(restoreWords(custom,11)[c.key],'ﾄﾞｸｼﾞﾉﾖﾐ');}
 assert.deepEqual(restoreWords(DEFAULT_WORDS,12),DEFAULT_WORDS);
});
test('rounding profiles now distinguish noun and verb calls for object supplements',()=>{
 for(const name of ['ceil','floor','nearbyint'])for(const suffix of ['', 'f','l']){
  const p=CALL_PROFILES['library:'+name+suffix];
  assert.equal(argumentSpecs(p,['x'])[0].suffix,'ｦ');
  assert.equal(argumentSpecs(p,['call()'],{isVerbCall:()=>true})[0].suffix,'');
  assert.equal(argumentSpecs(p,['call()'],{isVerbCall:()=>false})[0].suffix,'ｦ');
 }
});
test('statement exceptions remain bound-name and standalone only',()=>{
 for(const name of ['raise','thrd_yield'])for(const [prefix,kind,expected] of [['','CALL_EXPR',true],['r = ','BINARY_OPERATOR',false],['r += ','COMPOUND_ASSIGNMENT_OPERATOR',false],['return ','RETURN_STMT',false],['int r = ','DECL_STMT',false],['r = 1 + ','BINARY_OPERATOR',false]]){
  const source=prefix+name+'('+(name==='raise'?'sig':'')+')';
  const tokens=lex(source).tokens.filter(t=>t.kind!=='space').map(t=>({...t,spelling:source.slice(t.start,t.end),kind:t.kind==='punctuator'?'PUNCTUATION':['string','character','pp-number'].includes(t.kind)?'LITERAL':'IDENTIFIER'}));
  const t=tokens.find(t=>t.spelling===name),key='library:'+name;
  for(const bound of [true,false]){
   const p=planUsageReadings(source,{tokens,nodes:[]},DEFAULT_WORDS,{heads:bound?[{start:t.start,key,source:name}]:[],existingEdits:[]});
   assert.equal(p.omitEnd({start:0,end:source.length,kind}),bound&&expected,source);
  }
 }
});
test('stored standard calls match expected readings',()=>{
 const fixtures=JSON.parse(fs.readFileSync(new URL('./fixtures/standard-calls.json',import.meta.url)));
 for(const f of fixtures){
  const expected=f.expected;
  const r=translateAnalysis(f.source,f.analysis);assert.deepEqual(r.issues,[],f.id);for(const text of expected)assert.ok(r.text.includes(text),f.id+': '+text+'\n'+r.text);
 }
});

test('project hash is verified before saved-settings migration',async()=>{
 const {saveProject,loadProject}=await import('../src/project/project.js');
 const {sha256}=await import('../src/shared/hash.js');
 const old=await saveProject({files:{'main.c':'int main(void){return 0;}\n'},translationUnits:[{source:'main.c'}],words:{...LEGACY_V11_WORDS,int:'ﾄﾞｸｼﾞﾉｾｲｽｳ'}});
 old.vocabularyVersion=11;
 old.sha256=await sha256(new TextEncoder().encode(JSON.stringify({project:old.project,selection:old.selection,vocabularyVersion:old.vocabularyVersion})));
 const loaded=await loadProject(old);assert.equal(loaded.vocabularyVersion,12);assert.equal(loaded.project.words.int,'ﾄﾞｸｼﾞﾉｾｲｽｳ');
 for(const c of changes)assert.equal(loaded.project.words[c.key],c.after);
 const bad=structuredClone(old);bad.project.words.int='tampered';await assert.rejects(loadProject(bad),/確認値/);
});
