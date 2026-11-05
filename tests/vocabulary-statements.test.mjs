import test from 'node:test';
import assert from 'node:assert/strict';
import {currentWord,REVIEW_WORDS} from '../src/vocabulary/vocabulary-current.js';
import {WORDS,DEFAULT_WORDS} from '../src/vocabulary/reading-config.js';
import {CALL_PROFILES} from '../src/translation/usage-profiles.js';
import {planUsageReadings} from '../src/translation/usage-reading.js';
import {lex} from '../src/translation/lexical.js';

test('current defaults are complete and missing entries cannot silently use stale readings',()=>{
 assert.deepEqual(DEFAULT_WORDS,REVIEW_WORDS);
 assert.equal(new Set(WORDS.map(([key])=>key)).size,1213);
 assert.throws(()=>currentWord('missing:word'),/Missing current vocabulary/);
});

test('statement policies preserve standalone and simple-assignment boundaries',()=>{
 const contexts=[['','CALL_EXPR',true,false],['x = ','BINARY_OPERATOR',false,true],['x += ','COMPOUND_ASSIGNMENT_OPERATOR',false,false],['x = y = ','BINARY_OPERATOR',false,false],['x = 1 + ','BINARY_OPERATOR',false,false],['x, ','BINARY_OPERATOR',false,false],['return ','RETURN_STMT',false,false],['int x = ','DECL_STMT',false,false]];
 for(const [name,argc] of [['getchar',0],['abort',0],['raise',1],['thrd_yield',0]]){
  assert.equal(CALL_PROFILES['library:'+name].statement_nari.standalone,true);
  for(const [prefix,kind,standalone,assignment] of contexts)for(const bound of [true,false])for(const annotations of [true,false]){
   const source=prefix+name+'('+(argc?'sig':'')+')';
   const tokens=lex(source).tokens.filter(t=>t.kind!=='space').map(t=>({...t,spelling:source.slice(t.start,t.end),kind:t.kind==='punctuator'?'PUNCTUATION':'IDENTIFIER'}));
   const t=tokens.find(t=>t.spelling===name);
   const plan=planUsageReadings(source,{tokens,nodes:[]},DEFAULT_WORDS,{heads:bound?[{start:t.start,key:'library:'+name,source:name}]:[],existingEdits:[],annotations});
   assert.equal(plan.omitEnd({start:0,end:source.length,kind}),bound&&annotations&&(standalone||assignment&&name==='getchar'),source);
  }
 }
});
