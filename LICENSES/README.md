# 同梱ライセンス資料

自作部分には [MIT License](../LICENSE) を適用します。[範囲と権利者表記](../LICENSE-SCOPE.md)を参照してください。以下の第三者資料をMITに置き換えません。

- [本文一覧](INDEX.md)：パッケージのcopyright、一般的なライセンス、例外条項、LLVMの補足資料。
- host-packages/：ホスト由来1,964ヘッダ・15パッケージの出所と対応する資料。版とハッシュは `compliance/host-package-evidence.json`。
- supplemental/：参照先のGNU本文、Linuxのsyscall例外、OpenIB等、GCC Runtime Library Exception 3.1。出所URLとハッシュは `compliance/supplemental-license-texts.json`。
- llvm-source/：固定LLVMソースのLICENSE等の保守的な収集。実際のリンク一覧やファイル内の全第三者表示を網羅したとの判定ではありません。
- LLVM/Emscripten/実行用部品の本文は `wasm/licenses/`、リソースヘッダの本文は `reference/tools/clang18-headers/LICENSE.txt`。

旧Tree-sitter本体とvendorは現在の公開候補に含みません。SDKの各本文・個別表示とSPDXのOR/AND/例外表現を維持しています。パッケージ全体の資料にある別ディレクトリの条件を、そのまま全ヘッダに適用するものではありません。

SDK-HEADER-NOTICES.txtは同梱ソースから保持した著作権・条件表示です。LLVM-SOURCE-NOTICES.txtとEMSCRIPTEN-RUNTIME-NOTICES.txtはリンク候補より広いソースから収集した個別表示で、正確なリンク一覧ではありません。補足したJFFS2本文は一般のLinux例外と異なる条件を保持しています。
