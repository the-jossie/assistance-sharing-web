"use client";

import ctl from "@netlify/classnames-template-literals";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { NavLink, Text } from "@/components";
import { APP_NAME } from "@/configs";
import MobileNav from "./mobile-nav";
import MenuButton from "./menu-button";
import { useAuthContext } from "@/contexts";
import { toast } from "react-toastify";
import { computeNavLinksToShow } from "@/utils/auth";

const Header = () => {
  const { auth, clearAuth } = useAuthContext();
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isLoggedIn = !!auth.token;

  const navLinksToShow = computeNavLinksToShow(auth)

  const handleLogout = () => {
    clearAuth();

    toast.success("Logout Successful");

    router.refresh();
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className={wrapperStyle}>
      <div className="flex items-center justify-between px-5 md:px-10 py-4 max-w-[1440px] mx-auto w-full">
        <Link href="/">
          <Text
            value={APP_NAME}
            className="font-black text-2xl italic text-primary bg-white py-1 px-3"
          />
        </Link>
        <nav>
          <ul className={navStyle}>
            {navLinksToShow.map((link, index) => (
              <li key={`nav_link-${index}`}>
                <NavLink exact={true} className="font-semibold" href={link.url}>
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
          <MenuButton
            isMenuOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </nav>
        {isLoggedIn && (
          <div className={navStyle}>
            <button onClick={handleLogout}>
              <Text value="Logout" className="hidden md:block" />
            </button>
            {auth.role === "ROLE_ADMIN" && (
              <Text
                value="Admin"
                variant="p2"
                className="hidden md:block !border rounded-full border-grey px-2 py-1"
              />
            )}
          </div>
        )}
      </div>
      {isMobileMenuOpen && <MobileNav navLinks={navLinksToShow} />}
    </header>
  );
};

const wrapperStyle = ctl(`bg-grey-300 z-10 shadow`);
const navStyle = ctl(
  `relative hidden md:flex items-center space-x-5 md:space-x-6 sticky top-0`,
);

export { Header };
