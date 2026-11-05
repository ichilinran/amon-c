// Finite, hand-written acceptance cases; expectations never come from CALL_PROFILES.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {loadBrowserResources} from '../src/runtime/resources.js';
import {createWasmAnalyzer,browserSdkRoots} from '../src/runtime/wasm-runtime.js';
import {createTranslator} from '../src/translator.js';
import {formatRoles,literalFormat} from '../src/translation/usage-reading.js';
import createModule from '../wasm/out/shi-clang.mjs';
const resources=await loadBrowserResources({fetcher:async url=>new Response(await readFile(url))});
const translate=createTranslator({analyze:createWasmAnalyzer({createModule:o=>createModule(resources.createModuleOptions(o)),sdkFiles:resources.sdkFiles,resolveSdk:resources.resolveSdk}),sdkRoots:browserSdkRoots});
const prefix='#include <stdlib.h>\n#include <wchar.h>\n#include <uchar.h>\n';
const locals='void f(void){char out[32];const char *src="x";wchar_t wide[32];const wchar_t *wsrc=L"x";char16_t c16;char32_t c32;mbstate_t state={0};';
// name, ordinary arguments, triggering NULL argument, exact per-argument suffixes
const rows=[
 ['mblen',['src','16'],0,['ﾉ','ﾊﾞｲﾄﾏﾃﾞ'],['','']],
 ['mbtowc',['wide','src','16'],1,['ﾆ','ｶﾗ','ﾊﾞｲﾄﾏﾃﾞ'],['','','']],
 ['mbrlen',['src','16','&state'],0,['ﾉ','ﾊﾞｲﾄﾏﾃﾞ','ﾉｼﾞｮｳﾀｲﾃﾞ'],['','','ﾉｼﾞｮｳﾀｲﾃﾞ']],
 ['mbrtowc',['wide','src','16','&state'],1,['ﾆ','ｶﾗ','ﾊﾞｲﾄﾏﾃﾞ','ﾉｼﾞｮｳﾀｲﾃﾞ'],['','','','ﾉｼﾞｮｳﾀｲﾃﾞ']],
 ['mbsrtowcs',['wide','&src','16','&state'],0,['ﾆ','ｶﾗ','ﾃﾞｶﾓｼﾞﾏﾃﾞ','ﾉｼﾞｮｳﾀｲﾃﾞ'],['','ｶﾗ','','ﾉｼﾞｮｳﾀｲﾃﾞ']],
 ['wcrtomb',['out',"L'x'",'&state'],0,['ﾆ','ｦ','ﾉｼﾞｮｳﾀｲﾃﾞ'],['','','ﾉｼﾞｮｳﾀｲﾃﾞ']],
 ['c16rtomb',['out',"u'x'",'&state'],0,['ﾆ','ｦ','ﾉｼﾞｮｳﾀｲﾃﾞ'],['','','ﾉｼﾞｮｳﾀｲﾃﾞ']],
 ['c32rtomb',['out',"U'x'",'&state'],0,['ﾆ','ｦ','ﾉｼﾞｮｳﾀｲﾃﾞ'],['','','ﾉｼﾞｮｳﾀｲﾃﾞ']],
 ['mbrtoc16',['&c16','src','16','&state'],1,['ﾆ','ｶﾗ','ﾊﾞｲﾄﾏﾃﾞ','ﾉｼﾞｮｳﾀｲﾃﾞ'],['','','','ﾉｼﾞｮｳﾀｲﾃﾞ']],
 ['mbrtoc32',['&c32','src','16','&state'],1,['ﾆ','ｶﾗ','ﾊﾞｲﾄﾏﾃﾞ','ﾉｼﾞｮｳﾀｲﾃﾞ'],['','','','ﾉｼﾞｮｳﾀｲﾃﾞ']],
 ['wcsrtombs',['out','&wsrc','16','&state'],0,['ﾆ','ｶﾗ','ﾊﾞｲﾄﾏﾃﾞ','ﾉｼﾞｮｳﾀｲﾃﾞ'],['','ｶﾗ','','ﾉｼﾞｮｳﾀｲﾃﾞ']],
 ['wctomb',['out',"L'x'"],0,['ﾆ','ｦ'],['','']],
];
async function checkCall(name,args,expected){
 const call=name+'('+args.join(',')+');',source=prefix+locals+call+'}\n';
 const result=await translate({source});process.exitCode=0;
 assert.equal(result.original.analysis.valid,true,JSON.stringify(result.original.analysis.diagnostics));
 const reading=result.original.reading;assert.deepEqual(reading.issues,[]);
 let at=source.lastIndexOf(call)+name.length+1;
 for(let i=0;i<args.length;i++){
  const end=at+args[i].length;
  const guides=reading.segments.filter(s=>s.operation==='guide'&&s.ranges?.some(r=>r.start===at&&r.end===end)).map(s=>s.text.trim());
  assert.deepEqual(guides,expected[i]?[expected[i]]:[],name+' argument '+i+' '+args[i]);at=end+1;
 }
}
for(const [name,args,nullAt,normal,omitted] of rows)test(name+': pointer and NULL branches have exact independent guides',async()=>{
 await checkCall(name,args,normal);const nullArgs=[...args];nullArgs[nullAt]='NULL';await checkCall(name,nullArgs,omitted);
});
test('mblen recognizes literal null forms and conservatively retains dynamic pointer guides',async()=>{
 for(const zero of ['0','(void*)0','((void*)0)'])await checkCall('mblen',[zero,'16'],['','']);
 await checkCall('mblen',['src+0','16'],['ﾉ','ﾊﾞｲﾄﾏﾃﾞ']);
});
test('format roles: width, precision, percent and count do not shift value arguments',()=>{
 assert.deepEqual(formatRoles('%% %*.*f %n %lld','printf'),['width','precision','output_value','output_count','output_value']);
 assert.deepEqual(formatRoles('%*3d %[^]] %n %% %lf','scanf'),['input_destination','input_count','input_destination']);
 for(const f of ['%','%q','%2$d','%*n','%5n'])assert.equal(formatRoles(f,'printf'),null,f);
 for(const f of ['%','%[abc','%*n','%3n'])assert.equal(formatRoles(f,'scanf'),null,f);
});
test('literal formats decode adjacent escapes and stop at embedded NUL conservatively',()=>{
 const strings=(...xs)=>xs.map(spelling=>({kind:'LITERAL',spelling}));
 assert.equal(literalFormat(strings('"\\045"','"d"')),'%d');
 assert.equal(literalFormat(strings('"%d\\0%f"')),'%d');
 assert.equal(literalFormat(strings('"\\xFF"')),null);
 assert.equal(literalFormat(strings('L"%d"','u"%f"')),null);
 assert.equal(literalFormat([{kind:'IDENTIFIER',spelling:'fmt'}]),null);
});
async function checkGuides(headers,body,call,args,expected){
 const source=headers+'\nvoid f(void){'+body+call+';}\n';
 const result=await translate({source});process.exitCode=0;
 assert.equal(result.original.analysis.valid,true,JSON.stringify(result.original.analysis.diagnostics));
 assert.deepEqual(result.original.reading.issues,[]);
 let at=source.lastIndexOf(call)+call.indexOf('(')+1;
 for(let i=0;i<args.length;i++){
  const end=at+args[i].length;
  const guides=result.original.reading.segments.filter(s=>s.operation==='guide'&&s.ranges?.some(r=>r.start===at&&r.end===end)).map(s=>s.text.trim());
  assert.deepEqual(guides,expected[i]?[expected[i]]:[],call+' argument '+i);at=end+1;
 }
}
test('printf end to end: width, precision, escaped percent and count use exact argument anchors',async()=>{
 const args=['"%% %*.*f %n"','8','2','1.0','&n'];
 await checkGuides('#include <stdio.h>','int n;',`printf(${args.join(',')})`,args,['ﾃﾞ','ﾉﾊﾊﾞﾃﾞ','ﾉｾｲﾄﾞﾃﾞ','ｦ','ﾆ']);
});
test('scanf end to end: suppression and scanset do not consume an extra argument',async()=>{
 const args=['"%*3d %[^]] %n"','out','&n'];
 await checkGuides('#include <stdio.h>','char out[32];int n;',`scanf(${args.join(',')})`,args,['ﾃﾞ','ﾆ','ﾆ']);
});
test('adjacent octal percent literals and bound PRI fragments retain value roles',async()=>{
 for(const format of ['"\\045" "d"','"%" PRId32']){
  const args=[format,'value'];await checkGuides('#include <stdio.h>\n#include <inttypes.h>','int32_t value=1;',`printf(${args.join(',')})`,args,['ﾃﾞ','ｦ']);
 }
});
test('a dynamic format omits format/value guidance without guessing roles',async()=>{
 const args=['fmt','1'];await checkGuides('#include <stdio.h>','const char *fmt="%d";',`printf(${args.join(',')})`,args,['','']);
});
for(const [round,sqrt,type] of [['round','sqrt','double'],['roundf','sqrtf','float'],['roundl','sqrtl','long double']])test(round+': noun calls keep object suffixes, verb calls omit them',async()=>{
 for(const [value,suffix] of [['x','ｦ'],[`${sqrt}(x)`,'ｦ'],[`(${sqrt}(x))`,'ｦ'],[`ceil${round==='roundf'?'f':round==='roundl'?'l':''}(x)`,''],[`${sqrt}(x)+1`,'ｦ']]){
  await checkGuides('#include <math.h>',`${type} x=1;`,`${round}(${value})`,[value],[suffix]);
 }
});
