import type { SolutionPricingItem } from "../types";

export const solutionPricing: SolutionPricingItem[] = [
  {
    label: "初期費用",
    price: "40万円〜",
    items: [
      "ヒアリング・業務整理",
      "既存台帳への合わせ込み",
      "マスタ登録",
      "AIチューニング",
      "チャネル開通",
      "操作説明",
      "初月の並走",
    ],
  },
  {
    label: "月額利用料",
    price: "月5万円〜",
    items: [
      "利用ライセンス",
      "外部サービス実費込み",
      "稼働監視・障害対応",
      "AI精度チューニング",
      "問い合わせ対応",
    ],
  },
  {
    label: "オプション",
    price: "別途お見積り",
    items: ["御社固有の帳票開発", "基幹システム連携", "原価計算などの個別開発"],
  },
];
