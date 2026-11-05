import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {loadBrowserResources} from '../src/runtime/resources.js';
import {createWasmAnalyzer,browserSdkRoots} from '../src/runtime/wasm-runtime.js';
import {createTranslator} from '../src/translator.js';
import {importSaved,saveImported} from '../src/project/import.js';
import {translateAnalysis} from '../src/translation/native-reader.js';
import {DEFAULT_WORDS} from '../src/vocabulary/reading-config.js';
import {CALL_PROFILES} from '../src/translation/usage-profiles.js';
import {argumentSpecs} from '../src/translation/usage-reading.js';
import createModule from '../wasm/out/shi-clang.mjs';
const resources=await loadBrowserResources({fetcher:async u=>new Response(await readFile(u))});
const translate=createTranslator({analyze:createWasmAnalyzer({createModule:o=>createModule(resources.createModuleOptions(o)),sdkFiles:resources.sdkFiles,resolveSdk:resources.resolveSdk}),sdkRoots:browserSdkRoots});
const header='#include <stdio.h>\n#include <stdlib.h>\n#include <math.h>\n#include <string.h>\n#include <wchar.h>\n#include <inttypes.h>\n';
const observed=[];
async function run(id,source,extra={}){
 const r=await translate({source,...extra});process.exitCode=0;
 assert.equal(r.original.analysis.valid,true,JSON.stringify(r.original.analysis.diagnostics));
 assert(!r.original.reading.reasons.some(x=>x.code==='edit-conflict'));
 observed.push({id,source,args:extra.args??[],...(extra.files?{files:extra.files}:{}),...(extra.words?{words:extra.words}:{}),text:r.original.reading.text,diagnostics:r.original.analysis.diagnostics});return r;
}
function includes(r,...parts){for(const p of parts)assert.ok(r.original.reading.text.includes(p),p+'\n'+r.original.reading.text);}
function guides(r,call,args,wanted){
 let at=r.original.analysis.source.lastIndexOf(call)+call.indexOf('(')+1;
 assert(at>0);
 for(let i=0;i<args.length;i++){
  const end=at+args[i].length;
  const actual=r.original.reading.segments.filter(s=>s.note==='引数の役割を示す追加語'&&s.ranges?.some(a=>a.start===at&&a.end===end)).map(s=>s.text.trim());
  assert.deepEqual(actual,wanted[i]?[wanted[i]]:[],call+' argument '+i);at=end+1;
 }
}

test('translation: original braces, digraphs, include delimiters and literal contents survive',async()=>{
 const source='#include <stdio.h>\nint f(void)<% /* ｛〈（）〉｝ */ char *s="{}<>（）";int a<:2:>=<%1,2%>;return a<:0:>;%>\n';
 const r=await run('symbols',source);includes(r,'#ﾌｸﾒﾙ <ﾋｮｳｼﾞｭﾝ_ﾆｭｳｼｭﾂﾘｮｸ.ｻｷﾖﾐ>','<% /* ｛〈（）〉｝ */','"{}<>（）"','<%1,2%>','a<:0:>',';%>');
 const user=await run('user_header','#include <other.h>\nint f(void){return 0;}\n',{files:{'input.c':'#include <other.h>\nint f(void){return 0;}\n','other.h':'int other;\n'},args:['-I.']});
 includes(user,'#ﾌｸﾒﾙ <other.h>');
 const quoted=await run('quoted','#include "stdio.h"\nint f(void){return 0;}\n');includes(quoted,'#ﾌｸﾒﾙ "stdio.h"');
 const off=translateAnalysis(source,r.original.analysis,undefined,{annotations:false});assert(off.text.includes('<%'));assert(off.segments.every(s=>s.kind!=='annotation'));
});

test('translation: seven printf families distinguish content from a format',async()=>{
 const body='void f(FILE *fp,char *b,wchar_t *w,int n){printf("Hello");printf("100%%");fprintf(fp,"Hello");sprintf(b,"Hello");snprintf(b,100,"Hello");wprintf(L"Hello");fwprintf(fp,L"Hello");swprintf(w,100,L"Hello");printf("%d",n);fprintf(fp,"%d",n);}\n';
 const r=await run('content',header+body);
 for(const [call,args,want] of [
  ['printf("Hello")',['"Hello"'],['']],['printf("100%%")',['"100%%"'],['']],
  ['fprintf(fp,"Hello")',['fp','"Hello"'],['ﾆ','ｦ']],['sprintf(b,"Hello")',['b','"Hello"'],['ﾆ','ｦ']],
  ['snprintf(b,100,"Hello")',['b','100','"Hello"'],['ﾆ','ﾊﾞｲﾄﾉﾖｳﾘｮｳﾃﾞ','ｦ']],
  ['wprintf(L"Hello")',['L"Hello"'],['']],['fwprintf(fp,L"Hello")',['fp','L"Hello"'],['ﾆ','ｦ']],
  ['swprintf(w,100,L"Hello")',['w','100','L"Hello"'],['ﾆ','ﾃﾞｶﾓｼﾞﾉﾖｳﾘｮｳﾃﾞ','ｦ']],
  ['printf("%d",n)',['"%d"','n'],['ﾃﾞ','ｦ']],['fprintf(fp,"%d",n)',['fp','"%d"','n'],['ﾆ','ﾃﾞ','ｦ']]
 ])guides(r,call,args,want);
});

test('translation: unknown formats lose only format/variadic guides, and no-value content has priority',async()=>{
 const body='void f(FILE *fp,char *b,wchar_t *w,const char *fmt,const wchar_t *wf,int n){printf(fmt);fprintf(fp,fmt);sprintf(b,fmt);printf(fmt,n);fprintf(fp,fmt,n);snprintf(b,100,fmt,n);scanf(fmt,&n);fscanf(fp,fmt,&n);sscanf(b,fmt,&n);wscanf(wf,&n);fwscanf(fp,wf,&n);swscanf(w,wf,&n);}\n';
 const r=await run('dynamic',header+body);
 for(const [call,args,want] of [
  ['printf(fmt)',['fmt'],['']],['fprintf(fp,fmt)',['fp','fmt'],['ﾆ','ｦ']],['sprintf(b,fmt)',['b','fmt'],['ﾆ','ｦ']],
  ['printf(fmt,n)',['fmt','n'],['','']],['fprintf(fp,fmt,n)',['fp','fmt','n'],['ﾆ','','']],
  ['snprintf(b,100,fmt,n)',['b','100','fmt','n'],['ﾆ','ﾊﾞｲﾄﾉﾖｳﾘｮｳﾃﾞ','','']],
  ['scanf(fmt,&n)',['fmt','&n'],['','']],['fscanf(fp,fmt,&n)',['fp','fmt','&n'],['ｶﾗ','','']],
  ['sscanf(b,fmt,&n)',['b','fmt','&n'],['ｶﾗ','','']],['wscanf(wf,&n)',['wf','&n'],['','']],
  ['fwscanf(fp,wf,&n)',['fp','wf','&n'],['ｶﾗ','','']],['swscanf(w,wf,&n)',['w','wf','&n'],['ｶﾗ','','']]
 ])guides(r,call,args,want);
});

test('translation: v families keep all fixed guides even with unknown formats',async()=>{
 const r=await run('va',header+'#include <stdarg.h>\nvoid f(FILE *fp,char *b,wchar_t *w,const char *fmt,const wchar_t *wf,va_list ap){vprintf(fmt,ap);vfprintf(fp,fmt,ap);vsprintf(b,fmt,ap);vsnprintf(b,100,fmt,ap);vwprintf(wf,ap);vfwprintf(fp,wf,ap);vswprintf(w,100,wf,ap);vscanf(fmt,ap);vfscanf(fp,fmt,ap);vsscanf(b,fmt,ap);vwscanf(wf,ap);vfwscanf(fp,wf,ap);vswscanf(w,wf,ap);}\n');
 for(const [call,args,want] of [
  ['vprintf(fmt,ap)',['fmt','ap'],['ﾃﾞ','ｦ']],['vfprintf(fp,fmt,ap)',['fp','fmt','ap'],['ﾆ','ﾃﾞ','ｦ']],
  ['vsprintf(b,fmt,ap)',['b','fmt','ap'],['ﾆ','ﾃﾞ','ｦ']],['vsnprintf(b,100,fmt,ap)',['b','100','fmt','ap'],['ﾆ','ﾊﾞｲﾄﾉﾖｳﾘｮｳﾃﾞ','ﾃﾞ','ｦ']],
  ['vwprintf(wf,ap)',['wf','ap'],['ﾃﾞ','ｦ']],['vfwprintf(fp,wf,ap)',['fp','wf','ap'],['ﾆ','ﾃﾞ','ｦ']],
  ['vswprintf(w,100,wf,ap)',['w','100','wf','ap'],['ﾆ','ﾃﾞｶﾓｼﾞﾉﾖｳﾘｮｳﾃﾞ','ﾃﾞ','ｦ']],
  ['vscanf(fmt,ap)',['fmt','ap'],['ﾃﾞ','ｦ']],['vfscanf(fp,fmt,ap)',['fp','fmt','ap'],['ｶﾗ','ﾃﾞ','ｦ']],
  ['vsscanf(b,fmt,ap)',['b','fmt','ap'],['ｶﾗ','ﾃﾞ','ｦ']],['vwscanf(wf,ap)',['wf','ap'],['ﾃﾞ','ｦ']],
  ['vfwscanf(fp,wf,ap)',['fp','wf','ap'],['ｶﾗ','ﾃﾞ','ｦ']],['vswscanf(w,wf,ap)',['w','wf','ap'],['ｶﾗ','ﾃﾞ','ｦ']]
 ])guides(r,call,args,want);
});

test('translation: macro literals, adjacent strings, PRI/SCN and active definitions use compiler facts',async()=>{
 const source=header+'#define FMT "%d"\n#define ALIAS FMT\n#define WRAP(x) x\n#define SPELL(x) #x\nvoid f(int n){printf(FMT,n);printf(ALIAS,n);printf(WRAP("%d"),n);printf(SPELL(%d),n);printf("n=" FMT,n);printf("%" PRId32,n);scanf("%" SCNd32,&n);}\n#undef FMT\n#define FMT "%*d"\nvoid g(int n){printf(FMT,3,n);}\n';
 const r=await run('macro_formats',source);
 for(const [call,args,want] of [
  ['printf(FMT,n)',['FMT','n'],['ﾃﾞ','ｦ']],['printf(ALIAS,n)',['ALIAS','n'],['ﾃﾞ','ｦ']],
  ['printf(WRAP("%d"),n)',['WRAP("%d")','n'],['ﾃﾞ','ｦ']],['printf(SPELL(%d),n)',['SPELL(%d)','n'],['ﾃﾞ','ｦ']],
  ['printf("n=" FMT,n)',['"n=" FMT','n'],['ﾃﾞ','ｦ']],['printf("%" PRId32,n)',['"%" PRId32','n'],['ﾃﾞ','ｦ']],
  ['scanf("%" SCNd32,&n)',['"%" SCNd32','&n'],['ﾃﾞ','ﾆ']],['printf(FMT,3,n)',['FMT','3','n'],['ﾃﾞ','ﾉﾊﾊﾞﾃﾞ','ｦ']]
 ])guides(r,call,args,want);
 includes(r,'#ﾃｲｷﾞｽﾙ FMT "%d"','ALIAS ﾃﾞ','WRAP("%d") ﾃﾞ');
});

test('translation: arrays, const variables, conditionals, casts, calls and nonliteral macro expressions are not evaluated',async()=>{
 const source=header+'const char *getfmt(void);\n#define CHOICE (n?"%d":"%d")\n#define OFFSET ("%d"+0)\n#define CAST ((const char*)"%d")\nvoid f(int n){const char a[]="%d";const char *v="%d";printf(a,n);printf(v,n);printf(n?"%d":"%d",n);printf(getfmt(),n);printf(CHOICE,n);printf(OFFSET,n);printf(CAST,n);printf("%q",n);}\n';
 const r=await run('unknown_expressions',source);
 for(const arg of ['a','v','n?"%d":"%d"','getfmt()','CHOICE','OFFSET','CAST','"%q"'])guides(r,`printf(${arg},n)`,[arg,'n'],['','']);
});

test('translation: excess and missing arguments remain visible without fabricated roles',async()=>{
 const r=await run('mismatch',header+'void f(int n){printf("Hi",n);printf("%d");printf("%d%d",n);printf("%*.*f%n",8,2,1.0,&n);}\n');
 guides(r,'printf("Hi",n)',['"Hi"','n'],['','']);
 guides(r,'printf("%d")',['"%d"'],['ﾃﾞ']);
 guides(r,'printf("%d%d",n)',['"%d%d"','n'],['ﾃﾞ','']);
 guides(r,'printf("%*.*f%n",8,2,1.0,&n)',['"%*.*f%n"','8','2','1.0','&n'],['ﾃﾞ','ﾉﾊﾊﾞﾃﾞ','ﾉｾｲﾄﾞﾃﾞ','ｦ','ﾆ']);
 assert(r.original.analysis.diagnostics.length>0);
});

test('translation: nested verb, noun, user call, grouping, cast and compound expression have distinct readings',async()=>{
 const r=await run('nested',header+'double calculate(double);\nvoid f(char *b,double x,int a,int z){printf("%f",floor(x));printf("%f",sqrt(x));printf("%f",calculate(x));printf("%f",((floor(x))));printf("%d",(int)floor(x));printf("%f",floor(x)+1);printf("%c",getchar());puts(strcpy(b,"Hello"));floor(sqrt(x));free(malloc(4));printf("%d",a>0?a:-a);}\n');
 const floor='ｼﾀﾎｳｺｳﾃﾞ_ｾｲｽｳﾆ_ﾏﾙﾒﾙﾉﾊ(x ｦ)';
 includes(r,`ｱﾗﾜｽﾉﾊ("%f" ﾃﾞ,${floor})`,`ｱﾗﾜｽﾉﾊ("%f" ﾃﾞ,ﾍｲﾎｳｺﾝ(x) ｦ)`,`ｱﾗﾜｽﾉﾊ("%f" ﾃﾞ,calculate(x) ｦ)`,
  `ｱﾗﾜｽﾉﾊ("%f" ﾃﾞ,((${floor})))`,`ｱﾗﾜｽﾉﾊ("%d" ﾃﾞ,(ｾｲｽｳ)${floor} ｦ)`,`ｱﾗﾜｽﾉﾊ("%f" ﾃﾞ,${floor}+1 ｦ)`,
  'ｱﾗﾜｽﾉﾊ("%c" ﾃﾞ,ﾓｼﾞｦﾄﾙ())','ﾓｼﾞﾚﾂｦ_ｵｸﾉﾊ(ﾓｼﾞﾚﾂｦ_ｳﾂｽﾉﾊ(b ﾆ,"Hello" ｶﾗ))','ｼﾀﾎｳｺｳﾃﾞ_ｾｲｽｳﾆ_ﾏﾙﾒﾙﾉﾊ(ﾍｲﾎｳｺﾝ(x) ｦ)',
  'ｶｲﾎｳｽﾙﾉﾊ(ｶｸﾎｽﾙﾉﾊ(4 ﾊﾞｲﾄ))','a>0?a:-a ｦ');
});

test('translation: noun form is fixed metadata, custom readings and user shadowing do not change binding',async()=>{
 assert.equal(Object.keys(CALL_PROFILES).length,560);
 assert(Object.values(CALL_PROFILES).every(p=>['verb','noun'].includes(p.reading_form)));
 assert.equal(CALL_PROFILES['library:getchar'].reading_form,'verb');assert.equal(CALL_PROFILES['library:sqrt'].reading_form,'noun');
 const r=await run('custom',header+'void f(double x){printf("%f",floor(x));printf("%f",sqrt(x));}\n',{words:{...DEFAULT_WORDS,'library:floor':'ﾄﾞｸｼﾞ','library:sqrt':'ﾄﾞｸｼﾞﾉﾊ'}});
 includes(r,'ｱﾗﾜｽﾉﾊ("%f" ﾃﾞ,ﾄﾞｸｼﾞ(x ｦ))','ｱﾗﾜｽﾉﾊ("%f" ﾃﾞ,ﾄﾞｸｼﾞﾉﾊ(x) ｦ)');
 const shadow=await run('shadow','#include <stdio.h>\nint floor(int);void f(void){printf("%d",floor(1));}\n');includes(shadow,'ｱﾗﾜｽﾉﾊ("%d" ﾃﾞ,floor(1) ｦ)');
});

test('translation: only standalone object suffix is removed, never compound guides or destinations',()=>{
 for(const suffix of ['ｦｿｴﾃ','ｦﾀｼﾃ','ｦﾜﾀｼﾃ','ｦｼﾞﾂﾌﾞﾆ','ｦｷｮﾌﾞﾆ','ｼﾞｮｳｦ','ﾆ','ｶﾗ','ｼﾞｮｳ']){
  assert.equal(argumentSpecs({parameters:[{suffix}]},['verb()'],{isVerbCall:()=>true})[0].suffix,suffix);
 }
 assert.equal(argumentSpecs({parameters:[{suffix:'ｦ'}]},['verb()'],{isVerbCall:()=>true})[0].suffix,'');
});

test('translation: fclose uses object and strcpy preserves destination/source guides',async()=>{
 const r=await run('individual',header+'void f(FILE *fp,char *b){fclose(fp);strcpy(b,"Hello");}\n');
 includes(r,'ﾌｧｲﾙｦ_ﾄｼﾞﾙﾉﾊ(fp ｦ) ﾅﾘ;','ﾓｼﾞﾚﾂｦ_ｳﾂｽﾉﾊ(b ﾆ,"Hello" ｶﾗ) ﾅﾘ;');
});

test('translation: getchar grouping is allowed only in standalone statements and direct assignments',async()=>{
 const r=await run('getchar',header+'struct S{int c;};\nint f(int x,struct S *p){int c=getchar();int arr[2];getchar();(getchar());((getchar()));c=getchar();c=((getchar()));arr[0]=(getchar());p->c=(getchar());if(x)(getchar());if(x)c=(getchar());c+=(getchar());c=x=(getchar());c=(int)getchar();c=getchar()+1;(void)getchar();for(;x;c=(getchar()))x--;return (getchar());}\n');
 includes(r,'ｾｲｽｳ c=ﾓｼﾞｦﾄﾙ() ﾅﾘ;','ﾓｼﾞｦﾄﾙ();','(ﾓｼﾞｦﾄﾙ());','((ﾓｼﾞｦﾄﾙ()));','c=((ﾓｼﾞｦﾄﾙ()));','arr[0]=(ﾓｼﾞｦﾄﾙ());','p->c=(ﾓｼﾞｦﾄﾙ());',
  'c+=(ﾓｼﾞｦﾄﾙ()) ﾅﾘ;','c=x=(ﾓｼﾞｦﾄﾙ()) ﾅﾘ;','c=(ｾｲｽｳ)ﾓｼﾞｦﾄﾙ() ﾅﾘ;','c=ﾓｼﾞｦﾄﾙ()+1 ﾅﾘ;','(ﾑﾅｼ)ﾓｼﾞｦﾄﾙ() ﾅﾘ;','ﾂﾄﾞ c=(ﾓｼﾞｦﾄﾙ()) ﾅﾘ','ｶｴｽﾉﾊ (ﾓｼﾞｦﾄﾙ()) ﾅﾘ;');
});

test('translation: abort, raise and thrd_yield obey fixed statement boundaries',async()=>{
 const cases=JSON.parse(await readFile(new URL('./fixtures/statement-exceptions.json',import.meta.url)));
 for(const c of cases){
  const r=await run(c.id,c.source);
  const expected=c.text;
  assert.equal(r.original.reading.text,expected,c.id);
 }
});

test('translation: saved compiler facts are redisplayed under current rules without mutation or reanalysis',async()=>{
 const data=JSON.parse(await readFile(new URL('./fixtures/legacy-reading-document.json',import.meta.url)));
 const before=JSON.stringify(data),restored=await importSaved(data);
 const text=restored.views.find(v=>v.key==='0:source:1').text;
 assert(text.includes('#ﾌｸﾒﾙ <ﾋｮｳｼﾞｭﾝ_ﾆｭｳｼｭﾂﾘｮｸ.ｻｷﾖﾐ>'));
 assert(text.includes('ｱﾗﾜｽﾉﾊ("Hello") ﾅﾘ;'));assert(text.includes('ｱﾗﾜｽﾉﾊ(FMT ﾃﾞ,1 ｦ)'));
 assert(text.includes('/* ｛〈（）〉｝ */'));assert(text.includes('"全角（）"'));assert(text.includes('{'));
 assert.equal(JSON.stringify(data),before);
 const saved=saveImported(restored,restored.selection),serialized=JSON.stringify(saved);await importSaved(saved);assert.equal(JSON.stringify(saved),serialized);
});

// Optional observation output is kept out of normal test runs and source trees.
if(process.env.SHI_STAGE1_OBSERVATIONS)test.after(async()=>{
 const {writeFile}=await import('node:fs/promises');await writeFile(process.env.SHI_STAGE1_OBSERVATIONS,JSON.stringify(observed,null,2)+'\n');
});
