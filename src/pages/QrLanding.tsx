import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { logEvent } from '@/services/analytics';
import { getPathologyUrl } from '@/lib/pathologyRoutes';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

const QrLanding = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      // Log QR scan event
      logEvent('qr_scan', `/qr/${slug}`, { slug, source: 'thermal_cabin' });

      // Log to Supabase if configured
      if (isSupabaseConfigured() && supabase) {
        supabase.from('qr_scans').insert({
          slug,
          source: 'thermal_cabin',
        }).then(() => {}).catch(() => {});
      }

      // Redirect to V2 pathology page
      const targetUrl = getPathologyUrl(slug);
      navigate(targetUrl, { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  }, [slug, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto mb-4" />
        <p className="text-lg text-muted-foreground">Chargement de votre programme...</p>
      </div>
    </div>
  );
};

export default QrLanding;
