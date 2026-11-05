# 保存形式と互換処理の境界

保存済み解析は、取得済みの情報を現在の規則で表示し直します。Cの再解析は行わず、読込み元の保存データも書き換えません。通常のプロジェクト保存の復元とは区別します。利用者向けの説明は [LIMITATIONS.md](../../LIMITATIONS.md) を参照してください。

## 入口と担当

| 入口・モジュール | 担当 |
| --- | --- |
| src/index.js | 既存のimportSaved・saveImported・saveProject・loadProjectを公開する入口 |
| src/project/input.js | 現在の入力ファイル・解析条件・訳語設定の正規化。旧保存形式を読まない |
| src/project/project.js | プロジェクト保存と既存の呼出し先の窓口 |
| src/project/import.js | 保存形式の振分けと、検証した解析情報からの表示の組立て |
| src/compat/word-settings.js | 保存した訳語の既定値だけを移行し、独自訳語を保つ |
| src/compat/project-save.js | shi-browser-projectの検証・ハッシュ確認・保存訳語の移行 |
| src/compat/learning-save.js | c-kotoba-learningの読込みと、解析表示の既存形式への保存 |
| src/compat/analysis-document.js | 保存済み解析のハッシュ・派生情報の検証と、古い派生情報のコピー上での更新 |
| src/project/project-analysis.js・analysis-format.js | 解析文書と表示情報の形・参照・位置の共通検証 |

compatは「現在使わない処理」という意味ではありません。現在のブラウザプロジェクトの読込みにも、保存時の訳語版との照合と移行が必要です。現在の保存形式、形式の整数版、訳語版、キーの意味は変えません。

## 訳語設定

現行の既定値と検証は `src/vocabulary/settings.js` が担当します。旧既定値と移行はcompatに置きます。旧既定値と一致すると分かる値だけを移行し、独自訳語を保持します。保存された値を検証する順序も維持します。

`src/vocabulary/reading-config.js` は既存の内部参照を保つ窓口です。現行の解析・翻訳処理はsettingsを直接使います。

## 読込みと再表示

学習保存形式、単一解析、複数ファイル解析、ブラウザプロジェクトを、既存と同じ形式の印で振り分けます。不正な形式、原文の確認値の不一致、派生情報とClang記録の不整合は、従来どおり拒否します。

保存された宣言の派生情報が古い場合は、保存元ではなくコピーを更新します。共通の検証は現行の解析文書にも使うため、旧形式という理由で削除しません。表示を組み立てた後の色・行番号は画面側の処理です。

## 字句処理と旧置換

現行の `src/translation/lexical.js` は字句処理とC17の語の区分を扱い、旧訳語辞書を読みません。C17の語の一覧は `c17-tokens.js` にあります。

旧辞書を使う単純置換と対応表の移行は `src/compat/lexical.js`、その辞書はcompatのlegacy-vocabulary.js・legacy-v1.jsに保持します。Clangの解析結果を使う現在の支位表示とは別の処理です。

## C入力を扱う互換処理

`src/translation/declaration-compat.js` は、古い保存形式だけの処理ではありません。現在のC17入力でも、旧形式の関数定義や前処理を挟む宣言など、取得した構造をそのまま原文へ対応付けられない場合に使われます。保存形式の互換処理とは分けて、翻訳側に保持します。
