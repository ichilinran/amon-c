// Step 1: inventory and validate a selection. Does not copy/build/deploy files.
import {readFile,readdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
const root=path.resolve(new URL('../',import.meta.url).pathname);
const read=p=>readFile(path.join(root,p));
const policy=JSON.parse(await read('release/file-policy.json'));
const outputs=new Set(policy.generatedFiles);
const sha=data=>createHash('sha256').update(data).digest('hex');
const graph=new Map();
function relative(from,spec){
 const result=path.posix.normalize(path.posix.join(path.posix.dirname(from),spec));
 if(result.startsWith('../')||path.posix.isAbsolute(result))throw Error('Reference escapes project: '+from+' '+spec);
 return result;
}
async function visit(file,targetGraph=graph){
 if(targetGraph.has(file))return;
 const source=(await read(file)).toString(),deps=[];targetGraph.set(file,deps);
 for(const match of source.matchAll(/(?:\bfrom\s*|\bimport\s*\(\s*|\bimport\s*)['"]([^'"]+)['"]/g)){
  if(!match[1].startsWith('.'))continue;
  const target=relative(file,match[1]);deps.push(target);await visit(target,targetGraph);
 }
}
for(const entry of policy.roots)await visit(entry);
const baselineGraph=new Map();for(const entry of policy.baselineRoots)await visit(entry,baselineGraph);
const found=[];
async function walk(dir=''){
 for(const entry of await readdir(path.join(root,dir),{withFileTypes:true})){
  const file=path.posix.join(dir,entry.name);
  if((entry.name.startsWith('.')&&!(policy.includeHiddenFiles??[]).includes(file))||entry.name==='__pycache__'||entry.name==='preview-site'||(policy.scanExcludedDirectories??[]).includes(file))continue;
  if(entry.isSymbolicLink())throw Error('Review symlink before selecting: '+file);
  if(entry.isDirectory())await walk(file);else if(entry.isFile())found.push(file);
 }
}
await walk();for(const file of outputs)if(!found.includes(file))found.push(file);
const pagesExplicit=new Set([...policy.pagesAssets,...policy.pagesMetadataFiles]);
const githubExplicit=new Set(policy.githubFiles),excluded=new Set(policy.githubExcludedFiles);
const prefix=(file,items)=>items.some(p=>file.startsWith(p));
const rows=[];
for(const file of found.sort()){
 let pages=false,github=false,role='archive-only',reason='Historical application, observation, generated result or release history; keep in the development archive only.';
 if(graph.has(file)){pages=github=true;role='runtime-module';reason='Reachable relative module from the current UI or module Worker.';}
 else if(policy.pagesAssets.includes(file)){pages=github=true;role='runtime-asset';reason='Explicit HTML, sample or resource dependency; full SDK fallback is retained.';}
 else if(pagesExplicit.has(file)||prefix(file,policy.pagesMetadataPrefixes)){pages=github=true;role='distribution-metadata';reason='Third-party notices, license texts and provenance accessible with the distributed runtime.';}
 else if(baselineGraph.has(file)||githubExplicit.has(file)||prefix(file,policy.githubPrefixes)){github=true;role='development-support';reason='Source, reproducible inputs, test baseline, checker or file-selection documentation; not a Pages runtime dependency.';}
 if(excluded.has(file)){github=pages=false;role='archive-only';reason=policy.githubExcludedReason;}
 const generated=outputs.has(file)||(policy.hashExcludedFiles??[]).includes(file),data=generated?null:await read(file);
 rows.push({path:file,github,pages,role,reason,bytes:data?.length??null,sha256:data?sha(data):null,generated});
}
const indexed=new Map(rows.map(r=>[r.path,r]));
for(const file of [...pagesExplicit,...githubExplicit])if(!indexed.has(file))throw Error('Explicit file missing: '+file);
for(const edge of policy.manualAssetEdges){
 if(!indexed.get(edge.from)?.pages||!indexed.get(edge.to)?.pages)throw Error('Missing runtime asset: '+JSON.stringify(edge));
 const source=(await read(edge.from)).toString();
 if(!source.includes(path.posix.basename(edge.to)))throw Error('Manual asset edge requires review: '+edge.from+' -> '+edge.to);
}
for(const [file,deps] of graph)for(const dep of deps)if(!indexed.get(file)?.pages||!indexed.get(dep)?.pages)throw Error('Runtime dependency excluded');
// Also inspect all selected JS test/tool/baseline imports, not just runtime imports.
let supportEdges=0;
for(const row of rows.filter(r=>r.github&&/\.(m?js)$/.test(r.path))){
 const source=(await read(row.path)).toString();
 for(const m of source.matchAll(/(?:\bfrom\s*|\bimport\s*\(\s*|\bimport\s*)['"]([^'"]+)['"]/g))if(m[1].startsWith('.')){
  const dep=relative(row.path,m[1]);if(!indexed.get(dep)?.github)throw Error('Selected source import excluded: '+row.path+' -> '+dep);supportEdges++;
 }
}
if(rows.some(r=>(r.github||r.pages)&&r.path.startsWith('reference/dist/vendor/')))throw Error('Legacy vendor unexpectedly selected');
if(rows.some(r=>r.pages&&r.path.startsWith('reference/baseline-')))throw Error('Test baseline unexpectedly selected for Pages');
if(rows.some(r=>r.pages&&!r.github))throw Error('Pages file must have a public source-repository counterpart');
const selected=(key)=>rows.filter(r=>r[key]);
const summarize=key=>({files:selected(key).length,existingBytes:selected(key).reduce((sum,r)=>sum+(r.bytes??0),0)});
const summary={schema:1,stage:1,generatedFilesHashPolicy:'Generated inventory documents and the enclosing archive manifest have null bytes/hash to avoid self-reference.',runtimeModules:graph.size,baselineModules:baselineGraph.size,relativeRuntimeEdges:[...graph.values()].reduce((n,a)=>n+a.length,0),selectedSupportImportEdges:supportEdges,github:summarize('github'),pages:summarize('pages'),archiveOnly:{files:rows.filter(r=>!r.github&&!r.pages).length},existingFiles:rows.filter(r=>!r.generated).length,futureRequirements:policy.requiredBeforeRelease,translationOrRuntimeModified:false,buildPerformed:false,publicReleaseCleared:false};
const verification={checks:['Every existing non-hidden file classified','All explicit selection files exist','Current runtime imports close within Pages','HTML/Worker/sample/compressed resource dependencies accounted for','All selected JS support imports close within GitHub','Old Tree-sitter vendor excluded','Test baselines excluded from Pages','Pages is a subset of GitHub'],status:'passed',scope:'Static file-selection checks only; browser behavior, legal clearance and final publication are later steps.'};
const documents={'release/file-plan.json':{schema:1,files:rows},'release/runtime-graph.json':{roots:policy.roots,modules:Object.fromEntries([...graph].sort(([a],[b])=>a.localeCompare(b))),assetEdges:policy.manualAssetEdges},'release/file-plan-summary.json':summary,'release/file-plan-verification.json':verification};
if(process.argv.includes('--check')){
 for(const [file,value] of Object.entries(documents))if((await read(file)).toString()!==JSON.stringify(value,null,2)+'\n')throw Error('Selection snapshot is stale: '+file);
}else for(const [file,value] of Object.entries(documents))await writeFile(path.join(root,file),JSON.stringify(value,null,2)+'\n');
console.log(JSON.stringify({runtimeModules:summary.runtimeModules,github:summary.github,pages:summary.pages,archiveOnly:summary.archiveOnly,status:verification.status,buildPerformed:false}));
