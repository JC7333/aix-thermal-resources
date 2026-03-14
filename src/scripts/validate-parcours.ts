/**
 * ETUVE - Validation automatisee des 11 parcours
 * Usage : npx tsx src/scripts/validate-parcours.ts
 */

import * as P from '../content/parcours/index';
import type { ParcoursContent, ParcoursDay } from '../content/parcours/types';

// Filtrer tous les objets ParcoursContent (excluant PARCOURS_AVAILABLE string[])
const ALL_PARCOURS: ParcoursContent[] = Object.values(P).filter(
  (v): v is ParcoursContent =>
    typeof v === 'object' &&
    v !== null &&
    'slug' in v &&
    'days' in v &&
    Array.isArray((v as ParcoursContent).days)
);

let totalErrors = 0;
let totalWarnings = 0;
let totalChecks = 0;
const warningsList: string[] = [];

function error(parcours: string, msg: string) {
  console.error(`  X [${parcours}] ${msg}`);
  totalErrors++;
}

function warn(parcours: string, msg: string) {
  const w = `[${parcours}] ${msg}`;
  console.warn(`  W  ${w}`);
  totalWarnings++;
  warningsList.push(w);
}

function pass() {
  totalChecks++;
}

function validateDay(slug: string, day: ParcoursDay, dayIndex: number) {
  const prefix = `J${day.day}`;

  // Day number sequential
  if (day.day !== dayIndex + 1) {
    error(slug, `${prefix}: day number is ${day.day}, expected ${dayIndex + 1}`);
  } else {
    pass();
  }

  // Phase correcte
  const expectedPhase =
    day.day <= 7 ? 'comprendre' : day.day <= 14 ? 'agir' : 'consolider';
  if (day.phase !== expectedPhase) {
    error(slug, `${prefix}: phase is '${day.phase}', expected '${expectedPhase}'`);
  } else {
    pass();
  }

  // Theme non vide
  if (!day.theme || day.theme.trim().length < 3) {
    error(slug, `${prefix}: theme is empty or too short`);
  } else {
    pass();
  }

  // Content fields
  if (!day.content?.title || day.content.title.trim().length < 5) {
    error(slug, `${prefix}: content.title is empty or too short`);
  } else {
    pass();
  }
  if (!day.content?.body || day.content.body.trim().length < 100) {
    error(
      slug,
      `${prefix}: content.body is too short (${day.content?.body?.length ?? 0} chars, min 100)`
    );
  } else {
    pass();
  }
  if (!day.content?.keyMessage || day.content.keyMessage.trim().length < 10) {
    error(slug, `${prefix}: content.keyMessage is empty or too short`);
  } else {
    pass();
  }
  if (!day.content?.source || day.content.source.trim().length < 3) {
    error(slug, `${prefix}: content.source is missing`);
  } else {
    pass();
  }

  // Action fields
  if (!day.action?.title || day.action.title.trim().length < 3) {
    error(slug, `${prefix}: action.title is empty`);
  } else {
    pass();
  }
  if (!day.action?.description || day.action.description.trim().length < 20) {
    error(slug, `${prefix}: action.description is too short`);
  } else {
    pass();
  }
  if (!day.action?.duration) {
    warn(slug, `${prefix}: action.duration is missing`);
  } else {
    pass();
  }

  // Body length check (50-600 words)
  const wordCount = day.content?.body?.split(/\s+/).length ?? 0;
  if (wordCount < 50) {
    warn(slug, `${prefix}: body very short (${wordCount} words, recommend 150-400)`);
  }
  if (wordCount > 600) {
    warn(slug, `${prefix}: body very long (${wordCount} words, recommend 150-400)`);
  }

  // J7 and J14 must have quiz
  if (day.day === 7 || day.day === 14) {
    if (!day.hasMiniPro) {
      error(slug, `${prefix}: hasMiniPro is missing (required for J7 and J14)`);
    }
    if (!day.quiz || day.quiz.length < 3) {
      error(slug, `${prefix}: quiz is missing or has < 3 questions`);
    } else {
      const indices = day.quiz.map((q) => q.correctIndex);
      const allSame = indices.every((i) => i === indices[0]);
      if (allSame) {
        warn(
          slug,
          `${prefix}: quiz correctIndex all same (${indices[0]}) - should vary`
        );
      }
      day.quiz.forEach((q, qi) => {
        if (!q.question || q.question.length < 10) {
          error(slug, `${prefix} Q${qi + 1}: question too short`);
        }
        if (!q.options || q.options.length < 3) {
          error(slug, `${prefix} Q${qi + 1}: needs at least 3 options`);
        }
        if (q.correctIndex < 0 || q.correctIndex >= (q.options?.length ?? 0)) {
          error(
            slug,
            `${prefix} Q${qi + 1}: correctIndex ${q.correctIndex} out of range`
          );
        }
        if (!q.explanation || q.explanation.length < 10) {
          error(slug, `${prefix} Q${qi + 1}: explanation too short`);
        }
      });
      pass();
    }
  }

  // J21 should NOT have quiz
  if (day.day === 21 && day.quiz && day.quiz.length > 0) {
    warn(slug, `${prefix}: J21 should not have a quiz`);
  }
}

function validateParcours(parcours: ParcoursContent) {
  const { slug } = parcours;
  console.log(`\n[${slug}] ${parcours.title}`);

  if (!parcours.title) error(slug, 'title is missing');
  if (!parcours.subtitle) warn(slug, 'subtitle is missing');
  if (!parcours.description) warn(slug, 'description is missing');
  if (!parcours.icon) warn(slug, 'icon is missing');

  if (parcours.days.length !== 21) {
    error(slug, `Has ${parcours.days.length} days, expected 21`);
  } else {
    pass();
  }

  const dayNumbers = parcours.days.map((d) => d.day);
  const duplicates = dayNumbers.filter((d, i) => dayNumbers.indexOf(d) !== i);
  if (duplicates.length > 0) {
    error(slug, `Duplicate day numbers: ${duplicates.join(', ')}`);
  }

  parcours.days.forEach((day, index) => {
    validateDay(slug, day, index);
  });
}

// ============ RUN ============
console.log('===========================================');
console.log(' ETUVE - Validation des 11 parcours');
console.log('===========================================');
console.log(`Parcours trouves: ${ALL_PARCOURS.length}`);

if (ALL_PARCOURS.length !== 11) {
  console.error(`ERREUR: ${ALL_PARCOURS.length} parcours trouves, attendu 11`);
  process.exit(1);
}

ALL_PARCOURS.forEach(validateParcours);

console.log('\n===========================================');
console.log(
  ` RESULTAT: ${totalChecks} checks, ${totalErrors} erreurs, ${totalWarnings} warnings`
);
if (totalErrors === 0) {
  console.log(' OK - TOUS LES PARCOURS SONT VALIDES');
} else {
  console.log(` ECHEC - ${totalErrors} ERREURS A CORRIGER`);
}
if (warningsList.length > 0) {
  console.log(`\n Warnings:`);
  warningsList.forEach((w) => console.log(`   ${w}`));
}
console.log('===========================================');

process.exit(totalErrors > 0 ? 1 : 0);
