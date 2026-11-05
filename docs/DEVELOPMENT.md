# 開発・検査・生成手順

Node.js 22以上。追加npm依存なし。Pythonの比較器・SDKソース復元・端末取得器の準備にはPython 3を使う。

## ディレクトリと入口

[ソースの構成と入口](ARCHITECTURE.md) に、src/配下の役割とAPI・画面・Workerの入口をまとめています。

| 場所 | 内容 |
| --- | --- |
| src/ | 現行のJavaScript。analysis・translation・vocabulary・project・runtime・shared・ui・compat |
| wasm/ | 固定したWasm・SDK、再現用の手順と条件表示 |
| reference/next/ | Clangの取得器、端末準備、比較用の入力 |
| tests/・examples/ | 検査と再解析可能なC入力、保存済み解析の例 |
| LICENSES/・compliance/ | 第三者部品の条件・本文・出所の資料 |
| release/ | ファイル選定の規則と生成した選定表 |
| build/github/・build/pages/・build/public-main/ | ソース候補・静的配信候補・説明資料だけのmain向け候補 |

保存互換に必要な旧既定値はcompatに、仕様を守る固定期待値はtests/fixturesに置きます。

## 公開用候補を生成する

```sh
npm run plan:files
npm run check:files
npm run build:public
npm run check:public
```

`build:public`は選定表が古ければ停止する。ソースを編集したら`plan:files`で選定表を更新してから生成する。

生成先は固定の`build/github`と`build/pages`。最初に一時ディレクトリでコピー・ハッシュ検査を完了し、その後に生成先を置き換える。再生成すると、この2つの生成先で手作業した変更は失われるため、変更は元のソースへ反映する。生成済みと識別できない既存の出力フォルダは上書きしない。

GitHub用の候補は、開発資料一式で対象外となったファイルを含まない。その候補内では、選定表4文書を候補自身のファイル構成に合わせて再生成する。同じ候補から再度同じコマンドを実行できる。将来の新規ファイルは選定規則も確認する。

各生成物のSHA-256は`build/public-build.json`に記録する。`check:public`はファイルの追加・欠損・変更、元の選択との対応、現行文書からのローカルリンクを検査する。時刻や絶対作業パスを生成物へ埋め込まない。

```sh
python3 -m http.server --directory build/pages 8000
```

静的配信するのは`build/pages`の内容。GitHub用ソースや開発資料のフォルダ全体を、そのままPagesに配信しない。.nojekyllも生成物に含める。公開環境では実配信と配信ヘッダを別途確認する。

## 検査

```sh
npm test
npm run test:translation
npm run test:layout
npm run test:publication
npm run test:modules
npm run test:compat
npm run test:lines
npm run check:distribution
npm run measure:limits
```

端末Clang比較を含む全検査は、Ubuntu 24.04 x86_64で次の準備を行う。

```sh
python3 reference/next/prepare.py /absolute/path/to/native-environment
SHI_FRONTEND=/absolute/path/to/native-environment/runtime/shi-frontend npm run test:native
SHI_FRONTEND=/absolute/path/to/native-environment/runtime/shi-frontend npm run test:boundaries:optimized
```

端末実行ファイル・共有ライブラリは同梱していない。準備器は固定したパッケージのハッシュを検証して作業用フォルダに展開する。同梱WasmはClang 18.1.8、端末の準備器は18.1.3。標準ヘッダにも差があり、比較の一致は処理系全体の同一性を保証しない。

検査はcoverageやwasm以下へ結果を出力することがある。検査後に公開用の候補を渡す場合は、元ソースから再生成し、`check:public`を通す。

## SDKのソースを復元する

```sh
python3 tools/extract-sdk.py wasm/out/sdk.json.gz ./recovered-sdk
```

SDK内のヘッダ本文を元のパス構造で復元する。既存SDKをホストから作り直す`wasm/package-sdk.py`は、ホスト依存の開発用収集器である。公開用一式を生成するために実行する必要はない。SDKの変更には別途の範囲・動作・配布条件の確認が必要。

## 公開確認を伴う生成

```sh
npm run build:release
```

候補の生成と公開の許可は別の確認である。第三者条件の未解決項目や必要なLICENSEが残る間、このコマンドは終了コード2で停止する。公開確認が済んだと扱うために、判定値だけを変更しない。

## 配布Wasmの再リンク検証

通常の候補生成はコンパイラなしで行えます。別途、Emscripten 3.1.64と記録したハッシュの既成LLVM prefixを用意し、空の出力先へ再リンクする場合：

```sh
python3 wasm/reproduce-link.py --emxx /path/to/em++ --llvm-prefix /path/to/llvm --output /path/to/empty-output
```

139アーカイブの入力ハッシュを照合し、出力Wasmを配布版と比較します。LLVMライブラリ全体を原文から再構築するものではありません。生成したJavaScriptやWasmを自動で配布資産へ上書きしません。歴史的なヘッダassertionのパスは `-ffile-prefix-map` で対応づけます。

凍結SDKの検査は `python3 tools/check-sdk-source-review.py`。rpcgen 1.4.2がある環境では `--rpcgen` で12件の再生成比較も実行できます。SDK本文やライセンス資料を変更した場合は元のレビューを自動承認せず、対象と条件を確認し直します。


## 現行候補の表示と文書

READMEの5組とRULESの確定例は `test:publication` で同梱Wasmの実出力と照合します。ﾃﾞﾊの色は `src/ui/view.js` の `segmentClass` で、セグメントの `role: "main-end"` を使って既存の `c-function` の黄色にしています。翻訳本文・保存形式は変更しません。

タイトル・OGP metaタグは `index.html`、画像はルートの `ogp.png` が生成元です。`release/file-policy.json` で両方の候補に選定しています。生成先への直接編集はしないでください。


## 説明資料だけのmain向け候補

`npm run build:main-docs` は、既存のmainの構成に合わせてREADME・RULES・VOCABULARY・LIMITATIONS・LICENSEの5ファイルを `build/public-main/` に生成します。ソース用READMEの開発手順とソース専用ライセンス区分へのリンクは、このREADMEには含めません。ローカルリンクが5ファイルの中で成立することも確認します。ソース公開用のREADMEと説明資料だけのREADMEを混同しないでください。この処理は公開操作を行いません。


## 引数設定と設計根拠

引数補足・文末例外の正本は `src/translation/usage-profiles.js`、現在の理由と役割の説明は [引数補足と文末例外の設計](design/READING-POLICIES.md) にあります。確認経緯の保存記録を実行時データへ混ぜません。

`npm run test:policies` は、実行時設定の意味を持つ全項目が固定基準と一致することを確認します。仕様を意図的に変更した場合は、具体的な出力検査と合わせて基準を見直します。


## 保存形式と互換処理

[保存形式と互換処理の境界](design/SAVED-DATA.md) に、現在の入力の正規化、保存形式の検証・移行、旧辞書の置換処理をまとめています。翻訳の入口 `src/translator.js` は現在の入力と設定を直接使います。保存形式の識別子・版・独自訳語の扱いは維持します。宣言の互換処理は現在のC入力にも必要なので、translation側に残します。

検査の対象と固定期待値の扱いは [TESTING.md](TESTING.md) にまとめています。npm testは同梱WasmとJavaScriptだけで実行できます。ネイティブClang比較はtest:nativeに分けています。
