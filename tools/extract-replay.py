"""Reconstruct v2 user inputs and semantic flags; never copy historical SDK paths."""
import pathlib,json,os
root=pathlib.Path(__file__).resolve().parents[1]
source=root/'examples/analysis';out=root/'examples/replay';out.mkdir(exist_ok=True)
index=[]
for p in sorted(source.glob('*.json')):
 d=json.loads(p.read_text())
 if d.get('version')!=2 or not d.get('contexts'):continue
 files=[f for f in d['files'] if f.get('text') is not None]
 common=os.path.commonpath([os.path.dirname(f['path']) for f in files])
 names={f['path']:os.path.relpath(f['path'],common) for f in files};byid={f['id']:f for f in files}
 units=[]
 for c in d['contexts']:
  args=[]
  for a in c['args']:
   if a.startswith(('-D','-U')):args.append(a)
   elif a.startswith('-I'):
    absolute=os.path.normpath(os.path.join(c['directory'],a[2:]));relative=os.path.relpath(absolute,common)
    if relative.startswith('..'):raise ValueError('External user include root needs explicit capture: '+a)
    args.append('-I'+relative)
  units.append({'source':names[byid[c['mainFile']]['path']],'args':args,'directory':'.'})
 project={'files':{names[f['path']]:f['text'] for f in files},'translationUnits':units}
 (out/p.name).write_text(json.dumps(project,ensure_ascii=False,indent=2)+'\n')
 index.append({'fixture':p.name,'contexts':len(units),'inputFiles':len(files)})
(root/'coverage/replay-index.json').write_text(json.dumps(index,indent=2)+'\n')
