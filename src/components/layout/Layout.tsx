import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { FloatingBackToTop } from "@/components/shared/FloatingBackToTop";

interface LayoutProps {
  children: ReactNode;
  noPadding?: boolean;
}

export const Layout = ({ children, noPadding = false }: LayoutProps) => {
  return (
    <div className="min-h-screen print:min-h-0 flex flex-col">
      <ScrollToTop />
      <Header />
      <main id="main-content" className={`flex-1 ${noPadding ? '' : 'pt-20 lg:pt-24'}`}>
        {children}
      </main>
      <Footer />
      <FloatingBackToTop />
    </div>
  );
};
