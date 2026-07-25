import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vite-plus/test";
import Construction from "./Construction";

function renderConstruction() {
  return render(
    <MemoryRouter initialEntries={["/solutions/construction"]}>
      <Construction />
    </MemoryRouter>
  );
}

afterEach(() => {
  cleanup();
});

describe("Construction ページ (現場れんらく帳)", () => {
  it("見出し・課題共感・業界統計(出典付き)を表示する", () => {
    renderConstruction();

    expect(
      screen.getByRole("heading", {
        name: /協力会社との連絡を記録に残し、「言った言わない」をなくします/,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "対象となる課題" })
    ).toBeInTheDocument();
    expect(screen.getByText("連絡手段が統一されていない")).toBeInTheDocument();
    expect(screen.getAllByText(/28\.3/).length).toBeGreaterThan(0);
    expect(screen.getByText(/ANDPAD/)).toBeInTheDocument();
  });

  it("仕組みの3ステップの見出しを表示する", () => {
    renderConstruction();

    expect(
      screen.getByRole("heading", {
        name: "現在お使いのLINEグループに、アカウントを1つ招待",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "FAXは、受け取った紙をスキャンして送るだけ",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "AIが現場ごとに仕分けて、現在の台帳形式で記入",
      })
    ).toBeInTheDocument();
  });

  it("ご利用にあたっての制約と前提を表示する", () => {
    renderConstruction();

    expect(
      screen.getByText("ご利用にあたっての制約と前提")
    ).toBeInTheDocument();
    expect(
      screen.getByText(/電話の通話内容は自動記録の対象外/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/1グループに参加できる公式アカウントは1つまで/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "FAXは自動では取り込まれません。受け取った紙をスキャンまたは撮影して送っていただく操作が必要です(そのぶん複合機の設定変更や機種の制約はありません)。"
      )
    ).toBeInTheDocument();
  });

  it("料金の目安セクションを表示する", () => {
    renderConstruction();

    expect(
      screen.getByRole("heading", { name: "料金の目安" })
    ).toBeInTheDocument();
  });

  it("メールでの相談CTAと、フォームからの相談導線の両方を表示する", () => {
    renderConstruction();

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
    renderConstruction();

    expect(document.title).toBe("現場れんらく帳 | 株式会社テックリード");
  });
});
