import test from 'node:test';
import assert from 'node:assert/strict';
import {createSourceCoordinates,createSourceBoundaries,byteOffsetToUTF16,utf16OffsetToByte} from '../src/translation/source-coordinates.js';
import {createSourceIndex,rangesOverlap,rangeContains,insideRange} from '../src/translation/source-index.js';
import {createPreprocessingContext,directiveMacroPolicy,standardOrigin} from '../src/translation/preprocessing-context.js';

function tokenize(parts) {
 let source='',offset=0;
 const tokens=parts.map(([spelling,kind='PUNCTUATION'])=>{const token={start:offset,end:offset+spelling.length,spelling,kind};source+=spelling;offset+=spelling.length;return token;});
 return {source,tokens};
}
test('coordinate boundaries preserve ASCII, Japanese, astral characters and CRLF columns',()=>{
 const source='a日本😀\r\nb\n',map=createSourceCoordinates(source);
 const expected=[[0,0,1,1],[1,1,1,2],[4,2,1,3],[7,3,1,4],[11,5,1,5],[12,6,1,6],[13,7,2,1],[14,8,2,2],[15,9,3,1]];
 for(const [byte,unit,line,column] of expected){assert.equal(map.byteToUTF16(byte),unit);assert.equal(map.utf16ToByte(unit),byte);assert.deepEqual(map.lineColumn(unit),{line,column});}
 for(const byte of [2,3,8,9,10,-1,1.5,NaN])assert.throws(()=>map.byteToUTF16(byte));
 assert.throws(()=>map.utf16ToByte(4));assert.throws(()=>map.lineColumn(4));assert.equal(map.unitForByte(null),undefined);
 assert.throws(()=>createSourceBoundaries('\ud800'));
 assert.deepEqual(createSourceBoundaries(''),{bytes:[0],units:[0],length:0});
 assert.equal(byteOffsetToUTF16(map,11),5);assert.equal(utf16OffsetToByte(map,5),11);
});
test('one token index shares bracket geometry, nesting and comments without reading punctuation inside literals',()=>{
 const {source,tokens}=tokenize([['f','IDENTIFIER'],['('],['a','IDENTIFIER'],[','],['g','IDENTIFIER'],['('],['"[,)"','LITERAL'],[')'],[','],['/*,)*/','COMMENT'],['{'],['1','LITERAL'],[','],['2','LITERAL'],['}'],[')']]);
 const index=createSourceIndex(source,tokens);
 assert.equal(index.significant.length,tokens.length-1);
 const close=index.pairs.get(1);assert.equal(index.significant[close].spelling,')');
 const split=index.partition(2,close);assert.equal(split.balanced,true);
 assert.deepEqual(split.parts.map(p=>index.significant.slice(p.start,p.end).map(t=>t.spelling).join('')),['a','g("[,)" )'.replace(' ',''),'{1,2}']);
 assert.equal(index.pairTokens.get(tokens[1].start),tokens.at(-1));
 assert.equal(index.next(tokens[8].end),tokens[10]);assert.equal(index.previous(tokens[10].start),tokens[8]);
 assert.deepEqual(index.within({start:tokens[10].start,end:tokens[14].end}).map(t=>t.spelling),['{','1',',','2','}']);
 assert.equal(index.indexOf(index.significant[5]),5);assert.equal(index.indexAt(999),-1);
});
test('digraph normalization changes spelling only, while raw mode preserves punctuation pairs',()=>{
 const raw=tokenize([['<%'],['<:'],['x','IDENTIFIER'],[':>'],['%>']]);
 const before=JSON.stringify(raw.tokens),index=createSourceIndex(raw.source,raw.tokens,{normalizeDigraphs:true});
 assert.equal(JSON.stringify(raw.tokens),before);
 assert.deepEqual(index.tokens.map(t=>t.spelling),['{','[','x',']','}']);
 assert.deepEqual(index.tokens.map(t=>[t.start,t.end]),raw.tokens.map(t=>[t.start,t.end]));
 assert.equal(index.physical(index.tokens[0]),false);
 assert.equal(createSourceIndex(raw.source,raw.tokens).pairs.get(0),4);
});
test('unbalanced and cross-boundary delimiters never become invented matching pairs',()=>{
 const a=tokenize([['('],['['],[')'],[']']]);const index=createSourceIndex(a.source,a.tokens);
 assert.equal(index.pairs.size,0);assert.equal(index.partition(0,4).balanced,false);
 // Parenthesis-only protection is explicitly distinct from grammatical pairs.
 assert.equal(index.parentheses.get(0),a.tokens[2]);
 const b=tokenize([['('],['x','IDENTIFIER'],[','],['y','IDENTIFIER'],[')']]);
 assert.equal(createSourceIndex(b.source,b.tokens).partition(0,3).crossesBoundary,true);
});
test('empty arguments and top-level separators stay distinguishable for caller policies',()=>{
 const a=tokenize([['('],[','],['x','IDENTIFIER'],[','],[')']]);const index=createSourceIndex(a.source,a.tokens);
 assert.deepEqual(index.partition(1,4).parts.map(p=>[p.start,p.end]),[[1,1],[2,3],[4,4]]);
 assert.deepEqual(index.topLevel(index.significant).map(t=>t.spelling),['(']);
 assert.deepEqual(index.partition(1,1).parts,[{start:1,end:1,separator:null}]);
});
test('range endpoints distinguish overlap, containment and insertion inside a protected span',()=>{
 const span={start:2,end:6};assert.equal(rangesOverlap(span,{start:6,end:9}),false);
 assert.equal(rangeContains(span,{start:2,end:6}),true);assert.equal(insideRange(2,span),false);assert.equal(insideRange(6,span),false);assert.equal(insideRange(3,span),true);
});
test('macro context distinguishes actual uses from legacy names and never leaks between views',()=>{
 const first=createPreprocessingContext({skipped:[{start:20,end:25}],keywordMacroNames:['int'],keywordMacroUses:[{start:4,end:7,name:'int'}]},[{start:30,end:40}]);
 assert.equal(first.keywordProtected({start:4,end:7,spelling:'int'}),true);
 assert.equal(first.keywordProtected({start:10,end:13,spelling:'int'}),false);
 const second=createPreprocessingContext({skipped:[],keywordMacroNames:['int'],keywordMacroUses:[]});
 assert.equal(second.keywordProtected({start:4,end:7,spelling:'int'}),false);
 const legacy=createPreprocessingContext({skipped:[],keywordMacroNames:['int']});
 assert.equal(legacy.keywordProtected({start:10,end:13,spelling:'int'}),true);
 assert.equal(first.isExcluded({start:24,end:26}),true);assert.equal(first.isExcluded({start:25,end:30}),false);
});
test('macro owners, opened argument regions and unknown overlaps share one policy',()=>{
 const outer={id:1,start:0,end:20},inner={id:2,start:5,end:10};
 const context=createPreprocessingContext({skipped:[]}).forMacros([outer,inner],{expressionMacros:new Set([1]),argumentRegions:[{macro:inner,start:6,end:8}]});
 assert.deepEqual(context.owners({start:6,end:7}).map(m=>m.id),[1,2]);
 assert.equal(context.ownerAllows(inner,{start:6,end:8}),true);assert.equal(context.ownerAllows(inner,{start:5,end:8}),false);
 assert.equal(context.ownerAllows(outer,{start:5,end:8}),true);
 assert.equal(context.opaqueOverlap({start:7,end:9},new Set([1])),true);
 assert.equal(context.opaqueOverlap({start:7,end:9},new Set([1,2])),false);
});
test('directive-body names remain a separate conservative policy with header provenance checks',()=>{
 const directives=[{name:'include',parts:[]},{name:'define',parts:[{},{},{kind:'identifier',canonical:'int'}]}];
 assert.equal(directiveMacroPolicy(directives,null).bodySafe,false);
 const policy=directiveMacroPolicy(directives,[]);assert.equal(policy.bodySafe,true);assert.equal(policy.names.has('int'),true);
 const entry={headers:['math.h']};
 assert.equal(standardOrigin({location:{spelling:{system:true,file:'/sdk/math.h'}}},entry),true);
 assert.equal(standardOrigin({location:{spelling:{system:false,file:'/user/math.h'}}},entry),false);
});
