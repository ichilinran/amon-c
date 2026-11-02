# MITの適用範囲 / License scope

支位のプロジェクト独自部分には、ルートの [MIT License](LICENSE) を適用します。著作権表示は `Copyright (c) 2026 Amon-C contributors` です。これはプロジェクトへの寄与者を示す表記で、単独の法人名や第三者部品の権利者を示すものではありません。個別ファイルの既存の著作権者表示を置き換えません。

## プロジェクト独自部分

以下のうち、支位として作成したコード・表現・データが対象です。

| 種類 | 主な場所 |
|---|---|
| UI、翻訳処理、助詞・案内語の規則、辞書・訳語データ | `index.html`, `ui.js`, `core/`, `reference/dist/` の自作モジュール、`wasm/worker.js` |
| 解析情報の取得器、互換用コード、準備・生成スクリプト | `reference/next/frontend.cpp`, `reference/next/sdk-compat/complex.h`, `reference/next/prepare.py`, `wasm/build.sh`, `wasm/package-sdk.py`, `tools/` |
| 自作の検査コード・入力例、過去版の自作比較モジュール | `tests/`, `examples/`, `reference/next/cases/acceptance/`, `reference/baseline-v05/`, `reference/baseline-v06/`, `reference/baseline-v07/` |
| 説明・設定・調査資料の自作部分 | README、案内HTML、`docs/`, `release/`, `compliance/`, `coverage/`, `package.json`、資料一覧など |

既存の第三者コードやライセンス文を引用・収録した部分は、その元の条件を保持します。調査JSONや解析結果に含まれる第三者ヘッダの内容も、プロジェクト独自の内容として再指定しません。

## 第三者部分と混在する生成物

| 対象 | 扱い |
|---|---|
| `reference/tools/clang18-headers/` | LLVM由来の原文と既存の互換変更。元のApache-2.0 WITH LLVM-exception等と個別表示を維持。上流との差分は `compliance/patches/clang-resource-guards.patch` |
| `LICENSES/` と `wasm/licenses/` の第三者ライセンス・copyright本文 | 各原文をそのまま保持。自作の案内・目録のみ上記MITの対象 |
| `wasm/out/sdk.json.gz`, `sdk-core.json.gz` | ヘッダソースの集合。ホスト由来1,964本文とLLVM由来26本文には各元の条件。支位の互換ヘッダ1本文は、その自作部分にMITを適用 |
| `wasm/out/shi-clang.mjs`, `shi-clang.wasm`, `shi-clang.wasm.gz` | 支位の取得器とLLVM/Clang・Emscripten・実行用部品を含む生成物。支位の寄与部分へのMITだけで、生成物全体を一律MITとはしない |
| `compliance/path-replacement/` | 未変更のLLVMソース、生成ヘッダとオブジェクト、構築条件の記録。LLVM由来部分のApache-2.0 WITH LLVM-exception等と元の表示を維持 |
| `fonts/amon-c-code-subset.woff2` | UDEV Gothic（BIZ UDゴシック・JetBrains Mono由来）をSIL Open Font License 1.1に従って改変した書体。MITの対象外で、OFL-1.1のまま。作成手順 `tools/subset-font.py` はMIT |
| その他の第三者原文・引用・派生差分 | 元の条件・著作権表示・必要な変更表示を維持。ファイルの配置だけでMITへ変更しない |

`package.json` の `license: "MIT"` はプロジェクト独自部分のライセンスです。同梱する全依存物・SDK・生成物をMITへ再指定するものではありません。

利用者が入力・読み込みするCコードや保存データの権利は、それぞれの権利者に帰属します。このLICENSEの追加で、その入力に利用許諾を与えたり、第三者の権利を取得したりするものではありません。

## 配布時に保持する表示

MITの対象を再配布する際は、その本文の条件に従い著作権表示と許諾表示を保持してください。第三者部分にはその個別条件も適用されます。対応する資料の入口は [第三者表示](THIRD_PARTY_NOTICES.md) と [案内ページ](licenses.html) です。

第三者条件の調査と自作部分のMIT採用は別の作業です。今回の採用によって未解決の配布条件を完了扱いにしません。状況は [公開前の確認記録](compliance/release-status.json) を参照してください。

## English scope

The root MIT license applies to original contributions to Amon-C (支位), including its translation code, vocabulary, documentation, tools and tests. "Amon-C contributors" identifies the project contributors and does not replace third-party copyright notices. Third-party source, license texts, quoted material and upstream-derived patches retain their original terms. Generated Wasm/glue and SDK bundles contain material under multiple licenses; they are not relicensed as a whole under MIT. The package metadata describes the license of the original project contributions. User-supplied code is outside this grant. See THIRD_PARTY_NOTICES.md for component notices and compliance/release-status.json for unresolved distribution checks.
