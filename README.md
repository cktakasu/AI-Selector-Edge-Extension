# AI Selector Edge Extension

Microsoft Edge で使える、AIサービスランチャー拡張です。  
Chrome版（AI Selector Chrome Extension）と同じコンセプトで、Popupから主要AIサービスをすばやく開けます。

## 機能

- Popup上にAIサービスのショートカットを表示
- アイコンクリックで対象サービスを新規タブで開く
- 画像読み込み失敗時にテキストアイコンへフォールバック

## 現在のリンク一覧

- ChatGPT
- Claude
- Gemini
- Perplexity
- Genspark
- Kimi
- Manus

## セットアップ

1. このリポジトリをクローン
2. `npm install`
3. `npm run build`
4. Edge で `edge://extensions` を開く
5. 「デベロッパー モード」を有効化
6. 「展開して読み込み」でこのフォルダを選択
7. `dist` フォルダを選択

## 使い方

1. 拡張アイコンから `AI Selector` を開く
2. 使いたいAIサービスのアイコンをクリック
3. 新規タブでサービスが開く
