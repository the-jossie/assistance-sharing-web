import ctl from "@netlify/classnames-template-literals";
import { Header } from "@/components";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={wrapperStyle}>
      <Header />
      <main className="flex flex-col overflow-y-auto max-w-[1440px] mx-auto w-full">
        {children}
      </main>
    </div>
  );
}

const wrapperStyle = ctl(
  `layout h-screen w-screen flex-1 flex flex-col overflow-hidden`,
);
