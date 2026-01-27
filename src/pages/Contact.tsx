import { useState } from 'react';
import { Send, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { useSeniorMode } from '@/hooks/useSeniorMode';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    email: '',
    message: '',
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { seniorMode, titleClass, textClass, buttonSize, smallTextClass, iconSize, inputClass } = useSeniorMode();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.consent) {
      toast.error('Veuillez accepter la politique de confidentialité');
      return;
    }

    if (formData.message.length < 10) {
      toast.error('Votre message est trop court');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast.success('Message envoyé. Je vous répondrai dans les meilleurs délais.');
    setFormData({ email: '', message: '', consent: false });
    setIsSubmitting(false);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <Breadcrumb items={[{ label: 'Contact' }]} />

        <div className="max-w-xl mx-auto">
          <h1 className={titleClass}>
            Contact
          </h1>
          <p className={textClass + ` ${seniorMode ? 'mb-10' : 'mb-8'}`}>
            Une question sur le site ou les ressources ? Écrivez-moi.
          </p>

          {/* Warning */}
          <div className={`bg-destructive/10 border border-destructive/20 rounded-xl flex gap-3 ${seniorMode ? 'p-6 mb-10' : 'p-4 mb-8'}`}>
            <AlertTriangle className={`text-destructive shrink-0 mt-0.5 ${iconSize}`} />
            <div>
              <p className={`text-destructive font-medium ${seniorMode ? 'text-lg' : 'text-sm'}`}>
                Important
              </p>
              <p className={`text-destructive/80 mt-1 ${seniorMode ? 'text-base' : 'text-sm'}`}>
                Ne pas envoyer d'informations médicales personnelles via ce formulaire. 
                Pour toute question médicale, consultez un professionnel de santé.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className={seniorMode ? 'space-y-8' : 'space-y-6'}>
            <div>
              <label htmlFor="email" className={`block font-medium text-foreground ${seniorMode ? 'text-lg mb-3' : 'text-sm mb-2'}`}>
                Votre email *
              </label>
              <Input
                id="email"
                type="email"
                required
                maxLength={255}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={inputClass}
                placeholder="exemple@email.com"
              />
            </div>

            <div>
              <label htmlFor="message" className={`block font-medium text-foreground ${seniorMode ? 'text-lg mb-3' : 'text-sm mb-2'}`}>
                Votre message *
              </label>
              <Textarea
                id="message"
                required
                maxLength={1000}
                rows={seniorMode ? 8 : 6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Votre question ou remarque..."
                className={`resize-none ${seniorMode ? 'text-lg p-4' : ''}`}
              />
              <p className={`text-muted-foreground mt-1.5 ${seniorMode ? 'text-base' : 'text-xs'}`}>
                {formData.message.length}/1000 caractères
              </p>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="consent"
                checked={formData.consent}
                onCheckedChange={(checked) => setFormData({ ...formData, consent: checked as boolean })}
                className={seniorMode ? 'mt-1 h-6 w-6' : 'mt-0.5'}
              />
              <label htmlFor="consent" className={`text-muted-foreground cursor-pointer ${seniorMode ? 'text-lg' : 'text-sm'}`}>
                J'accepte que mes données soient utilisées pour répondre à ma demande, 
                conformément à la <a href="/confidentialite" className="text-primary hover:underline">politique de confidentialité</a>. *
              </label>
            </div>

            <Button type="submit" size={buttonSize} className={`w-full ${seniorMode ? 'h-16 text-xl' : 'h-12'}`} disabled={isSubmitting}>
              {isSubmitting ? (
                'Envoi en cours...'
              ) : (
                <>
                  <Send className={iconSize} />
                  Envoyer
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
