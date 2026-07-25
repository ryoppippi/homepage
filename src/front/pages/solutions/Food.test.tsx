import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vite-plus/test";
import Food from "./Food";

function renderFood() {
  return render(
    <MemoryRouter initialEntries={["/solutions/food"]}>
      <Food />
    </MemoryRouter>
  );
}

afterEach(() => {
  cleanup();
});

describe("Food ページ (受注れんらく帳)", () => {
  it("見出し・課題共感・業界統計(出典付き)を表示する", () => {
    renderFood();

    expect(
      screen.getByRole("heading", {
        name: /毎朝届くFAXの注文書の入力作業を自動化します/,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "対象となる課題" })
    ).toBeInTheDocument();
    expect(screen.getByText("FAX・電話受注の手入力")).toBeInTheDocument();
    expect(screen.getAllByText(/67/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/ハンモック/).length).toBeGreaterThan(0);
  });

  it("仕組みの3ステップの見出しを表示する", () => {
    renderFood();

    expect(
      screen.getByRole("heading", {
        name: "受注のFAXは、届いた紙をスキャンして送るだけ",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "電話での注文も、ひと言吹き込むだけで自動記録",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "AIが商品・数量を仕分けて、現在の受注管理表の形式で自動記入",
      })
    ).toBeInTheDocument();
  });

  it("ご利用にあたっての制約と前提を表示する", () => {
    renderFood();

    expect(
      screen.getByText("ご利用にあたっての制約と前提")
    ).toBeInTheDocument();
    expect(screen.getByText(/賞味期限・ロットの実地確認/)).toBeInTheDocument();
    expect(
      screen.getByText(
        "FAXは自動では取り込まれません。届いた紙をスキャンまたは撮影して送っていただく操作が必要です(そのぶん複合機の設定変更や機種の制約はありません)。"
      )
    ).toBeInTheDocument();
  });

  it("料金の目安セクションを表示する", () => {
    renderFood();

    expect(
      screen.getByRole("heading", { name: "料金の目安" })
    ).toBeInTheDocument();
  });

  it("メールでの相談CTAと、フォームからの相談導線の両方を表示する", () => {
    renderFood();

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
    renderFood();

    expect(document.title).toBe("受注れんらく帳 | 株式会社テックリード");
  });
});
