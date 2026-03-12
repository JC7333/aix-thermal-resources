import { useEffect } from 'react';

const BASE_TITLE = 'Étuve';

export const usePageTitle = (title?: string) => {
  useEffect(() => {
    document.title = title ? `${title} — ${BASE_TITLE}` : `${BASE_TITLE} — Éducation thérapeutique en cure thermale`;
    return () => { document.title = BASE_TITLE; };
  }, [title]);
};
