// ============================================
// PATHOLOGY PAGE V1 — REDIRECTION VERS V2
// Cette page redirige automatiquement vers la version V2
// ============================================

import { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getV2Slug, getPathologyUrl } from '@/lib/pathologyRoutes';

/**
 * Page de redirection automatique vers V2
 * Toutes les anciennes routes /pathologies/:slug sont redirigées vers /pathologies/v2/:slug
 */
const PathologyPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    if (slug) {
      // Obtenir le slug V2 (gère les migrations si nécessaire)
      const v2Slug = getV2Slug(slug);
      
      // Construire l'URL V2 avec le hash si présent
      const v2Url = getPathologyUrl(v2Slug) + (location.hash || '') + (location.search || '');
      
      // Scroll to top avant navigation
      window.scrollTo({ top: 0, behavior: 'instant' });
      
      // Redirection immédiate (replace pour éviter le retour arrière)
      navigate(v2Url, { replace: true });
    }
  }, [slug, navigate, location.hash, location.search]);
  
  // Afficher un état de chargement minimal pendant la redirection
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
        <p className="text-muted-foreground">Redirection en cours...</p>
      </div>
    </div>
  );
};

export default PathologyPage;
