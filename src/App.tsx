import { useEffect, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import { ScrollToTop } from "@/components/shared/ScrollToTop";

// Critical pages — static imports (loaded immediately)
import Index from "./pages/Index";
import PathologyPageV2 from "./pages/PathologyPageV2";
import Pathologies from "./pages/Pathologies";
import NotFound from "./pages/NotFound";

// Non-critical pages — lazy loaded
const Resources = lazy(() => import("./pages/Resources"));
const PathologyPage = lazy(() => import("./pages/PathologyPage"));
const Programs = lazy(() => import("./pages/Programs"));
const Parcours = lazy(() => import("./pages/Parcours"));
const ParcoursAccueil = lazy(() => import("./pages/ParcoursAccueil"));
const ParcoursBep = lazy(() => import("./pages/ParcoursBep"));
const ParcoursJour = lazy(() => import("./pages/ParcoursJour"));
const ParcoursBilan = lazy(() => import("./pages/ParcoursBilan"));
const Guides = lazy(() => import("./pages/Guides"));
const Parents = lazy(() => import("./pages/Parents"));
const FAQ = lazy(() => import("./pages/FAQ"));
const QuiSuisJe = lazy(() => import("./pages/QuiSuisJe"));
const Contact = lazy(() => import("./pages/Contact"));
const Social = lazy(() => import("./pages/Social"));
const MentionsLegales = lazy(() => import("./pages/MentionsLegales"));
const Confidentialite = lazy(() => import("./pages/Confidentialite"));
const ReponsesRapides = lazy(() => import("./pages/ReponsesRapides"));
const Telechargements = lazy(() => import("./pages/Telechargements"));
const Stats = lazy(() => import("./pages/Stats"));
const MesFavoris = lazy(() => import("./pages/MesFavoris"));
const SourcesMethodologie = lazy(() => import("./pages/SourcesMethodologie"));
const QrLanding = lazy(() => import("./pages/QrLanding"));
const Programme = lazy(() => import("./pages/Programme"));
// Routes internes masquees en production
// const Admin = lazy(() => import("./pages/Admin"));
// const SocialKit = lazy(() => import("./pages/SocialKit"));

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
              <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent" />
                </div>
              }>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/reponses-rapides" element={<ReponsesRapides />} />
                  <Route
                    path="/reponses-rapides/:slug"
                    element={<ReponsesRapides />}
                  />
                  <Route path="/parcours/:slug" element={<ParcoursAccueil />} />
                  <Route path="/parcours/:slug/bep" element={<ParcoursBep />} />
                  <Route path="/parcours/:slug/jour/:day" element={<ParcoursJour />} />
                  <Route path="/parcours/:slug/bilan" element={<ParcoursBilan />} />
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
                  {/* Routes internes masquees en production
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/social-kit" element={<SocialKit />} />
                  */}
                  <Route
                    path="/sources-methodologie"
                    element={<SourcesMethodologie />}
                  />
                  {/* QR landing pages - tracage des scans en cabine thermale */}
                  <Route path="/qr/:slug" element={<QrLanding />} />
                  <Route path="/le-programme" element={<Programme />} />
                  {/* Route legacy /pathologie/:slug */}
                  <Route path="/pathologie/:slug" element={<PathologyPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </AccessibilityProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
