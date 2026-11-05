# ソースの構成と入口

C17の解析情報はClang/Wasmから取得し、JavaScriptで原文に対応付けて支位を表示します。Cの実行や、支位からCへの逆変換は行いません。

## 入口

- [src/index.js](../src/index.js)：プログラムから使うAPI。読み込んだだけではWorker起動やWasm読込みを行いません。
- [src/ui/main.js](../src/ui/main.js)：ブラウザ画面の入口。入力・表示・操作を結び付けます。
- [src/runtime/worker.js](../src/runtime/worker.js)：解析を画面から分離して実行するWorker。

## 役割ごとの配置

| 場所 | 役割 |
| --- | --- |
| src/translator.js | 解析・表示の組立て、複数の解析条件の処理 |
| src/analysis/ | Clangの報告を、原文上の型・位置・文字列情報へ対応付ける |
| src/translation/ | 対応語、助詞、宣言分割、案内語を使った支位表示の生成 |
| src/vocabulary/ | 現行の既定訳語、標準名の認識情報、訳語設定 |
| src/compat/ | 保存形式と訳語設定の移行、旧辞書の置換処理 |
| src/project/ | 入力ファイル、解析条件、保存・読込み、表示データの形式 |
| src/runtime/ | Wasmの実行接続、資産の読込み、資源制限、Worker |
| src/shared/ | ハッシュなど共通の小さな処理 |
| src/ui/ | 画面操作、色、行番号、コピー |
| examples/analysis/ | 保存済み解析のサンプル |
| tests/・tools/ | 振る舞いの検査と配布候補の生成・確認 |
| wasm/ | 固定したWasm・SDK資産と再現手順 |
| reference/next/ | Clangの取得器のソースと端末比較の準備手順 |
| reference/tools/clang18-headers/ | 同梱資産の出所確認に使うヘッダと条件表示 |
| LICENSES/・compliance/ | 第三者部品のライセンス・出所・再現の根拠 |

Clang取得器と第三者資料の場所は、固定した再現記録との対応を保っています。JavaScriptの実行処理はsrc/に集約しています。保存互換に必要な旧既定値はcompat、現在の表示と構造の固定期待値はtests/fixturesに置きます。

## 処理の流れ

1. プロジェクトのファイルと解析条件を確認します。
2. runtimeがClang/Wasmを呼び出し、解析情報を取得します。
3. analysisが取得情報を原文へ対応付けます。
4. translationが辞書と規則を使って支位と対応範囲を組み立てます。
5. uiが文字列・色・行番号・原文への対応を表示します。

保存済み解析を読む場合は、取得済み情報から表示を作ります。入力の再解析や保存元の書換えは行いません。通常のプロジェクト保存の復元と、解析結果の読込みは区別します。

この配置は責務の案内です。各フォルダが完全に一方向の層になるという意味ではありません。例えば解析情報の投影と翻訳では、原文の位置を扱う処理を共有します。

保存形式と互換処理の役割は [SAVED-DATA.md](design/SAVED-DATA.md) にまとめています。現行のC入力に必要な宣言の互換処理は、translation側に保持します。

## 規則と設計

表記規則は [RULES.md](../RULES.md)、対応範囲は [LIMITATIONS.md](../LIMITATIONS.md)、引数設定の理由は [READING-POLICIES.md](design/READING-POLICIES.md) にあります。開発・生成は [DEVELOPMENT.md](DEVELOPMENT.md) を参照してください。
