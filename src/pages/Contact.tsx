import { useState } from 'react';
import { Send, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    email: '',
    message: '',
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
            Contact
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Une question sur le site ou les ressources ? Écrivez-moi.
          </p>

          {/* Warning */}
          <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 mb-8 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-destructive font-medium">
                Important
              </p>
              <p className="text-sm text-destructive/80 mt-1">
                Ne pas envoyer d'informations médicales personnelles via ce formulaire. 
                Pour toute question médicale, consultez un professionnel de santé.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Votre email *
              </label>
              <Input
                id="email"
                type="email"
                required
                maxLength={255}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-12"
                placeholder="exemple@email.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                Votre message *
              </label>
              <Textarea
                id="message"
                required
                maxLength={1000}
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Votre question ou remarque..."
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground mt-1.5">
                {formData.message.length}/1000 caractères
              </p>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="consent"
                checked={formData.consent}
                onCheckedChange={(checked) => setFormData({ ...formData, consent: checked as boolean })}
                className="mt-0.5"
              />
              <label htmlFor="consent" className="text-sm text-muted-foreground cursor-pointer">
                J'accepte que mes données soient utilisées pour répondre à ma demande, 
                conformément à la <a href="/confidentialite" className="text-primary hover:underline">politique de confidentialité</a>. *
              </label>
            </div>

            <Button type="submit" size="lg" className="w-full h-12" disabled={isSubmitting}>
              {isSubmitting ? (
                'Envoi en cours...'
              ) : (
                <>
                  <Send className="w-4 h-4" />
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
