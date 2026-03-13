import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { FloatingBackToTop } from "@/components/shared/FloatingBackToTop";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen print:min-h-0 flex flex-col">
      <a href="#main-content" className="skip-link">
        Aller au contenu principal
      </a>
      <ScrollToTop />
      <Header />
      <main id="main-content" className="flex-1 pt-0">
        {children}
      </main>
      <Footer />
      <FloatingBackToTop />
    </div>
  );
};
