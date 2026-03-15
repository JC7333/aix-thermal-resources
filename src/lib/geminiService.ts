const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

const ADVICE_TYPES = ['fun_fact', 'encouragement', 'practical_tip'] as const;
type AdviceType = (typeof ADVICE_TYPES)[number];

function getAdviceType(dayNumber: number): AdviceType {
  return ADVICE_TYPES[(dayNumber - 1) % ADVICE_TYPES.length];
}
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export async function askGemini(prompt: string, fallback: string): Promise<string> {
  if (!GEMINI_API_KEY) return fallback;
  try {
    const resp = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
    ? 'Bravo pour votre exercice du jour ! Chaque séance compte pour vos articulations.'
    : "Pas d'exercice aujourd'hui ? Ce n'est pas grave. L'important est de reprendre demain, même 5 minutes.";

  const adviceType = getAdviceType(day);

  const typeInstructions: Record<AdviceType, string> = {
    fun_fact: `Donne un fait scientifique surprenant sur la pathologie "${pathology}". Format : "Le saviez-vous ? [fait]. (Source : [organisme])". Sources UNIQUEMENT parmi : HAS, NICE, EULAR, OARSI, Cochrane, GINA, GOLD, OMS, Inserm. NE JAMAIS inventer une référence d'étude (pas de "Smith et al." ni de nom de journal). Si tu n'es pas sûr de la source exacte, écris "Selon les recommandations internationales" sans fausse précision.`,
    encouragement: `Donne un message d'encouragement personnalisé basé sur le jour ${day}/21 et le score de douleur ${painScore}/10. Mentionne le progrès accompli. Si le score est élevé, sois empathique sans minimiser. Termine par un rappel de l'exercice du jour. Pas besoin de source pour l'encouragement.`,
    practical_tip: `Donne une astuce pratique très concrète pour la vie quotidienne avec "${pathology}". Quelque chose que le patient peut faire MAINTENANT. Format : "Astuce du jour : [conseil concret]. (Source : [organisme])". Sources UNIQUEMENT parmi : HAS, NICE, EULAR, OARSI, Cochrane, GINA, GOLD, OMS, Inserm. NE JAMAIS inventer une référence.`,
  };

  const contextLine = [
    `Douleur aujourd'hui : ${painScore}/10.`,
    painHistory ? `Historique douleur : ${painHistory}.` : '',
    `Exercice du jour : ${actionDone ? 'fait' : 'pas fait'}.`,
    streak > 1 ? `Série en cours : ${streak} jours consécutifs.` : '',
  ].filter(Boolean).join(' ');

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
