#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const BLOG_DIR = join(ROOT, 'src', 'content', 'blog');
const TOPICS_PATH = join(__dirname, 'blog-topics.json');
const INDEX_PATH = join(BLOG_DIR, 'index.ts');

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) { console.error('GEMINI_API_KEY not set'); process.exit(1); }

  const topics = JSON.parse(readFileSync(TOPICS_PATH, 'utf-8'));
  const indexContent = readFileSync(INDEX_PATH, 'utf-8');
  const nextTopic = topics.find(t => !indexContent.includes(t.slug));
  if (!nextTopic) { console.log('ALL_PUBLISHED'); process.exit(0); }
  console.log('Generating:', nextTopic.title);

  const prompt = `Tu es le Dr Audric Bugnard, médecin thermaliste à Aix-les-Bains. Écris un article de blog médical pour etuve.fr.
TITRE : ${nextTopic.title}
MOTS-CLÉS : ${nextTopic.keywords}
${nextTopic.pathology ? 'PATHOLOGIE LIÉE : ' + nextTopic.pathology : 'THÈME TRANSVERSAL (santé générale)'}
RÈGLES STRICTES :
- 600 à 800 mots, en français avec accents corrects
- Ton professionnel mais accessible (patients 60-80 ans)
- Citer les recommandations (NICE, OARSI, EULAR, GOLD, GINA, HAS, Cochrane, OMS) avec années
- Rappeler de consulter son médecin en cas de doute
- Structurer avec ## et ### en markdown
- ${nextTopic.pathology ? 'Terminer par une invitation à découvrir le parcours sur etuve.fr pour cette pathologie' : 'Terminer par une invitation à découvrir les programmes sur etuve.fr'}
- Maximum 5 items par liste à puces
- Pas de jargon médical non expliqué
- NE PAS utiliser de backticks, de blocs de code, ni de caractères dollar
- Commencer directement par le premier ## titre`;

  const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + apiKey;
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.7, maxOutputTokens: 2500 } }),
  });
  if (!resp.ok) { console.error('API error:', resp.status, await resp.text()); process.exit(1); }
  const data = await resp.json();
  let content = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  if (!content) { console.error('Empty response'); process.exit(1); }

  // Nettoyage robuste
  content = content.replace(/```[\s\S]*?```/g, '').replace(/`([^`]*)`/g, '$1').replace(/\$/g, '').trim();

  // Sources
  const patterns = [[/OARSI\s*\d{4}/gi,'OARSI'],[/NICE\s+NG\d+/gi,'NICE'],[/EULAR\s*\d{4}/gi,'EULAR'],[/GOLD\s*\d{4}/gi,'GOLD'],[/GINA\s*\d{4}/gi,'GINA'],[/Cochrane/gi,'Cochrane'],[/HAS/gi,'HAS'],[/OMS|WHO/gi,'OMS'],[/ESVS/gi,'ESVS'],[/EPOS/gi,'EPOS'],[/Lancet/gi,'Lancet']];
  const seen = new Set(); const sources = [];
  for (const [re, label] of patterns) { if (content.match(re) && !seen.has(label)) { seen.add(label); sources.push(label); } }
  if (!sources.length) sources.push("Sources médicales citées dans l'article");
  const sourcesStr = sources.map(s => `    { label: '${s.replace(/'/g,"\\'")}' }`).join(',\n');

  const readingTime = Math.max(3, Math.ceil(content.split(/\s+/).length / 200));
  const today = new Date().toISOString().split('T')[0];
  const varName = nextTopic.slug.replace(/-/g, '_').replace(/^(\d)/, '_$1');
  const safeContent = content.replace(/\\/g, '\\\\').replace(/`/g, "'").replace(/\$/g, '');
  const safeTitle = nextTopic.title.replace(/'/g, "\\'");
  const desc = (nextTopic.title.length > 155 ? nextTopic.title.slice(0, 152) + '...' : nextTopic.title).replace(/'/g, "\\'");

  const fileContent = `import type { BlogArticle } from './types';\n\nexport const ${varName}: BlogArticle = {\n  slug: '${nextTopic.slug}',\n  title: '${safeTitle}',\n  description: '${desc}',\n  date: '${today}',\n  author: 'Dr Audric Bugnard',\n  ${nextTopic.pathology ? `pathology: '${nextTopic.pathology}',` : '// thème transversal'}\n  tags: [${nextTopic.keywords.split(', ').map(k => `'${k.trim().replace(/'/g,"\\'")}'`).join(', ')}],\n  readingTime: ${readingTime},\n  sources: [\n${sourcesStr},\n  ],\n  content: \`${safeContent}\`,\n};\n`;

  writeFileSync(join(BLOG_DIR, nextTopic.slug + '.ts'), fileContent, 'utf-8');
  let idx = readFileSync(INDEX_PATH, 'utf-8');
  idx = idx.replace(/^(export const BLOG_ARTICLES)/m, `import { ${varName} } from './${nextTopic.slug}';\n\n$1`);
  idx = idx.replace(/\]\.sort/, `  ${varName},\n].sort`);
  writeFileSync(INDEX_PATH, idx, 'utf-8');
  console.log('ARTICLE_SLUG=' + nextTopic.slug);
}
main().catch((e) => { console.error(e); process.exit(1); });
