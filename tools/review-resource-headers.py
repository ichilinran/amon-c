"""Verify derived sources; --upstream also verifies pinned originals and the patch.
Source correspondence is not historical download provenance or legal clearance.
"""
import hashlib,json,sys,urllib.request,difflib
from pathlib import Path
root=Path(__file__).resolve().parents[1]
sha=lambda b:hashlib.sha256(b).hexdigest()
record=json.loads((root/'compliance/resource-header-source-check.json').read_text())
patch=(root/record['patch']).read_bytes();assert sha(patch)==record['patchSha256']
diff=[]
for row in record['rows']:
 p=root/row['path'];local=p.read_bytes();assert sha(local)==row['localSha256'],p
 if not row['identicalToUpstream']:assert b'Modified for Shi:' in local,p
 if '--upstream' in sys.argv:
  original=urllib.request.urlopen(row['sourceURL'],timeout=40).read()
  assert sha(original)==row['sourceSha256'],p
  assert (original==local)==row['identicalToUpstream'],p
  if original!=local:diff.extend(difflib.unified_diff(original.decode().splitlines(True),local.decode().splitlines(True),fromfile='a/'+p.name,tofile='b/'+p.name))
if '--upstream' in sys.argv:assert ''.join(diff).encode()==patch
print(json.dumps({'count':len(record['rows']),'exact':record['identical'],'derived':record['derived'],'upstreamFetched':'--upstream' in sys.argv}))
