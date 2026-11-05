# 検査の構成

Node.js 22以上を使い、ソースのルートで実行します。追加npm依存はありません。

```sh
npm test
```

同梱WasmとJavaScriptの検査を実行します。ネイティブClangの準備やネットワーク接続は不要です。

| コマンド | 対象 |
| --- | --- |
| test:portable | 読込み、資産、解析境界、原文位置、投影、編集、手書きの読み、引数補足、資源制限 |
| test:settings | 全訳語と引数設定、保存訳語の移行、独自訳語と確認値 |
| test:declarations | 訳語と文末条件、宣言と型の対応 |
| test:integrity | 解析情報・保存情報の整合性と保留の境界 |
| test:translation | 書式、入れ子、文末例外、保存済み解析の再表示 |
| test:layout・test:lines | 宣言分割・字下げ・main終端と原文の行対応 |
| test:publication | 文書の例、main用資料、OGP、色の役割 |
| test:policies | 引数補足の実行時設定 |
| test:modules | API、Worker、資産読込みの結線 |
| test:compat | 訳語・保存形式・旧辞書の互換境界 |

グループ間には重複があります。全件を一度ずつ確認するにはnpm testを使います。

## 固定期待値

- tests/fixtures/projection-expectations.json：76の投影情報と、案内語あり・なし152表示の全体。
- tests/fixtures/settings-expectations.json：全1,213訳語と560設定の引数補足。
- tests/fixtures/settings-migration.json：保存訳語版の移行に必要な値。独自訳語を置き換えるための辞書ではありません。
- tests/fixtures/standard-calls.json・statement-exceptions.json：標準呼出しと文末例外の入力・期待値。
- その他の保存解析や掲載例：保存互換、検証条件、表示例。

保存例のファイルパスは、位置情報を検査するための固定のサンプルパスです。実行環境に同名のディレクトリが存在する必要はありません。

期待値は仕様として固定し、検査対象の出力からその場で作りません。仕様を変えるときは、理由と具体的な入出力を確認してから期待値を更新します。広い差分許可で不一致を隠しません。

## ネイティブ処理系との比較

準備は [DEVELOPMENT.md](DEVELOPMENT.md) を参照してください。

```sh
SHI_FRONTEND=/absolute/path/to/native-environment/runtime/shi-frontend npm run test:native
```

ネイティブ処理系とWasmにはヘッダや処理系の差があります。比較に成功した範囲と、C17の全用法の保証は区別します。全入力・実ブラウザ画面・実機をこの検査だけで保証するものではありません。
