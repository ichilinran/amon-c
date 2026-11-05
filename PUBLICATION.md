# 配布候補の生成

同じソースから、用途ごとの候補を生成します。

| 出力 | 内容 |
| --- | --- |
| build/github/ | 実行コード、機能別の検査、開発手順、必要な第三者資料を含むソース候補 |
| build/pages/ | 画面・JavaScript・Wasm・SDK・書体・OGP画像・ライセンス表示の静的配信候補 |
| build/public-main/ | 説明資料だけのmain用のREADME・RULES・VOCABULARY・LIMITATIONS・LICENSE |

ソース候補と静的配信候補を混同しないでください。main用READMEには、ソース専用の手順やリンクを含めません。

```sh
npm test
npm run plan:files
npm run check:files
npm run build:public
npm run check:public
npm run build:main-docs
```

Node.js 22以上を使います。静的配信を試す場合は `python3 -m http.server --directory build/pages 8000` で起動し、ブラウザから開きます。

生成先への直接編集は再生成で失われます。タイトル・OGP metaタグはindex.html、画像はogp.pngが生成元です。GitHubのSocial previewはサイトのOGPとは別の設定です。

候補の生成は公開操作ではありません。公開状態は [compliance/release-status.json](compliance/release-status.json) で区別し、実機や配信先での確認は別途行います。構成は [ARCHITECTURE.md](docs/ARCHITECTURE.md)、検査は [TESTING.md](docs/TESTING.md)、第三者部品は [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) を参照してください。
