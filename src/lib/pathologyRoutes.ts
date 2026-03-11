/**
 * Utility to build the URL for a V2 pathology page.
 * Route pattern: /pathologies/v2/:slug
 */
export const getPathologyUrl = (slug: string): string => {
  return `/pathologies/v2/${slug}`;
};
