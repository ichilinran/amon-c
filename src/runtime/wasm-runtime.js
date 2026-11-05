import {boundedTextSink} from './resource-budget.js';
import {normalizeInput} from '../project/project.js';
// Production-shaped adapter: only virtual files, no Node or host filesystem API.
export const browserSdkRoots=['/usr/include','/shi/sdk/clang18-headers','/shi/sdk/compat'];
export function createWasmAnalyzer({createModule,sdkFiles,resolveSdk=null}) {
  let activeSdk=sdkFiles;
  async function run(input,files) {
    const stdout=boundedTextSink(32*1024*1024,'解析報告'),stderr=boundedTextSink(256*1024,'診断');
    let resourceError=null;
    const module=await createModule({onResourceLimit:error=>{resourceError??=error;},noInitialRun:true,print:s=>stdout.append(s),printErr:s=>stderr.append(s)});
    const {FS}=module;
    const write=(path,text)=>{
      FS.mkdirTree(path.slice(0,path.lastIndexOf('/')));
      FS.writeFile(path,text,{encoding:'utf8'});
    };
    for(const file of files)write(file.path,file.text);
    for(const [name,text] of Object.entries(input.files))write('/shi/input/'+name,text);
    const entry='/shi/input/'+input.entry;
    FS.mkdirTree('/shi/input/'+input.directory);FS.chdir('/shi/input/'+input.directory);
    const flags=['-x','c','-std=c17','-target','x86_64-pc-linux-gnu','-pedantic-errors','-Wno-strict-prototypes','-Wno-keyword-macro','-Wno-deprecated-pragma','-isystem/shi/sdk/compat','-isystem/shi/sdk/clang18-headers','-isystem/usr/include/x86_64-linux-gnu','-isystem/usr/include','-nobuiltininc',...input.args];
    try{module.callMain([entry,...flags]);}catch(error){throw resourceError??error;}
    if(resourceError)throw resourceError;
    // Emscripten may catch an exception thrown by print inside callMain.
    stdout.check();stderr.check();
    if(!stdout.bytes)throw new Error('解析器が報告を生成できませんでした。入力を小さくして再実行してください。'+(stderr.bytes?' '+stderr.text().slice(0,500):''));
    const native=JSON.parse(stdout.text());
    const entryInstance=native.fileInstances.find(i=>i.file===entry)?.id;
    if(!entryInstance)throw new Error('Clang did not report the input file');
    return {native,entryInstance,flags,diagnostics:stderr.text(),metrics:{heapBytes:module.HEAPU8?.byteLength??null,headersLoaded:files.length,reportBytes:stdout.bytes}};
  }
  return async function analyze(request) {
    const input=normalizeInput(request);let result=await run(input,activeSdk);
    const missing=result.native.diagnostics.map(d=>/'([^']+)' file not found/.exec(d.message)?.[1]).filter(Boolean);
    if(missing.length&&resolveSdk){const extra=await resolveSdk(missing);if(extra){activeSdk=extra;result=await run(input,activeSdk);result.metrics.sdkFallback=true;}}
    return result;
  };
}
