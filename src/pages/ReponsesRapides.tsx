import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Printer, CheckCircle, AlertTriangle, ChevronRight, Clock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { MedicalDisclaimer } from '@/components/shared/MedicalDisclaimer';
import { useSeniorMode } from '@/hooks/useSeniorMode';
import { fullQuickAnswers, getQuickAnswerBySlug, FullQuickAnswer } from '@/data/quick-answers';
import { logEvent } from '@/services/analytics';

// Card component for the list view
const QuickAnswerCard = ({ answer, seniorMode }: { answer: FullQuickAnswer; seniorMode: boolean }) => {
  const colorClasses = {
    primary: 'border-primary/30 hover:border-primary bg-primary/5 hover:bg-primary/10',
    secondary: 'border-secondary/30 hover:border-secondary bg-secondary/5 hover:bg-secondary/10',
    accent: 'border-accent/30 hover:border-accent bg-accent/5 hover:bg-accent/10',
    destructive: 'border-destructive/30 hover:border-destructive bg-destructive/5 hover:bg-destructive/10',
  };

  return (
    <Link 
      to={`/reponses-rapides/${answer.slug}`}
      onClick={() => logEvent('quick_answer_click', `/reponses-rapides/${answer.slug}`, { title: answer.title })}
      className={`flex items-center gap-4 rounded-2xl border-2 transition-all ${colorClasses[answer.color]} group ${seniorMode ? 'p-8' : 'p-6'}`}
    >
      <span className={seniorMode ? 'text-5xl' : 'text-4xl'}>{answer.icon}</span>
      <div className="flex-1 min-w-0">
        <h2 className={`font-serif font-bold text-foreground group-hover:text-primary transition-colors ${seniorMode ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'}`}>
          {answer.title}
        </h2>
        <p className={`text-muted-foreground mt-1 ${seniorMode ? 'text-base' : 'text-sm'}`}>{answer.subtitle}</p>
      </div>
      <ChevronRight className={`text-muted-foreground group-hover:text-primary transition-colors shrink-0 ${seniorMode ? 'w-8 h-8' : 'w-6 h-6'}`} />
    </Link>
  );
};

// List view component
const QuickAnswersList = () => {
  const { seniorMode, titleClass, textClass, gridCols2 } = useSeniorMode();
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <Breadcrumb items={[{ label: 'Réponses rapides' }]} />

        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto ${seniorMode ? 'mb-10' : 'mb-8'}`}>
          <div className={`flex items-center justify-center gap-2 text-primary ${seniorMode ? 'mb-6' : 'mb-4'}`}>
            <Zap className={seniorMode ? 'w-8 h-8' : 'w-6 h-6'} />
            <span className={`font-semibold uppercase tracking-wide ${seniorMode ? 'text-base' : 'text-sm'}`}>Réponses en 20 secondes</span>
          </div>
          <h1 className={titleClass + ' text-center'}>
            Réponses rapides
          </h1>
          <p className={textClass}>
            Des réponses concrètes à vos questions les plus fréquentes. 
            3 vérités, un plan du jour, un plan 7 jours. Simple et actionnable.
          </p>
        </div>

        {/* Cards grid */}
        <div className={`max-w-4xl mx-auto ${seniorMode ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' : 'grid grid-cols-1 md:grid-cols-2 gap-4'}`}>
          {fullQuickAnswers.map((answer) => (
            <QuickAnswerCard key={answer.id} answer={answer} seniorMode={seniorMode} />
          ))}
        </div>

        {/* Info Box */}
        <section className={`mt-12 bg-muted/50 rounded-2xl text-center max-w-3xl mx-auto ${seniorMode ? 'p-10' : 'p-8'}`}>
          <h2 className={`font-serif font-bold text-foreground ${seniorMode ? 'text-2xl mb-4' : 'text-xl mb-3'}`}>
            Ces fiches sont un point de départ
          </h2>
          <p className={`text-muted-foreground ${seniorMode ? 'text-lg' : ''}`}>
            Elles ne remplacent pas un avis médical personnalisé. Si vos symptômes persistent, 
            s'aggravent ou vous inquiètent, consultez un professionnel de santé.
          </p>
        </section>
      </div>
    </Layout>
  );
};

// Detail view component
const QuickAnswerDetail = ({ answer }: { answer: FullQuickAnswer }) => {
  const { seniorMode, titleClass, textClass, buttonSize, iconSize, smallTextClass, subtitleClass } = useSeniorMode();
  
  const handlePrint = () => {
    logEvent('print_click', `/reponses-rapides/${answer.slug}`, { title: answer.title });
    window.print();
  };

  const colorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
    destructive: 'text-destructive',
  };

  const bgClasses = {
    primary: 'bg-primary/10 border-primary/20',
    secondary: 'bg-secondary/10 border-secondary/20',
    accent: 'bg-accent/10 border-accent/20',
    destructive: 'bg-destructive/10 border-destructive/20',
  };

  return (
    <Layout>
      <article className="container mx-auto px-4 py-6 lg:py-8 max-w-4xl">
        <Breadcrumb items={[
          { label: 'Réponses rapides', href: '/reponses-rapides' },
          { label: answer.title }
        ]} />

        {/* Header */}
        <header className={seniorMode ? 'mb-10' : 'mb-8'}>
          <Link 
            to="/reponses-rapides" 
            className={`inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors ${seniorMode ? 'text-lg' : ''}`}
          >
            <ArrowLeft className={iconSize} />
            Retour aux réponses rapides
          </Link>
          
          <div className={`flex items-center gap-4 ${colorClasses[answer.color]} ${seniorMode ? 'mb-6' : 'mb-4'}`}>
            <span className={seniorMode ? 'text-6xl' : 'text-5xl'}>{answer.icon}</span>
            <div>
              <h1 className={`font-serif font-bold text-foreground ${seniorMode ? 'text-3xl md:text-4xl lg:text-5xl' : 'text-2xl md:text-3xl lg:text-4xl'}`}>
                {answer.title}
              </h1>
              <p className={`text-muted-foreground mt-1 ${seniorMode ? 'text-lg' : ''}`}>{answer.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <span className={`flex items-center gap-2 text-muted-foreground ${seniorMode ? 'text-base' : 'text-sm'}`}>
              <Clock className={iconSize} />
              Lecture : 2 min
            </span>
            <Button variant="outline" size={buttonSize} onClick={handlePrint} className="no-print">
              <Printer className={iconSize} />
              Imprimer
            </Button>
          </div>
        </header>

        <MedicalDisclaimer />

        {/* Intro */}
        <section className={`rounded-xl border ${bgClasses[answer.color]} ${seniorMode ? 'p-8 mb-10' : 'p-6 mb-8'}`}>
          <p className={`text-foreground leading-relaxed ${seniorMode ? 'text-xl' : ''}`}>
            {answer.intro}
          </p>
        </section>

        {/* 3 Vérités */}
        <section className={seniorMode ? 'mb-12' : 'mb-10'}>
          <h2 className={`font-serif font-bold text-foreground flex items-center gap-2 ${seniorMode ? 'text-3xl mb-8' : 'text-2xl mb-6'}`}>
            <span className={seniorMode ? 'text-3xl' : 'text-2xl'}>💡</span>
            3 vérités à connaître
          </h2>
          <div className={seniorMode ? 'space-y-5' : 'space-y-4'}>
            {answer.truths.map((truth, index) => (
              <div key={index} className={`card-medical ${seniorMode ? 'p-6' : ''}`}>
                <p className={`text-muted-foreground italic mb-2 ${seniorMode ? 'text-lg' : ''}`}>{truth.myth}</p>
                <p className={`text-foreground font-medium flex items-start gap-2 ${seniorMode ? 'text-lg' : ''}`}>
                  <CheckCircle className={`text-primary shrink-0 mt-0.5 ${seniorMode ? 'w-6 h-6' : 'w-5 h-5'}`} />
                  <span>{truth.truth}</span>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Plan du jour */}
        <section className={seniorMode ? 'mb-12' : 'mb-10'}>
          <h2 className={`font-serif font-bold text-foreground flex items-center gap-2 ${seniorMode ? 'text-3xl mb-8' : 'text-2xl mb-6'}`}>
            <span className={seniorMode ? 'text-3xl' : 'text-2xl'}>📅</span>
            Plan du jour (3 actions)
          </h2>
          <div className={seniorMode ? 'space-y-5' : 'space-y-4'}>
            {answer.dailyPlan.map((action, index) => (
              <div key={index} className={`flex items-start gap-4 bg-primary/5 rounded-xl border border-primary/10 ${seniorMode ? 'p-6' : 'p-4'}`}>
                <div className={`flex-shrink-0 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold ${seniorMode ? 'w-12 h-12 text-xl' : 'w-10 h-10'}`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  {action.time && (
                    <span className={`font-semibold text-primary ${seniorMode ? 'text-base' : 'text-sm'}`}>{action.time}</span>
                  )}
                  <p className={`font-semibold text-foreground ${seniorMode ? 'text-lg' : ''}`}>{action.action}</p>
                  {action.detail && (
                    <p className={`text-muted-foreground mt-1 ${seniorMode ? 'text-base' : 'text-sm'}`}>{action.detail}</p>
                  )}
                </div>
                <div className={`shrink-0 print-checkbox border-2 border-muted-foreground/30 rounded hidden print:block ${seniorMode ? 'w-8 h-8' : 'w-6 h-6'}`} />
              </div>
            ))}
          </div>
        </section>

        {/* Plan 7 jours */}
        <section className={seniorMode ? 'mb-12' : 'mb-10'}>
          <h2 className={`font-serif font-bold text-foreground flex items-center gap-2 ${seniorMode ? 'text-3xl mb-8' : 'text-2xl mb-6'}`}>
            <span className={seniorMode ? 'text-3xl' : 'text-2xl'}>📆</span>
            Plan 7 jours
          </h2>
          <div className={`grid grid-cols-1 md:grid-cols-2 ${seniorMode ? 'gap-5' : 'gap-4'}`}>
            {answer.sevenDayPlan.map((day, index) => (
              <div key={index} className={`card-medical ${seniorMode ? 'p-6' : ''}`}>
                <h3 className={`font-bold text-primary ${seniorMode ? 'text-xl mb-4' : 'mb-3'}`}>{day.day}</h3>
                <ul className={seniorMode ? 'space-y-3' : 'space-y-2'}>
                  {day.actions.map((action, actionIndex) => (
                    <li key={actionIndex} className={`flex items-start gap-2 ${seniorMode ? 'text-base' : 'text-sm'}`}>
                      <div className={`shrink-0 border-2 border-muted-foreground/30 rounded mt-0.5 print:block ${seniorMode ? 'w-6 h-6' : 'w-5 h-5'}`} />
                      <span className="text-foreground">{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Quand consulter */}
        <section className={seniorMode ? 'mb-12' : 'mb-10'}>
          <h2 className={`font-serif font-bold text-foreground flex items-center gap-2 ${seniorMode ? 'text-3xl mb-8' : 'text-2xl mb-6'}`}>
            <AlertTriangle className={`text-destructive ${seniorMode ? 'w-8 h-8' : 'w-6 h-6'}`} />
            Quand consulter rapidement ?
          </h2>
          <div className={`bg-destructive/10 border border-destructive/20 rounded-xl ${seniorMode ? 'p-8' : 'p-6'}`}>
            <ul className={seniorMode ? 'space-y-4' : 'space-y-3'}>
              {answer.alertSigns.map((sign, index) => (
                <li key={index} className="flex items-start gap-3">
                  <AlertTriangle className={`text-destructive shrink-0 mt-0.5 ${seniorMode ? 'w-6 h-6' : 'w-5 h-5'}`} />
                  <span className={`text-foreground ${seniorMode ? 'text-lg' : ''}`}>{sign}</span>
                </li>
              ))}
            </ul>
            <p className={`mt-4 pt-4 border-t border-destructive/20 text-muted-foreground ${seniorMode ? 'text-base' : 'text-sm'}`}>
              En cas de doute ou d'urgence : appelez le 15 ou le 112.
            </p>
          </div>
        </section>

        {/* Closing message */}
        <section className={`bg-muted/50 rounded-2xl text-center ${seniorMode ? 'p-8 mb-10' : 'p-6 mb-8'}`}>
          <p className={`text-foreground italic leading-relaxed ${seniorMode ? 'text-xl' : ''}`}>
            "{answer.closingMessage}"
          </p>
          <p className={`mt-4 font-semibold text-primary ${seniorMode ? 'text-lg' : ''}`}>— Dr Audric Bugnard</p>
        </section>

        {/* Print button */}
        <div className="flex justify-center gap-4 no-print">
          <Button variant="outline" size={buttonSize} onClick={handlePrint}>
            <Printer className={iconSize} />
            Imprimer cette fiche
          </Button>
          <Button asChild size={buttonSize}>
            <Link to="/reponses-rapides">
              Voir les autres réponses rapides
            </Link>
          </Button>
        </div>
      </article>
    </Layout>
  );
};

// Main component with routing
const ReponsesRapides = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // If we have a slug, show the detail view
  if (slug) {
    const answer = getQuickAnswerBySlug(slug);
    if (answer) {
      return <QuickAnswerDetail answer={answer} />;
    }
    // If answer not found, show the list
    return <QuickAnswersList />;
  }
  
  // Otherwise show the list
  return <QuickAnswersList />;
};

export default ReponsesRapides;
