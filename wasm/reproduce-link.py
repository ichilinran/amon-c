"""Reproduce the shipped Wasm from recorded LLVM archives, including the rebuilt Path.cpp.o.
This is not a full LLVM source build.
Requires Emscripten 3.1.64. The output directory must be empty. Does not publish.
"""
from pathlib import Path
import argparse,hashlib,json,subprocess,gzip
root=Path(__file__).resolve().parents[1]
sha=lambda b:hashlib.sha256(b).hexdigest()
def main():
 parser=argparse.ArgumentParser(description=__doc__)
 parser.add_argument('--emxx',required=True,help='Path to Emscripten em++ executable; activate its environment first')
 parser.add_argument('--llvm-prefix',required=True,help='Extracted prebuilt LLVM prefix')
 parser.add_argument('--output',required=True,help='New or empty output directory')
 args=parser.parse_args();record=json.loads((root/'compliance/wasm-link-reproduction.json').read_text())
 version=subprocess.run([args.emxx,'--version'],capture_output=True,text=True,check=True).stdout
 if '3.1.64' not in version:raise ValueError('Emscripten 3.1.64 is required for this reproduction')
 prefix=Path(args.llvm_prefix).resolve();out=Path(args.output).resolve()
 if out.exists() and any(out.iterdir()):raise ValueError('Output directory must be empty')
 if sha((root/record['extractorSource']).read_bytes())!=record['extractorSourceSha256']:raise ValueError('Extractor source changed')
 archives=[]
 for row in record['archiveInputs']:
  p=prefix/row['path']
  if sha(p.read_bytes())!=row['sha256']:raise ValueError('LLVM archive changed: '+row['path'])
  archives.append(str(p))
 out.mkdir(parents=True,exist_ok=True)
 cmd=[args.emxx,str(root/record['extractorSource']),'-std=c++17','-ffile-prefix-map='+str(prefix)+'='+record['historicalHeaderPrefix'],'-O2','-fno-rtti','-I'+str(prefix/'include'),*archives,
      '-sMODULARIZE=1','-sEXPORT_ES6=1','-sEXPORT_NAME=createShiClang','-sEXPORTED_RUNTIME_METHODS=FS,callMain','-sENVIRONMENT=web,worker,node','-sALLOW_MEMORY_GROWTH=1','-sINITIAL_MEMORY=67108864','-sMAXIMUM_MEMORY=2147483648','-sSTACK_SIZE=8388608','-sWASM_BIGINT=1',
      '-Wl,-Map='+str(out/'link.map'),'--emit-symbol-map','-o',str(out/'shi-clang.mjs')]
 subprocess.run(cmd,check=True)
 digest=sha((out/'shi-clang.wasm').read_bytes())
 report={'sha256':digest,'expected':record['shippedWasmSha256'],'matchesShippedWasm':digest==record['shippedWasmSha256'],'compilerVersion':version,'scope':record['reproductionScope']}
 (out/'reproduction.json').write_text(json.dumps(report,indent=2)+'\n')
 print(json.dumps(report))
 if not report['matchesShippedWasm']:raise ValueError('Rebuilt Wasm differs from the shipped file; investigate before replacement')
if __name__=='__main__':main()
