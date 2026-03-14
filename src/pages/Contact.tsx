import { useState } from "react";
import { Send, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Layout } from "@/components/layout/Layout";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { toast } from "sonner";
import { usePageTitle } from "@/hooks/usePageTitle";

const Contact = () => {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  usePageTitle("Contact");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.consent) {
      toast.error("Veuillez accepter la politique de confidentialité");
      return;
    }

    if (formData.message.length < 10) {
      toast.error("Votre message est trop court");
      return;
    }

    setIsSubmitting(true);

    // Construire le mailto avec le message pré-rempli
    const subject = encodeURIComponent("Contact depuis ÉTUVE");
    const body = encodeURIComponent(
      `Message de: ${formData.email}\n\n${formData.message}\n\n---\nEnvoyé depuis le site ÉTUVE`,
    );
    const mailtoUrl = `mailto:docteuraudricbugnard@gmail.com?subject=${subject}&body=${body}`;

    // Ouvrir le client mail
    window.location.href = mailtoUrl;

    // Confirmer à l'utilisateur
    setTimeout(() => {
      toast.success(
        "Votre client mail s'est ouvert. Envoyez le message pour me contacter.",
      );
      setFormData({ email: "", message: "", consent: false });
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <Breadcrumb items={[{ label: "Contact" }]} />

        <div className="max-w-xl mx-auto">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Contact
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Une question sur le site ou les ressources ? Écrivez-moi.
          </p>

          {/* Warning */}
          <div className="bg-destructive/10 border border-destructive/20 rounded-xl flex gap-3 p-4 mb-8">
            <AlertTriangle className="text-destructive shrink-0 mt-0.5 w-5 h-5" />
            <div>
              <p className="text-destructive font-medium text-sm">Important</p>
              <p className="text-destructive/80 mt-1 text-sm">
                Ne pas envoyer d'informations médicales personnelles via ce
                formulaire. Pour toute question médicale, consultez un
                professionnel de santé.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block font-medium text-foreground text-sm mb-2"
              >
                Votre email *
              </label>
              <Input
                id="email"
                type="email"
                required
                maxLength={255}
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="h-11 text-base rounded-lg"
                placeholder="exemple@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block font-medium text-foreground text-sm mb-2"
              >
                Votre message *
              </label>
              <Textarea
                id="message"
                required
                maxLength={1000}
                rows={6}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Votre question ou remarque..."
                className="resize-none"
              />
              <p className="text-muted-foreground mt-1.5 text-xs">
                {formData.message.length}/1000 caractères
              </p>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="consent"
                checked={formData.consent}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, consent: checked as boolean })
                }
                className="mt-0.5"
              />
              <label
                htmlFor="consent"
                className="text-muted-foreground cursor-pointer text-sm"
              >
                J'accepte que mes données soient utilisées pour répondre à ma
                demande, conformément à la{" "}
                <a
                  href="/confidentialite"
                  className="text-primary hover:underline"
                >
                  politique de confidentialité
                </a>
                . *
              </label>
            </div>

            <Button
              type="submit"
              size="default"
              className="w-full h-12"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Envoi en cours..."
              ) : (
                <>
                  <Send className="w-5 h-5" />
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
