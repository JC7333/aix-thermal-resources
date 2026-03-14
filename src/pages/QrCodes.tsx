import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Layout } from "@/components/layout/Layout";
import { usePageTitle } from "@/hooks/usePageTitle";
import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

const BASE_URL = "https://etuve.fr";
const UTM = "?utm_source=qr&utm_medium=cabine";

const pathologies = [
  { slug: "gonarthrose", name: "Arthrose du genou" },
  { slug: "lombalgie-chronique", name: "Lombalgie chronique" },
  { slug: "coxarthrose", name: "Arthrose de la hanche" },
  { slug: "insuffisance-veineuse", name: "Insuffisance veineuse" },
  { slug: "bpco", name: "BPCO" },
  { slug: "fibromyalgie", name: "Fibromyalgie" },
  { slug: "asthme", name: "Asthme" },
  { slug: "tendinopathie-coiffe", name: "Tendinopathie épaule" },
  { slug: "arthrose-digitale", name: "Arthrose des mains" },
  { slug: "rhinosinusite-chronique", name: "Rhinosinusite" },
  { slug: "otites-repetition-enfant", name: "Otites enfant" },
];

const getUrl = (slug: string) => `${BASE_URL}/parcours/${slug}${UTM}`;

const QrCard = ({ slug, name }: { slug: string; name: string }) => (
  <div className="qr-card flex flex-col items-center p-4 border border-border rounded-xl bg-white">
    <div className="qr-svg-wrapper">
      <QRCodeSVG
        value={getUrl(slug)}
        size={140}
        level="M"
        includeMargin={false}
      />
    </div>
    <p
      className="mt-2 font-serif text-sm font-bold text-center"
      style={{ color: "#1a7a8c" }}
    >
      {name}
    </p>
    <p className="text-[10px] text-gray-500 text-center mt-0.5">
      Scannez pour démarrer
    </p>
  </div>
);

const QrCodes = () => {
  usePageTitle("QR Codes — Administration");
  const [mode, setMode] = useState<"grid" | "individual">("grid");
  const [selectedSlug, setSelectedSlug] = useState(pathologies[0].slug);

  const selected =
    pathologies.find((p) => p.slug === selectedSlug) || pathologies[0];

  return (
    <Layout>
      <div className="qr-print-page">
        {/* ══════════════════════════════════════
            SCREEN UI (masqué à l'impression)
            ══════════════════════════════════════ */}
        <div className="qr-screen-only">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-serif text-3xl font-bold text-foreground">
                  QR Codes cabines
                </h1>
                <p className="text-muted-foreground mt-1">
                  Générez et imprimez les QR codes pour les cabines thermales
                </p>
              </div>
              <Button onClick={() => window.print()} className="gap-2">
                <Printer className="w-4 h-4" />
                Imprimer
              </Button>
            </div>

            <div className="flex gap-2 mb-8">
              <button
                onClick={() => setMode("grid")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  mode === "grid"
                    ? "bg-primary text-white"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                Fiche A4 (11 pathologies)
              </button>
              <button
                onClick={() => setMode("individual")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  mode === "individual"
                    ? "bg-primary text-white"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                Fiche individuelle
              </button>
            </div>

            {mode === "individual" && (
              <div className="flex flex-wrap gap-2 mb-8">
                {pathologies.map((p) => (
                  <button
                    key={p.slug}
                    onClick={() => setSelectedSlug(p.slug)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                      selectedSlug === p.slug
                        ? "bg-primary/10 text-primary font-medium"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ══════════════════════════════════════
            FICHE A4 — 11 QR codes grille 4×3
            ══════════════════════════════════════ */}
        {mode === "grid" && (
          <div className="qr-print-content max-w-6xl mx-auto px-6 pb-12">
            {/* En-tête fiche (visible écran + impression) */}
            <div className="text-center mb-6">
              <p
                className="font-serif text-2xl font-bold"
                style={{ color: "#1a7a8c" }}
              >
                ÉTUVE
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Programme d'éducation thérapeutique — Thermes d'Aix-les-Bains
              </p>
              <p className="text-base font-semibold mt-3 text-gray-800">
                Scannez le QR code de votre pathologie
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 qr-grid">
              {pathologies.map((p) => (
                <QrCard key={p.slug} {...p} />
              ))}
            </div>

            {/* Pied de fiche */}
            <div className="text-center mt-6 pt-4 border-t border-gray-300">
              <p className="text-xs text-gray-500">
                etuve.fr — Programme gratuit, anonyme, 5 min/jour pendant 21
                jours
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Information éducative — Ne remplace pas un avis médical —
                Urgence : 15 / 112
              </p>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════
            FICHE INDIVIDUELLE
            ══════════════════════════════════════ */}
        {mode === "individual" && (
          <div className="qr-print-content max-w-md mx-auto px-6 pb-12">
            <div className="flex flex-col items-center p-10 border border-border rounded-2xl bg-white">
              <p
                className="font-serif text-2xl font-bold mb-2"
                style={{ color: "#1a7a8c" }}
              >
                ÉTUVE
              </p>
              <p className="text-sm text-gray-600 text-center mb-8">
                Programme d'éducation thérapeutique
              </p>

              <div className="qr-svg-wrapper-lg">
                <QRCodeSVG
                  value={getUrl(selected.slug)}
                  size={220}
                  level="H"
                  includeMargin={false}
                />
              </div>

              <h1 className="mt-6 font-serif text-2xl font-bold text-foreground text-center">
                {selected.name}
              </h1>

              <p className="text-center text-muted-foreground mt-3 max-w-xs">
                Scannez ce QR code avec l'appareil photo de votre téléphone pour
                démarrer votre programme personnalisé de 21 jours.
              </p>

              <div className="mt-6 p-4 rounded-xl bg-primary/5 w-full max-w-xs">
                <p className="text-sm font-medium text-foreground text-center">
                  Comment faire ?
                </p>
                <div className="text-sm text-muted-foreground mt-2 space-y-1.5">
                  <p>
                    <span className="font-semibold text-foreground">1.</span>{" "}
                    Ouvrez l'appareil photo de votre téléphone
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">2.</span>{" "}
                    Pointez-le vers le QR code
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">3.</span>{" "}
                    Appuyez sur le lien qui apparaît
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">4.</span>{" "}
                    Suivez les instructions à l'écran
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-border w-full text-center">
                <p className="text-xs text-muted-foreground">
                  Programme gratuit • Anonyme • 5 min/jour • etuve.fr
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Ne remplace pas un avis médical — Urgence : 15 / 112
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════
            LISTE URLs (écran uniquement)
            ══════════════════════════════════════ */}
        <div className="qr-screen-only max-w-4xl mx-auto px-6 pb-12">
          <details className="mt-4">
            <summary className="text-sm text-muted-foreground cursor-pointer hover:text-foreground">
              Voir toutes les URLs des QR codes
            </summary>
            <div className="mt-3 space-y-1">
              {pathologies.map((p) => (
                <div
                  key={p.slug}
                  className="flex items-center gap-3 text-sm py-1"
                >
                  <span className="font-medium text-foreground w-48">
                    {p.name}
                  </span>
                  <code className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                    {getUrl(p.slug)}
                  </code>
                </div>
              ))}
            </div>
          </details>
        </div>
      </div>
    </Layout>
  );
};

export default QrCodes;
