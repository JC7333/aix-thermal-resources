import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { Button } from '@/components/ui/button';
import { usePageTitle } from '@/hooks/usePageTitle';
import { getStoredToken, saveToken } from '@/lib/parcoursToken';
import { findParcoursByToken } from '@/services/parcoursService';
import { ArrowRight, Clock, CheckCircle2, Shield, Smartphone, KeyRound } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Métadonnées par pathologie
const PARCOURS_META: Record<string, { title: string; subtitle: string; description: string; icon: string }> = {
  gonarthrose: {
    title: 'Arthrose du genou',
    subtitle: 'Votre programme personnalisé en 3 semaines',
    description: 'Comprenez votre arthrose, apprenez à bouger sans douleur, et repartez avec un plan concret pour la suite.',
    icon: '🦴',
  },
  'lombalgie-chronique': {
    title: 'Lombalgie chronique',
    subtitle: 'Votre programme personnalisé en 3 semaines',
    description: 'Comprenez votre dos, reprenez confiance dans le mouvement, et construisez votre routine anti-douleur.',
    icon: '🔙',
  },
  coxarthrose: {
    title: 'Arthrose de la hanche',
    subtitle: 'Votre programme personnalisé en 3 semaines',
    description: 'Protégez votre hanche par le mouvement, améliorez votre mobilité, et préparez votre autonomie.',
    icon: '🦴',
  },
  'insuffisance-veineuse': {
    title: 'Insuffisance veineuse',
    subtitle: 'Votre programme personnalisé en 3 semaines',
    description: 'Soulagez vos jambes lourdes, améliorez votre circulation, et adoptez les bons réflexes au quotidien.',
    icon: '🦵',
  },
  bpco: {
    title: 'BPCO',
    subtitle: 'Votre programme personnalisé en 3 semaines',
    description: "Apprenez à mieux respirer, gérer l'essoufflement, et restez actif malgré la maladie.",
    icon: '🫁',
  },
  'otites-repetition-enfant': {
    title: 'Otites à répétition (enfant)',
    subtitle: 'Programme pour les parents',
    description: 'Comprenez les otites de votre enfant, apprenez les soins nasaux, et prévenez les récidives.',
    icon: '👶',
  },
  fibromyalgie: {
    title: 'Fibromyalgie',
    subtitle: 'Votre programme personnalisé en 3 semaines',
    description: "Apprivoisez la douleur, retrouvez un sommeil réparateur, et reprenez doucement l'activité.",
    icon: '🧠',
  },
  'rhinosinusite-chronique': {
    title: 'Rhinosinusite chronique',
    subtitle: 'Votre programme personnalisé en 3 semaines',
    description: "Maîtrisez l'hygiène nasale, réduisez l'inflammation, et respirez mieux au quotidien.",
    icon: '👃',
  },
  'tendinopathie-coiffe': {
    title: "Tendinopathie de l'épaule",
    subtitle: 'Votre programme personnalisé en 3 semaines',
    description: 'Rééduquez votre épaule en douceur, renforcez vos muscles stabilisateurs, et retrouvez vos gestes.',
    icon: '💪',
  },
  'arthrose-digitale': {
    title: 'Arthrose des mains',
    subtitle: 'Votre programme personnalisé en 3 semaines',
    description: 'Assouplissez vos doigts, soulagez la douleur, et adaptez vos gestes quotidiens.',
    icon: '✋',
  },
  asthme: {
    title: 'Asthme',
    subtitle: 'Votre programme personnalisé en 3 semaines',
    description: 'Maîtrisez votre traitement, comprenez vos déclenchants, et reprenez le sport en confiance.',
    icon: '🫁',
  },
};

const ParcoursAccueil = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const meta = slug ? PARCOURS_META[slug] : undefined;

  usePageTitle(meta ? `Parcours — ${meta.title}` : 'Parcours');

  // Token existant en localStorage
  const existingToken = slug ? getStoredToken(slug) : null;

  // Récupération par code
  const [showTokenInput, setShowTokenInput] = useState(false);
  const [tokenInput, setTokenInput] = useState('');
  const [tokenLoading, setTokenLoading] = useState(false);

  const handleTokenLookup = async () => {
    const code = tokenInput.trim().toUpperCase();
    if (code.length < 8) {
      toast({ title: 'Code trop court', description: 'Le code ressemble à ETUVE-G-A4K7MZ', variant: 'destructive' });
      return;
    }
    setTokenLoading(true);
    try {
      const parcours = await findParcoursByToken(code);
      if (parcours) {
        saveToken(code, parcours.slug, parcours.id);
        toast({ title: 'Parcours retrouvé !' });
        navigate(`/parcours/${parcours.slug}/jour/1`);
      } else {
        toast({ title: 'Code non trouvé', description: 'Vérifiez votre code et réessayez.', variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Erreur', description: 'Impossible de vérifier le code.', variant: 'destructive' });
    } finally {
      setTokenLoading(false);
    }
  };

  if (!slug || !meta) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <p className="text-xl text-muted-foreground">Ce parcours n'est pas encore disponible.</p>
          <Link to="/parcours" className="text-primary hover:underline mt-4 inline-block">
            ← Retour aux parcours
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: 'Accueil', href: '/' },
            { label: 'Parcours', href: '/parcours' },
            { label: meta.title },
          ]}
        />

        {/* Hero */}
        <div className="text-center mt-8 mb-10">
          <span className="text-5xl mb-4 block">{meta.icon}</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">{meta.title}</h1>
          <p className="text-xl text-primary font-medium mb-4">{meta.subtitle}</p>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto">{meta.description}</p>
        </div>

        {/* Points clés */}
        <div className="grid gap-4 mb-10">
          {[
            { icon: <Clock className="w-6 h-6 text-primary" />, title: '21 jours de programme', desc: '3 à 5 minutes par jour, pendant votre cure' },
            { icon: <CheckCircle2 className="w-6 h-6 text-green-600" />, title: 'Contenu validé scientifiquement', desc: 'Basé sur les recommandations HAS, NICE et Cochrane' },
            { icon: <Shield className="w-6 h-6 text-blue-600" />, title: '100% anonyme', desc: 'Aucune donnée personnelle. Un code unique vous est attribué.' },
            { icon: <Smartphone className="w-6 h-6 text-purple-600" />, title: 'Sur votre téléphone', desc: "Accessible depuis n'importe quel smartphone, sans installation" },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 border">
              <div className="shrink-0 mt-0.5">{item.icon}</div>
              <div>
                <p className="font-semibold text-foreground text-lg">{item.title}</p>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        {existingToken ? (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-center">
              <p className="text-green-800 font-medium text-lg">Vous avez déjà un parcours en cours</p>
              <p className="text-green-600 font-mono text-xl mt-1">{existingToken.token}</p>
            </div>
            <Button size="lg" className="w-full text-xl py-7 gap-3" onClick={() => navigate(`/parcours/${slug}/jour/1`)}>
              Reprendre mon parcours <ArrowRight className="w-6 h-6" />
            </Button>
            <Button variant="outline" size="lg" className="w-full text-lg py-6" onClick={() => navigate(`/parcours/${slug}/bep`)}>
              Recommencer un nouveau parcours
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Button size="lg" className="w-full text-xl py-7 gap-3" onClick={() => navigate(`/parcours/${slug}/bep`)}>
              Commencer mon bilan <ArrowRight className="w-6 h-6" />
            </Button>

            {/* Récupération de code existant */}
            {!showTokenInput ? (
              <button
                onClick={() => setShowTokenInput(true)}
                className="w-full text-center text-muted-foreground hover:text-primary text-base py-3 flex items-center justify-center gap-2"
              >
                <KeyRound className="w-4 h-4" />
                J'ai déjà un code
              </button>
            ) : (
              <div className="p-4 rounded-xl border-2 border-muted space-y-3">
                <p className="text-base font-medium">Entrez votre code personnel</p>
                <input
                  type="text"
                  value={tokenInput}
                  onChange={(e) => setTokenInput(e.target.value.toUpperCase())}
                  placeholder="ETUVE-G-A4K7MZ"
                  className="w-full p-4 rounded-xl border-2 border-muted text-xl font-mono text-center tracking-wider focus:border-primary focus:outline-none"
                  maxLength={15}
                  autoFocus
                />
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={() => setShowTokenInput(false)}>
                    Annuler
                  </Button>
                  <Button className="flex-1" onClick={handleTokenLookup} disabled={tokenLoading || tokenInput.length < 8}>
                    {tokenLoading ? 'Recherche...' : 'Retrouver mon parcours'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer info */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          Information éducative — ne remplace pas un avis médical.<br />Urgence : 15 / 112
        </p>
      </div>
    </Layout>
  );
};

export default ParcoursAccueil;
