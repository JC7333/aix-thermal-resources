import { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Printer, Check, Activity, Scale, Cigarette, Wind, Heart, Baby, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { logEvent } from '@/services/analytics';

type Objective = 'douleur' | 'poids' | 'tabac' | 'souffle' | 'jambes' | 'orl-enfant' | 'bouche';
type Level = 0 | 1 | 2 | 3;

interface ObjectiveOption {
  id: Objective;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const objectives: ObjectiveOption[] = [
  { id: 'douleur', label: 'Douleurs articulaires', description: 'Arthrose, dos, articulations', icon: <Activity className="w-6 h-6" /> },
  { id: 'poids', label: 'Gestion du poids', description: 'Perdre du poids, mieux manger', icon: <Scale className="w-6 h-6" /> },
  { id: 'tabac', label: 'Arrêter le tabac', description: 'Sevrage tabagique', icon: <Cigarette className="w-6 h-6" /> },
  { id: 'souffle', label: 'Problèmes respiratoires', description: 'Asthme, BPCO, essoufflement', icon: <Wind className="w-6 h-6" /> },
  { id: 'jambes', label: 'Jambes lourdes', description: 'Circulation, varices, gonflements', icon: <Heart className="w-6 h-6" /> },
  { id: 'orl-enfant', label: 'ORL enfant', description: 'Angines, otites à répétition', icon: <Baby className="w-6 h-6" /> },
  { id: 'bouche', label: 'Problèmes buccaux', description: 'Bouche sèche, gencives, aphtes', icon: <Smile className="w-6 h-6" /> },
];

const levelDescriptions = [
  { level: 0, label: 'Mobilité très limitée', description: 'Je peux à peine bouger, marcher est difficile' },
  { level: 1, label: 'Mobilité limitée', description: 'Je peux marcher un peu, mais je me fatigue vite' },
  { level: 2, label: 'Mobilité correcte', description: 'Je peux marcher 15-30 min sans trop de difficulté' },
  { level: 3, label: 'Bonne mobilité', description: 'Je suis relativement actif(ve)' },
];

const getActionsForObjective = (objective: Objective, level: Level): { today: string[]; weekPlan: string[] } => {
  const plans: Record<Objective, { today: string[]; weekPlan: string[] }> = {
    douleur: {
      today: [
        level >= 2 ? 'Marchez 15 minutes à votre rythme' : 'Faites 5 minutes de mouvements doux sur chaise',
        'Appliquez une compresse chaude sur la zone douloureuse (15 min)',
        'Buvez 6 verres d\'eau dans la journée',
        'Faites 3 respirations profondes, 3 fois dans la journée',
        'Notez votre douleur ce soir (échelle 0-10)',
      ],
      weekPlan: [
        `Jour 1-2 : ${level >= 2 ? 'Marche 15 min' : 'Mouvements sur chaise 5 min'} + chaleur locale`,
        'Jour 3-4 : Ajoutez 1 exercice d\'étirement doux (voir fiches)',
        'Jour 5-6 : Augmentez légèrement la durée de marche ou d\'exercice',
        'Jour 7 : Jour de repos actif (mouvements légers uniquement)',
      ],
    },
    poids: {
      today: [
        'Prenez un petit-déjeuner avec des protéines (œuf, fromage blanc)',
        'Ajoutez un légume supplémentaire à votre repas principal',
        'Buvez un grand verre d\'eau avant chaque repas',
        level >= 1 ? 'Marchez 10-15 minutes après un repas' : 'Faites quelques pas dans votre logement après manger',
        'Couchez-vous 30 minutes plus tôt ce soir',
      ],
      weekPlan: [
        'Jour 1-2 : Focus hydratation (6-8 verres d\'eau par jour)',
        'Jour 3-4 : Réduisez les portions de féculents d\'1/4',
        'Jour 5-6 : Ajoutez une portion de légumes à chaque repas',
        'Jour 7 : Faites le point : qu\'est-ce qui a été facile ? Difficile ?',
      ],
    },
    tabac: {
      today: [
        'Notez vos 3 situations où vous fumez le plus',
        'Buvez un grand verre d\'eau à chaque envie de cigarette',
        'Faites une activité de 5 minutes quand l\'envie arrive (marcher, respirer)',
        'Retardez de 10 minutes votre première cigarette de la journée',
        'Appelez Tabac Info Service (3989) pour un premier conseil',
      ],
      weekPlan: [
        'Jour 1-2 : Observez vos habitudes sans chercher à changer',
        'Jour 3-4 : Supprimez 1 cigarette "automatique" (celle qu\'on fume sans y penser)',
        'Jour 5-6 : Remplacez 2 cigarettes par une activité de substitution',
        'Jour 7 : Faites le point et envisagez un accompagnement (tabacologue, Tabac Info Service)',
      ],
    },
    souffle: {
      today: [
        'Pratiquez 3 séances de respiration abdominale (2 min chacune)',
        'Aérez votre logement 10 minutes, même en hiver',
        level >= 1 ? 'Marchez 10 minutes à allure lente' : 'Faites quelques pas dans votre logement',
        'Évitez les parfums et sprays aujourd\'hui',
        'Notez vos symptômes respiratoires ce soir',
      ],
      weekPlan: [
        'Jour 1-2 : Focus respiration (3 séances/jour de respiration lente)',
        'Jour 3-4 : Nettoyez une pièce en profondeur (poussière, acariens)',
        'Jour 5-6 : Augmentez doucement l\'activité physique',
        'Jour 7 : Évaluez : avez-vous moins de symptômes ?',
      ],
    },
    jambes: {
      today: [
        'Surélevez vos jambes 15 minutes (2 fois dans la journée)',
        'Faites 20 flexions-extensions des pieds assis(e)',
        'Terminez votre douche par un jet d\'eau fraîche sur les mollets',
        level >= 1 ? 'Marchez 15-20 minutes' : 'Marchez 5 minutes dans votre logement',
        'Portez des chaussettes ou bas de contention si vous en avez',
      ],
      weekPlan: [
        'Jour 1-2 : Surélévation des jambes 2x15 min/jour',
        'Jour 3-4 : Ajoutez les exercices de flexion des pieds',
        'Jour 5-6 : Eau fraîche + marche quotidienne',
        'Jour 7 : Planifiez l\'achat de bas de contention si besoin',
      ],
    },
    'orl-enfant': {
      today: [
        'Aérez la chambre de votre enfant 10-15 minutes',
        'Faites un lavage de nez au sérum physiologique',
        'Vérifiez que l\'air n\'est pas trop sec (humidificateur si besoin)',
        'Proposez à boire régulièrement (eau, tisane)',
        'Évitez le tabagisme passif dans l\'environnement de l\'enfant',
      ],
      weekPlan: [
        'Jour 1-2 : Lavages de nez quotidiens + aération',
        'Jour 3-4 : Nettoyez les peluches et doudous à 60°C',
        'Jour 5-6 : Réduisez les écrans avant le coucher',
        'Jour 7 : Observez : moins de symptômes cette semaine ?',
      ],
    },
    bouche: {
      today: [
        'Buvez au moins 8 verres d\'eau dans la journée',
        'Évitez les aliments acides ou épicés',
        'Brossez-vous les dents avec une brosse souple',
        'Faites un bain de bouche à l\'eau tiède salée (1 cuillère/verre)',
        'Notez si certains aliments aggravent les symptômes',
      ],
      weekPlan: [
        'Jour 1-2 : Focus hydratation (boire régulièrement)',
        'Jour 3-4 : Identifiez les aliments qui aggravent',
        'Jour 5-6 : Instaurez une routine d\'hygiène buccale douce',
        'Jour 7 : Si symptômes persistants, consultez un dentiste ou professionnel de santé',
      ],
    },
  };

  return plans[objective];
};

const Parcours = () => {
  const [step, setStep] = useState(1);
  const [selectedObjective, setSelectedObjective] = useState<Objective | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);

  // Track wizard start on mount
  useEffect(() => {
    logEvent('wizard_start', '/parcours');
  }, []);

  // Track wizard complete when reaching step 3
  useEffect(() => {
    if (step === 3 && selectedObjective && selectedLevel !== null) {
      logEvent('wizard_complete', '/parcours', { 
        objective: selectedObjective, 
        level: String(selectedLevel) 
      });
    }
  }, [step, selectedObjective, selectedLevel]);

  const handlePrint = () => {
    logEvent('print_click', '/parcours', { objective: selectedObjective || undefined });
    window.print();
  };

  const handleReset = () => {
    setStep(1);
    setSelectedObjective(null);
    setSelectedLevel(null);
    logEvent('wizard_start', '/parcours');
  };

  const selectedObjectiveData = objectives.find(o => o.id === selectedObjective);
  const actions = selectedObjective && selectedLevel !== null 
    ? getActionsForObjective(selectedObjective, selectedLevel) 
    : null;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <Breadcrumb
          items={[
            { label: 'Parcours guidé' },
          ]}
        />

        <div className="max-w-3xl mx-auto">
          {/* Progress indicator */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`flex items-center ${s < 3 ? 'flex-1' : ''}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                    step >= s
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {step > s ? <Check className="w-5 h-5" /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded ${
                      step > s ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Objective */}
          {step === 1 && (
            <div className="animate-fade-in">
              <div className="text-center mb-8">
                <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                  Quel est votre objectif aujourd'hui ?
                </h1>
                <p className="text-muted-foreground text-lg">
                  Je vais vous proposer un plan d'action simple et adapté.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {objectives.map((obj) => (
                  <button
                    key={obj.id}
                    onClick={() => {
                      setSelectedObjective(obj.id);
                      setStep(2);
                    }}
                    className={`p-6 rounded-xl border-2 text-left transition-all hover:shadow-md ${
                      selectedObjective === obj.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        {obj.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{obj.label}</h3>
                        <p className="text-sm text-muted-foreground">{obj.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Level */}
          {step === 2 && (
            <div className="animate-fade-in">
              <div className="text-center mb-8">
                <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                  Quel est votre niveau de mobilité ?
                </h1>
                <p className="text-muted-foreground text-lg">
                  Je vais adapter les conseils à votre capacité actuelle.
                </p>
              </div>

              <div className="space-y-3">
                {levelDescriptions.map((item) => (
                  <button
                    key={item.level}
                    onClick={() => {
                      setSelectedLevel(item.level as Level);
                      setStep(3);
                    }}
                    className={`w-full p-5 rounded-xl border-2 text-left transition-all hover:shadow-md ${
                      selectedLevel === item.level
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">
                        {item.level}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{item.label}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-6">
                <Button variant="ghost" onClick={() => setStep(1)} className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Retour
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Results */}
          {step === 3 && actions && selectedObjectiveData && (
            <div className="animate-fade-in print:animate-none">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-secondary" />
                </div>
                <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                  Votre plan personnalisé
                </h1>
                <p className="text-muted-foreground text-lg">
                  {selectedObjectiveData.label} — Niveau {selectedLevel}
                </p>
              </div>

              {/* Today's actions */}
              <div className="card-medical mb-6">
                <h2 className="font-serif text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  5 actions pour aujourd'hui
                </h2>
                <ul className="space-y-3">
                  {actions.today.map((action, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-foreground">{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 7-day plan */}
              <div className="card-medical mb-6">
                <h2 className="font-serif text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-2xl">📅</span>
                  Plan sur 7 jours
                </h2>
                <ul className="space-y-3">
                  {actions.weekPlan.map((day, index) => (
                    <li key={index} className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                      <span className="text-foreground">{day}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Disclaimer */}
              <div className="bg-muted/50 rounded-lg p-4 mb-6">
                <p className="text-sm text-muted-foreground">
                  <strong>Rappel :</strong> Ces conseils sont généraux et éducatifs. Ils ne remplacent pas un avis médical personnalisé. 
                  Si vos symptômes persistent ou s'aggravent, consultez votre médecin.
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 no-print">
                <Button onClick={handlePrint} variant="pdf" size="lg" className="flex-1">
                  <Printer className="w-5 h-5" />
                  Imprimer mon plan
                </Button>
                <Button onClick={handleReset} variant="outline" size="lg" className="flex-1">
                  <ArrowLeft className="w-5 h-5" />
                  Recommencer
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Parcours;
