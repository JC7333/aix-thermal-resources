import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { faqItems } from '@/data/pathologies';

const FAQ = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const categories = [...new Set(faqItems.map((item) => item.category))];
  const categoryLabels: Record<string, string> = {
    thermalisme: 'Thermalisme',
    activite: 'Activité physique',
    orl: 'ORL & Enfants',
    veines: 'Circulation veineuse',
    ressources: 'Ressources du site',
  };

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
