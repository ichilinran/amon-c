import {readdir,readFile,lstat} from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
export const hash=data=>createHash('sha256').update(data).digest('hex');
export async function tree(root,dir=''){
 const rows=[];
 for(const item of (await readdir(path.join(root,dir),{withFileTypes:true})).sort((a,b)=>a.name.localeCompare(b.name))){
  const name=path.posix.join(dir,item.name);
  if(item.isSymbolicLink())throw Error('Symlink requires review: '+name);
  if(item.isDirectory())rows.push(...await tree(root,name));else if(item.isFile())rows.push({path:name,bytes:(await lstat(path.join(root,name))).size,sha256:hash(await readFile(path.join(root,name)))});
 }
 return rows.sort((a,b)=>a.path.localeCompare(b.path));
}
export function safeRelative(file){
 if(typeof file!=='string'||!file||file.includes('\\')||file.startsWith('/')||file.split('/').some(p=>!p||p==='.'||p==='..'))throw Error('Unsafe file path: '+file);
 return file;
}
export async function checkOutput(root,report,target,plan){
 const actual=await tree(path.join(root,'build',target)),expected=report.targets[target].files;
 if(JSON.stringify(actual)!==JSON.stringify(expected))throw Error('Generated '+target+' differs from its manifest');
 const selected=plan.files.filter(r=>r[target]);
 const actualByPath=new Map(actual.map(r=>[r.path,r]));
 if(actual.length!==selected.length||selected.some(r=>!actualByPath.has(r.path)))throw Error('Generated '+target+' differs from selection');
 for(const row of selected){
  if(!row.generated&&actualByPath.get(row.path).sha256!==hash(await readFile(path.join(root,safeRelative(row.path)))) )throw Error('Generated file differs from source: '+target+'/'+row.path);
 }
 if(actual.some(r=>r.path.startsWith('reference/dist/vendor/')||r.path==='reference/dist/index.html'))throw Error('Legacy app included');
 if(target==='pages'&&actual.some(r=>r.path.startsWith('tests/')||r.path.startsWith('reference/baseline-')||r.path==='wasm/out/shi-clang.wasm'))throw Error('Development-only files included in Pages');
 return actual;
}
