import { PAGE_ROUTES } from './routes';

export interface INavLink {
  name: string;
  url: string;
  visibility: "protected" | "authenticated" | "public" | "unauthenticated"
}

export const NAV_LINKS: INavLink[] = [
  {
    name: "Home",
    url: PAGE_ROUTES.HOME,
    visibility: "public",
  },
  {
    name: "My Requests",
    url: PAGE_ROUTES.MY_REQUESTS,
    visibility: "authenticated",
  },
  {
    name: "Login",
    url: PAGE_ROUTES.LOGIN,
    visibility: "unauthenticated",
  },
  {
    name: "Sign Up",
    url: PAGE_ROUTES.SIGNUP,
    visibility: "unauthenticated",
  },
];
