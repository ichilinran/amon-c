import fs from 'node:fs/promises';
import {loadBrowserResources} from '../src/runtime/resources.js';
import {createWasmAnalyzer,browserSdkRoots} from '../src/runtime/wasm-runtime.js';
import {createTranslator} from '../src/translator.js';
import createModule from '../wasm/out/shi-clang.mjs';
const resources=await loadBrowserResources({fetcher:async url=>new Response(await fs.readFile(url))});
const translate=createTranslator({analyze:createWasmAnalyzer({createModule:o=>createModule(resources.createModuleOptions(o)),sdkFiles:resources.sdkFiles,resolveSdk:resources.resolveSdk}),sdkRoots:browserSdkRoots});
const readme=await fs.readFile(new URL('../README.md',import.meta.url),'utf8');
const blocks=[...readme.matchAll(/```(c|text)\n([\s\S]*?)```/g)],results=[];
if(blocks.length!==10)throw Error('Expected five C/支位 example pairs in the source README');
for(let i=0;i<blocks.length;i+=2){
 if(blocks[i][1]!=='c'||blocks[i+1]?.[1]!=='text')throw Error('Unexpected README block sequence');
 const source=blocks[i][2],expected=blocks[i+1][2].trimEnd(),r=await translate({source});process.exitCode=0;
 results.push({example:i/2+1,valid:r.original.analysis.valid,equal:r.original.reading.text.trimEnd()===expected,...(r.original.reading.text.trimEnd()===expected?{}:{expected,actual:r.original.reading.text.trimEnd()})});
}
const dir=new URL('../build/checks/',import.meta.url);await fs.mkdir(dir,{recursive:true});
await fs.writeFile(new URL('readme-examples.json',dir),JSON.stringify(results,null,2)+'\n');
console.log(JSON.stringify(results.map(({expected,actual,...summary})=>summary)));
if(results.some(r=>!r.valid||!r.equal))process.exitCode=1;
