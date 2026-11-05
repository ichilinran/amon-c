# 公開用ファイルの選定と生成

ファイルの選定規則は[file-policy.json](file-policy.json)、選定結果は[file-plan.json](file-plan.json)、実行時の参照関係は[runtime-graph.json](runtime-graph.json)にあります。

| 対象 | ソース候補 | Pages候補 |
| --- | --- | --- |
| UI・実行モジュール・辞書・圧縮Wasm・SDK・画面用サンプル | 含める | 含める |
| 条件本文・第三者表示・出所と再現の根拠 | 含める | 必要な資料を含める |
| 取得器・準備器・検査と固定期待値・未圧縮Wasm | 含める | 含めない |
| 生成先build/ | 再帰的に選定しない | 再帰的に選定しない |

保存互換の処理と検査に必要なデータはソース候補に含めます。Pagesには画面から読む解析例を含めます。具体的なファイル集合は選定表で確認できます。

```sh
npm run plan:files
npm run check:files
npm run build:public
npm run check:public
```

生成先はbuild/githubとbuild/pagesです。ソース候補内の選定資料は、その候補自身の構成に合わせて生成されます。その候補だけで検査・再生成できます。生成にはネットワークやコンパイラの準備は必要ありません。

検査は選定表、コピーした内容のハッシュ、ローカルリンクと実行時依存の整合を確認します。生成は公開操作を行いません。配布条件の照合はcheck:distribution、条件確認を伴う生成はbuild:releaseで行います。

上書き対象と操作方法は[開発手順](../docs/DEVELOPMENT.md)を参照してください。
