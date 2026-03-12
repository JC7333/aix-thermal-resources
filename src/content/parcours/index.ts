// ============================================
// PARCOURS PATIENT — Index
// Exporte le contenu des 21 jours par pathologie
// ============================================

export { gonarthroseParcours } from './gonarthrose';
export { lombalgieParcours } from './lombalgie-chronique';
export { coxarthroseParcours } from './coxarthrose';

/** Pathologies avec parcours 21 jours disponible */
export const PARCOURS_AVAILABLE: string[] = [
  'gonarthrose',
  'lombalgie-chronique',
  'coxarthrose',
];
