"""Evidence inventory, not an automatic legal clearance or SPDX conclusion."""
import collections,gzip,hashlib,json,re,subprocess
from pathlib import Path
root=Path(__file__).resolve().parents[1]
full=json.loads(gzip.decompress((root/'wasm/out/sdk.json.gz').read_bytes()))
core=json.loads(gzip.decompress((root/'wasm/out/sdk-core.json.gz').read_bytes()))
core_map={f['path']:f['text'] for f in core}
rows=[]
for f in full:
 p,text=f['path'],f['text'];h=hashlib.sha256(text.encode()).hexdigest()
 if p.startswith('/shi/sdk/clang18-headers/'):family='LLVM resource headers'
 elif p.startswith('/shi/sdk/compat/'):family='Shi compatibility layer'
 elif 'GNU C Library' in text:family='glibc notice observed'
 elif 'GNU ISO C++ Library' in text or 'GCC Runtime Library Exception' in text:family='GCC/libstdc++ notice observed'
 elif p.startswith(('/usr/include/linux/','/usr/include/asm-generic/','/usr/include/x86_64-linux-gnu/asm/','/usr/include/sound/','/usr/include/rdma/','/usr/include/drm/','/usr/include/misc/','/usr/include/video/','/usr/include/mtd/')):family='Linux/UAPI path candidate'
 else:family='Other host header: individual review required'
 spdx=re.findall(r'SPDX-License-Identifier:\s*([^\n]+)',text)
 local=Path(p);match=local.is_file() and local.read_bytes()==text.encode() if p.startswith('/usr/include/') else None
 rows.append({'path':p,'sha256':h,'utf8Bytes':len(text.encode()),'inCore':p in core_map,'coreTextMatches':core_map.get(p)==text if p in core_map else None,'evidenceFamily':family,'observedSPDX':[x.rstrip(' */') for x in spdx],'currentHostBytesMatch':match,'clearance':'unreviewed'})
assert len(core_map)==len(core) and all(p in {f['path'] for f in full} for p in core_map)
assert all(r['coreTextMatches'] is not False for r in rows)
result={'schema':1,'status':'inventory-only-not-cleared','fullCount':len(rows),'coreCount':len(core),'familyCounts':dict(collections.Counter(r['evidenceFamily'] for r in rows)),'coreFamilyCounts':dict(collections.Counter(r['evidenceFamily'] for r in rows if r['inCore'])),'rows':rows}
(root/'compliance/sdk-inventory.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({k:v for k,v in result.items() if k!='rows'},ensure_ascii=False))
