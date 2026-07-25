import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vite-plus/test";
import Logistics from "./Logistics";

function renderLogistics() {
  return render(
    <MemoryRouter initialEntries={["/solutions/logistics"]}>
      <Logistics />
    </MemoryRouter>
  );
}

afterEach(() => {
  cleanup();
});

describe("Logistics ページ (運行れんらく帳)", () => {
  it("見出し・課題共感・業界統計(出典付き)を表示する", () => {
    renderLogistics();

    expect(
      screen.getByRole("heading", {
        name: /紙の運転日報から請求書への手入力作業をなくします/,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "対象となる課題" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("配車計画が特定の担当者に依存")
    ).toBeInTheDocument();
    expect(screen.getAllByText(/4%/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/国交省/).length).toBeGreaterThan(0);
  });

  it("仕組みの3ステップの見出しを表示する", () => {
    renderLogistics();

    expect(
      screen.getByRole("heading", {
        name: "現在お使いの配車連絡のLINEグループに、アカウントを1つ招待",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "紙の運転日報は、写真を撮るだけで自動集計",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "AIが運行日報を仕分けて、請求書のもとになる記録を自動作成",
      })
    ).toBeInTheDocument();
  });

  it("ご利用にあたっての制約と前提を表示する", () => {
    renderLogistics();

    expect(
      screen.getByText("ご利用にあたっての制約と前提")
    ).toBeInTheDocument();
    expect(
      screen.getByText(/電話でのやり取りは自動記録の対象外/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/1グループに参加できる公式アカウントは1つまで/)
    ).toBeInTheDocument();
  });

  it("料金の目安セクションを表示する", () => {
    renderLogistics();

    expect(
      screen.getByRole("heading", { name: "料金の目安" })
    ).toBeInTheDocument();
  });

  it("メールでの相談CTAと、フォームからの相談導線の両方を表示する", () => {
    renderLogistics();

    const mailLinks = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("href")?.startsWith("mailto:"));
    expect(mailLinks.length).toBeGreaterThan(0);

    const contactLinks = screen
      .getAllByRole("link")
      .map((link) => link.getAttribute("href"));
    expect(contactLinks).toContain("/contact");
  });

  it("ページ別のdocument.titleを設定する", () => {
    renderLogistics();

    expect(document.title).toBe("運行れんらく帳 | 株式会社テックリード");
  });
});
