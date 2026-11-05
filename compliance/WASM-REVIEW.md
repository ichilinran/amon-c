# 配布Wasmの再現とPath部品の差し替え

現在のWasmは26,759,957バイト、SHA-256は
`2231bc6d97378823341ba7898165a6ab21c6a3edf9286c981e0ea3411d46ca99`です。

## 差し替え前の基準点

Emscripten 3.1.64と記録済みの既成LLVMアーカイブで、差し替え前の配布Wasm
26,760,081バイトを再リンクし、全バイトの一致を再確認しました。
以前の記録は[旧リンク記録](wasm-link-reproduction-v020.json)に残しています。
LLVM全体を原文から再構築した確認ではありません。

## 提供元の変更を含む部品の除去

元の提供元の変更は、LLVMの `llvm/lib/Support/Unix/Path.inc` で、Emscripten時に
`getMainExecutable` が固定パス `/usr/lib/libclang.wasm` を返す追加3行・削除1行でした。
固定commitで独立した許諾文が見つからなかった事実は、[当時の調査](provider-permission-review.json)
に保持しています。LLVM本体の許諾を否定する意味ではありません。

配布WasmのPath部品は、固定LLVM commit `3b5b5c1ec4a3095ab096dd780e84d7ab81f3d7ff` の
未変更の上流ソースから作った `Path.cpp.o` です。提供元のパッチは適用せず、
自作分岐も加えていません。構成時に `dladdr` が検出され、上流の処理のままで
組み立て・リンクできました。

`libLLVMSupport.a` の全146メンバーを照合し、変わったのは `Path.cpp.o` のみです。
他のLLVMアーカイブは元のハッシュと一致します。ABIに関する生成ヘッダも元と一致しました。
提供元の固定パスが最終Wasmにないことも補助的に確認しています。

- [出所と前後のハッシュ、メンバー照合](path-replacement.json)
- [現在のリンク記録](wasm-link-reproduction.json) / [リンク地図](wasm-link-map.txt.gz)
- [組み立て・再リンクの手順](../docs/WASM-V021.md)

現在のリンク地図は44ライブラリ・866オブジェクトです。増えた1件は `libc.a(dladdr.o)`。
これは最終最適化前の記録で、各部品の全コードが最終Wasmに残るという意味ではありません。

## 条件と確認範囲

上流ソースと差し替え部品にはApache-2.0 WITH LLVM-exception等の元の条件を保持します。
自作部分のMITでLLVMや実行用部品全体を再指定しません。既存のLLVM/ClangとEmscriptenの
個別表示集も保持しています。

提供元変更への依存を除く技術的な対応と、全配布物の法的評価・公開完了は別です。
公開全体の状態は[release-status.json](release-status.json)を参照してください。
実際の公開操作・端末確認・ネイティブClangとの比較は、この対応には含みません。
