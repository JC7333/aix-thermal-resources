import { Layout } from '@/components/layout/Layout';
import { usePageTitle } from '@/hooks/usePageTitle';
import { FaqSection } from '@/components/shared/FaqSection';
import { Button } from '@/components/ui/button';
import { BarChart3, Users, Shield, ArrowRight } from 'lucide-react';
import { FAQ_GENERAL } from '@/content/faq';

const ProPage = () => {
  usePageTitle('Pour les professionnels — Programme ETP numérique');

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <header className="mb-10">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Programme ETP numérique pour stations thermales
          </h1>
          <p className="text-lg text-muted-foreground">
            Parcours patient interactif de 21 jours avec suivi post-cure.
            Conçu par un médecin thermaliste pour les patients en cure.
          </p>
        </header>

        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {[
            { icon: Users, label: '11 pathologies', desc: 'Parcours complets avec contenu evidence-based' },
            { icon: BarChart3, label: 'PRO validés', desc: 'Questionnaires avant/après pour mesurer les outcomes' },
            { icon: Shield, label: 'Données anonymes', desc: 'Token unique, zéro donnée nominative' },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="p-4 rounded-xl border border-border text-center">
              <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="font-bold text-foreground">{label}</p>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>

        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Comment ça fonctionne</h2>
          <div className="space-y-4">
            {[
              { n: '1', t: 'Le patient scanne un QR code', d: "En cabine ou à l'accueil. Aucune installation nécessaire." },
              { n: '2', t: 'Bilan éducatif partagé', d: "5 minutes pour évaluer la situation et le score de départ." },
              { n: '3', t: '21 jours de programme', d: "Un contenu et un exercice par jour. Check-in quotidien." },
              { n: '4', t: 'Bilan de fin de cure', d: "Comparaison avant/après, plan post-cure, PDF téléchargeable." },
              { n: '5', t: 'Suivi post-cure 12 semaines', d: "Bilan hebdomadaire de 2 minutes. Rappels par email." },
            ].map(({ n, t, d }) => (
              <div key={n} className="flex gap-4 items-start">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                  {n}
                </span>
                <div>
                  <p className="font-semibold text-foreground">{t}</p>
                  <p className="text-sm text-muted-foreground">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Pour les ARS</h2>
          <div className="p-5 rounded-xl bg-muted/30 border space-y-3">
            <p className="text-foreground">Conçu pour répondre aux exigences de déclaration ETP :</p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-2"><span className="text-primary font-bold">•</span> Bilan éducatif partagé (BEP) numérique intégré</li>
              <li className="flex gap-2"><span className="text-primary font-bold">•</span> Questionnaires PRO validés (EVA, KOOS-PS)</li>
              <li className="flex gap-2"><span className="text-primary font-bold">•</span> Outcomes mesurables T0, T1, T2, T3</li>
              <li className="flex gap-2"><span className="text-primary font-bold">•</span> Export CSV anonymisé pour le dossier ARS</li>
              <li className="flex gap-2"><span className="text-primary font-bold">•</span> Dashboard statistiques agrégées</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Pour les stations thermales</h2>
          <div className="p-5 rounded-xl bg-muted/30 border space-y-3">
            <p className="text-foreground">Intégration simple, sans coût pour l'établissement :</p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-2"><span className="text-primary font-bold">•</span> QR codes dans les cabines et à l'accueil</li>
              <li className="flex gap-2"><span className="text-primary font-bold">•</span> Aucun logiciel à installer</li>
              <li className="flex gap-2"><span className="text-primary font-bold">•</span> Différenciation marketing</li>
              <li className="flex gap-2"><span className="text-primary font-bold">•</span> Données outcomes pour l'Assurance Maladie</li>
              <li className="flex gap-2"><span className="text-primary font-bold">•</span> Satisfaction curistes mesurable</li>
            </ul>
          </div>
        </section>

        <section className="mb-12 p-6 rounded-xl bg-primary/5 border border-primary/20 text-center">
          <h2 className="font-serif text-xl font-bold text-foreground mb-2">Intéressé par le programme ?</h2>
          <p className="text-muted-foreground mb-4">Dr Audric Bugnard — Médecin thermaliste à Aix-les-Bains</p>
          <a href="mailto:contact@etuve.fr">
            <Button size="lg" className="gap-2">
              Nous contacter <ArrowRight className="w-5 h-5" />
            </Button>
          </a>
        </section>

        <FaqSection items={FAQ_GENERAL} />

        <p className="text-center text-xs text-muted-foreground mt-12">
          Information éducative — ne remplace pas un avis médical. Urgence : 15 / 112
        </p>
      </div>
    </Layout>
  );
};

export default ProPage;
