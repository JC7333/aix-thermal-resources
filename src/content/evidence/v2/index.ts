// Evidence Pack V2 - Index
// Centralise tous les packs pour import facile

export * from './types';

// Packs complets
export { gonarthrose } from './gonarthrose';
export { coxarthrose } from './coxarthrose';
export { lombalgieChronique } from './lombalgie-chronique';
export { insuffisanceVeineuse } from './insuffisance-veineuse';
export { bpco } from './bpco';
export { otitesRepetitionEnfant } from './otites-repetition-enfant';
export { rhinosinusiteChronique } from './rhinosinusite-chronique';
export { fibromyalgie } from './fibromyalgie';

// Import des packs
import { gonarthrose } from './gonarthrose';
import { coxarthrose } from './coxarthrose';
import { lombalgieChronique } from './lombalgie-chronique';
import { insuffisanceVeineuse } from './insuffisance-veineuse';
import { bpco } from './bpco';
import { otitesRepetitionEnfant } from './otites-repetition-enfant';
import { rhinosinusiteChronique } from './rhinosinusite-chronique';
import { fibromyalgie } from './fibromyalgie';
import { EvidencePackV2, createStubPack } from './types';

// Stubs pour les pathologies à compléter
export const arthroseCheville = createStubPack('arthrose-cheville-pied', 'Arthrose cheville/pied', 'rhumatologie', 'arthrose');
export const arthroseLombaire = createStubPack('arthrose-lombaire', 'Arthrose lombaire (rachis)', 'rhumatologie', 'arthrose');
export const arthroseCervicale = createStubPack('arthrose-cervicale', 'Arthrose cervicale (rachis)', 'rhumatologie', 'arthrose');
export const arthroseDigitale = createStubPack('arthrose-digitale', 'Arthrose digitale / main', 'rhumatologie', 'arthrose');
export const omarthrose = createStubPack('omarthrose', 'Omarthrose (épaule)', 'rhumatologie', 'arthrose');
export const tendinopathieCoiffe = createStubPack('tendinopathie-coiffe', 'Tendinopathies de coiffe', 'rhumatologie');
export const lymphoedeme = createStubPack('lymphoedeme', 'Lymphœdème / séquelles érysipèle', 'veino-lymphatique');
export const asthme = createStubPack('asthme', 'Asthme', 'respiratoire-orl');
export const rhiniteChronique = createStubPack('rhinite-chronique', 'Rhinite chronique / allergique', 'respiratoire-orl');
export const lichenPlanBuccal = createStubPack('lichen-plan-buccal', 'Lichen plan buccal', 'muqueuses-buccales');
export const glossodynie = createStubPack('glossodynie', 'Glossodynie', 'muqueuses-buccales');
export const gingivites = createStubPack('gingivites', 'Gingivites', 'muqueuses-buccales');
export const sequellesPostRadiques = createStubPack('sequelles-post-radiques', 'Séquelles post-radiques ORL', 'muqueuses-buccales');

// Collection de tous les packs
export const ALL_EVIDENCE_PACKS_V2: EvidencePackV2[] = [
  // Complets
  gonarthrose,
  coxarthrose,
  lombalgieChronique,
  insuffisanceVeineuse,
  bpco,
  otitesRepetitionEnfant,
  rhinosinusiteChronique,
  fibromyalgie,
  // Stubs
  arthroseCheville,
  arthroseLombaire,
  arthroseCervicale,
  arthroseDigitale,
  omarthrose,
  tendinopathieCoiffe,
  lymphoedeme,
  asthme,
  rhiniteChronique,
  lichenPlanBuccal,
  glossodynie,
  gingivites,
  sequellesPostRadiques,
];

// Helpers
export const getEvidencePackV2BySlug = (slug: string): EvidencePackV2 | undefined => {
  return ALL_EVIDENCE_PACKS_V2.find(pack => pack.slug === slug);
};

export const getCompletePacks = (): EvidencePackV2[] => {
  return ALL_EVIDENCE_PACKS_V2.filter(pack => pack.status === 'complete');
};

export const getPacksByCategory = (category: EvidencePackV2['category']): EvidencePackV2[] => {
  return ALL_EVIDENCE_PACKS_V2.filter(pack => pack.category === category);
};

export const CONTENT_VERSION_V2 = '2.1.0';
export const CONTENT_DATE_V2 = '2026-01-28';
