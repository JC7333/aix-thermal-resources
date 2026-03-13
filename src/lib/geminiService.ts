const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
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

  const prompt = `Tu es un médecin thermaliste bienveillant. Le patient suit un parcours de 21 jours pour : ${pathology}. Jour ${day}/21.
Douleur aujourd'hui : ${painScore}/10.${painHistory ? ' Historique douleur : ' + painHistory + '.' : ''}
Exercice du jour : ${actionDone ? 'fait' : 'pas fait'}.
${streak > 1 ? 'Série en cours : ' + streak + ' jours consécutifs.' : ''}

Écris un conseil personnalisé en 2 phrases maximum.
Règles : ton chaleureux mais pas infantilisant. Pas de jargon. Si douleur >= 7 : rassurer. Si douleur <= 3 : féliciter. Si exercice non fait : encourager sans culpabiliser. Si série >= 5 jours : souligner la régularité. En français. Pas de backticks ni de markdown.`;

  return askGemini(prompt, fallback);
}
