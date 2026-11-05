import {normalizeInput} from '../src/project/project.js';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {mkdtemp,writeFile,rm,mkdir} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const exec=promisify(execFile);
const baseline=path.resolve(process.env.SHI_BASELINE??fileURLToPath(new URL('../reference/',import.meta.url)));
export const sdkRoots=['/usr/include',path.join(baseline,'tools/clang18-headers'),path.join(baseline,'next/sdk-compat')];
export async function analyze(request) {
  request=normalizeInput(request);
  const frontend=process.env.SHI_FRONTEND;
  if(!frontend)throw new Error('Set SHI_FRONTEND to a built, compatible Clang 18 extractor');
  const directory=await mkdtemp(path.join(tmpdir(),'shi-pilot-'));
  const source=path.join(directory,request.entry);
  const flags=['-x','c','-std=c17','-pedantic-errors','-Wno-strict-prototypes','-Wno-keyword-macro','-Wno-deprecated-pragma','-isystem'+sdkRoots[2],'-isystem'+sdkRoots[1],'-nobuiltininc','-ffile-prefix-map='+directory+'=/shi/input',...request.args];
  try {
    for(const [name,text] of Object.entries(request.files)){const file=path.join(directory,name);await mkdir(path.dirname(file),{recursive:true});await writeFile(file,text);}
    await mkdir(path.join(directory,request.directory),{recursive:true});
    const result=await exec(frontend,[source,...flags],{cwd:path.join(directory,request.directory),maxBuffer:64*1024*1024,timeout:60000}).catch(error=>{
      if(error.stdout && error.code===1)return error;throw error;
    });
    const native=JSON.parse(result.stdout);
    const entryInstance=native.fileInstances.find(i=>i.file===source)?.id;
    return {native,entryInstance,flags,diagnostics:result.stderr};
  } finally {await rm(directory,{recursive:true,force:true});}
}
