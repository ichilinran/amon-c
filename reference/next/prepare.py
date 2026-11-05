"""Prepare the fixed Ubuntu 24.04 x86_64 frontend without installing OS packages."""
import argparse,hashlib,json,platform,shutil,subprocess,sys,urllib.request
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]

def main():
 parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('destination');parser.add_argument('--toolroot',help='Reuse an already extracted, checksum-verified development tree')
 args=parser.parse_args();dest=Path(args.destination).resolve();dest.mkdir(parents=True,exist_ok=True)
 osinfo=Path('/etc/os-release').read_text() if Path('/etc/os-release').exists() else ''
 if platform.machine()!='x86_64' or 'VERSION_ID="24.04"' not in osinfo:raise ValueError('検証対象はUbuntu 24.04 x86_64です。')
 if not shutil.which('g++') or not shutil.which('dpkg-deb'):raise ValueError('g++とdpkg-debが必要です。')
 manifest=json.loads((Path(__file__).parent/'toolchain-packages.json').read_text())
 toolroot=Path(args.toolroot).resolve() if args.toolroot else dest/'development'
 if not args.toolroot:
  cache=dest/'packages';cache.mkdir(exist_ok=True)
  for package in manifest:
   path=cache/package['name']
   if not path.exists():
    print('取得中：'+package['name'],flush=True)
    temp=path.with_name(path.name+'.tmp')
    with urllib.request.urlopen(package['url'],timeout=60) as response,temp.open('wb') as output:shutil.copyfileobj(response,output)
    temp.replace(path)
   if path.stat().st_size!=package['size'] or hashlib.sha512(path.read_bytes()).hexdigest()!=package['sha512']:raise ValueError('パッケージの確認用ハッシュが一致しません：'+package['name'])
   subprocess.run(['dpkg-deb','-x',str(path),str(toolroot)],check=True)
 runtime=dest/'runtime';(runtime/'lib').mkdir(parents=True,exist_ok=True);libs=toolroot/'usr/lib/x86_64-linux-gnu'
 for name in ('libLLVM.so.18.1','libclang-cpp.so.18.1'):shutil.copyfile(libs/name,runtime/'lib'/name)
 executable=runtime/'shi-frontend'
 subprocess.run(['g++','-std=c++17','-O0','-I'+str(toolroot/'usr/lib/llvm-18/include'),'-I'+str(toolroot/'usr/include/llvm-18'),'-I'+str(toolroot/'usr/include/llvm-c-18'),str(Path(__file__).parent/'frontend.cpp'),str(libs/'libclang-cpp.so.18.1'),str(libs/'libLLVM.so.18.1'),'-Wl,-rpath,$ORIGIN/lib','-o',str(executable)],check=True)
 dependency=subprocess.run(['ldd',str(executable)],capture_output=True,text=True,check=True).stdout
 if 'not found' in dependency:raise ValueError('必要な共有ライブラリがありません：'+dependency)
 report={'platform':platform.platform(),'machine':platform.machine(),'binarySha256':hashlib.sha256(executable.read_bytes()).hexdigest(),'sharedDependencies':dependency,'packageManifest':manifest,'resourceHeaders':str(ROOT/'tools/clang18-headers'),'sdkCompatibility':str(ROOT/'next/sdk-compat')}
 (dest/'environment.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
 print('解析器を準備しました：'+str(executable))

if __name__=='__main__':
 try:main()
 except (OSError,ValueError,subprocess.CalledProcessError) as e:print(str(e),file=sys.stderr);sys.exit(1)
