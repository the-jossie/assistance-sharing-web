import { screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { Header } from "./header";
import { APP_NAME, NAV_LINKS } from "@/configs";
import { renderWithProviders } from "@/utils/test";
import { AppRouterContextProviderMock } from "../app-router-context-provider-mock.tsx";

describe("Header", () => {
  test("renders logo", () => {
    const push = vi.fn();
    renderWithProviders(<AppRouterContextProviderMock router={{ push }}><Header /></AppRouterContextProviderMock>);

    const logo = screen.getByText( APP_NAME);

    expect(logo).toBeInTheDocument();
  });

  test("renders unauthenticated nav links", () => {
    const push = vi.fn();
    renderWithProviders(<AppRouterContextProviderMock router={{ push }}><Header /></AppRouterContextProviderMock>);

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
