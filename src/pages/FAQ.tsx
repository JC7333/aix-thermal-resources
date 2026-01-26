import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/shared/Breadcrumb';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqItems: FAQItem[] = [
  {
    id: 'therma-1',
    question: 'Qu\'est-ce qu\'une cure thermale et comment ça fonctionne ?',
    answer: 'Une cure thermale est un traitement médical de 3 semaines utilisant les propriétés des eaux thermales. Elle comprend des soins quotidiens : bains, douches, boue, aérosols, rééducation en piscine. Ces soins sont prescrits par votre médecin selon votre pathologie (rhumatologie, phlébologie, voies respiratoires...). La cure est prise en charge par l\'Assurance Maladie sur prescription.',
    category: 'thermalisme',
  },
  {
    id: 'therma-2',
    question: 'Quand faire une cure thermale pour l\'arthrose ?',
    answer: 'Une cure thermale est recommandée pour l\'arthrose stabilisée (pas en poussée aiguë). Elle améliore la douleur, la mobilité et la qualité de vie pendant plusieurs mois. L\'idéal est de la faire chaque année. La cure ne remplace pas l\'activité physique quotidienne mais la complète.',
    category: 'thermalisme',
  },
  {
    id: 'therma-3',
    question: 'Comment obtenir une prescription pour une cure thermale ?',
    answer: 'Demandez à votre médecin traitant. Il évaluera si votre pathologie relève d\'une orientation thermale (rhumatologie, phlébologie, voies respiratoires, dermatologie...). Il vous remettra un formulaire Cerfa de demande de prise en charge. Vous l\'envoyez à votre caisse d\'Assurance Maladie qui vous répondra sous 4 semaines.',
    category: 'thermalisme',
  },
  {
    id: 'activite-1',
    question: 'Puis-je faire du sport si j\'ai de l\'arthrose ?',
    answer: 'Oui, et c\'est même fortement recommandé ! L\'activité physique est le meilleur traitement non médicamenteux de l\'arthrose. Privilégiez les activités à faible impact : marche, vélo, natation, aquagym. Évitez les sports avec sauts ou chocs répétés. Commencez doucement et augmentez progressivement.',
    category: 'activite',
  },
  {
    id: 'activite-2',
    question: 'Que faire quand j\'ai mal au dos ? Repos ou mouvement ?',
    answer: 'Mouvement ! Le repos prolongé aggrave le mal de dos. Même si vous avez mal, continuez à bouger : marche, exercices doux. La douleur ne signifie pas que vous vous abîmez. Les études montrent que les personnes qui restent actives guérissent plus vite que celles qui se reposent.',
    category: 'activite',
  },
  {
    id: 'activite-3',
    question: 'Combien de temps d\'activité physique par jour ?',
    answer: '30 minutes d\'activité modérée par jour sont recommandées. Mais si vous partez de zéro, commencez par 5-10 minutes et augmentez progressivement. Fractionnez si besoin : 3x10 minutes valent autant que 30 minutes d\'un coup. L\'essentiel est la régularité.',
    category: 'activite',
  },
  {
    id: 'orl-1',
    question: 'Mon enfant a souvent des angines/otites. Que faire ?',
    answer: 'Les infections ORL répétées sont fréquentes chez les jeunes enfants (système immunitaire en développement, collectivité). Gestes préventifs : lavages de nez quotidiens au sérum physiologique, aération des pièces, éviter le tabagisme passif, limiter la tétine après 6 mois. Consultez si fièvre élevée persistante ou écoulement d\'oreille.',
    category: 'orl',
  },
  {
    id: 'orl-2',
    question: 'Les lavages de nez sont-ils vraiment utiles ?',
    answer: 'Oui, très utiles ! Le lavage de nez au sérum physiologique dégage les voies respiratoires, élimine virus et bactéries, et prévient la surinfection. C\'est simple, sans risque et efficace. À faire plusieurs fois par jour en cas de rhume, et quotidiennement en prévention.',
    category: 'orl',
  },
  {
    id: 'veines-1',
    question: 'Comment gérer les jambes lourdes au quotidien ?',
    answer: 'Marchez tous les jours (active la pompe du mollet), surélevez les jambes 15-20 min 2x/jour, portez des bas de contention si prescrits, évitez la chaleur (bains chauds, soleil direct), faites des exercices de flexion des pieds régulièrement, terminez la douche par un jet d\'eau fraîche sur les jambes.',
    category: 'veines',
  },
  {
    id: 'veines-2',
    question: 'Les bas de contention sont-ils obligatoires ?',
    answer: 'Ils sont très efficaces et souvent prescrits pour l\'insuffisance veineuse. Ils ne sont pas "obligatoires" mais fortement recommandés, surtout si station debout prolongée ou voyage. Ils sont remboursés sur prescription. Mettez-les le matin avant de vous lever.',
    category: 'veines',
  },
  {
    id: 'ressources-1',
    question: 'Les informations de ce site remplacent-elles une consultation ?',
    answer: 'Non. Ce site fournit des informations générales à visée éducative. Il ne remplace jamais l\'avis d\'un médecin. En cas de symptômes, de doute ou d\'urgence, consultez un professionnel de santé. Les conseils donnés ici sont des orientations générales, pas des prescriptions personnalisées.',
    category: 'ressources',
  },
  {
    id: 'ressources-2',
    question: 'Comment utiliser les programmes d\'exercices ?',
    answer: 'Choisissez le programme adapté à votre pathologie et votre niveau de mobilité (0 à 3). Commencez par le niveau correspondant à votre situation actuelle. Suivez le plan 7 jours pour débuter, puis le programme 8 semaines pour progresser. En cas de douleur inhabituelle ou d\'aggravation, arrêtez et consultez.',
    category: 'ressources',
  },
];

const categoryLabels: Record<string, string> = {
  thermalisme: 'Thermalisme',
  activite: 'Activité physique',
  orl: 'ORL & Enfants',
  veines: 'Circulation veineuse',
  ressources: 'Ressources du site',
};

const FAQ = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const categories = [...new Set(faqItems.map((item) => item.category))];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <Breadcrumb items={[{ label: 'Questions fréquentes' }]} />

        {/* Header */}
        <div className="mb-10 max-w-3xl">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
            Questions fréquentes
          </h1>
          <p className="text-lg text-muted-foreground">
            Retrouvez les réponses aux questions les plus courantes sur le thermalisme, 
            l'activité physique adaptée et la gestion de votre pathologie au quotidien.
          </p>
        </div>

        {/* FAQ by Category */}
        <div className="max-w-3xl space-y-8">
          {categories.map((category) => (
            <section key={category}>
              <h2 className="font-serif text-xl font-bold text-foreground mb-4 pb-2 border-b border-border">
                {categoryLabels[category] || category}
              </h2>
              <div className="space-y-3">
                {faqItems
                  .filter((item) => item.category === category)
                  .map((item) => {
                    const isOpen = openItems.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        className="bg-card border border-border rounded-xl overflow-hidden"
                      >
                        <button
                          onClick={() => toggleItem(item.id)}
                          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
                          aria-expanded={isOpen}
                        >
                          <span className="font-medium text-foreground pr-4">
                            {item.question}
                          </span>
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                          )}
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-5 animate-fade-in">
                            <p className="text-muted-foreground leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </section>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 max-w-3xl">
          <div className="bg-muted rounded-xl p-6 lg:p-8 text-center">
            <h3 className="font-serif text-xl font-bold text-foreground mb-3">
              Vous ne trouvez pas votre réponse ?
            </h3>
            <p className="text-muted-foreground mb-4">
              N'hésitez pas à nous contacter pour toute question sur votre prise en charge.
            </p>
            <a
              href="tel:+33479000000"
              className="text-primary font-medium hover:underline"
            >
              📞 04 79 00 00 00
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
