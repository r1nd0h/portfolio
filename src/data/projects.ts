import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "todone",
    title: "ToDone",
    subtitle: "AIが予定を組む。あなたはこなすだけ。",
    description:
      "AIがタスクの作成・分解・スケジューリングを支援するタスク管理アプリ。Flutterで開発し、iOS/Android両対応。Gemini AIによる自動スケジューリングやGoogleカレンダー連携など、生産性を最大化する機能を搭載。",
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
];
