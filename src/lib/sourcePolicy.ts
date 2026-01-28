// ============================================
// SOURCE POLICY — Domain filtering & max sources
// Implements public/data/source_policy.json rules
// ============================================

export interface SourcePolicyConfig {
  allowed_source_domains: string[];
  blocked_source_domains: string[];
  max_sources_per_pathology: number;
}

// Hardcoded from public/data/source_policy.json for performance
const SOURCE_POLICY: SourcePolicyConfig = {
  allowed_source_domains: [
    'has-sante.fr',
    'who.int',
    'goldcopd.org',
    'esvs.org',
    'ejves.com',
    'cochranelibrary.com',
    'pubmed.ncbi.nlm.nih.gov',
    'pmc.ncbi.nlm.nih.gov',
    'oarsi.org',
    'sciencedirect.com',
    'epos2020.com',
    'rhinologyjournal.com',
    // Additional trusted medical domains (implicit whitelist)
    'nice.org.uk',
    'ard.bmj.com',
    'bmj.com',
    'publications.aap.org',
  ],
  blocked_source_domains: [
    'doctissimo.fr',
    'youtube.com',
    'www.youtube.com',
    'vidal.fr',
    'blogs.example',
  ],
  max_sources_per_pathology: 6,
};

/**
 * Extract domain from URL
 */
function extractDomain(url: string): string | null {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace(/^www\./, '');
  } catch {
    return null;
  }
}

/**
 * Check if a domain is allowed
 */
function isDomainAllowed(url: string): boolean {
  const domain = extractDomain(url);
  if (!domain) {
    // No URL = always allowed (org-only sources)
    return true;
  }

  // Check blocked list first
  const isBlocked = SOURCE_POLICY.blocked_source_domains.some(
    (blocked) => domain.includes(blocked.replace(/^www\./, ''))
  );
  if (isBlocked) return false;

  // Check allowed list
  const isAllowed = SOURCE_POLICY.allowed_source_domains.some(
    (allowed) => domain.includes(allowed.replace(/^www\./, ''))
  );

  // If domain has URL but not in allowed list, still allow if it's a known medical org
  // (conservative approach: allow sources without explicit URL match)
  return isAllowed || !url;
}

/**
 * Filter sources by policy and limit count
 */
export interface SourceItem {
  title: string;
  org: string;
  year: number;
  url?: string;
  type?: string;
}

export function filterSourcesByPolicy(
  sources: SourceItem[],
  maxCount?: number
): SourceItem[] {
  const max = maxCount ?? SOURCE_POLICY.max_sources_per_pathology;

  // Filter by domain policy
  const filtered = sources.filter((source) => {
    if (!source.url) return true; // No URL = always include
    return isDomainAllowed(source.url);
  });

  // Limit to max count
  return filtered.slice(0, max);
}

/**
 * Validate a single source URL against policy
 */
export function isSourceUrlAllowed(url: string): boolean {
  return isDomainAllowed(url);
}

/**
 * Get policy configuration
 */
export function getSourcePolicy(): SourcePolicyConfig {
  return { ...SOURCE_POLICY };
}

/**
 * Count how many sources pass the policy filter
 */
export function countValidSources(sources: SourceItem[]): number {
  return sources.filter((source) => {
    if (!source.url) return true;
    return isDomainAllowed(source.url);
  }).length;
}
