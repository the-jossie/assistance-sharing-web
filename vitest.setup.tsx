import { afterEach, expect, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { beforeAll } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";
import "@testing-library/jest-dom/vitest"; // Very important. Why? *.toBeInTheDocument() will throw undefined error.
import { ClassAttributes, ImgHTMLAttributes, JSX } from "react";
import createFetchMock from "vitest-fetch-mock";
import * as mockRouter from "next-router-mock";

expect.extend(matchers);

const fetchMocker = createFetchMock(vi);

fetchMocker.enableMocks();

afterEach(() => {
  cleanup();
});

beforeAll(() => {
  vi.mock("next/navigation", async () => {
    const usePathname = vi.fn().mockImplementation(() => {
      const useRouter = mockRouter.useRouter;
      const router = useRouter();
      return router.asPath;
    });

    return { ...import("next-router-mock"), usePathname };
  });
  vi.mock("next/image", () => ({
    __esModule: true,
    default: (
      props: JSX.IntrinsicAttributes &
        ClassAttributes<HTMLImageElement> &
        ImgHTMLAttributes<HTMLImageElement>,
    ) => <img alt="" {...props} />,
  }));
});
