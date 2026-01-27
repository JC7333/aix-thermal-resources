// Analytics service - RGPD compliant, no health data
// Tracks anonymous usage events only

export type EventName = 
  | 'wizard_start' 
  | 'wizard_complete' 
  | 'quick_answer_click' 
  | 'pdf_download'
  | 'pdf_download_1page'
  | 'pdf_download_4pages'
  | 'zip_download'
  | 'print_click'
  | 'page_view';

export interface AnalyticsEvent {
  eventName: EventName;
  path: string;
  timestamp: number;
  sessionId: string;
  slug?: string;
  id?: string;
  metadata?: Record<string, string>;
}

const STORAGE_KEY = 'dr_bugnard_analytics';
const SESSION_KEY = 'dr_bugnard_session';

// Generate anonymous session ID (no personal data)
const getOrCreateSessionId = (): string => {
  let sessionId = sessionStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = `s_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    sessionStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
};

// Get stored events
export const getStoredEvents = (): AnalyticsEvent[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Store event
const storeEvent = (event: AnalyticsEvent): void => {
  try {
    const events = getStoredEvents();
    // Keep only last 1000 events to avoid storage overflow
    const trimmedEvents = events.slice(-999);
    trimmedEvents.push(event);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmedEvents));
  } catch (e) {
    console.warn('Analytics storage failed:', e);
  }
};

// Main log function
export const logEvent = (
  eventName: EventName, 
  path?: string,
  metadata?: Record<string, string>
): void => {
  const event: AnalyticsEvent = {
    eventName,
    path: path || window.location.pathname,
    timestamp: Date.now(),
    sessionId: getOrCreateSessionId(),
    slug: metadata?.slug,
    id: metadata?.id,
    metadata,
  };
  
  storeEvent(event);
  
  // Debug in development
  if (import.meta.env.DEV) {
    console.log('[Analytics]', eventName, path, metadata);
  }
};

// Analytics stats utilities
export interface AnalyticsStats {
  totalEvents: number;
  uniqueSessions: number;
  topPages: { path: string; count: number }[];
  wizardCompletionRate: number;
  wizardStarts: number;
  wizardCompletes: number;
  topDownloads: { name: string; type: string; count: number }[];
  topQuickAnswers: { id: string; title: string; count: number }[];
  eventsByType: { eventName: EventName; count: number }[];
  last7Days: { date: string; count: number }[];
  pdf1PageDownloads: number;
  pdf4PagesDownloads: number;
}

export const calculateStats = (): AnalyticsStats => {
  const events = getStoredEvents();
  
  // Unique sessions
  const uniqueSessions = new Set(events.map(e => e.sessionId)).size;
  
  // Top pages (from page_view events)
  const pageViews = events.filter(e => e.eventName === 'page_view');
  const pageCount: Record<string, number> = {};
  pageViews.forEach(e => {
    pageCount[e.path] = (pageCount[e.path] || 0) + 1;
  });
  const topPages = Object.entries(pageCount)
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  
  // Wizard completion rate
  const wizardStarts = events.filter(e => e.eventName === 'wizard_start').length;
  const wizardCompletes = events.filter(e => e.eventName === 'wizard_complete').length;
  const wizardCompletionRate = wizardStarts > 0 ? (wizardCompletes / wizardStarts) * 100 : 0;
  
  // Top downloads (with type distinction)
  const downloads = events.filter(e => 
    e.eventName === 'pdf_download' || 
    e.eventName === 'pdf_download_1page' || 
    e.eventName === 'pdf_download_4pages'
  );
  const downloadCount: Record<string, { count: number; type: string }> = {};
  downloads.forEach(e => {
    const slug = e.slug || e.metadata?.slug || 'unknown';
    const type = e.eventName === 'pdf_download_1page' ? '1 page' 
      : e.eventName === 'pdf_download_4pages' ? '4 pages'
      : e.metadata?.type || 'unknown';
    const key = `${slug}::${type}`;
    if (!downloadCount[key]) {
      downloadCount[key] = { count: 0, type };
    }
    downloadCount[key].count++;
  });
  const topDownloads = Object.entries(downloadCount)
    .map(([key, data]) => ({ 
      name: key.split('::')[0], 
      type: data.type,
      count: data.count 
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  
  // PDF type counts
  const pdf1PageDownloads = events.filter(e => 
    e.eventName === 'pdf_download_1page' || 
    (e.eventName === 'pdf_download' && e.metadata?.type === '1page')
  ).length;
  const pdf4PagesDownloads = events.filter(e => 
    e.eventName === 'pdf_download_4pages' || 
    (e.eventName === 'pdf_download' && e.metadata?.type === '4pages')
  ).length;
  
  // Top quick answers
  const quickAnswers = events.filter(e => e.eventName === 'quick_answer_click');
  const qaCount: Record<string, { title: string; count: number }> = {};
  quickAnswers.forEach(e => {
    const id = e.id || e.metadata?.id || e.path.split('/').pop() || 'unknown';
    const title = e.metadata?.title || id;
    if (!qaCount[id]) {
      qaCount[id] = { title, count: 0 };
    }
    qaCount[id].count++;
  });
  const topQuickAnswers = Object.entries(qaCount)
    .map(([id, data]) => ({ id, title: data.title, count: data.count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  
  // Events by type
  const eventTypeCount: Record<EventName, number> = {} as Record<EventName, number>;
  events.forEach(e => {
    eventTypeCount[e.eventName] = (eventTypeCount[e.eventName] || 0) + 1;
  });
  const eventsByType = Object.entries(eventTypeCount)
    .map(([eventName, count]) => ({ eventName: eventName as EventName, count }))
    .sort((a, b) => b.count - a.count);
  
  // Last 7 days
  const now = Date.now();
  const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
  const recentEvents = events.filter(e => e.timestamp >= sevenDaysAgo);
  const dayCount: Record<string, number> = {};
  recentEvents.forEach(e => {
    const date = new Date(e.timestamp).toLocaleDateString('fr-FR');
    dayCount[date] = (dayCount[date] || 0) + 1;
  });
  const last7Days = Object.entries(dayCount)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  return {
    totalEvents: events.length,
    uniqueSessions,
    topPages,
    wizardCompletionRate,
    wizardStarts,
    wizardCompletes,
    topDownloads,
    topQuickAnswers,
    eventsByType,
    last7Days,
    pdf1PageDownloads,
    pdf4PagesDownloads,
  };
};

// Clear all analytics data
export const clearAnalytics = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

// Export analytics data as JSON
export const exportAnalyticsJson = (): string => {
  const events = getStoredEvents();
  const stats = calculateStats();
  return JSON.stringify({ events, stats, exportedAt: new Date().toISOString() }, null, 2);
};
