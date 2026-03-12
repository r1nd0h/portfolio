# Portfolio Site — 開発ルール

## スクロールスナップ & 1ページ = 1画面ルール

このサイトは `scroll-snap-type: y mandatory` を使い、各セクションがスクロールで1画面ずつ止まる設計。

### 必須ルール

1. **全セクションに `snap-section` クラスを付ける**
   - `scroll-snap-align: start` / `scroll-snap-stop: always` / `min-height: 100dvh`
2. **1セクションの内容は必ず `100dvh` 以内に収める**
   - はみ出す場合はセクションを分割する（例: Projects → 見出しページ + ToDone詳細ページ + Other Projects）
   - 画像・カルーセルなどの高さは `max-h-[60dvh]` 以内に制限する
   - パディングは `py-16 sm:py-20` 程度に抑え、ヘッダー分（約60px）を考慮する
3. **セクション分割の判断基準**
   - コンテンツが画面の80%を超えそうなら分割を検討
   - 見出し + 説明文だけで1ページ、詳細で1ページ、が基本パターン
4. **新規セクション追加時は必ず `snap-section` を付けてビューポート内に収まるか確認**

### コンポーネントの高さ制約

| コンポーネント | 最大高さ |
|---|---|
| iPhoneモックアップ (ScreenshotCarousel) | `max-h-[60dvh]` |
| セクション内カード | padding含めてビューポート80%以内 |
| InfiniteMarquee | セクション末尾に配置、セクション高さに含める |

## デザインシステム

- ダークテーマ: 背景 `#050508`, アクセント `#7c6cf0`
- フォント: Outfit (display), Playfair Display (serif/名前), Noto Sans JP (本文)
- アニメーション: Framer Motion, scroll-triggered (`whileInView` / `useScroll`)
