import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, ExternalLink, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { toast } from 'sonner';

const Cabinet = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
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

    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast.success('Message envoyé avec succès. Nous vous répondrons dans les meilleurs délais.');
    setFormData({ name: '', email: '', subject: '', message: '', consent: false });
    setIsSubmitting(false);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <Breadcrumb items={[{ label: 'Le Cabinet' }]} />

        {/* Header */}
        <div className="mb-10">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
            Le Cabinet
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Cabinet de médecine thermale à Aix-les-Bains. Accompagnement personnalisé 
            pour les pathologies rhumatologiques, veineuses et respiratoires.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Info Cards */}
          <div className="space-y-6">
            {/* Address */}
            <div className="card-medical">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-bold text-foreground mb-2">Adresse</h2>
                  <p className="text-foreground">
                    15 rue du Lac<br />
                    73100 Aix-les-Bains
                  </p>
                  <a
                    href="https://maps.google.com/?q=15+rue+du+Lac+73100+Aix-les-Bains"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-2 text-sm text-primary hover:underline"
                  >
                    Voir sur Google Maps
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="card-medical">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-bold text-foreground mb-2">Horaires</h2>
                  <ul className="space-y-1 text-foreground">
                    <li className="flex justify-between">
                      <span>Lundi - Vendredi</span>
                      <span className="font-medium">9h-12h / 14h-18h</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Samedi</span>
                      <span className="font-medium">9h-12h</span>
                    </li>
                    <li className="flex justify-between text-muted-foreground">
                      <span>Dimanche</span>
                      <span>Fermé</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="card-medical">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-bold text-foreground mb-2">Contact</h2>
                  <ul className="space-y-2">
                    <li>
                      <a href="tel:+33479000000" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                        <Phone className="w-4 h-4" />
                        04 79 00 00 00
                      </a>
                    </li>
                    <li>
                      <a href="mailto:contact@dr-martin-thermaliste.fr" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                        <Mail className="w-4 h-4" />
                        contact@dr-martin-thermaliste.fr
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* RDV */}
            <div className="card-medical bg-primary/5 border-primary/20">
              <h2 className="font-serif text-xl font-bold text-foreground mb-3">Prendre rendez-vous</h2>
              <p className="text-muted-foreground mb-4">
                Prenez rendez-vous en ligne via Doctolib ou par téléphone.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="flex-1">
                  <a href="https://www.doctolib.fr" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                    Doctolib
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="flex-1">
                  <a href="tel:+33479000000">
                    <Phone className="w-4 h-4" />
                    Appeler
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card-medical">
            <h2 className="font-serif text-xl font-bold text-foreground mb-4">Nous contacter</h2>
            <p className="text-muted-foreground mb-6">
              Pour toute question administrative ou demande d'information.
            </p>

            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
              <p className="text-sm text-destructive font-medium">
                ⚠️ Important : veuillez ne pas transmettre d'informations médicales personnelles via ce formulaire. 
                Pour toute question médicale, prenez rendez-vous.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
                  Nom *
                </label>
                <Input
                  id="name"
                  type="text"
                  required
                  maxLength={100}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-11"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                  Email *
                </label>
                <Input
                  id="email"
                  type="email"
                  required
                  maxLength={255}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-11"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1.5">
                  Objet *
                </label>
                <Input
                  id="subject"
                  type="text"
                  required
                  maxLength={150}
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="h-11"
                  placeholder="Ex: Demande d'information sur les cures"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
                  Message *
                </label>
                <Textarea
                  id="message"
                  required
                  maxLength={1000}
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Votre message (max. 1000 caractères)"
                />
                <p className="text-xs text-muted-foreground mt-1">
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

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  'Envoi en cours...'
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Envoyer le message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cabinet;
