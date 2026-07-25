import { solutionPricing } from "../../data/solutionPricing";

interface SolutionPricingSectionProps {
  accentColor: string;
  accentDark: string;
}

export default function SolutionPricingSection({
  accentColor,
  accentDark,
}: SolutionPricingSectionProps) {
  return (
    <section className="border-y border-[#E2E8F0] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <h2
          className="border-l-4 pl-4 font-['Zen_Kaku_Gothic_New'] text-2xl font-black text-[#1E293B] sm:text-3xl"
          style={{ borderColor: accentColor }}
        >
          料金の目安
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed sm:text-base">
          御社の状況により変動します。詳しい概算は15分の無料相談でお出しします。
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {solutionPricing.map((tier) => (
            <div
              key={tier.label}
              className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-6"
            >
              <h3 className="font-['Zen_Kaku_Gothic_New'] text-lg font-bold text-[#1E293B]">
                {tier.label}
              </h3>
              <p
                className="mt-2 font-['Zen_Kaku_Gothic_New'] text-3xl font-black"
                style={{ color: accentDark }}
              >
                {tier.price}
              </p>
              <ul className="mt-4 space-y-1 text-sm leading-relaxed">
                {tier.items.map((item) => (
                  <li key={item}>・{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-[#64748B]">
          ※
          金額は税別です。入力チャネル数・拠点数・台帳の種類・処理量により変動します。外部サービス(AI・音声認識・クラウド)の利用料は月額に含まれ、追加請求はありません。
        </p>
      </div>
    </section>
  );
}
