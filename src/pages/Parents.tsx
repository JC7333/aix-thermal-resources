import { Link } from 'react-router-dom';
import { Baby, Thermometer, Ear, HeartPulse, Download, ChevronRight, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { MedicalDisclaimer } from '@/components/shared/MedicalDisclaimer';
import { pathologies } from '@/data/pathologies';

const parentTopics = [
  {
    id: 'angines',
    title: 'Angines à répétition',
    slug: 'angines-repetition-enfant',
    description: 'Comprendre, soulager et prévenir les angines fréquentes.',
    icon: Thermometer,
    quickTips: [
      'Aérer la chambre 10 minutes chaque jour',
      'Lavage de nez au sérum physiologique',
      'Éviter le tabagisme passif',
      'Humidifier l\'air si trop sec',
    ],
  },
  {
    id: 'otites',
    title: 'Otites à répétition',
    slug: 'otites-repetition-enfant',
    description: 'Prévenir et accompagner les otites fréquentes chez l\'enfant.',
    icon: Ear,
    quickTips: [
      'Moucher régulièrement l\'enfant',
      'Position surélevée pour dormir',
      'Éviter la tétine après 6 mois',
      'Allaitement maternel protecteur',
    ],
  },
  {
    id: 'rhinopharyngites',
    title: 'Rhino-pharyngites',
    slug: 'rhinopharyngite-enfant',
    description: 'Le rhume de l\'enfant : quand s\'inquiéter, comment soulager.',
    icon: HeartPulse,
    quickTips: [
      'Lavages de nez fréquents',
      'Hydratation (eau, bouillon)',
      'Mouchoirs à usage unique',
      'Repos et patience',
    ],
  },
];

const alertSigns = [
  'Fièvre élevée (> 39°C) qui persiste plus de 48h',
  'Difficultés à respirer, respiration rapide',
  'Refus de boire ou de manger',
  'Enfant très fatigué, difficile à réveiller',
  'Douleur d\'oreille intense avec écoulement',
  'Éruption cutanée associée',
];

const Parents = () => {
  const childPathologies = pathologies.filter(p => p.audience === 'enfant');

  const handleDownloadPDF = () => {
    alert('Téléchargement du guide parents - PDF à venir');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <Breadcrumb
          items={[
            { label: 'Espace Parents' },
          ]}
        />

        {/* Hero */}
        <header className="mb-10 lg:mb-14">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center">
              <Baby className="w-8 h-8 text-secondary" />
            </div>
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                Espace Parents
              </h1>
              <p className="text-muted-foreground">
                ORL enfant : angines, otites, rhino-pharyngites
              </p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Votre enfant a souvent mal à la gorge, aux oreilles, le nez qui coule ? 
            Retrouvez ici des conseils simples et pratiques pour le soulager au quotidien et savoir quand consulter.
          </p>
        </header>

        {/* Quick FAQ */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
            Les 3 problèmes les plus fréquents
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {parentTopics.map((topic) => {
              const pathology = pathologies.find(p => p.slug === topic.slug);
              return (
                <div key={topic.id} className="card-medical flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                      <topic.icon className="w-6 h-6 text-secondary" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-foreground">
                      {topic.title}
                    </h3>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4">
                    {topic.description}
                  </p>

                  <div className="mb-4 flex-grow">
                    <p className="text-xs font-semibold text-foreground mb-2">Conseils rapides :</p>
                    <ul className="space-y-1">
                      {topic.quickTips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <span className="text-secondary mt-1">✓</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {pathology && (
                    <Link
                      to={`/pathologies/${topic.slug}`}
                      className="flex items-center gap-2 text-primary font-medium text-sm hover:underline"
                    >
                      Voir la fiche complète
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Alert Signs */}
        <section className="mb-12">
          <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6 lg:p-8">
            <h2 className="font-serif text-xl font-bold text-foreground mb-4 flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-destructive" />
              Quand consulter rapidement ?
            </h2>
            <p className="text-muted-foreground mb-4">
              Consultez votre médecin ou les urgences si votre enfant présente :
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {alertSigns.map((sign, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-destructive font-bold">!</span>
                  <span className="text-foreground text-sm">{sign}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Download CTA */}
        <section className="mb-12">
          <div className="card-medical bg-secondary/5 border-secondary/20 text-center">
            <h2 className="font-serif text-xl font-bold text-foreground mb-3">
              Guide parents à imprimer
            </h2>
            <p className="text-muted-foreground mb-4 max-w-xl mx-auto">
              Téléchargez le guide complet avec tous les conseils pratiques, 
              les signaux d'alerte et les gestes du quotidien.
            </p>
            <Button onClick={handleDownloadPDF} variant="pdf" size="lg">
              <Download className="w-5 h-5" />
              Télécharger le guide PDF
            </Button>
          </div>
        </section>

        {/* Fiches pathologies enfant */}
        {childPathologies.length > 0 && (
          <section>
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
              Toutes les fiches enfant
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {childPathologies.map((pathology) => (
                <Link
                  key={pathology.id}
                  to={`/pathologies/${pathology.slug}`}
                  className="card-medical flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center shrink-0">
                    <Baby className="w-5 h-5 text-secondary" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {pathology.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {pathology.readingTime} min de lecture
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-10">
          <MedicalDisclaimer variant="inline" />
        </div>
      </div>
    </Layout>
  );
};

export default Parents;
