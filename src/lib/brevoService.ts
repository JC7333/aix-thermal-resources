const BREVO_API_KEY = import.meta.env.VITE_BREVO_API_KEY || '';
const BREVO_URL = 'https://api.brevo.com/v3';

/**
 * Crée un contact dans Brevo.
 * Données envoyées : email + token + date consentement.
 * AUCUNE donnée de santé.
 * Double opt-in activé côté Brevo dashboard (pas ici).
 */
export async function addBrevoContact(params: {
  email: string;
  token: string;
  consentAt: string;
}): Promise<boolean> {
  if (!BREVO_API_KEY) {
    console.warn('[Brevo] API key not set, skipping');
    return false;
  }
  try {
    const resp = await fetch(`${BREVO_URL}/contacts`, {
      method: 'POST',
      headers: { 'api-key': BREVO_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: params.email,
        attributes: { TOKEN: params.token, CONSENT_DATE: params.consentAt },
        listIds: [3],
        updateEnabled: true,
      }),
    });
    if (!resp.ok) {
      const err = await resp.text();
      console.error('[Brevo]', err);
      return false;
    }
    return true;
  } catch (_e) {
    console.error('[Brevo]', _e);
    return false;
  }
}
