import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import Index from "./pages/Index";
import Resources from "./pages/Resources";
import PathologyPage from "./pages/PathologyPage";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AccessibilityProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/reponses-rapides" element={<ReponsesRapides />} />
            <Route path="/reponses-rapides/:slug" element={<ReponsesRapides />} />
            <Route path="/parcours" element={<Parcours />} />
            <Route path="/ressources" element={<Resources />} />
            <Route path="/pathologies" element={<Pathologies />} />
            <Route path="/pathologies/:slug" element={<PathologyPage />} />
            <Route path="/programmes" element={<Programs />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/parents" element={<Parents />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/qui-suis-je" element={<QuiSuisJe />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/social" element={<Social />} />
            <Route path="/mentions-legales" element={<MentionsLegales />} />
            <Route path="/confidentialite" element={<Confidentialite />} />
            {/* Legacy routes */}
            <Route path="/pathologie/:slug" element={<PathologyPage />} />
            <Route path="/cabinet" element={<QuiSuisJe />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AccessibilityProvider>
  </QueryClientProvider>
);

export default App;
