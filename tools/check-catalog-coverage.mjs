import {readFile,writeFile} from 'node:fs/promises';
import {gunzipSync} from 'node:zlib';
import createModule from '../wasm/out/shi-clang.mjs';
import {createTranslator} from '../src/translator.js';
import {createWasmAnalyzer,browserSdkRoots} from '../src/runtime/wasm-runtime.js';
import {DEFAULT_WORDS} from '../src/vocabulary/reading-config.js';
import {CALL_PROFILES} from '../src/translation/usage-profiles.js';
import {readPreprocessing} from '../src/translation/preprocessor-reader.js';
import {planStandardNames} from '../src/translation/standard-reader.js';
import {planUsageReadings} from '../src/translation/usage-reading.js';
import {translateAnalysis} from '../src/translation/native-reader.js';
const probes=JSON.parse(await readFile(new URL('../examples/catalog-probes.json',import.meta.url),'utf8'));
const classified=JSON.parse(await readFile(new URL('../coverage/probe-classification.json',import.meta.url),'utf8'));
const valid=new Set(classified.filter(c=>c.valid).map(c=>c.id)),groups=new Map();
for(const p of probes.filter(p=>valid.has(p.id))){const headers=p.source.split('\n').filter(l=>l.startsWith('#include')).join('\n');if(!groups.has(headers))groups.set(headers,[]);groups.get(headers).push(p);}
const batches=[];
for(const [headers,group] of groups)for(let i=0;i<group.length;i+=20)batches.push({headers,probes:group.slice(i,i+20)});
const keys=Object.keys(DEFAULT_WORDS),markers=Object.fromEntries(keys.map((k,i)=>[k,`KANA${String(i).padStart(4,'0')}END`]));
const vocabulary={},calls={};
function observe(view,id){
 const reading=translateAnalysis(view.source,view,markers);
 const observed=new Set();for(const m of reading.text.matchAll(/KANA([0-9]{4})END/g)){const key=keys[Number(m[1])];observed.add(key);vocabulary[key]??={batch:id};}
 if(!view.valid)return;
 const pp=readPreprocessing(view.source,markers,{keywordMacroNames:view.keywordMacroNames??null,inclusions:view.nodes.filter(n=>n.kind==='INCLUSION_DIRECTIVE')});
 const library=planStandardNames(view.source,view,markers,pp.directives);
 const usage=planUsageReadings(view.source,view,markers,{heads:library.callHeads.filter(h=>!h.disabled),existingEdits:[...pp.edits,...library.edits]});
 for(const c of usage.calls){const p=c.profile;if(observed.has(c.key)&&c.args.length>=p.parameters.length&&(p.variadic||c.args.length===p.parameters.length))calls[c.key]??={batch:id,start:c.start,end:c.end};}
}
const wasmBinary=await readFile(new URL('../wasm/out/shi-clang.wasm',import.meta.url));
const sdkFiles=JSON.parse(gunzipSync(await readFile(new URL('../wasm/out/sdk.json.gz',import.meta.url))));
const translate=createTranslator({analyze:createWasmAnalyzer({createModule:o=>createModule({...o,wasmBinary}),sdkFiles}),sdkRoots:browserSdkRoots});
const outcomes=[];
for(const [i,b] of batches.entries()){
 const source=b.headers+'\n'+b.probes.map(p=>p.source.split('\n').filter(l=>!l.startsWith('#include')).join('\n')).join('\n');
 const r=await translate({source});process.exitCode=0;
 outcomes.push({batch:i,keys:b.probes.map(p=>p.id),valid:r.original.analysis.valid,diagnostics:r.original.analysis.diagnostics.filter(d=>d.severity>=3).map(d=>d.message)});
 if(r.original.analysis.valid){observe(r.original.analysis,i);observe(r.expanded.analysis,i);}
 console.log(`${i+1}/${batches.length} ${r.original.analysis.valid?'valid':'DIAGNOSTIC'}`);
}
// Existing project fixtures add control-flow and nested-argument evidence.
const old=JSON.parse(await readFile(new URL('../examples/project-acceptance.json',import.meta.url),'utf8'));
for(const [i,unit] of old.translationUnits.entries()){const r=await translate({files:old.files,entry:unit.source,args:unit.args});process.exitCode=0;for(const v of r.views)observe(v.analysis,'acceptance-'+i);observe(r.expanded.analysis,'acceptance-'+i);}
const boundary=JSON.parse(await readFile(new URL('../examples/boundary-cases.json',import.meta.url),'utf8'));
const supplemental=boundary.filter(c=>['predefined-fixtures','preprocessor-fixtures'].includes(c.group));
supplemental.push({id:'all-control',source:`#include <stdatomic.h>
extern volatile unsigned char external;
union U { signed char c; float f; }; enum Mode { ZERO };
static inline int control(int *restrict p, register int n) {
 auto int value=0; volatile signed char c=0; _Atomic(int) atom=0;
 while(n>0){--n;if(n==2)continue;value+=n;}
 do {++value;} while(value<2);
 if(n>3)value=1;else if(n>2)value=2;else value=3;
 switch(n){case 0: value+=1;break;default:value+=2;}
 return _Generic(value,int:value,default:0)+c+atom+*p;
}
`});
const macroNames=keys.filter(k=>k.startsWith('builtin:')&&!['__FILE__','__LINE__','__DATE__','__TIME__','__func__'].includes(k.slice(8))).map(k=>k.slice(8));
supplemental.push({id:'all-headers-and-available-builtins',source:'assert complex ctype errno fenv float inttypes iso646 limits locale math setjmp signal stdalign stdarg stdatomic stdbool stddef stdint stdio stdlib stdnoreturn string tgmath threads time uchar wchar wctype'.split(' ').map(h=>'#include <'+h+'.h>').join('\n')+'\n'+macroNames.map((name,i)=>`#ifdef ${name}\nint builtin_${i}(void){return (int)${name};}\n#endif`).join('\n')+'\n'});
for(const [i,c] of supplemental.entries()){
 const r=await translate({source:c.source,args:c.args??[],...(c.files?{files:c.files}:{})});process.exitCode=0;
 observe(r.original.analysis,'supplement-'+c.id);observe(r.expanded.analysis,'supplement-'+c.id);
}
const result={vocabulary:{total:keys.length,observed:Object.keys(vocabulary).length,witnesses:vocabulary,unobserved:keys.filter(k=>!vocabulary[k])},profiles:{total:Object.keys(CALL_PROFILES).length,recognized:Object.keys(calls).length,witnesses:calls,unobserved:Object.keys(CALL_PROFILES).filter(k=>!calls[k])},batches:outcomes,invalidStandalone:classified.filter(c=>!c.valid),definition:'Vocabulary: unique marker emitted by actual translation. Profile: translated standard name plus recognized call/arity. This does not cover every conditional argument rule.'};
await writeFile(new URL('../coverage/catalog-coverage.json',import.meta.url),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({words:result.vocabulary.observed,profiles:result.profiles.recognized,invalidBatches:outcomes.filter(o=>!o.valid).length}));
