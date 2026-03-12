// ============================================
// SERVICE PARCOURS — ÉTUVE
// CRUD Supabase pour parcours patient
// Fallback localStorage si Supabase non configuré
// ============================================

import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { BepData, ProAssessment } from '@/content/parcours/types';

// ============================================
// TYPES SUPABASE
// ============================================

interface ParcoursRow {
  id?: string;
  token: string;
  slug: string;
  age_range: string | null;
  duration: string | null;
  previous_cure: boolean | null;
  main_goal: string | null;
  free_text: string | null;
  created_at?: string;
  completed_at?: string | null;
}

interface ParcoursProRow {
  id?: string;
  parcours_id: string;
  timepoint: string; // T0, T1, T2, T3
  pain_score: number;
  function_score: Record<string, unknown> | null; // KOOS-PS items détaillés
  function_total: number | null;
  confidence_score: number;
  created_at?: string;
}

interface ParcoursCheckinRow {
  id?: string;
  parcours_id: string;
  day_number: number;
  pain_score: number;
  action_done: boolean;
  created_at?: string;
}

// ============================================
// LOCAL STORAGE FALLBACK
// ============================================

const LS_PARCOURS = 'etuve_parcours_data';
const LS_PRO = 'etuve_parcours_pro';
const LS_CHECKINS = 'etuve_parcours_checkins';

function lsGet<T>(key: string): T[] {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch {
    return [];
  }
}

function lsAppend<T>(key: string, item: T): void {
  const arr = lsGet<T>(key);
  arr.push(item);
  localStorage.setItem(key, JSON.stringify(arr.slice(-200)));
}

// ============================================
// PARCOURS — Inscription
// ============================================

export async function createParcours(
  token: string,
  slug: string,
  bep: BepData,
): Promise<string | null> {
  const row: ParcoursRow = {
    token,
    slug,
    age_range: bep.ageRange,
    duration: bep.duration,
    previous_cure: bep.previousCure,
    main_goal: bep.mainGoal,
    free_text: bep.freeText || null,
  };

  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('parcours')
        .insert(row)
        .select('id')
        .single();
      if (error) throw error;
      return data?.id || null;
    } catch (e) {
      console.warn('[Parcours] Supabase insert failed, using localStorage:', e);
    }
  }

  // Fallback localStorage
  const localId = crypto.randomUUID();
  lsAppend(LS_PARCOURS, { ...row, id: localId, created_at: new Date().toISOString() });
  return localId;
}

/**
 * Retrouve un parcours par token (pour la récupération de code)
 */
export async function findParcoursByToken(token: string): Promise<(ParcoursRow & { id: string }) | null> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('parcours')
        .select('*')
        .eq('token', token)
        .single();
      if (error) throw error;
      return data;
    } catch (e) {
      console.warn('[Parcours] Supabase lookup failed:', e);
    }
  }

  // Fallback localStorage
  const all = lsGet<ParcoursRow & { id: string }>(LS_PARCOURS);
  return all.find((p) => p.token === token) || null;
}

// ============================================
// PRO — Assessments (T0, T1, T2, T3)
// ============================================

export async function saveProAssessment(
  parcoursId: string,
  timepoint: 'T0' | 'T1' | 'T2' | 'T3',
  pro: ProAssessment,
): Promise<boolean> {
  const row: ParcoursProRow = {
    parcours_id: parcoursId,
    timepoint,
    pain_score: pro.painScore,
    function_score: { items: pro.koosPsItems },
    function_total: pro.koosPsTotal,
    confidence_score: pro.confidenceScore,
  };

  if (isSupabaseConfigured() && supabase) {
    try {
      const { error } = await supabase.from('parcours_pro').insert(row);
      if (error) throw error;
      return true;
    } catch (e) {
      console.warn('[PRO] Supabase insert failed:', e);
    }
  }

  lsAppend(LS_PRO, { ...row, id: crypto.randomUUID(), created_at: new Date().toISOString() });
  return true;
}

// ============================================
// CHECK-INS — Quotidien
// ============================================

export async function saveCheckin(
  parcoursId: string,
  dayNumber: number,
  painScore: number,
  actionDone: boolean,
): Promise<boolean> {
  const row: ParcoursCheckinRow = {
    parcours_id: parcoursId,
    day_number: dayNumber,
    pain_score: painScore,
    action_done: actionDone,
  };

  if (isSupabaseConfigured() && supabase) {
    try {
      const { error } = await supabase.from('parcours_checkins').insert(row);
      if (error) throw error;
      return true;
    } catch (e) {
      console.warn('[Checkin] Supabase insert failed:', e);
    }
  }

  lsAppend(LS_CHECKINS, { ...row, id: crypto.randomUUID(), created_at: new Date().toISOString() });
  return true;
}

/**
 * Récupère les check-ins d'un parcours
 */
export async function getCheckins(parcoursId: string): Promise<ParcoursCheckinRow[]> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('parcours_checkins')
        .select('*')
        .eq('parcours_id', parcoursId)
        .order('day_number');
      if (error) throw error;
      return data || [];
    } catch (e) {
      console.warn('[Checkin] Supabase fetch failed:', e);
    }
  }

  return lsGet<ParcoursCheckinRow>(LS_CHECKINS).filter((c) => c.parcours_id === parcoursId);
}
