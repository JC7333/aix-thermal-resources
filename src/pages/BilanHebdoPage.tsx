import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { usePageTitle } from '@/hooks/usePageTitle';
import { BilanHebdo } from '@/components/parcours/BilanHebdo';
import { supabase } from '@/lib/supabase';

const BilanHebdoPage = () => {
  usePageTitle('Bilan hebdomadaire');
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';

  const [parcoursId, setParcoursId] = useState<string | null>(null);
  const [weekNumber, setWeekNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      setError('Lien invalide. Vérifiez le lien reçu par email.');
      setLoading(false);
      return;
    }
    const load = async () => {
      try {
        const { data, error: dbError } = await supabase
          .from('parcours')
          .select('id, created_at')
          .eq('token', token)
          .single();
        if (dbError || !data) {
          setError('Parcours non trouvé. Vérifiez votre code personnel.');
          setLoading(false);
          return;
        }
        setParcoursId(data.id);
        const endOfCure = new Date(new Date(data.created_at).getTime() + 21 * 24 * 60 * 60 * 1000);
        const weeks = Math.max(1, Math.ceil((Date.now() - endOfCure.getTime()) / (7 * 24 * 60 * 60 * 1000)));
        setWeekNumber(Math.min(weeks, 12));
      } catch (_e) {
        setError('Erreur de connexion.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [token]);

  return (
    <Layout>
      <div className="max-w-lg mx-auto px-4 py-8">
        {loading ? (
          <p className="text-center text-muted-foreground animate-pulse">Chargement...</p>
        ) : error ? (
          <div className="text-center space-y-4">
            <p className="text-lg text-muted-foreground">{error}</p>
            <Link to="/" className="text-primary hover:underline">Retour à l'accueil</Link>
          </div>
        ) : parcoursId ? (
          <BilanHebdo parcoursId={parcoursId} weekNumber={weekNumber} />
        ) : null}
        <p className="text-center text-xs text-muted-foreground mt-12">
          Information éducative — ne remplace pas un avis médical. Urgence : 15 / 112
        </p>
      </div>
    </Layout>
  );
};

export default BilanHebdoPage;
