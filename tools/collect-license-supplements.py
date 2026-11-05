"""Collect pinned primary-source texts; does not decide legal compatibility."""
import concurrent.futures,hashlib,json,os,urllib.request
from pathlib import Path
root=Path(__file__).resolve().parents[1];out=root/'LICENSES/supplemental';out.mkdir(exist_ok=True)
rows=[]
for name in ['GPL-1','LGPL-2','Artistic','GFDL-1.2','GFDL-1.3','GPL','LGPL']:
 source=Path('/usr/share/common-licenses')/name
 if source.is_file():
  dest=out/(name+'.txt');data=source.read_bytes();temp=dest.with_suffix('.part');temp.write_bytes(data);temp.replace(dest)
  rows.append({'path':str(dest.relative_to(root)),'source':str(source),'sha256':hashlib.sha256(data).hexdigest(),'basis':'Host distribution standard license text, copied verbatim'})
base='https://raw.githubusercontent.com/torvalds/linux/v6.8/LICENSES/'
spec=[('Linux-syscall-note.txt',base+'exceptions/Linux-syscall-note'),('Linux-OpenIB.txt','https://raw.githubusercontent.com/torvalds/linux/v6.8/LICENSES/deprecated/Linux-OpenIB'),('CDDL-1.0.txt',base+'dual/CDDL-1.0'),('BSD-2-Clause.txt',base+'preferred/BSD-2-Clause'),('BSD-3-Clause.txt',base+'preferred/BSD-3-Clause'),('MIT.txt',base+'preferred/MIT'),('ISC.txt',base+'deprecated/ISC'),('GPL-1.0.txt',base+'deprecated/GPL-1.0'),('GCC-exception-3.1.txt','https://raw.githubusercontent.com/gcc-mirror/gcc/releases/gcc-13.3.0/COPYING.RUNTIME')]
def fetch(item):
 name,url=item;dest=out/name;row={'path':str(dest.relative_to(root)),'source':url}
 try:
  data=urllib.request.urlopen(url,timeout=40).read();temp=dest.with_suffix('.part');temp.write_bytes(data);temp.replace(dest);row.update(sha256=hashlib.sha256(data).hexdigest(),status='retrieved')
 except Exception as e:row.update(status='unresolved',error=str(e))
 return row
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:rows+=list(pool.map(fetch,spec))
(root/'compliance/supplemental-license-texts.json').write_text(json.dumps({'schema':1,'rows':rows},indent=2)+'\n')
print(json.dumps({'texts':len(rows),'unresolved':[r for r in rows if r.get('status')=='unresolved']}))
