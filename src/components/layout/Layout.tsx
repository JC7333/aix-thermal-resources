import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { MedicalDisclaimer } from '@/components/shared/MedicalDisclaimer';
import { ScrollToTop } from '@/components/shared/ScrollToTop';
import { FloatingBackToTop } from '@/components/shared/FloatingBackToTop';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <main id="main-content" className="flex-1 pt-0">
        {children}
      </main>
      <Footer />
      <FloatingBackToTop />
      {/* Bandeau légal discret en bas à droite, repliable sur mobile */}
      <MedicalDisclaimer variant="floating" />
    </div>
  );
};
