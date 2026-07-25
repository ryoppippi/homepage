import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vite-plus/test";
import SolutionPricingSection from "./SolutionPricingSection";

afterEach(() => {
  cleanup();
});

describe("SolutionPricingSection", () => {
  it("初期費用・月額利用料・オプションの3区分を金額つきで表示する", () => {
    render(
      <SolutionPricingSection accentColor="#EA580C" accentDark="#C2410C" />
    );

    expect(screen.getByText("初期費用")).toBeInTheDocument();
    expect(screen.getByText("40万円〜")).toBeInTheDocument();
    expect(screen.getByText("月額利用料")).toBeInTheDocument();
    expect(screen.getByText("月5万円〜")).toBeInTheDocument();
    expect(screen.getByText("オプション")).toBeInTheDocument();
    expect(screen.getByText("別途お見積り")).toBeInTheDocument();
  });

  it("金額の変動条件と、外部サービス実費が月額に含まれ追加請求がない旨を注記する", () => {
    render(
      <SolutionPricingSection accentColor="#EA580C" accentDark="#C2410C" />
    );

    expect(screen.getByText(/税別/)).toBeInTheDocument();
    expect(screen.getByText(/追加請求はありません/)).toBeInTheDocument();
  });

  it("積算根拠(人件費ベース等の内部情報)を露出せず、変動する旨だけを説明する", () => {
    render(
      <SolutionPricingSection accentColor="#EA580C" accentDark="#C2410C" />
    );

    expect(screen.getByText(/御社の状況により変動します/)).toBeInTheDocument();
    expect(screen.queryByText(/人件費/)).not.toBeInTheDocument();
  });

  it("見出しの下線色にaccentColorを反映する", () => {
    render(
      <SolutionPricingSection accentColor="#0D9488" accentDark="#0F766E" />
    );

    const heading = screen.getByRole("heading", { name: "料金の目安" });
    expect(heading).toHaveStyle({ borderColor: "#0D9488" });
  });
});
