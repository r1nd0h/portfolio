import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "todone",
    title: "ToDone",
    subtitle: "AIが予定を組む。あなたはこなすだけ。",
    description: "",
    story: {
      problem:
        "既存のタスク管理アプリはどれも痒いところに手が届かなかった。サブタスクの繰り返し設定ができない、ウィジェットが使いにくい、そして何より — 毎日自分で予定を組むのが面倒だった。",
      solution:
        "AIがGoogleカレンダーの予定を確認し、空き時間にタスクを自動で配置してくれるアプリを作った。話しかけるだけでタスクが作れて、1日のスケジュールはAIにおまかせ。",
      result:
        "バイブコーディングで約1ヶ月で開発し、App Store / Google Playに公開。企画・設計・実装・ストア申請まですべて一人で完遂。",
    },
    icon: "/images/projects/todone/icon.png",
    features: [
      "AIチャットでタスク作成（音声入力対応）",
      "AIによる1日の自動スケジューリング",
      "Googleカレンダー連携",
      "タイムライン表示で今日の予定を一目で管理",
      "ホームウィジェット（iOS / Android）",
      "統計・レベルアップ（ゲーミフィケーション）",
    ],
    techStack: [
      "Flutter",
      "Dart",
      "Riverpod",
      "Drift (SQLite)",
      "Firebase Auth",
      "Cloud Firestore",
      "Gemini AI",
      "RevenueCat",
      "Google Calendar API",
    ],
    screenshots: [
      {
        src: "/images/projects/todone/01_schedule.png",
        alt: "タイムラインスケジュール",
        caption: "今日の予定をひと目で確認",
      },
      {
        src: "/images/projects/todone/02_ai_chat.png",
        alt: "AIチャット",
        caption: "話しかけるだけでタスク作成",
      },
      {
        src: "/images/projects/todone/03_ai_plan.png",
        alt: "AIプラン",
        caption: "AIが最適な1日を自動スケジューリング",
      },
      {
        src: "/images/projects/todone/04_day_view.png",
        alt: "デイビュー",
        caption: "カレンダー風のタイムライン表示",
      },
      {
        src: "/images/projects/todone/05_widget_today.png",
        alt: "ウィジェット",
        caption: "ホーム画面からすぐ確認",
      },
      {
        src: "/images/projects/todone/06_tasks.png",
        alt: "タスク管理",
        caption: "優先度で整理、迷わない",
      },
      {
        src: "/images/projects/todone/07_stats.png",
        alt: "統計画面",
        caption: "レベルアップで続く習慣",
      },
    ],
    links: [],
  },
  {
    id: "portfolio",
    title: "Portfolio Site",
    subtitle: "このサイト自体もバイブコーディングで。",
    description:
      "Next.js 15 + Tailwind CSS + Framer Motionで構築したポートフォリオサイト。デザイン・実装の全工程をClaude Codeとのバイブコーディングで完成。ダークテーマ、スクロールアニメーション、iPhoneモックアップカルーセルなど、細部にこだわったUI。",
    icon: "",
    features: [
      "Framer Motionによるスクロールアニメーション",
      "iPhoneモックアップ内スクリーンショットカルーセル",
      "レスポンシブ対応（モバイル〜デスクトップ）",
      "Vercelでホスティング・自動デプロイ",
    ],
    techStack: [
      "Next.js 15",
      "TypeScript",
      "Tailwind CSS v4",
      "Framer Motion",
      "Vercel",
    ],
    screenshots: [],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/r1nd0h/portfolio",
      },
    ],
  },
];
