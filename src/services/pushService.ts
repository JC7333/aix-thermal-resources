/**
 * Push notification service pour rappels quotidiens.
 * Utilise l'API Notification du navigateur (pas de serveur push).
 * Les notifications sont planifiées côté client via setTimeout.
 *
 * TODO Sprint futur : migrer vers SW push events (self.registration.showNotification)
 * pour notifications même navigateur fermé (nécessite VAPID keys + backend).
 */

const NOTIFICATION_HOUR = 9; // 9h du matin
const NOTIFICATION_KEY = 'etuve_push_permission';
const NOTIFICATION_LAST = 'etuve_push_last_shown';
// NOTE: ces 2 clés localStorage doivent être ajoutées à la liste protégée dans PROJECT_CONTEXT

export function isPushSupported(): boolean {
  return 'Notification' in window && 'serviceWorker' in navigator;
}

export function getPushPermission(): NotificationPermission | 'unsupported' {
  if (!isPushSupported()) return 'unsupported';
  return Notification.permission;
}

export async function requestPushPermission(): Promise<boolean> {
  if (!isPushSupported()) return false;
  const result = await Notification.requestPermission();
  localStorage.setItem(NOTIFICATION_KEY, result);
  return result === 'granted';
}

/**
 * Schedule a daily notification. Returns a cleanup function to clear the timer.
 */
export function scheduleDaily(_slug: string): () => void {
  if (getPushPermission() !== 'granted') return () => {};

  // Calculate ms until next 9am
  const now = new Date();
  const next9am = new Date(now);
  next9am.setHours(NOTIFICATION_HOUR, 0, 0, 0);
  if (now.getHours() >= NOTIFICATION_HOUR) {
    next9am.setDate(next9am.getDate() + 1);
  }
  const msUntil = next9am.getTime() - now.getTime();

  // Check if already shown today
  const lastShown = localStorage.getItem(NOTIFICATION_LAST);
  const today = now.toISOString().slice(0, 10);
  if (lastShown === today) return () => {};

  const timerId = setTimeout(() => {
    const todayStr = new Date().toISOString().slice(0, 10);
    if (localStorage.getItem(NOTIFICATION_LAST) === todayStr) return;

    const messages = [
      'Votre exercice du jour vous attend ! 5 min suffisent.',
      'Continuez votre progression — chaque jour compte.',
      "Un petit effort aujourd'hui, un grand bénéfice demain.",
      'Votre programme vous attend. 5 minutes suffisent.',
    ];
    const msg = messages[Math.floor(Math.random() * messages.length)];

    new Notification('ÉTUVE — Votre programme', {
      body: msg,
      icon: '/icons/icon-192.png',
      tag: 'etuve-daily',
      requireInteraction: false,
    });

    localStorage.setItem(NOTIFICATION_LAST, todayStr);
  }, msUntil);

  // Return cleanup function
  return () => clearTimeout(timerId);
}
