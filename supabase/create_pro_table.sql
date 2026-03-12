-- Table PRO responses (Patient Reported Outcomes)
-- Aucune donnée personnelle — tout est anonyme
CREATE TABLE IF NOT EXISTS pro_responses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  slug text NOT NULL,
  pain_score smallint NOT NULL CHECK (pain_score >= 0 AND pain_score <= 10),
  function_score smallint NOT NULL CHECK (function_score >= 0 AND function_score <= 10),
  helpfulness text NOT NULL CHECK (helpfulness IN ('yes', 'somewhat', 'no')),
  source text DEFAULT 'web',
  -- Pas de user_id, pas d'IP, pas de cookie — 100% anonyme
  CONSTRAINT valid_slug CHECK (slug <> '')
);

-- Index pour les requêtes par pathologie et par date
CREATE INDEX IF NOT EXISTS idx_pro_slug ON pro_responses(slug);
CREATE INDEX IF NOT EXISTS idx_pro_created ON pro_responses(created_at DESC);

-- Row Level Security : tout le monde peut INSERT, seul le dashboard peut SELECT
ALTER TABLE pro_responses ENABLE ROW LEVEL SECURITY;

-- Politique : insertion anonyme autorisée
CREATE POLICY "Anyone can insert PRO" ON pro_responses
  FOR INSERT WITH CHECK (true);

-- Politique : lecture réservée au rôle service (dashboard Stats)
-- Pour l'instant, on autorise aussi anon à lire (le Dr voit les stats sur /stats)
CREATE POLICY "Anyone can read PRO" ON pro_responses
  FOR SELECT USING (true);

-- Table QR scans (tracking des scans en cabine thermale)
CREATE TABLE IF NOT EXISTS qr_scans (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  slug text NOT NULL,
  source text DEFAULT 'thermal_cabin'
);

ALTER TABLE qr_scans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert QR scan" ON qr_scans FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read QR scans" ON qr_scans FOR SELECT USING (true);
