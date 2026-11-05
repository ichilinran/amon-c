"""Verify the frozen source review; --rpcgen also repeats the 12 generator comparisons."""
from pathlib import Path
import json,gzip,hashlib,sys,subprocess
root=Path(__file__).resolve().parents[1]
read=lambda p:json.loads((root/p).read_text())
sha=lambda b:hashlib.sha256(b).hexdigest()
records=json.loads(gzip.decompress((root/'wasm/out/sdk.json.gz').read_bytes()))
texts={r['path']:r['text'] for r in records};review=read('compliance/sdk-file-terms-review.json')
assert review['reviewed']==len(records)==1991 and not review['unresolved']
assert {r['path'] for r in review['rows']}==set(texts)
assert sha((root/review['supportingNoticeFile']).read_bytes())==review['supportingNoticeSha256']
for row in review['rows']:
 assert sha(texts[row['path']].encode())==row['sha256'],row['path']
 for path in row['specificEvidence']:assert (root/path).is_file(),path
for row in review['extraSources']:assert sha((root/row['path']).read_bytes())==row['sha256']
rpc=read('compliance/rpc-generated-source-check.json')
assert rpc['count']==rpc['exactlyReproduced']==12
for row in rpc['rows']:
 source=root/row['sourceFile'];assert sha(source.read_bytes())==row['sourceSha256']
 assert row['generatedIdentical']
 if '--rpcgen' in sys.argv:
  output=subprocess.run(['rpcgen','-h',source.name],cwd=source.parent,capture_output=True,text=True,check=True).stdout
  assert output==texts[row['path']],row['path']
llvm=read('compliance/llvm-source-notice-coverage.json')
assert sha((root/llvm['file']).read_bytes())==llvm['sha256']
print(json.dumps({'sdkSourceReview':len(records),'rpcReproduced':12,'rpcRerun':'--rpcgen' in sys.argv,'llvmNoticeCorpusFiles':llvm['sourceFiles'],'legalCertification':False}))
