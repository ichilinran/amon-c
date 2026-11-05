// Mechanical evidence checks. This cannot grant legal clearance.
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {gunzipSync} from 'node:zlib';
const root=new URL('../',import.meta.url),read=p=>readFile(new URL(p,root)),json=async p=>JSON.parse(await read(p));
const hash=b=>createHash('sha256').update(b).digest('hex');
const inventory=await json('compliance/sdk-inventory.json');
const full=JSON.parse(gunzipSync(await read('wasm/out/sdk.json.gz'))),core=JSON.parse(gunzipSync(await read('wasm/out/sdk-core.json.gz')));
if(full.length!==inventory.fullCount||core.length!==inventory.coreCount)throw Error('SDK count mismatch');
const indexed=new Map(inventory.rows.map(r=>[r.path,r])),texts=new Map(full.map(r=>[r.path,r.text]));
for(const row of full)if(hash(row.text)!==indexed.get(row.path)?.sha256)throw Error('SDK hash mismatch: '+row.path);
for(const row of core)if(row.text!==texts.get(row.path))throw Error('Core SDK differs: '+row.path);
const host=await json('compliance/host-package-evidence.json');
if(host.unowned.length||host.headers.length!==1964)throw Error('Unresolved host ownership');
for(const row of host.headers)if(row.sha256!==indexed.get(row.path)?.sha256)throw Error('Host evidence mismatch');
for(const item of host.packages)if(!item.copyrightFile||hash(await read(item.copyrightFile))!==item.copyrightSha256)throw Error('Notice mismatch: '+item.package);
const checks=await json('compliance/upstream-license-checks.json');
for(const row of checks.rows)if(row.status!=='retrieved'||!row.matchesBundled||hash(await read(row.local))!==row.sha256)throw Error('Upstream license mismatch: '+row.local);
const supplemental=await json('compliance/supplemental-license-texts.json');
for(const row of supplemental.rows)if(!row.sha256||row.status==='unresolved'||hash(await read(row.path))!==row.sha256)throw Error('Supplemental text missing/changed: '+row.path);
const coverage=await json('compliance/sdk-notice-coverage.json');
if(coverage.rows.length!==full.length||coverage.missingCommonLicenseTexts.length)throw Error('SDK notice coverage incomplete');
for(const row of coverage.rows){
 if(hash(texts.get(row.path))!==row.sha256)throw Error('SDK notice source mismatch: '+row.path);
 for(const path of row.packageNotices)await read(path);
}
for(const ref of coverage.referencedCommonLicenseTexts)if(!ref.local)throw Error('Unresolved license reference');else await read(ref.local);
const resource=await json('compliance/resource-header-source-check.json');
if(resource.count!==26||resource.identical!==18||resource.derived!==8||resource.unexplained!==0)throw Error('Resource source correspondence incomplete');
if(hash(await read(resource.patch))!==resource.patchSha256)throw Error('Resource patch mismatch');
for(const row of resource.rows){
 const local=await read(row.path);
 if(hash(local)!==row.localSha256||hash(texts.get(row.sdkPath))!==row.localSha256)throw Error('Resource source/SDK mismatch: '+row.path);
 if(!row.identicalToUpstream&&!local.toString().includes('Modified for Shi:'))throw Error('Resource modification notice missing');
}
const llvm=await json('compliance/llvm-archive-review.json');
for(const row of llvm.noticeTexts)if(hash(await read(row.path))!==row.sha256)throw Error('LLVM notice mismatch: '+row.path);
const provenance=await json('wasm/build-provenance.json');
if(llvm.prebuiltArchive.sha256!==provenance.libraryArchiveSha256)throw Error('LLVM archive provenance mismatch');
if(hash(await read('wasm/out/shi-clang.wasm'))!==provenance.wasmSha256||hash(gunzipSync(await read('wasm/out/shi-clang.wasm.gz')))!==provenance.wasmSha256)throw Error('Wasm hash mismatch');
const sdkIndex=await json('wasm/out/sdk-index.json');
if(sdkIndex.fullSdkSha256!==hash(await read('wasm/out/sdk.json.gz')))throw Error('Full SDK hash mismatch');
const own=await json('compliance/project-license.json');
const license=await read(own.licenseFile),scope=await read(own.scopeFile),pkg=await json('package.json');
if(!own.adopted||own.spdx!=='MIT'||pkg.license!=='MIT'||!license.toString().includes(own.copyright)||license.toString().includes('TO BE CONFIRMED'))throw Error('Project MIT adoption metadata mismatch');
if(hash(license)!==own.licenseSha256||hash(scope)!==own.scopeSha256||!own.thirdPartyTermsUnchanged)throw Error('Project license/scope mismatch');
const status=await json('compliance/release-status.json');
const terms=await json('compliance/sdk-file-terms-review.json');
if(terms.reviewed!==full.length||terms.unresolved.length||new Set(terms.rows.map(r=>r.path)).size!==full.length)throw Error('SDK terms review missing or stale');
for(const row of terms.rows){
 if(hash(texts.get(row.path))!==row.sha256)throw Error('SDK terms source changed: '+row.path);
 for(const path of row.specificEvidence)await read(path);
}
if(hash(await read(terms.supportingNoticeFile))!==terms.supportingNoticeSha256)throw Error('SDK supporting notices changed');
for(const row of terms.extraSources)if(hash(await read(row.path))!==row.sha256)throw Error('Extra license source changed');
for(const file of ['compliance/llvm-source-notice-coverage.json','compliance/emscripten-runtime-notice-coverage.json']){
 const row=await json(file);if(hash(await read(row.file))!==row.sha256)throw Error('Source notice collection changed');
}
const rpc=await json('compliance/rpc-generated-source-check.json');
if(rpc.count!==12||rpc.exactlyReproduced!==12)throw Error('RPC source reproduction incomplete');
for(const row of rpc.rows)if(!row.generatedIdentical||hash(await read(row.sourceFile))!==row.sourceSha256)throw Error('RPC input changed');
const link=await json('compliance/wasm-link-reproduction.json');
if(!link.byteIdentical||link.shippedWasmSha256!==provenance.wasmSha256||link.reproducedWasmSha256!==provenance.wasmSha256||hash(await read(link.extractorSource))!==link.extractorSourceSha256||hash(await read(link.linkMap))!==link.linkMapGzipSha256)throw Error('Wasm reproduction evidence changed');
if(link.pathReplacement){
 const replacement=await json(link.pathReplacement),previous=await json('compliance/wasm-link-reproduction-v020.json');
 if(hash(await read(previous.linkMap))!==previous.linkMapGzipSha256)throw Error('Historical link map changed');
 const support=link.archiveInputs.find(r=>r.path==='lib/libLLVMSupport.a');
 if(replacement.sourceModified||replacement.providerPatchApplied||!replacement.abiConfigurationMatchesPrebuilt||support?.sha256!==replacement.replacementSupportSha256)throw Error('Upstream Path replacement evidence mismatch');
 if(JSON.stringify(replacement.changedMembers)!==JSON.stringify(['Path.cpp.o'])||replacement.members.length!==replacement.archiveMemberCount)throw Error('Path replacement member inventory mismatch');
 for(const r of replacement.files)if(hash(await read(r.path))!==r.sha256)throw Error('Path replacement file changed: '+r.path);
 if(hash(await read('compliance/path-replacement/Path.cpp.o'))!==replacement.replacementObjectSha256)throw Error('Path object hash mismatch');
 const changed=replacement.members.filter(r=>r.before!==r.after);
 if(changed.length!==1||changed[0].member!=='Path.cpp.o'||changed[0].before!==replacement.originalObjectSha256||changed[0].after!==replacement.replacementObjectSha256)throw Error('Unexpected archive member changes');
 if(previous.archiveInputs.find(r=>r.path==='lib/libLLVMSupport.a')?.sha256!==replacement.originalSupportSha256||link.archiveInputs.length!==previous.archiveInputs.length)throw Error('Previous support archive evidence mismatch');
 for(const r of link.archiveInputs)if(r.path!=='lib/libLLVMSupport.a'&&previous.archiveInputs.find(x=>x.path===r.path)?.sha256!==r.sha256)throw Error('Unrelated LLVM archive changed: '+r.path);
 if(!link.selectedObjects.some(r=>r.archive==='libLLVMSupport.a'&&r.member==='Path.cpp.o')||!link.providerPathAbsent)throw Error('Replacement not connected to final link evidence');
 if((await read('wasm/out/shi-clang.wasm')).includes(Buffer.from('/usr/lib/libclang.wasm')))throw Error('Provider fixed path remains in final Wasm');
 const baseline=await json('compliance/path-replacement/baseline-reproduction.json'),objectRebuild=await json('compliance/path-replacement/path-reproduction.json'),wasmRebuild=await json('compliance/path-replacement/wasm-reproduction.json');
 if(!baseline.matchesShippedWasm||baseline.sha256!==previous.shippedWasmSha256||!objectRebuild.matchesRecordedCandidate||objectRebuild.objectSha256!==replacement.replacementObjectSha256||objectRebuild.supportSha256!==replacement.replacementSupportSha256||!wasmRebuild.matchesShippedWasm||wasmRebuild.sha256!==provenance.wasmSha256)throw Error('Independent build reproduction evidence mismatch');
}
console.log(JSON.stringify({sdk:full.length,core:core.length,hostHeaders:host.headers.length,packages:host.packages.length,upstreamNotices:checks.rows.length,supplementalTexts:supplemental.rows.length,resourceExact:resource.identical,resourceDerived:resource.derived,commonLicenseReferences:coverage.referencedCommonLicenseTexts.length,llvmAdditionalNotices:llvm.noticeTexts.length,publicReleaseCleared:status.publicReleaseCleared,openItems:status.open.map(r=>r.id)}));
if(process.argv.includes('--release')&&(!status.publicReleaseCleared||status.open.length)){console.error('Public release is not cleared; resolve compliance/release-status.json items.');process.exitCode=2;}
