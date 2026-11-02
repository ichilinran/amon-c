# 第三者ソフトウェアの表示

2026-11-02、支位v0.21のGitHub用・Pages用候補に対応します。自作部分のMIT、SDKと実行用部品の各条件を保持しています。提供元変更に依存していたLLVMの1部品を未変更の上流ソースから差し替えました。[案内ページ](licenses.html)と[確認状況](compliance/release-status.json)を参照してください。

| 部品 | 本文・出所 | 状況 |
|---|---|---|
| LLVM / Clang 18.1.8 | [LLVM本文](wasm/licenses/LLVM-LICENSE.txt)、[構築記録](wasm/build-provenance.json) | Apache-2.0 WITH LLVM-exceptionを主な根拠とする。未変更の上流ソースでPath.cpp.oを差し替え。リンク時44ライブラリ・866オブジェクト。出所と前後のハッシュは [差し替え記録](compliance/path-replacement.json) |
| Emscripten | [本文](wasm/licenses/emscripten-LICENSE.txt) | 取得器と差し替え部品は3.1.64、他の既成LLVM部品は3.1.61の記録。本文は上流照合済み |
| 実行用部品 | [musl](wasm/licenses/musl-LICENSE.txt)、[libc++](wasm/licenses/libcxx-LICENSE.txt)、[libc++abi](wasm/licenses/libcxxabi-LICENSE.txt)、[compiler-rt](wasm/licenses/compiler-rt-LICENSE.txt) | 本文を保持。全リンク部品の特定とは別の確認 |
| Clangリソースヘッダ | [本文](reference/tools/clang18-headers/LICENSE.txt)、[SDK台帳](compliance/sdk-inventory.json) | 完全SDK内26本文、初期SDK内22本文。固定LLVMソースと18本文一致、8本文は既存の互換変更。変更表示と完全差分を追加 |
| ホストヘッダ | [出所対応](compliance/host-package-evidence.json)、[SDK台帳](compliance/sdk-inventory.json) | 1,964本文・15パッケージ。凍結SDKのソース配布条件を個別記載・生成元・適用範囲で確認。元の各条件を維持し、ホストライブラリのリンク許諾とは分ける |
| 画面のコード表示用書体「Amon-C Code」 | [UDEV Gothic本文](LICENSES/fonts/UDEV-Gothic-LICENSE.txt)、[BIZ UDゴシック本文](LICENSES/fonts/BIZ-UDGothic-OFL.txt)、[JetBrains Mono本文](LICENSES/fonts/JetBrains-Mono-OFL.txt)、[作成記録](compliance/font-subset.json) | UDEV Gothic v2.2.0（BIZ UDゴシックとJetBrains Monoの合成、SIL Open Font License 1.1）から、英数字・半角カナ・記号・かなに絞った改変版。予約名「UDEV Gothic」を使わないよう「Amon-C Code」に改名。元の著作権表示とライセンス記載を書体内に保持。作成手順は `tools/subset-font.py` |

各パッケージのcopyright本文と一般的なライセンス本文は[案内ページ](licenses.html)から開けます。元の著作権表示と条件を保持し、自作部分のMITで置き換えることはありません。

## 対象とSDKソース

GitHub用候補は取得器・検査・必要な参照データを含み、Pages用候補は実行用モジュール・Wasm・SDK・画面用サンプルと表示資料を含みます。旧Tree-sitterアプリ本体とvendorは、この2つの候補には含まれません。開発履歴の保管用一式にある旧部品の表示は、そちらに保持しています。

SDKのgzipには各ヘッダのソース本文と元の表示を格納しています。完全SDKは1,991本文で、C標準ヘッダ以外のLinux・C++・OpenSSL・curl等も含みます。ヘッダ本文の配布条件と、Wasmへリンクする部品の条件は分けて確認します。

次の2ファイルを保存すれば、配信候補からもソースを復元できます。

- [SDK本文データ](wasm/out/sdk.json.gz)
- [復元スクリプト](tools/extract-sdk.py)

```sh
python3 extract-sdk.py sdk.json.gz ./recovered-sdk
```

復元後のSHA-256は[SDK台帳](compliance/sdk-inventory.json)と照合できます。本文の同梱だけで配布条件をすべて確認済みとは扱いません。

## 一次資料

- LLVM：<https://llvm.org/docs/DeveloperPolicy.html#copyright-license-and-patents>
- Emscripten：<https://emscripten.org/docs/introducing_emscripten/emscripten_license.html>
- LGPL-2.1：<https://www.gnu.org/licenses/old-licenses/lgpl-2.1.en.html>
- Linux：<https://www.kernel.org/doc/html/latest/process/license-rules.html>
- 既成ライブラリ提供元：<https://github.com/TheComputerM/libclang-wasm>

## 今回の表示整備（③）

- [追加を含む全ライセンス本文](LICENSES/INDEX.md)：Linux-syscall-note、Linux-OpenIB、GCC例外等を補いました。各ファイルの原文と選択的条件は維持しています。
- [SDK本文別の対応](compliance/sdk-notice-coverage.json)：1,991本文の出所、元のSPDX表現、パッケージ表示、共通本文への参照22件。文字列抽出は正式なファイル別のライセンス確定ではありません。
- [Clangのソース照合](compliance/resource-header-source-check.json)と[変更差分](compliance/patches/clang-resource-guards.patch)：LLVM commit `3b5b5c1ec4a3095ab096dd780e84d7ab81f3d7ff` を比較基準とし、18本文は同一、8本文は非モジュール向けガード等の既存変更です。同一内容が複数の版にあるため、歴史的な取得タグまでは断定しません。原著作権表示は保持し、8本文に変更注記を追加しました。
- [LLVMアーカイブの調査](compliance/llvm-archive-review.json)：使用記録にあるアーカイブのSHA-256は一致し、LLVM 18.1.8の構成情報を確認。139静的ライブラリの存在は、配布Wasmに全139件がリンクされたとの証明ではありません。

SDKの既存整備では8本文にコメントを追加しました。v0.21ではSDKと翻訳処理を変えず、Wasmの対象部品と構築・表示資料を更新しています。提供元の変更への依存除去と、公開前の全体検証・実際の公開環境の確認は区別します。

## 支位の自作部分

[MIT本文](LICENSE)と[適用範囲](LICENSE-SCOPE.md)を参照してください。著作権表示は `Copyright (c) 2026 Amon-C contributors`。第三者部品・引用・混在する生成物全体をMITに変更するものではありません。

## 補足した表示と確認記録

- [SDKの元の著作権・許諾表示](LICENSES/SDK-HEADER-NOTICES.txt)：SGI/HP、CMU、Pillow等の記載を含む付属資料。
- [SDKのファイル別条件確認](compliance/sdk-file-terms-review.json) / [確認の説明](compliance/SDK-SOURCE-REVIEW.md)。この凍結ソース配布への判断であり、第三者部分をMITに変更しません。
- [JFFS2固有のLICENCE](LICENSES/supplemental/kernel-jffs2-LICENCE.txt)。一般のLinux例外と区別して保持しています。
- [LLVM/Clangの個別表示](LICENSES/LLVM-SOURCE-NOTICES.txt) / [Emscripten実行用候補の個別表示](LICENSES/EMSCRIPTEN-RUNTIME-NOTICES.txt)。実リンク範囲より広い保守的な収集です。
- [Wasm再リンクの記録](compliance/wasm-link-reproduction.json) / [リンク地図・gzip](compliance/wasm-link-map.txt.gz) / [再現範囲と差し替えの説明](compliance/WASM-REVIEW.md)。
