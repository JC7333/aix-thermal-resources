import { useState } from "react";
import { Bell, Check } from "lucide-react";
import { addBrevoContact } from "@/lib/brevoService";
import { Button } from "@/components/ui/button";

interface EmailOptinBepProps {
  token: string;
  onContinue: () => void;
}

export const EmailOptinBep = ({ token, onContinue }: EmailOptinBepProps) => {
  const [email, setEmail] = useState("");
  const [checked, setChecked] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async () => {
    if (!isValid) {
      setError("Adresse email invalide");
      return;
    }
    if (!checked) {
      setError("Veuillez cocher la case");
      return;
    }
    setError("");
    setSaving(true);
    await addBrevoContact({
      email,
      token,
      consentAt: new Date().toISOString(),
    });
    setSaving(false);
    onContinue();
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <Bell className="w-10 h-10 text-primary mx-auto" />
        <h3 className="text-2xl font-serif font-bold">
          Un rappel chaque matin ?
        </h3>
        <p className="text-muted-foreground text-lg">
          Les patients qui reçoivent un rappel quotidien obtiennent de meilleurs
          résultats.
        </p>
      </div>

      <div className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          placeholder="votre@email.fr"
          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-lg"
          autoComplete="email"
        />

        <label className="flex items-start gap-3 cursor-pointer">
          <button
            type="button"
            onClick={() => setChecked(!checked)}
            className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors
              ${checked ? "bg-primary border-primary" : "border-muted-foreground"}`}
          >
            {checked && <Check className="w-3.5 h-3.5 text-white" />}
          </button>
          <span className="text-sm text-muted-foreground leading-snug">
            J'accepte de recevoir un rappel quotidien par email pendant mon
            programme. Mon email et mes données de suivi sont stockés
            séparément. Désinscription en un clic.
          </span>
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <Button
          size="lg"
          onClick={handleSubmit}
          disabled={!isValid || !checked || saving}
          className="w-full text-lg py-6"
        >
          {saving ? "Enregistrement..." : "Activer mes rappels"}
        </Button>
      </div>

      <button
        onClick={onContinue}
        className="w-full text-sm text-muted-foreground hover:text-foreground py-2"
      >
        Non merci, commencer directement
      </button>
    </div>
  );
};
