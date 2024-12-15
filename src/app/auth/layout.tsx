"use client";

import ctl from "@netlify/classnames-template-literals";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import { Header } from "@/components";
import { PAGE_ROUTES } from "@/configs";
import { useAuthContext } from "@/contexts";
import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { auth } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (auth && auth.token) {
      return router.replace(PAGE_ROUTES.HOME);
    }
  }, [auth, router]);

  return (
    <div className={wrapperStyle}>
      <Header />

      <div className={contentWrapperStyle}>
        <Image
          height="100"
          width="700"
          alt="auth-image"
          src="/auth-image.png"
          className="hidden lg:block bg-[url('/auth-image.png')] bg-cover h-full rounded-3xl"
        />
        <Suspense fallback={<></>}>{children}</Suspense>
      </div>
    </div>
  );
};

const wrapperStyle = ctl(`h-screen w-screen overflow-hidden flex flex-col`);
const contentWrapperStyle = ctl(
  `grid lg:grid-cols-2 px-10 py-20 h-full gap-24 max-w-[1440px] mx-auto w-full`,
);

export default AuthLayout;
