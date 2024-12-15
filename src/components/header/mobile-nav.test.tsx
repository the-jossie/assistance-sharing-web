import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import MobileNav from "./mobile-nav";
import { INavLink } from "@/configs";

describe("Mobile Nav", () => {
  test("renders nav links", () => {
    const navLinks: INavLink[] = [
      {
        name: "Link 1",
        url: "/link1",
        visibility: "authenticated",
      },
    ];

    render(<MobileNav navLinks={navLinks} />);

    navLinks.map((link) => {
      const menuLink = screen.getByRole("link", {
        name: link.name,
      });

      expect(menuLink).toBeInTheDocument();
      expect(menuLink).toHaveAttribute("href", link.url);
    });
  });
});
