import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { readdirSync, writeFileSync } from "fs";

function sitemapPlugin(): import("vite").Plugin {
  return {
    name: "etuve-sitemap",
    closeBundle() {
      const distDir = path.resolve("dist");
      const staticPages = ["", "blog", "telechargements", "qui-suis-je", "programme", "mentions-legales"];
      const pathologies = [
        "gonarthrose", "lombalgie-chronique", "coxarthrose", "insuffisance-veineuse",
        "bpco", "otites-repetition-enfant", "fibromyalgie", "rhinosinusite-chronique",
        "tendinopathie-coiffe", "arthrose-digitale", "asthme",
      ];
      const blogDir = path.resolve("src/content/blog");
      const blogSlugs: string[] = [];
      try {
        for (const f of readdirSync(blogDir)) {
          if (f.endsWith(".ts") && !["types.ts", "constants.ts", "index.ts"].includes(f)) {
            blogSlugs.push(f.replace(".ts", ""));
          }
        }
      } catch (_e) { /* no blog dir yet */ }

      const today = new Date().toISOString().split("T")[0];
      const base = "https://etuve.fr";
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
      for (const p of staticPages) xml += `  <url><loc>${base}/${p}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq></url>\n`;
      for (const s of pathologies) {
        xml += `  <url><loc>${base}/pathologies/v2/${s}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq></url>\n`;
        xml += `  <url><loc>${base}/parcours/${s}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq></url>\n`;
      }
      for (const s of blogSlugs) xml += `  <url><loc>${base}/blog/${s}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq></url>\n`;
      xml += "</urlset>";
      writeFileSync(path.join(distDir, "sitemap.xml"), xml, "utf-8");
      console.log("[sitemap] Generated " + (staticPages.length + pathologies.length * 2 + blogSlugs.length) + " URLs");
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), sitemapPlugin(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
