"""Recover package evidence only when current host header bytes match frozen SDK."""
import collections,hashlib,json,re,subprocess
from pathlib import Path
root=Path(__file__).resolve().parents[1]
inventory=json.loads((root/'compliance/sdk-inventory.json').read_text())
rows=[r for r in inventory['rows'] if r['path'].startswith('/usr/include/')]
assert all(r['currentHostBytesMatch'] is True for r in rows),'Do not attribute unmatched files to host packages'
result=subprocess.run(['dpkg-query','-S',*[r['path'] for r in rows]],text=True,capture_output=True)
owners={}
for line in result.stdout.splitlines():
 if ': /' not in line:continue
 packages,path=line.split(': /',1);owners['/'+path]=packages.split(', ')
package_counts=collections.Counter(p for r in rows for p in owners.get(r['path'],[]))
packages=[];out=root/'LICENSES/host-packages';out.mkdir(parents=True,exist_ok=True)
for package,count in sorted(package_counts.items()):
 name=package.split(':')[0]
 raw=subprocess.check_output(['dpkg-query','-W','-f=${binary:Package}\t${Version}\t${source:Package}\t${source:Version}\t${Homepage}',package],text=True).split('\t')
 copyright=Path('/usr/share/doc')/name/'copyright';saved=None;fallback=None
 if not copyright.is_file() and name=='libssl-dev':
  fallback='libssl3t64'
  candidate=subprocess.check_output(['dpkg-query','-W','-f=${source:Package}\t${source:Version}',fallback],text=True).split('\t')
  assert candidate==raw[2:4],'Fallback copyright source version differs'
  copyright=Path('/usr/share/doc')/fallback/'copyright'
 if copyright.is_file():
  saved=out/(name+'-copyright.txt');saved.write_bytes(copyright.read_bytes())
 packages.append({'package':raw[0],'version':raw[1],'sourcePackage':raw[2],'sourceVersion':raw[3],'homepage':raw[4],'matchedHeaders':count,'copyrightOrigin':str(copyright),'noticeFallbackPackage':fallback,'copyrightFile':str(saved.relative_to(root)) if saved else None,'copyrightSha256':hashlib.sha256(saved.read_bytes()).hexdigest() if saved else None,'status':'package-owner-and-byte-match-evidence; individual licensing review pending'})
report={'schema':1,'basis':'All 1964 frozen /usr/include headers exactly match current host bytes. dpkg ownership and package metadata captured on 2026-10-31; this is evidence, not a legal clearance.','headers':[{'path':r['path'],'sha256':r['sha256'],'owners':owners.get(r['path'],[])} for r in rows],'unowned':[r['path'] for r in rows if r['path'] not in owners],'packages':packages,'dpkgExitCode':result.returncode,'dpkgStderr':result.stderr}
(root/'compliance/host-package-evidence.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'headers':len(rows),'packages':len(packages),'unowned':report['unowned'],'packageNames':[p['package'] for p in packages]},ensure_ascii=False))
