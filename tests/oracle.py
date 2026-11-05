"""Differential oracle only: not imported by the proposed browser pipeline."""
import json, sys
from pathlib import Path
sys.path.insert(0,str(Path(sys.argv[1])/'next'))
from native_view import physical_view, expanded_view
data=json.load(sys.stdin)
native=data['native']; flags=data['flags']; diagnostics=data.get('diagnostics','')
original=physical_view(native,data['entryInstance'],data['source'],flags,diagnostics)
expanded=expanded_view(native,flags,diagnostics)
json.dump({'original':original,'expanded':expanded},sys.stdout,ensure_ascii=False)
