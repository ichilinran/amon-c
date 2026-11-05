import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
import {hash,checkOutput} from './public-build-lib.mjs';
const root=path.resolve(fileURLToPath(new URL('../',import.meta.url)));
execFileSync(process.execPath,[path.join(root,'tools/plan-public-files.mjs'),'--check'],{cwd:root,stdio:'pipe'});
const bytes=await readFile(path.join(root,'release/file-plan.json')),plan=JSON.parse(bytes);
const report=JSON.parse(await readFile(path.join(root,'build/public-build.json')));
if(report.sourcePlanSha256!==hash(bytes)||report.policySha256!==hash(await readFile(path.join(root,'release/file-policy.json'))))throw Error('Build inputs changed; regenerate the candidate');
for(const target of ['github','pages'])await checkOutput(root,report,target,plan);
execFileSync(process.execPath,[path.join(root,'build/github/tools/plan-public-files.mjs'),'--check'],{cwd:path.join(root,'build/github'),stdio:'pipe'});
// Check every local HTML/Markdown link in entry documentation. Directory links
// are intentionally avoided because static Pages does not provide listings.
let links=0;
for(const target of ['github','pages']){
 const base=path.join(root,'build',target),available=new Set(report.targets[target].files.map(r=>r.path));
 for(const file of ['index.html','licenses.html','THIRD_PARTY_NOTICES.md','LICENSE-SCOPE.md','LICENSES/INDEX.md','LICENSES/README.md','compliance/SDK-SOURCE-REVIEW.md','compliance/WASM-REVIEW.md',...(target==='github'?['README.md','RULES.md','VOCABULARY.md','LIMITATIONS.md','PUBLICATION.md','docs/DEVELOPMENT.md','docs/ARCHITECTURE.md','docs/design/READING-POLICIES.md','docs/design/SAVED-DATA.md','docs/TESTING.md']:[])]){
  const source=await readFile(path.join(base,file),'utf8');
  const refs=[...source.matchAll(/(?:href|src)=["']([^"']+)["']/g),...source.matchAll(/\]\(([^)]+)\)/g)];
  for(const ref of refs){
   if(/^(?:[a-z]+:|#)/i.test(ref[1]))continue;
   const name=path.posix.normalize(path.posix.join(path.posix.dirname(file),ref[1].split('#')[0]));
   if(!available.has(name))throw Error('Broken documentation/HTML link: '+target+'/'+file+' -> '+name);links++;
  }
 }
}
console.log(JSON.stringify({status:'passed',githubFiles:report.targets.github.files.length,pagesFiles:report.targets.pages.files.length,localEntryLinks:links,publicReleaseCleared:report.publicReleaseCleared,missingBeforeRelease:report.missingBeforeRelease}));
