import { INavLink, NAV_LINKS } from "@/configs";
import { UserType } from "@/types";

export const computeUserType = (auth: { token?: string; role?: string }): UserType => {
    if (auth.token && auth.role === "ROLE_ADMIN") {
      return "admin";
    } else if (auth.token) {
      return "loggedInUser";
    } else {
      return "guest";
    }
  }

export  const computeNavLinksToShow = (auth: { token?: string; role?: string }): INavLink[] => {
    const userType = computeUserType(auth);

  return NAV_LINKS.filter((link) => {
    if (userType === "admin") {
      return ["protected", "authenticated", "public"].includes(link.visibility);
    } else if (userType === "loggedInUser") {
      return ["authenticated", "public"].includes(link.visibility);
    } else if (userType === "guest") {
      return ["public", "unauthenticated"].includes(link.visibility);
    }

    return false;
  });
}
