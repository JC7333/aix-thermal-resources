import { supabase } from "@/lib/supabase";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

const ADVICE_TYPES = ["fun_fact", "encouragement", "practical_tip"] as const;
type AdviceType = (typeof ADVICE_TYPES)[number];

function getAdviceType(dayNumber: number): AdviceType {
  return ADVICE_TYPES[(dayNumber - 1) % ADVICE_TYPES.length];
}
const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export async function askGemini(
  prompt: string,
  fallback: string,
): Promise<string> {
  if (!GEMINI_API_KEY) return fallback;
  try {
    const resp = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 200 },
      }),
    });
    if (!resp.ok) return fallback;
    const data = await resp.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || fallback;
  } catch (_e) {
    return fallback;
  }
}

export async function getCheckinAdvice(params: {
  pathology: string;
  day: number;
  painScore: number;
  actionDone: boolean;
  painHistory: string;
  streak: number;
}): Promise<string> {
  const { pathology, day, painScore, actionDone, painHistory, streak } = params;

  const fallback = actionDone
    ? "Bravo pour votre exercice du jour ! Chaque séance compte pour vos articulations."
    : "Pas d'exercice aujourd'hui ? Ce n'est pas grave. L'important est de reprendre demain, même 5 minutes.";

  const adviceType = getAdviceType(day);

  const typeInstructions: Record<AdviceType, string> = {
    fun_fact: `Donne un fait scientifique surprenant sur la pathologie "${pathology}". Format : "Le saviez-vous ? [fait]. (Source : [organisme])". Sources UNIQUEMENT parmi : HAS, NICE, EULAR, OARSI, Cochrane, GINA, GOLD, OMS, Inserm. NE JAMAIS inventer une référence d'étude (pas de "Smith et al." ni de nom de journal). Si tu n'es pas sûr de la source exacte, écris "Selon les recommandations internationales" sans fausse précision.`,
    encouragement: `Donne un message d'encouragement personnalisé basé sur le jour ${day}/21 et le score de douleur ${painScore}/10. Mentionne le progrès accompli. Si le score est élevé, sois empathique sans minimiser. Termine par un rappel de l'exercice du jour. Pas besoin de source pour l'encouragement.`,
    practical_tip: `Donne une astuce pratique très concrète pour la vie quotidienne avec "${pathology}". Quelque chose que le patient peut faire MAINTENANT. Format : "Astuce du jour : [conseil concret]. (Source : [organisme])". Sources UNIQUEMENT parmi : HAS, NICE, EULAR, OARSI, Cochrane, GINA, GOLD, OMS, Inserm. NE JAMAIS inventer une référence.`,
  };

  const contextLine = [
    `Douleur aujourd'hui : ${painScore}/10.`,
    painHistory ? `Historique douleur : ${painHistory}.` : "",
    `Exercice du jour : ${actionDone ? "fait" : "pas fait"}.`,
    streak > 1 ? `Série en cours : ${streak} jours consécutifs.` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const systemPrompt = `Tu es un assistant médical pour le programme ÉTUVE d'éducation thérapeutique.
Règles ABSOLUES :
- JAMAIS de prescription médicamenteuse
- JAMAIS de promesse de guérison
- Maximum 3 phrases
- Vouvoiement
- Ton bienveillant et factuel
- En français. Pas de backticks ni de markdown.

Le patient suit un parcours de 21 jours pour : ${pathology}. Jour ${day}/21.
${contextLine}

${typeInstructions[adviceType]}`;

  return askGemini(systemPrompt, fallback);
}

// ─── DAILY TIP (pages pathologies V2) ────────────────────────────────────────

const DAILY_TIP_TYPES = ["fun_fact", "practical_tip", "myth_buster"] as const;

function getTipType(): string {
  const now = new Date();
  // DST-safe day of year
  const dayOfYear = Math.floor(
    (Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) -
      Date.UTC(now.getFullYear(), 0, 0)) /
      86400000,
  );
  return DAILY_TIP_TYPES[dayOfYear % DAILY_TIP_TYPES.length];
}

export async function getDailyTip(
  pathologySlug: string,
  pathologyName: string,
): Promise<{ tip: string; type: string } | null> {
  const today = new Date().toISOString().slice(0, 10);

  // 1. Chercher dans Supabase d'abord (cache partagé entre TOUS les patients)
  if (supabase) {
    try {
      const { data } = await supabase
        .from("daily_tips")
        .select("tip_text, tip_type")
        .eq("slug", pathologySlug)
        .eq("tip_date", today)
        .single();

      if (data) {
        return { tip: data.tip_text as string, type: data.tip_type as string };
      }
    } catch {
      // Pas de tip pour aujourd'hui → générer
    }
  }

  // 2. Pas de tip → générer avec Gemini Flash
  if (!GEMINI_API_KEY) return null;

  const type = getTipType();

  const typePrompts: Record<string, string> = {
    fun_fact: `Donne un fait scientifique surprenant et VRAI sur "${pathologyName}". Format : "🔬 Le saviez-vous ? [fait en 2 phrases max]. (Source : [organisme])". Sources UNIQUEMENT : HAS, NICE, EULAR, OARSI, Cochrane, GINA, GOLD, OMS, Inserm. NE JAMAIS inventer une référence.`,
    practical_tip: `Donne une astuce concrète et SOURCÉE pour vivre au quotidien avec "${pathologyName}". Format : "💡 Astuce du jour : [conseil en 2 phrases max]. (Source : [organisme])". Sources UNIQUEMENT : HAS, NICE, EULAR, OARSI, Cochrane, GINA, GOLD, OMS, Inserm. NE JAMAIS inventer une référence.`,
    myth_buster: `Donne une idée reçue FAUSSE et courante sur "${pathologyName}" et corrige-la avec la vérité scientifique. Format : "❌ Idée reçue : [mythe]. ✅ En réalité : [vérité en 2 phrases max]. (Source : [organisme])". Sources UNIQUEMENT : HAS, NICE, EULAR, OARSI, Cochrane, GINA, GOLD, OMS, Inserm. NE JAMAIS inventer une référence.`,
  };

  const systemPrompt = `Tu es un assistant médical pour ÉTUVE, programme d'éducation thérapeutique.
Règles ABSOLUES :
- JAMAIS de prescription médicamenteuse ni de nom de médicament
- JAMAIS de promesse de guérison
- Maximum 3 phrases au total
- Vouvoiement
- Ton bienveillant, factuel, accessible (patient de 70 ans)
- Donner un conseil DIFFÉRENT à chaque appel (varier les angles)
- En français. Pas de backticks ni de markdown.

${typePrompts[type] ?? typePrompts["practical_tip"]}`;

  try {
    const response = await askGemini(
      systemPrompt,
      `Conseil du jour pour ${pathologyName}`,
    );

    if (!response || response === `Conseil du jour pour ${pathologyName}`) {
      return null;
    }

    // 3. Stocker dans Supabase pour que les prochains patients le lisent
    if (supabase) {
      await supabase.from("daily_tips").upsert(
        {
          slug: pathologySlug,
          tip_date: today,
          tip_type: type,
          tip_text: response,
        },
        { onConflict: "slug,tip_date" },
      );
    }

    return { tip: response, type };
  } catch {
    return null; // Fail silencieux — pas de message d'erreur au patient
  }
}
