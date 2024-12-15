import { screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import AuthLayout from "./layout";
import { renderWithProviders } from "@/utils/test";

describe("Auth Layout", () => {
  test("renders header", () => {
    renderWithProviders(
      <AuthLayout>
        <></>
      </AuthLayout>,
    );

    const header = screen.getByRole("banner");

    expect(header).toBeInTheDocument();
  });

  test("renders ui image", () => {
    renderWithProviders(
      <AuthLayout>
        <></>
      </AuthLayout>,
    );

    const image = screen.getByAltText("auth-image");

    expect(image).toBeInTheDocument();
  });

  test("renders children", () => {
    renderWithProviders(
      <AuthLayout>
        <h2>Auth Layout Page</h2>
      </AuthLayout>,
    );

    const text = screen.getByRole("heading", {
      level: 2,
      name: "Auth Layout Page",
    });

    expect(text).toBeInTheDocument();
  });
});
