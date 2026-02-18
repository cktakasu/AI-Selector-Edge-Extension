# AI Selector Edge Extension — Edge 固有ドキュメント

## 同期方式について

**採用方式: 同期スクリプト方式 (`scripts/sync-from-chrome.mjs`)**

| 判定 | 結果 |
|------|------|
| `git merge-base HEAD chrome/main` | 失敗 (共通祖先なし) |
| 採用方式 | 同期スクリプト方式 |

EdgeリポジトリとChromeリポジトリは独立した git 履歴を持つため、
`upstream merge/rebase` は使えません。代わりに Node.js スクリプトで
Chrome repo のファイルを Edge repo へコピーします。

---

## Chrome → Edge 同期手順

### 1. Chrome repo を手元に用意する

```bash
git clone https://github.com/cktakasu/AI-Selector-Chrome-Extension.git ../AI-Selector-Chrome-Extension
cd ../AI-Selector-Chrome-Extension && git pull origin main
```

### 2. 差分チェックだけ実行する (コピーなし)

```bash
# Edge repo のルートで実行
node scripts/sync-from-chrome.mjs ../AI-Selector-Chrome-Extension --check
```

- 差分なし → `✅ CHECK PASSED` で終了 (exit 0)
- 差分あり → `❌ CHECK FAILED` で終了 (exit 1) — CI でのゲートに利用可能

### 3. 実際に同期する

```bash
node scripts/sync-from-chrome.mjs ../AI-Selector-Chrome-Extension
```

コピー後は必ず差分を確認してからコミット：

```bash
git diff
npm run test
git add -p
git commit -m "sync: reflect Chrome changes (YYYY-MM-DD)"
```

### 除外ファイル (Edge 固有、上書きしない)

| パス | 理由 |
|------|------|
| `README.md` | Edge 向け説明文 |
| `vite.config.ts` | manifest の name/description を Edge 向けに維持 |
| `package.json` | name・テスト系 devDependencies を維持 |
| `vitest.config.ts` | テスト設定 |
| `src/**/*.test.tsx` | 全テストファイル |
| `src/test/` | テストユーティリティ |
| `artifacts/` | Playwright スクリーンショット等 |
| `scripts/` | 同期スクリプト自体 |
| `docs/` | このドキュメント |

---

## Edge 拡張機能の開発・インストール手順

### 開発モード (ホットリロード)

```bash
npm install
npm run dev
```

### ビルド

```bash
npm run build
# dist/ ディレクトリにビルド成果物が生成される
```

### Microsoft Edge へのインストール

1. `npm run build` でビルドを実行する
2. Edge を開き、アドレスバーに `edge://extensions` を入力
3. 右上の **「開発者モード」** をオンにする
4. **「展開して読み込み」** をクリック
5. `dist/` フォルダを選択する
6. ツールバーにアイコンが表示されることを確認する

---

## Edge Add-ons 提出用 zip 作成

```bash
npm run package:edge
```

`ai-selector-edge.zip` が生成されます。内容確認:

```bash
unzip -l ai-selector-edge.zip
```

以下が含まれていることを確認:
- `manifest.json`
- `index.html`
- `assets/`
- `icon.png`
- `icons/`

---

## 手動テストチェックリスト

Chrome版と同じ観点でテストする。

- [ ] ポップアップが開くとき、背景が半透明（白不透明にならない）
- [ ] 10 個のサービスアイコンが横一列に表示される
- [ ] 各アイコンをクリックすると、対応する URL が新規タブで開く
- [ ] `updatedAt` が 10 日以内のサービスに **New** バッジが表示される
- [ ] **New** バッジのピング（点滅）アニメーションが動く
- [ ] アイコンが読み込み失敗したとき、サービス名の先頭 2 文字がフォールバック表示される
- [ ] スライドインアニメーション（0.2s）が動く
- [ ] `chrome.tabs.create` でタブが開く（拡張機能コンテキスト）

---

## CI: Chromeとの差分チェック (GitHub Actions)

`.github/workflows/sync-check.yml` を追加することで、
Chrome repo に変更が入ったとき自動で差分チェックを実行できます。

```yaml
name: Sync Check with Chrome
on:
  schedule:
    - cron: '0 9 * * 1'  # 毎週月曜 9:00 UTC
  workflow_dispatch:

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          path: edge
      - uses: actions/checkout@v4
        with:
          repository: cktakasu/AI-Selector-Chrome-Extension
          path: chrome
      - run: node edge/scripts/sync-from-chrome.mjs ../chrome --check
        working-directory: edge
```
