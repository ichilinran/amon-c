import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import {importSaved} from '../src/index.js';
const root=new URL('../',import.meta.url);
test('public source is self-contained and does not depend on release-history implementations',async()=>{
 const policy=JSON.parse(await readFile(new URL('release/file-policy.json',root)));assert.deepEqual(policy.baselineRoots,[]);
 assert(!policy.githubFiles.some(p=>p.includes('baseline-v')||p.startsWith('implementation-v')));
 const tests=await readdir(new URL('tests/',root));assert(!tests.some(p=>/-v0\d.*\.test\.mjs$/.test(p)));
 for(const file of tests.filter(p=>p.endsWith('.mjs'))){if(file==='public-source.test.mjs')continue;const text=await readFile(new URL('tests/'+file,root),'utf8');assert(!/from\s*['"][^'"]*(?:baseline-v|implementation-v)/.test(text),file);assert(!/new URL\(['"][^'"]*(?:baseline-v|implementation-v)/.test(text),file);}
 const sampleRoot=new URL('examples/analysis/',root);
 const freeze=o=>{if(o&&typeof o==='object'&&!Object.isFrozen(o)){for(const v of Object.values(o))freeze(v);Object.freeze(o);}return o;};
 for(const file of (await readdir(sampleRoot)).filter(f=>f.endsWith('.json'))){
  const bytes=await readFile(new URL(file,sampleRoot),'utf8');assert(!/\/workspace\/scratch\/|\/mnt\/data\/|\/Users\/|\/home\/oai\//.test(bytes),file);
  const data=freeze(JSON.parse(bytes)),before=JSON.stringify(data),result=await importSaved(data);assert(result.views.length>0,file);assert.equal(JSON.stringify(data),before,file);
 }
 const pkg=JSON.parse(await readFile(new URL('package.json',root)));assert(pkg.scripts.test.includes('line-numbers.test.mjs'));assert(!pkg.scripts.test.includes('native-projection.test.mjs'));assert(pkg.scripts['test:native'].includes('native-projection.test.mjs'));
});
