"""Build per-file notice/source coverage. SPDX observations are not a license decision."""
from pathlib import Path
import json,gzip,re,hashlib
root=Path(__file__).resolve().parents[1]
read=lambda p:json.loads((root/p).read_text())
host=read('compliance/host-package-evidence.json');packages={p['package']:p for p in host['packages']};owners={p['path']:p['owners'] for p in host['headers']}
supp=read('compliance/supplemental-license-texts.json');refs=[]
for package in host['packages']:
 text=(root/package['copyrightFile']).read_text()
 for name in sorted(set(re.findall(r'/usr/share/common-licenses/([A-Za-z0-9.+-]+)',text))):
  name=name.rstrip('.')
  choices=['LICENSES/'+name+'.txt','LICENSES/supplemental/'+name+'.txt']
  found=next((p for p in choices if (root/p).is_file()),None)
  refs.append({'package':package['package'],'reference':name,'local':found})
rows=[]
for header in json.loads(gzip.decompress((root/'wasm/out/sdk.json.gz').read_bytes())):
 path=header['path'];text=header['text'];owned=owners.get(path,[])
 if owned:kind='host-source';notices=[packages[p]['copyrightFile'] for p in owned]
 elif path.startswith('/shi/sdk/clang18-headers/'):kind='llvm-resource-source';notices=['reference/tools/clang18-headers/LICENSE.txt','compliance/resource-header-source-check.json']
 else:kind='project-compatibility-source';notices=[]
 rows.append({'path':path,'sha256':hashlib.sha256(text.encode()).hexdigest(),'kind':kind,'owners':owned,'packageNotices':notices,'spdxObserved':re.findall(r'SPDX-License-Identifier:\s*([^\n*]+)',text),'containsCopyrightWord':bool(re.search(r'copyright',text,re.I)),'sourceIncluded':True,'termsDecision':'Original individual text applies. Package metadata is evidence, not a per-file license override.'})
data={'schema':1,'fullCount':len(rows),'hostCount':sum(r['kind']=='host-source' for r in rows),'sourceTextsRetained':True,'referencedCommonLicenseTexts':refs,'missingCommonLicenseTexts':[r for r in refs if not r['local']],'supplementalTexts':len(supp['rows']),'policy':'Header source distribution only; no host library binary is introduced by this SDK. Keep each file notice and SPDX expression, including OR, AND and exceptions. No blanket MIT designation. No legal approval inferred from this coverage check.','rows':rows}
out=root/'compliance/sdk-notice-coverage.json';tmp=out.with_suffix('.part');tmp.write_text(json.dumps(data,indent=2,ensure_ascii=False)+'\n');tmp.replace(out)
print(json.dumps({'headers':len(rows),'host':data['hostCount'],'commonLicenseRefs':len(refs),'missing':data['missingCommonLicenseTexts']}))
