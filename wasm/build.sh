#!/usr/bin/env bash
set -euo pipefail
# Environment supplies a matching Emscripten and WebAssembly LLVM/Clang install.
: "${EMXX:?Set EMXX to em++}"
: "${LLVM_WASM_PREFIX:?Set LLVM_WASM_PREFIX to the Wasm LLVM install}"
script_dir="$(cd -- "$(dirname -- "$0")" && pwd)"
mkdir -p "$script_dir/out"
"$EMXX" "$script_dir/../reference/next/frontend.cpp" \
  -std=c++17 -O2 -fno-rtti -I"$LLVM_WASM_PREFIX/include" \
  "$LLVM_WASM_PREFIX"/lib/*.a \
  -sMODULARIZE=1 -sEXPORT_ES6=1 -sEXPORT_NAME=createShiClang \
  -sEXPORTED_RUNTIME_METHODS=FS,callMain \
  -sENVIRONMENT=web,worker,node -sALLOW_MEMORY_GROWTH=1 \
  -sINITIAL_MEMORY=67108864 -sMAXIMUM_MEMORY=2147483648 \
  -sSTACK_SIZE=8388608 -sWASM_BIGINT=1 \
  -o "$script_dir/out/shi-clang.mjs"
