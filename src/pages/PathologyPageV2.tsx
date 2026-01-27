// ============================================
// PATHOLOGY PAGE V2 — 7 SECTIONS STANDARDISÉES
// Template Evidence-Based Medicine
// ============================================

import { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { 
  Clock, AlertTriangle, Printer, BookOpen, Shield, 
  ExternalLink, Award, Calendar, ChevronRight, Target, 
  Stethoscope, Droplets, FileText, ChevronDown, ChevronUp,
  Info, Activity, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { MedicalDisclaimer } from '@/components/shared/MedicalDisclaimer';
import { PdfDownloadButtons } from '@/components/shared/PdfDownloadButtons';
import { FavoriteButton } from '@/components/shared/FavoriteButton';
import { getEvidencePackV2BySlug, CATEGORIES } from '@/content/evidence/v2';
import { useSeniorMode } from '@/hooks/useSeniorMode';
import { logEvent } from '@/services/analytics';
import type { EvidencePackV2, Exercise, MedicalProcedure } from '@/content/evidence/v2/types';

// Badge couleur selon niveau de preuve
const evidenceBadgeClass = (level: string) => {
  if (level.toLowerCase().includes('élevé')) return 'bg-green-100 text-green-700 border-green-200';
  if (level.toLowerCase().includes('modéré')) return 'bg-amber-100 text-amber-700 border-amber-200';
  if (level.toLowerCase().includes('faible')) return 'bg-orange-100 text-orange-700 border-orange-200';
  return 'bg-muted text-muted-foreground border-border';
};

// Badge couleur selon position guideline
const guidelineBadgeClass = (position: string) => {
  if (position === 'recommended') return 'bg-green-100 text-green-700';
  if (position === 'conditional') return 'bg-amber-100 text-amber-700';
  if (position === 'controversial') return 'bg-orange-100 text-orange-700';
  return 'bg-red-100 text-red-700';
};

const guidelineLabel = (position: string) => {
  const labels: Record<string, string> = {
    recommended: 'Recommandé',
    conditional: 'Sous conditions',
    controversial: 'Controversé',
    not_recommended: 'Non recommandé',
  };
  return labels[position] || position;
};

// Trouver la catégorie parent
const getCategoryLabel = (category: EvidencePackV2['category']) => {
  const labels: Record<string, string> = {
    'rhumatologie': 'Rhumatologie',
    'veino-lymphatique': 'Veino-lymphatique',
    'respiratoire-orl': 'Respiratoire / ORL',
    'muqueuses-buccales': 'Muqueuses buccales',
  };
  return labels[category] || category;
};

// Composant Section Title
const SectionTitle = ({ 
  icon, 
  title, 
  iconBg = 'bg-primary/10', 
  iconColor = 'text-primary',
  seniorMode = false 
}: { 
  icon: React.ReactNode; 
  title: string; 
  iconBg?: string; 
  iconColor?: string;
  seniorMode?: boolean;
}) => (
  <h2 className={`font-serif font-bold text-foreground flex items-center gap-3 ${seniorMode ? 'text-2xl mb-6' : 'text-xl mb-4'}`}>
    <span className={`rounded-lg flex items-center justify-center ${iconBg} ${iconColor} ${seniorMode ? 'w-12 h-12' : 'w-10 h-10'}`}>
      {icon}
    </span>
    {title}
  </h2>
);

// Composant Exercice Card
const ExerciseCardV2 = ({ exercise, seniorMode }: { exercise: Exercise; seniorMode: boolean }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className={`bg-card border border-border rounded-xl ${seniorMode ? 'p-6' : 'p-4'}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h4 className={`font-semibold text-foreground ${seniorMode ? 'text-lg mb-2' : 'mb-1'}`}>
            {exercise.name}
          </h4>
          <p className={`text-muted-foreground ${seniorMode ? 'text-base' : 'text-sm'}`}>
            {exercise.description}
          </p>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setExpanded(!expanded)}
          className="shrink-0"
        >
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </Button>
      </div>
      
      {expanded && (
        <div className={`mt-4 space-y-4 border-t border-border pt-4`}>
          {/* Niveaux */}
          {exercise.levels.map((level, idx) => (
            <div key={idx} className={`bg-muted/50 rounded-lg ${seniorMode ? 'p-4' : 'p-3'}`}>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className={seniorMode ? 'text-sm' : 'text-xs'}>
                  Niveau {level.level === 0 ? 'Très facile' : level.level === 1 ? 'Facile' : 'Normal'}
                </Badge>
                {level.duration && (
                  <span className={`text-muted-foreground ${seniorMode ? 'text-sm' : 'text-xs'}`}>
                    ⏱️ {level.duration}
                  </span>
                )}
              </div>
              <p className={`text-foreground ${seniorMode ? 'text-base' : 'text-sm'}`}>
                {level.instructions}
              </p>
            </div>
          ))}
          
          {/* Erreurs fréquentes */}
          {exercise.common_errors && exercise.common_errors.length > 0 && (
            <div>
              <h5 className={`font-medium text-amber-700 mb-2 ${seniorMode ? 'text-base' : 'text-sm'}`}>
                ⚠️ Erreurs fréquentes
              </h5>
              <ul className={`space-y-1 ${seniorMode ? 'text-base' : 'text-sm'}`}>
                {exercise.common_errors.map((error, idx) => (
                  <li key={idx} className="text-muted-foreground flex items-start gap-2">
                    <span>•</span> {error}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Stop rules */}
          {exercise.stop_rules && exercise.stop_rules.length > 0 && (
            <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-3">
              <h5 className={`font-medium text-destructive mb-2 ${seniorMode ? 'text-base' : 'text-sm'}`}>
                🛑 Arrêter si
              </h5>
              <ul className={`space-y-1 ${seniorMode ? 'text-base' : 'text-sm'}`}>
                {exercise.stop_rules.map((rule, idx) => (
                  <li key={idx} className="text-destructive flex items-start gap-2">
                    <span>•</span> {rule}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Composant Acte médical
const ProcedureCard = ({ procedure, seniorMode }: { procedure: MedicalProcedure; seniorMode: boolean }) => (
  <div className={`bg-card border border-border rounded-xl ${seniorMode ? 'p-6' : 'p-5'}`}>
    <div className="flex items-start justify-between gap-3 mb-4">
      <h4 className={`font-semibold text-foreground ${seniorMode ? 'text-lg' : ''}`}>
        {procedure.name}
      </h4>
      <Badge className={guidelineBadgeClass(procedure.guideline_position)}>
        {guidelineLabel(procedure.guideline_position)}
      </Badge>
    </div>
    
    <p className={`text-muted-foreground mb-4 ${seniorMode ? 'text-base' : 'text-sm'}`}>
      <strong>Objectif :</strong> {procedure.purpose}
    </p>
    
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="details" className="border-none">
        <AccordionTrigger className={`py-2 ${seniorMode ? 'text-base' : 'text-sm'}`}>
          Voir les détails
        </AccordionTrigger>
        <AccordionContent>
          <div className={`space-y-4 ${seniorMode ? 'text-base' : 'text-sm'}`}>
            {/* Indications */}
            <div>
              <h5 className="font-medium text-foreground mb-1">Pour qui ?</h5>
              <ul className="space-y-1 text-muted-foreground">
                {procedure.indications.map((ind, idx) => (
                  <li key={idx}>• {ind}</li>
                ))}
              </ul>
            </div>
            
            {/* Bénéfices */}
            <div>
              <h5 className="font-medium text-green-700 mb-1">✓ Bénéfices attendus</h5>
              <ul className="space-y-1 text-muted-foreground">
                {procedure.benefits.map((b, idx) => (
                  <li key={idx}>• {b}</li>
                ))}
              </ul>
            </div>
            
            {/* Limites */}
            <div>
              <h5 className="font-medium text-amber-700 mb-1">⚠️ Limites</h5>
              <ul className="space-y-1 text-muted-foreground">
                {procedure.limitations.map((l, idx) => (
                  <li key={idx}>• {l}</li>
                ))}
              </ul>
            </div>
            
            {/* Risques */}
            <div>
              <h5 className="font-medium text-destructive mb-1">⚡ Risques</h5>
              <ul className="space-y-1 text-muted-foreground">
                {procedure.risks.map((r, idx) => (
                  <li key={idx}>• {r}</li>
                ))}
              </ul>
            </div>
            
            {/* Position guideline */}
            <div className="bg-primary/5 rounded-lg p-3 border border-primary/20">
              <h5 className="font-medium text-primary mb-1">📋 Ce que disent les recommandations</h5>
              <p className="text-muted-foreground">{procedure.guideline_summary}</p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
);

// Page principale
const PathologyPageV2 = () => {
  const { slug } = useParams<{ slug: string }>();
  const { seniorMode, titleClass, subtitleClass, textClass, smallTextClass, buttonSize, iconSize, iconSizeLg, cardClass, cardPadding, badgeClass } = useSeniorMode();
  
  const pack = slug ? getEvidencePackV2BySlug(slug) : undefined;
  
  useEffect(() => {
    if (slug) {
      logEvent('page_view', `/pathologies/${slug}`, { slug, version: 'v2' });
    }
  }, [slug]);
  
  if (!pack) {
    return <Navigate to="/pathologies" replace />;
  }
  
  // Si c'est un stub, afficher un message approprié
  if (pack.status === 'stub') {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb
            items={[
              { label: 'Pathologies', href: '/pathologies' },
              { label: getCategoryLabel(pack.category) },
              { label: pack.title },
            ]}
          />
          <div className="max-w-2xl mx-auto text-center py-16">
            <span className="text-6xl mb-6 block">{pack.icon}</span>
            <h1 className={`${titleClass} mb-4`}>{pack.title}</h1>
            <p className={`${textClass} text-muted-foreground mb-6`}>
              {pack.definition.summary}
            </p>
            <Badge variant="secondary" className="text-sm">
              Fiche en cours de rédaction
            </Badge>
            <p className={`${smallTextClass} text-muted-foreground mt-4`}>
              Cette fiche sera complétée prochainement avec des informations validées par des sources médicales de référence.
            </p>
            <Link to="/pathologies">
              <Button className="mt-6">← Retour aux pathologies</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
  
  const handlePrint = () => {
    logEvent('print_click', `/pathologies/${slug}`, { slug: slug || '' });
    window.print();
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 lg:py-8">
        {/* Breadcrumb */}
        <div className="no-print">
          <Breadcrumb
            items={[
              { label: 'Pathologies', href: '/pathologies' },
              { label: getCategoryLabel(pack.category) },
              { label: pack.title },
            ]}
          />
        </div>
        
        {/* Header */}
        <header className={seniorMode ? 'mb-10' : 'mb-8'}>
          <div className="flex flex-wrap items-center gap-3 mb-4 no-print">
            <Badge variant="outline" className={badgeClass}>
              {getCategoryLabel(pack.category)}
            </Badge>
            <Badge className="bg-green-100 text-green-700 border-green-200">
              <Shield className="w-3 h-3 mr-1" />
              Evidence-based
            </Badge>
            <span className={`text-muted-foreground ${smallTextClass}`}>
              Mis à jour : {pack.updated_at}
            </span>
          </div>
          
          <div className="flex items-start gap-4 mb-4">
            <span className={seniorMode ? 'text-5xl' : 'text-4xl'}>{pack.icon}</span>
            <h1 className={titleClass}>{pack.title}</h1>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 no-print">
            <Button onClick={handlePrint} variant="pdf" size={buttonSize}>
              <Printer className={iconSize} />
              Imprimer
            </Button>
            {slug && <PdfDownloadButtons slug={slug} />}
            {slug && <FavoriteButton slug={slug} />}
          </div>
        </header>
        
        {/* Contenu principal */}
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12`}>
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Section 1: Comprendre */}
            <section id="comprendre">
              <SectionTitle 
                icon={<Info className={iconSizeLg} />} 
                title="Comprendre" 
                iconBg="bg-blue-100" 
                iconColor="text-blue-700"
                seniorMode={seniorMode}
              />
              <div className={`bg-blue-50 border border-blue-200 rounded-xl ${seniorMode ? 'p-8' : 'p-6'}`}>
                <p className={`${textClass} text-foreground leading-relaxed whitespace-pre-line`}>
                  {pack.definition.summary}
                </p>
                {pack.definition.key_points && pack.definition.key_points.length > 0 && (
                  <ul className={`mt-4 space-y-2 ${seniorMode ? 'text-base' : 'text-sm'}`}>
                    {pack.definition.key_points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-blue-800">
                        <span className="text-blue-500">→</span> {point}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
            
            {/* Section 2: Agir (Recommandations) */}
            {pack.recommendations.length > 0 && (
              <section id="agir">
                <SectionTitle 
                  icon={<Award className={iconSizeLg} />} 
                  title="Ce qui aide vraiment" 
                  iconBg="bg-green-100" 
                  iconColor="text-green-700"
                  seniorMode={seniorMode}
                />
                <div className={seniorMode ? 'space-y-4' : 'space-y-3'}>
                  {pack.recommendations.map((rec, idx) => (
                    <div key={idx} className={`flex items-start gap-4 bg-card border border-border rounded-xl ${seniorMode ? 'p-5' : 'p-4'}`}>
                      <div className={`rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold shrink-0 ${seniorMode ? 'w-10 h-10 text-base' : 'w-8 h-8 text-sm'}`}>
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <p className={`${textClass} text-foreground mb-2`}>{rec.text}</p>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge className={evidenceBadgeClass(rec.level)}>
                            {rec.level}
                          </Badge>
                          {rec.tags?.map((tag, tidx) => (
                            <Badge key={tidx} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
            
            {/* Section 3: Exercices */}
            {pack.exercises.length > 0 && (
              <section id="exercices">
                <SectionTitle 
                  icon={<Activity className={iconSizeLg} />} 
                  title="Exercices à faire chez soi" 
                  iconBg="bg-secondary/20" 
                  iconColor="text-secondary"
                  seniorMode={seniorMode}
                />
                <div className={seniorMode ? 'space-y-4' : 'space-y-3'}>
                  {pack.exercises.map((exercise) => (
                    <ExerciseCardV2 key={exercise.id} exercise={exercise} seniorMode={seniorMode} />
                  ))}
                </div>
              </section>
            )}
            
            {/* Section 4: Parcours guidé */}
            {(pack.seven_day_plan.length > 0 || pack.four_week_plan.length > 0) && (
              <section id="parcours">
                <SectionTitle 
                  icon={<Calendar className={iconSizeLg} />} 
                  title="Parcours guidé" 
                  iconBg="bg-primary/10" 
                  iconColor="text-primary"
                  seniorMode={seniorMode}
                />
                
                <Tabs defaultValue="7jours" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="7jours">Plan 7 jours</TabsTrigger>
                    <TabsTrigger value="4semaines">Plan 4 semaines</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="7jours">
                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4`}>
                      {pack.seven_day_plan.map((day) => (
                        <div key={day.day} className={`bg-card border border-border rounded-xl ${seniorMode ? 'p-5' : 'p-4'}`}>
                          <h4 className={`font-semibold text-foreground mb-3 flex items-center gap-2 ${seniorMode ? 'text-lg' : ''}`}>
                            <span className={`rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold ${seniorMode ? 'w-8 h-8 text-sm' : 'w-6 h-6 text-xs'}`}>
                              {day.day}
                            </span>
                            {day.title}
                          </h4>
                          <ul className={`space-y-2 ${seniorMode ? 'text-base' : 'text-sm'}`}>
                            {day.actions.map((action, aidx) => (
                              <li key={aidx} className="flex items-start gap-2 text-muted-foreground">
                                <span className="text-primary">☐</span> {action}
                              </li>
                            ))}
                          </ul>
                          {day.tips && (
                            <p className={`mt-3 text-primary bg-primary/5 rounded-lg p-2 ${smallTextClass}`}>
                              💡 {day.tips}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="4semaines">
                    <div className={`space-y-4`}>
                      {pack.four_week_plan.map((week) => (
                        <div key={week.week} className={`bg-card border border-border rounded-xl ${seniorMode ? 'p-5' : 'p-4'}`}>
                          <div className="flex items-center gap-3 mb-3">
                            <span className={`rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold ${seniorMode ? 'w-10 h-10' : 'w-8 h-8'}`}>
                              S{week.week}
                            </span>
                            <div>
                              <h4 className={`font-semibold text-foreground ${seniorMode ? 'text-lg' : ''}`}>
                                Semaine {week.week}
                              </h4>
                              <p className={`text-primary ${smallTextClass}`}>Focus : {week.focus}</p>
                            </div>
                          </div>
                          <ul className={`space-y-1 ${seniorMode ? 'text-base' : 'text-sm'}`}>
                            {week.goals.map((goal, gidx) => (
                              <li key={gidx} className="flex items-start gap-2 text-muted-foreground">
                                <span className="text-green-600">✓</span> {goal}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </section>
            )}
            
            {/* Section 5: Actes médicaux */}
            {pack.medical_procedures.length > 0 && (
              <section id="actes">
                <SectionTitle 
                  icon={<Stethoscope className={iconSizeLg} />} 
                  title="Actes et traitements" 
                  iconBg="bg-purple-100" 
                  iconColor="text-purple-700"
                  seniorMode={seniorMode}
                />
                <p className={`text-muted-foreground mb-4 ${smallTextClass}`}>
                  Informations éducatives sur les traitements possibles. Discutez avec votre médecin pour savoir s'ils sont adaptés à votre situation.
                </p>
                <div className={seniorMode ? 'space-y-4' : 'space-y-3'}>
                  {pack.medical_procedures.map((procedure) => (
                    <ProcedureCard key={procedure.id} procedure={procedure} seniorMode={seniorMode} />
                  ))}
                </div>
              </section>
            )}
            
            {/* Section 6: Cure thermale */}
            {pack.thermal_evidence && (
              <section id="thermal">
                <SectionTitle 
                  icon={<Droplets className={iconSizeLg} />} 
                  title="Cure thermale : que dit la science ?" 
                  iconBg="bg-cyan-100" 
                  iconColor="text-cyan-700"
                  seniorMode={seniorMode}
                />
                <div className={`bg-cyan-50 border border-cyan-200 rounded-xl ${seniorMode ? 'p-6' : 'p-5'}`}>
                  <p className={`${textClass} text-foreground mb-4`}>
                    {pack.thermal_evidence.summary}
                  </p>
                  
                  {pack.thermal_evidence.key_results.length > 0 && (
                    <div className="mb-4">
                      <h4 className={`font-medium text-cyan-800 mb-2 ${seniorMode ? 'text-base' : 'text-sm'}`}>
                        📊 Résultats clés
                      </h4>
                      <ul className={`space-y-1 ${seniorMode ? 'text-base' : 'text-sm'}`}>
                        {pack.thermal_evidence.key_results.map((result, idx) => (
                          <li key={idx} className="text-cyan-900 flex items-start gap-2">
                            <span>•</span> {result}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {pack.thermal_evidence.duration_recommended && (
                    <p className={`text-cyan-800 mb-4 ${smallTextClass}`}>
                      ⏱️ Durée recommandée : {pack.thermal_evidence.duration_recommended}
                    </p>
                  )}
                  
                  {pack.thermal_evidence.limitations.length > 0 && (
                    <div className="bg-white/50 rounded-lg p-3">
                      <h4 className={`font-medium text-amber-700 mb-2 ${seniorMode ? 'text-base' : 'text-sm'}`}>
                        ⚠️ Limites
                      </h4>
                      <ul className={`space-y-1 text-muted-foreground ${smallTextClass}`}>
                        {pack.thermal_evidence.limitations.map((limit, idx) => (
                          <li key={idx}>• {limit}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>
          
          {/* Sidebar */}
          <aside className={`space-y-6 ${seniorMode ? 'lg:sticky lg:top-24' : 'lg:sticky lg:top-20'}`}>
            {/* Red Flags */}
            {pack.red_flags.length > 0 && (
              <div className={`${cardClass} bg-destructive/5 border-destructive/20 ${cardPadding}`}>
                <h3 className={`font-serif font-bold text-destructive mb-4 flex items-center gap-2 ${seniorMode ? 'text-xl' : 'text-lg'}`}>
                  <AlertTriangle className={iconSize} />
                  Quand consulter rapidement
                </h3>
                <ul className={seniorMode ? 'space-y-3' : 'space-y-2'}>
                  {pack.red_flags.map((flag, idx) => (
                    <li key={idx} className={`flex items-start gap-2 text-destructive ${seniorMode ? 'text-base' : 'text-sm'}`}>
                      <span className="font-bold">
                        {flag.urgency === 'immediate' ? '🚨' : flag.urgency === 'rapid' ? '⚠️' : '📋'}
                      </span>
                      {flag.text}
                    </li>
                  ))}
                </ul>
                <p className={`mt-4 text-muted-foreground ${smallTextClass}`}>
                  En cas d'urgence : 15 / 112
                </p>
              </div>
            )}
            
            {/* Sources */}
            {pack.sources.length > 0 && (
              <div className={`${cardClass} ${cardPadding}`}>
                <h3 className={`font-serif font-bold text-foreground mb-4 flex items-center gap-2 ${seniorMode ? 'text-xl' : 'text-lg'}`}>
                  <FileText className={iconSize} />
                  Sources
                </h3>
                <ul className={`space-y-3 ${smallTextClass}`}>
                  {pack.sources.map((source, idx) => (
                    <li key={idx} className="text-muted-foreground">
                      <span className="font-medium text-foreground">{source.org}</span>
                      <span className="text-muted-foreground"> ({source.year})</span>
                      <br />
                      <span className="text-sm">{source.title}</span>
                      {source.url && (
                        <a 
                          href={source.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center gap-1 mt-1"
                        >
                          <ExternalLink className="w-3 h-3" /> Consulter
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* PDF */}
            {slug && <PdfDownloadButtons slug={slug} variant="card" />}
            
            {/* Navigation */}
            <div className={`${cardClass} ${cardPadding}`}>
              <h3 className={`font-serif font-bold text-foreground mb-4 ${seniorMode ? 'text-xl' : 'text-lg'}`}>
                Sur cette page
              </h3>
              <nav className={`space-y-2 ${seniorMode ? 'text-base' : 'text-sm'}`}>
                <a href="#comprendre" className="block text-muted-foreground hover:text-primary">→ Comprendre</a>
                {pack.recommendations.length > 0 && (
                  <a href="#agir" className="block text-muted-foreground hover:text-primary">→ Ce qui aide vraiment</a>
                )}
                {pack.exercises.length > 0 && (
                  <a href="#exercices" className="block text-muted-foreground hover:text-primary">→ Exercices</a>
                )}
                {(pack.seven_day_plan.length > 0 || pack.four_week_plan.length > 0) && (
                  <a href="#parcours" className="block text-muted-foreground hover:text-primary">→ Parcours guidé</a>
                )}
                {pack.medical_procedures.length > 0 && (
                  <a href="#actes" className="block text-muted-foreground hover:text-primary">→ Actes médicaux</a>
                )}
                {pack.thermal_evidence && (
                  <a href="#thermal" className="block text-muted-foreground hover:text-primary">→ Cure thermale</a>
                )}
              </nav>
            </div>
            
            {/* Disclaimer */}
            <MedicalDisclaimer variant="compact" />
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default PathologyPageV2;
