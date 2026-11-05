"""Freeze host header text for the fixed x86_64 Linux analysis environment.
This is a development fixture, not a platform-neutral or licensed release SDK.
"""
import gzip, hashlib, json
from pathlib import Path
root=Path(__file__).resolve().parents[1]
sources=[(Path('/usr/include'),'/usr/include'),(root/'reference/tools/clang18-headers','/shi/sdk/clang18-headers'),(root/'reference/next/sdk-compat','/shi/sdk/compat')]
files=[]
for directory,virtual in sources:
    for p in sorted(directory.rglob('*')):
        if not p.is_file():continue
        # Clang needs header source, not unrelated .a/.so payloads.
        if p.suffix not in ('.h','.inc','.def') and p.name not in ('features-time64.h',):continue
        files.append({'path':virtual+'/'+str(p.relative_to(directory)),'text':p.read_text(encoding='utf8')})
raw=json.dumps(files,ensure_ascii=False,separators=(',',':')).encode()
out=root/'wasm/out/sdk.json.gz';out.parent.mkdir(exist_ok=True,parents=True)
out.write_bytes(gzip.compress(raw,mtime=0))
print(json.dumps({'headers':len(files),'uncompressed':len(raw),'compressed':out.stat().st_size,'sha256':hashlib.sha256(out.read_bytes()).hexdigest()},indent=2))
