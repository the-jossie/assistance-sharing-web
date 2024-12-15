import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import MenuButton from "./menu-button";

describe("Menu Button", () => {
  test("renders button", () => {
    render(<MenuButton isMenuOpen={false} onClick={() => {}} />);

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
  });
});
