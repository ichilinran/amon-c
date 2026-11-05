"""Recover unchanged SDK source files from a shipped JSON gzip archive."""
import argparse,gzip,json
from pathlib import Path,PurePosixPath
p=argparse.ArgumentParser();p.add_argument('archive',type=Path);p.add_argument('destination',type=Path);args=p.parse_args()
rows=json.loads(gzip.decompress(args.archive.read_bytes()));seen=set();prepared=[]
for row in rows:
 virtual=row['path'];path=PurePosixPath(virtual)
 if not virtual.startswith('/') or '..' in path.parts or virtual in seen:raise ValueError('Invalid or duplicate SDK path')
 seen.add(virtual);out=args.destination.joinpath(*path.parts[1:])
 if not out.resolve().is_relative_to(args.destination.resolve()):raise ValueError('Output escapes destination')
 prepared.append((out,row['text']))
for out,text in prepared:
 out.parent.mkdir(parents=True,exist_ok=True);out.write_bytes(text.encode('utf8'))
print(f'Extracted {len(prepared)} unchanged source files')
