"""Rebuild the unmodified upstream Path.cpp.o and replace only that archive member.

Then run reproduce-link.py with OUTPUT/prefix. Requires activated Emscripten
3.1.64, CMake and Ninja; no download, publication, or license clearance occurs.
"""
import argparse
import hashlib
import json
import os
from pathlib import Path
import shutil
import subprocess
import tarfile

ROOT = Path(__file__).resolve().parents[1]
def sha(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()

def executable(name):
    resolved = shutil.which(name)
    if not resolved:
        raise ValueError('Required executable not found: ' + name)
    return str(Path(resolved).resolve())

def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--emxx', required=True)
    p.add_argument('--source-archive', required=True)
    p.add_argument('--llvm-prefix', required=True, help='Original unmodified prebuilt prefix')
    p.add_argument('--output', required=True, help='New or empty working directory')
    p.add_argument('--cmake', default='cmake')
    p.add_argument('--ninja', default='ninja')
    a = p.parse_args()
    cmake, ninja = executable(a.cmake), executable(a.ninja)
    evidence = ROOT / 'compliance/path-replacement'
    record = json.loads((ROOT / 'compliance/path-replacement.json').read_text())
    previous = json.loads((ROOT / 'compliance/wasm-link-reproduction-v020.json').read_text())
    emxx = Path(a.emxx).resolve()
    version = subprocess.check_output([emxx, '--version'], text=True)
    if '3.1.64' not in version:
        raise ValueError('Emscripten 3.1.64 required')
    archive = Path(a.source_archive).resolve()
    if sha(archive) != record['sourceArchiveSha256']:
        raise ValueError('Pinned LLVM source archive hash mismatch')
    original = Path(a.llvm_prefix).resolve()
    for row in previous['archiveInputs']:
        if sha(original / row['path']) != row['sha256']:
            raise ValueError('Original library changed: ' + row['path'])
    out = Path(a.output).resolve()
    if out.exists() and any(out.iterdir()):
        raise ValueError('Output must be empty')
    out.mkdir(parents=True, exist_ok=True)
    with tarfile.open(archive) as t:
        members = t.getmembers()
        prefix = members[0].name + '/'
        selected = [m for m in members if any(m.name.startswith(prefix+x) for x in ('llvm/', 'clang/', 'cmake/', 'third-party/'))]
        t.extractall(out / 'source', members=selected, filter='data')
    source = out / 'source' / prefix.rstrip('/')
    build = out / 'build'
    configure = json.loads((evidence / 'configure-command.json').read_text())
    cmd = configure['command']
    oldsource = str(Path(cmd[cmd.index('-S')+1]).parent)
    oldbuild = cmd[cmd.index('-B')+1]
    oldinstall = str(Path(cmd[0]).parents[1])
    def remap(s):
        return s.replace(oldsource, str(source)).replace(oldbuild, str(build)).replace(oldinstall, str(emxx.parent.parent))
    cmd = [remap(s) for s in cmd]
    cmd[0] = str(emxx.parent / 'emcmake')
    cmd[1] = cmake
    cmd.append('-DCMAKE_MAKE_PROGRAM=' + ninja)
    env = os.environ.copy()
    env['CXXFLAGS'] = configure['CXXFLAGS']
    subprocess.run(cmd, env=env, check=True)
    command = [remap(s) for s in json.loads((evidence / 'path-compile-command.json').read_text())]
    command[0] = str(emxx)
    obj = build / 'lib/Support/CMakeFiles/LLVMSupport.dir/Path.cpp.o'
    obj.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(command, cwd=build, check=True)
    if sha(obj) != record['replacementObjectSha256']:
        raise ValueError('Rebuilt object differs; investigate configuration/toolchain before replacement')
    replacement = out / 'prefix'
    shutil.copytree(original, replacement)
    ar = emxx.parent.parent / 'bin/llvm-ar'
    library = replacement / 'lib/libLLVMSupport.a'
    subprocess.run([ar, 'r', library, obj], check=True)
    if sha(library) != record['replacementSupportSha256']:
        raise ValueError('Replaced archive differs from the recorded candidate')
    (out / 'path-reproduction.json').write_text(json.dumps({
        'objectSha256': sha(obj), 'supportSha256': sha(library),
        'matchesRecordedCandidate': True, 'sourceModified': False,
        'compilerVersion': version,
    }, indent=2) + '\n')
    print('Verified replacement prefix:', replacement)

if __name__ == '__main__':
    main()
