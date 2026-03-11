import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import Index from "./pages/Index";
import Resources from "./pages/Resources";
import PathologyPage from "./pages/PathologyPage";
import PathologyPageV2 from "./pages/PathologyPageV2";
import Pathologies from "./pages/Pathologies";
import Programs from "./pages/Programs";
import Parcours from "./pages/Parcours";
import Guides from "./pages/Guides";
import Parents from "./pages/Parents";
import FAQ from "./pages/FAQ";
import QuiSuisJe from "./pages/QuiSuisJe";
import Contact from "./pages/Contact";
import Social from "./pages/Social";
import MentionsLegales from "./pages/MentionsLegales";
import Confidentialite from "./pages/Confidentialite";
import NotFound from "./pages/NotFound";
import ReponsesRapides from "./pages/ReponsesRapides";
import Telechargements from "./pages/Telechargements";
import Stats from "./pages/Stats";
import MesFavoris from "./pages/MesFavoris";
// Routes internes masquées en production
// import Admin from "./pages/Admin";
// import SocialKit from "./pages/SocialKit";
import SourcesMethodologie from "./pages/SourcesMethodologie";
// import DiagnosticVideos from "./pages/DiagnosticVideos";
// import DiagnosticLinks from "./pages/DiagnosticLinks";
// import DiagnosticRoutes from "./pages/DiagnosticRoutes";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import QrLanding from "./pages/QrLanding";
import Programme from "./pages/Programme";

const queryClient = new QueryClient();

const App = () => {
  // Disable browser scroll restoration for consistent scroll-to-top behavior
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AccessibilityProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/reponses-rapides" element={<ReponsesRapides />} />
                <Route
                  path="/reponses-rapides/:slug"
                  element={<ReponsesRapides />}
                />
                <Route path="/parcours" element={<Parcours />} />
                <Route path="/ressources" element={<Resources />} />
                <Route path="/pathologies" element={<Pathologies />} />
                <Route path="/pathologies/:slug" element={<PathologyPage />} />
                {/* Routes V2 pour les nouveaux packs evidence-based */}
                <Route
                  path="/pathologies/v2/:slug"
                  element={<PathologyPageV2 />}
                />
                <Route path="/programmes" element={<Programs />} />
                <Route path="/guides" element={<Guides />} />
                <Route path="/parents" element={<Parents />} />
                <Route path="/telechargements" element={<Telechargements />} />
                <Route path="/favoris" element={<MesFavoris />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/qui-suis-je" element={<QuiSuisJe />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/social" element={<Social />} />
                <Route path="/mentions-legales" element={<MentionsLegales />} />
                <Route path="/confidentialite" element={<Confidentialite />} />
                <Route path="/stats" element={<Stats />} />
                {/* Routes internes — masquées en production
                <Route path="/admin" element={<Admin />} />
                <Route path="/social-kit" element={<SocialKit />} />
                <Route path="/diagnostic/videos" element={<DiagnosticVideos />} />
                <Route path="/diagnostic/links" element={<DiagnosticLinks />} />
                <Route path="/diagnostic/routes" element={<DiagnosticRoutes />} />
                */}
                <Route
                  path="/sources-methodologie"
                  element={<SourcesMethodologie />}
                />
                {/* QR landing pages — traçage des scans en cabine thermale */}
                <Route path="/qr/:slug" element={<QrLanding />} />
                <Route path="/le-programme" element={<Programme />} />
                {/* Route legacy /pathologie/:slug — redirige vers V2 */}
                <Route path="/pathologie/:slug" element={<PathologyPage />} />
                {/* Route interne masquée en production
                <Route path="/cabinet" element={<QuiSuisJe />} />
                */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AccessibilityProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
