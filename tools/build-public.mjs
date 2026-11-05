// Assemble the selected existing assets. No compiler, network or deployment.
import {readFile,writeFile,mkdir,mkdtemp,cp,rm,rename,lstat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
import {tree,hash,safeRelative} from './public-build-lib.mjs';
const root=path.resolve(fileURLToPath(new URL('../',import.meta.url)));
execFileSync(process.execPath,[path.join(root,'tools/plan-public-files.mjs'),'--check'],{cwd:root,stdio:'pipe'});
const planBytes=await readFile(path.join(root,'release/file-plan.json')),plan=JSON.parse(planBytes);
const policyBytes=await readFile(path.join(root,'release/file-policy.json')),policy=JSON.parse(policyBytes);
const status=JSON.parse(await readFile(path.join(root,'compliance/release-status.json')));
const missing=[];
for(const item of policy.requiredBeforeRelease){try{await lstat(path.join(root,safeRelative(item.path)));}catch(error){if(error.code!=='ENOENT')throw error;missing.push(item.path);}}
if(process.argv.includes('--release')&&(!status.publicReleaseCleared||status.open.length||missing.length)){
 console.error('公開確認は未完了です：'+[...missing,...status.open.map(r=>r.id)].join(', '));process.exit(2);
}
const build=path.join(root,'build');
try{if((await lstat(build)).isSymbolicLink())throw Error('Build directory must not be a symlink');}catch(error){if(error.code!=='ENOENT')throw error;}
await mkdir(build,{recursive:true});
const owner=path.join(build,'SHI_BUILD_OWNER.json');let owned=false;
try{owned=JSON.parse(await readFile(owner)).format==='shi-public-build';}catch(error){if(error.code!=='ENOENT')throw error;}
for(const target of ['github','pages']){
 try{await lstat(path.join(build,target));if(!owned)throw Error('Refusing to replace an unmarked output directory: '+target);}catch(error){if(error.code!=='ENOENT')throw error;}
}
const staging=await mkdtemp(path.join(build,'staging-'));
try{
 const manifests={};
 for(const target of ['github','pages']){
  const destination=path.join(staging,target);await mkdir(destination);
  for(const row of plan.files.filter(r=>r[target])){
   const relative=safeRelative(row.path),source=path.join(root,relative);
   if((await lstat(source)).isSymbolicLink())throw Error('Selected file must not be a symlink: '+relative);
   const data=await readFile(source);
   if(row.sha256&&hash(data)!==row.sha256)throw Error('Selection is stale: '+relative);
   const out=path.join(destination,relative);await mkdir(path.dirname(out),{recursive:true});await cp(source,out);
  }
  if(target==='github'){
   // The public checkout excludes archived files. Its own plan must describe
   // that checkout, so its four generated inventories are regenerated there.
   execFileSync(process.execPath,[path.join(destination,'tools/plan-public-files.mjs')],{cwd:destination,stdio:'pipe'});
   execFileSync(process.execPath,[path.join(destination,'tools/plan-public-files.mjs'),'--check'],{cwd:destination,stdio:'pipe'});
  }
  manifests[target]={files:await tree(destination)};
 }
 execFileSync(process.execPath,[path.join(root,'tools/plan-public-files.mjs'),'--check'],{cwd:root,stdio:'pipe'});
 const report={schema:1,format:'shi-public-build',candidate:true,sourcePlanSha256:hash(planBytes),policySha256:hash(policyBytes),publicReleaseCleared:status.publicReleaseCleared,openReleaseItems:status.open.map(r=>r.id),missingBeforeRelease:missing,targets:manifests};
 // Staging succeeds before replacing any prior generated target. Unrelated
 // files at build/ (such as verification logs) are preserved.
 const moved=[];
 try{
  for(const target of ['github','pages']){
   const dest=path.join(build,target),backup=path.join(staging,'previous-'+target);let previous=false;
   try{await rename(dest,backup);previous=true;}catch(error){if(error.code!=='ENOENT')throw error;}
   moved.push({target,previous});await rename(path.join(staging,target),dest);
  }
  await writeFile(owner,JSON.stringify({format:'shi-public-build',version:1},null,2)+'\n');
  await writeFile(path.join(build,'public-build.json'),JSON.stringify(report,null,2)+'\n');
 }catch(error){
  for(const item of moved.reverse()){
   await rm(path.join(build,item.target),{recursive:true,force:true});
   if(item.previous)await rename(path.join(staging,'previous-'+item.target),path.join(build,item.target));
  }
  throw error;
 }
 console.log(JSON.stringify({githubFiles:manifests.github.files.length,pagesFiles:manifests.pages.files.length,candidate:true,missingBeforeRelease:missing,publicReleaseCleared:status.publicReleaseCleared}));
}finally{await rm(staging,{recursive:true,force:true});}
