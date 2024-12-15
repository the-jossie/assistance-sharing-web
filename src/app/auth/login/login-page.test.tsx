import { describe, expect, test, vi } from "vitest";
import LoginPage from "./page";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/utils/test";
import userEvent from "@testing-library/user-event";

describe("Login Page", () => {
  test("renders form", () => {
    renderWithProviders(<LoginPage />);

    const title = screen.getByRole("heading", { level: 2, name: "Login" });
    const usernameInput = screen.getByPlaceholderText("Enter your username");
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    const button = screen.getByRole("button", { name: "Login" });

    expect(title).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("handles invalid username error on submit", async () => {
    const user = userEvent.setup();

    renderWithProviders(<LoginPage />);

    const usernameInput = screen.getByPlaceholderText("Enter your username");
    const button = screen.getByRole("button", { name: "Login" });

    await user.type(usernameInput, "yu");
    await user.click(button);

    const usernameError = await screen.findByText(
      "Username must be at least 3 characters long",
    );

    expect(usernameError).toBeInTheDocument();
  });

  test("handles invalid password error on submit", async () => {
    const user = userEvent.setup();

    renderWithProviders(<LoginPage />);

    const passwordInput = screen.getByPlaceholderText("Enter your password");
    const button = screen.getByRole("button", { name: "Login" });

    await user.type(passwordInput, "secret");
    await user.click(button);

    const passwordError = await screen.findByText(
      "Password must contain at least one uppercase letter, one lowercase letter, one special character, and be at least 8 characters long",
    );

    expect(passwordError).toBeInTheDocument();
  });

  test.skip("handles form submit", async () => {
    const user = userEvent.setup();
    vi.mock("");

    renderWithProviders(<LoginPage />);

    const usernameInput = screen.getByPlaceholderText("Enter your username");
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    const button = screen.getByRole("button", { name: "Login" });

    await user.type(usernameInput, "John Doe");
    await user.type(passwordInput, "Password@0");
    await user.click(button);

    await user.click(button);
  });

  test("renders a link to register", () => {
    renderWithProviders(<LoginPage />);

    const registerText = screen.getByRole("link", {
      name: "Register here",
    });

    expect(registerText).toBeInTheDocument();
    expect(registerText).toHaveAttribute("href", "/auth/signup");
  });
});
