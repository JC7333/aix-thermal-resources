import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { MedicalDisclaimer } from '@/components/shared/MedicalDisclaimer';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <MedicalDisclaimer variant="banner" />
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};
