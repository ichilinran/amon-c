// Compare the previous and replacement Wasm using the same v0.20 reader.
// Usage: node tools/check-wasm-replacement.mjs /path/to/previous/github report.json
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {loadBrowserResources} from '../src/runtime/resources.js';
import {createWasmAnalyzer,browserSdkRoots} from '../src/runtime/wasm-runtime.js';
import {createTranslator} from '../src/translator.js';
import {translateAnalysis} from '../src/translation/native-reader.js';
import {DEFAULT_WORDS} from '../src/vocabulary/reading-config.js';
async function translator(root){
 const resources=await loadBrowserResources({base:pathToFileURL(path.join(root,'wasm/out/')),fetcher:async url=>new Response(await fs.readFile(url))});
 const {default:createModule}=await import(pathToFileURL(path.join(root,'wasm/out/shi-clang.mjs')));
 return createTranslator({analyze:createWasmAnalyzer({createModule:o=>createModule(resources.createModuleOptions(o)),sdkFiles:resources.sdkFiles,resolveSdk:resources.resolveSdk}),sdkRoots:browserSdkRoots});
}
if(!process.argv[2]||!process.argv[3])throw Error('Previous github tree and output report required');
const current=path.resolve(new URL('..',import.meta.url).pathname);
const before=await translator(path.resolve(process.argv[2])),after=await translator(current);
const inputs=JSON.parse(await fs.readFile(new URL('../examples/boundary-cases.json',import.meta.url)));
let analyses=0,views=0,displays=0;const failures=[];
for(const [index,c] of inputs.entries()){
 try{
  assert(!c.requiresExternalHeader,'Missing external fixture');
  const input={source:c.source,args:c.args,...(c.files?{files:c.files}:{})};
  const a=await before(input);process.exitCode=0;
  const b=await after(input);process.exitCode=0;
  const av=[...a.views,...(a.expanded?[a.expanded]:[])],bv=[...b.views,...(b.expanded?[b.expanded]:[])];
  assert.equal(av.length,bv.length);
  for(let i=0;i<av.length;i++){
   assert.equal(av[i].analysis.valid,bv[i].analysis.valid);
   assert.equal(av[i].analysis.source,bv[i].analysis.source);
   for(const annotations of [true,false])for(const words of [DEFAULT_WORDS,{...DEFAULT_WORDS,int:'ﾄﾞｸｼﾞﾉｾｲｽｳ',end:'ﾄﾞｸｼﾞﾉｵﾜﾘ'}]){
    assert.deepEqual(translateAnalysis(av[i].analysis.source,av[i].analysis,words,{annotations}),translateAnalysis(bv[i].analysis.source,bv[i].analysis,words,{annotations}));displays++;
   }
   views++;
  }
  analyses++;
 }catch(e){failures.push({index,group:c.group,id:c.id,error:e.message});}
 if((index+1)%50===0)console.log('Compared',index+1,'of',inputs.length);
}
const result={analyses,views,comparedDisplays:displays,failures,scope:'Independent old/new Wasm analysis; complete reading outputs compared with annotations on/off and custom words. Stored-view comparisons are covered by check-review-v020 separately.'};
await fs.writeFile(process.argv[3],JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));process.exitCode=failures.length?1:0;
