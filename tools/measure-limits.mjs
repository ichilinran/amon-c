// Isolated measurements: each case has a 45 s outer process timeout.
import {spawnSync} from 'node:child_process';
import {readFile,writeFile} from 'node:fs/promises';
const caseName=process.argv[2];
if(!caseName){
 const rows=[];
 for(const name of ['comment-40000','declarations-1200','macro-expansion','repeat-10']){
  const result=spawnSync(process.execPath,['--expose-gc',new URL(import.meta.url).pathname,name],{encoding:'utf8',timeout:45000,maxBuffer:1024*1024});
  rows.push({name,status:result.error?'blocked':result.status===0?'completed':'failed',...(result.stdout.trim()?JSON.parse(result.stdout):{}),...(result.error?{error:result.error.message}:{}),...(result.status!==0?{stderr:result.stderr.slice(-4000)}:{})});console.log(name,rows.at(-1).status);
 }
 await writeFile(new URL('../coverage/resource-measurements.json',import.meta.url),JSON.stringify({node:process.version,platform:process.platform,architecture:process.arch,rows},null,2)+'\n');
 process.exitCode=rows.some(r=>r.status!=='completed')?1:0;
}else{
 const {loadBrowserResources}=await import('../src/runtime/resources.js');const {createWasmAnalyzer,browserSdkRoots}=await import('../src/runtime/wasm-runtime.js');const {createTranslator}=await import('../src/translator.js');const {default:createModule}=await import('../wasm/out/shi-clang.mjs');
 const start=performance.now(),resources=await loadBrowserResources({fetcher:async url=>new Response(await readFile(url))});
 const translate=createTranslator({analyze:createWasmAnalyzer({createModule:o=>createModule(resources.createModuleOptions(o)),sdkFiles:resources.sdkFiles,resolveSdk:resources.resolveSdk}),sdkRoots:browserSdkRoots});
 const basic='int f(void){return 0;}\n';
 const sources={'comment-40000':'/*'+'x'.repeat(39973)+'*/\n'+basic,'declarations-1200':Array.from({length:1200},(_,i)=>`int v${i};`).join('\n')+'\n','macro-expansion':'#define A(x) x x x x\n#define B(x) A(A(A(x)))\nvoid f(void){B(B(;))}\n','repeat-10':basic};
 // Exact declared limit, including the final newline.
 if(caseName==='comment-40000')sources[caseName]='/*'+'x'.repeat(40000-basic.length-5)+'*/\n'+basic;
 const source=sources[caseName],samples=[];
 for(let i=0;i<(caseName==='repeat-10'?10:1);i++){
  let result;try{result=await translate({source});}catch(error){
   if(caseName!=='macro-expansion')throw error;
   samples.push({rejected:true,error:error.message});
   const recovery=await translate({source:basic});process.exitCode=0;
   samples.at(-1).recoveryValid=recovery.original.analysis.valid;break;
  }process.exitCode=0;
  samples.push({valid:result.original.analysis.valid,expandedIssue:result.expandedIssue?.code??null,...result.metrics,memoryBeforeGC:process.memoryUsage().rss});result=null;globalThis.gc?.();samples.at(-1).memoryAfterGC=process.memoryUsage().rss;
 }
 console.log(JSON.stringify({characters:source.length,milliseconds:Math.round(performance.now()-start),peakRSSKiB:process.resourceUsage().maxRSS,samples}));
}
