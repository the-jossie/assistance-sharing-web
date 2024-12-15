import { screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Header } from "./header";
import { APP_NAME, NAV_LINKS } from "@/configs";
import { renderWithProviders } from "@/utils/test";

describe("Header", () => {
  test("renders logo", () => {
    renderWithProviders(<Header />);

    const logo = screen.getByText(`${APP_NAME} 🍲`);

    expect(logo).toBeInTheDocument();
  });

  test("renders unauthenticated nav links", () => {
    renderWithProviders(<Header />);

    NAV_LINKS.map((link) => {
      if (link.visibility === "unauthenticated") {
        const menuLink = screen.getByRole("link", {
          name: link.name,
        });

        expect(menuLink).toBeInTheDocument();
        expect(menuLink).toHaveAttribute("href", link.url);
      }
    });
  });
});
