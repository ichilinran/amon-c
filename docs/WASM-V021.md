# v0.21：提供元のPath変更への依存を除く

2026-11-02。変更対象はClang/Wasmの構築資産と、その証拠・表示資料です。
翻訳処理、辞書、SDK本文、UI、C17解析条件はv0.20から変更していません。

## 変更方法

まずEmscripten 3.1.64と記録済みの既成LLVMライブラリで、v0.20の配布Wasm
（26,760,081バイト、SHA-256 `47599aff6661b367d03383dd1b7c5743349ab74b20c95118be75be0adb9944b8`）
をバイト一致で再現しました。

LLVM 18.1.8の固定commit `3b5b5c1ec4a3095ab096dd780e84d7ab81f3d7ff` を取得し、
提供元のパッチを適用せず、元の構成条件でCMakeを実行しました。
`HAVE_DLFCN_H`・`HAVE_DLADDR`が検出され、上流のままの `Path.cpp` と
`Unix/Path.inc` で組み立て・リンクできました。自作の分岐は追加していません。

`libLLVMSupport.a`の146メンバーを前後で照合し、`Path.cpp.o`だけを差し替えました。
他のLLVMアーカイブは記録済みのままです。ABIに関わる `llvm-config.h` と
`abi-breaking.h` は既成ライブラリのヘッダとバイト一致しました。
差し替え部品はEmscripten 3.1.64、それ以外の既成LLVM部品は従来の3.1.61の記録です。

新しいリンク地図には44ライブラリ・866オブジェクトが現れ、従来から増えた1件は
実行用の `libc.a(dladdr.o)` です。最終最適化前の地図なので、各オブジェクトの全コードが
最終Wasmに残ることを示す一覧ではありません。

新しいWasmは26,759,957バイト、SHA-256は
`2231bc6d97378823341ba7898165a6ab21c6a3edf9286c981e0ea3411d46ca99`です。
`/usr/lib/libclang.wasm` の文字列がないことは補助検査であり、除去の主な根拠は
上流ソース・部品ハッシュ・アーカイブ内の対応・リンク記録です。

## 再現

Emscripten 3.1.64を有効にし、CMakeとNinjaを用意します。
`compliance/path-replacement.json` のURLとSHA-256で固定したLLVMソースアーカイブと、
従来の既成LLVMアーカイブを取得します。既成LLVMを展開した場所を `ORIGINAL_PREFIX` とします。

```sh
python3 wasm/rebuild-path.py --emxx /path/to/em++ \
  --source-archive /path/to/llvm-source.tar.gz \
  --llvm-prefix ORIGINAL_PREFIX --output /path/to/new-path-build
python3 wasm/reproduce-link.py --emxx /path/to/em++ \
  --llvm-prefix /path/to/new-path-build/prefix --output /path/to/new-wasm
```

出力先はそれぞれ新規または空のディレクトリを指定します。
`--cmake` と `--ninja` で実行ファイルの絶対パスも指定できます。
再現スクリプトはソースアーカイブ、元の各ライブラリ、新しいオブジェクト、差し替え後の
ライブラリ、最後のWasmのハッシュを照合します。`-ffile-prefix-map`で構築場所に依存する
`__FILE__` 表示を固定しています。LLVM全体をソースから再ビルドする手順ではありません。

## 表示条件と記録

上流ソースと差し替え部品にはApache-2.0 WITH LLVM-exception等の元の条件を維持します。
提供元の変更への依存を除いたことと、配布物全体の条件確認・公開完了は区別します。
旧記録は `compliance/wasm-link-reproduction-v020.json` に保持しています。

- `compliance/path-replacement.json`：出所、前後ハッシュ、全メンバーの照合。
- `compliance/path-replacement/`：上流の2本文、生成ヘッダ、差し替えオブジェクト、実行条件。
- `compliance/wasm-link-reproduction.json`：現在の配布Wasmとリンク地図の対応。
- `tools/check-wasm-replacement.mjs`：変更前後のWasmによる独立した解析・表示の比較。

検査結果と未実施項目は配布一式の検証報告に記録します。
