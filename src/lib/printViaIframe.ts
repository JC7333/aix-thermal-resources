// ============================================
// IMPRESSION VIA IFRAME CACHÉE — ÉTUVE
// ============================================
// Remplace window.open() pour éviter le blocage
// "Cette page a été bloquée par Chrome"
// Fonctionne avec Blob ou URL existante.
// ============================================

/**
 * Imprime un document via un iframe caché.
 * Aucun window.open(), aucun popup, aucun blocage Chrome.
 *
 * @param source - Blob PDF, ou URL (blob: ou http:), ou HTML string
 * @param options.onError - callback si l'impression échoue
 */
export function printViaIframe(
  source: Blob | string,
  options?: { onError?: () => void },
): void {
  let url: string;
  let needsRevoke = false;

  if (source instanceof Blob) {
    url = URL.createObjectURL(source);
    needsRevoke = true;
  } else if (source.startsWith("blob:") || source.startsWith("http")) {
    url = source;
  } else {
    // HTML string → blob → URL
    const blob = new Blob([source], { type: "text/html;charset=utf-8" });
    url = URL.createObjectURL(blob);
    needsRevoke = true;
  }

  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "none";
  iframe.style.opacity = "0";
  iframe.style.pointerEvents = "none";
  iframe.src = url;

  const cleanup = () => {
    setTimeout(() => {
      try {
        document.body.removeChild(iframe);
      } catch {
        // already removed
      }
      if (needsRevoke) URL.revokeObjectURL(url);
    }, 2000);
  };

  iframe.onload = () => {
    try {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    } catch {
      // Cross-origin or blocked — fallback to download
      options?.onError?.();
    }
    cleanup();
  };

  iframe.onerror = () => {
    options?.onError?.();
    cleanup();
  };

  document.body.appendChild(iframe);
}

/**
 * Télécharge un contenu HTML sous forme de fichier .html
 * (fallback quand l'impression échoue)
 */
export function downloadHtmlFallback(html: string, filename: string): void {
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
