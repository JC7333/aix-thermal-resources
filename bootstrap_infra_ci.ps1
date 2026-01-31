Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Ensure-Dir([string]$Path) {
  if (!(Test-Path $Path)) { New-Item -ItemType Directory -Force -Path $Path | Out-Null }
}

function Write-File([string]$Path, [string]$Content) {
  $dir = Split-Path -Parent $Path
  if ($dir -and !(Test-Path $dir)) { Ensure-Dir $dir }
  Set-Content -Path $Path -Value $Content -Encoding UTF8
}

function Append-IfMissing([string]$Path, [string]$Block, [string]$Needle) {
  $txt = ""
  if (Test-Path $Path) { $txt = Get-Content -Raw -Path $Path }
  if ($txt -notmatch [regex]::Escape($Needle)) {
    if ($txt.Length -gt 0 -and $txt[-1] -ne "`n") { $txt += "`r`n" }
    $txt += $Block
    Set-Content -Path $Path -Value $txt -Encoding UTF8
  }
}

# Sanity checks
if (!(Test-Path ".git")) { throw "ERREUR: pas de dossier .git ici. Ouvre le bon dossier repo." }
if (!(Test-Path "package.json")) { throw "ERREUR: package.json introuvable. Ouvre le bon dossier repo." }

# 1) .gitignore: add QA/patch-pack ignores (idempotent)
$gitignoreBlock = @"
`r`n# Local QA / patch packs
_qa_logs/
_patch_pack/
patch_pack.zip
"@
Append-IfMissing -Path ".gitignore" -Block $gitignoreBlock -Needle "_qa_logs/"

# 2) package.json: add script typecheck (minimal text insert)
$pkg = Get-Content -Raw -Path "package.json"

if ($pkg -notmatch '"typecheck"\s*:') {
  if ($pkg -match '"lint"\s*:\s*"eslint \."\s*,') {
    $pkg = [regex]::Replace(
      $pkg,
      '("lint"\s*:\s*"eslint \."\s*,)',
      '$1' + "`r`n    `"typecheck`": `"tsc -p tsconfig.json --noEmit`",",
      1
    )
  } else {
    # fallback: insert first line inside scripts object
    $pkg = [regex]::Replace(
      $pkg,
      '("scripts"\s*:\s*\{)',
      '$1' + "`r`n    `"typecheck`": `"tsc -p tsconfig.json --noEmit`",",
      1
    )
  }
  Set-Content -Path "package.json" -Value $pkg -Encoding UTF8
}

# 3) Create CI workflow + templates + docs
Ensure-Dir ".github/workflows"
Ensure-Dir ".github/ISSUE_TEMPLATE"
Ensure-Dir "docs"
Ensure-Dir "scripts"

Write-File ".github/workflows/ci.yml" @"
name: CI

on:
  pull_request:
  push:
    branches:
      - main
      - lovable-dev

jobs:
  build:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Typecheck
        run: npm run typecheck

      - name: Build
        run: npm run build

      - name: Tests
        run: npm run test --if-present
"@

Write-File ".github/pull_request_template.md" @"
## Objectif
Décris en 1–2 phrases le problème utilisateur et ce que corrige ce PR.

## Changements (patch minimal)
- [ ] Changement 1
- [ ] Changement 2

## Risques + rollback
- Risques :
- Rollback : `git revert <sha>`

## Tests
### Gate 0 — Build clean
- [ ] CI GitHub Actions = ✅ (lint/typecheck/build/tests)

### Gate 1 — UX P0 (si concerné)
- [ ] ScrollToTop OK (navigations/CTA/footer)
- [ ] Cards/liens OK (pas de redirection parasite)
- [ ] V1 → V2 OK
- [ ] Disclaimer + urgence en footer droite

### Gate 2 — Guides P0 (si concerné)
- [ ] 1 colonne, lisible, pas de page vide
- [ ] Print/Download OK (Chrome)
- [ ] Sources visibles et cohérentes

## QA rapide (preuves)
- Lovable preview URL :
- Pages testées :
"@

Write-File ".github/ISSUE_TEMPLATE/config.yml" @"
blank_issues_enabled: true
"@

Write-File ".github/ISSUE_TEMPLATE/p0_stabilisation.yml" @"
name: "P0 — Stabilisation (UX/Tech)"
description: "Bug/régression bloquante (Gate 0/1/2). Patch minimal obligatoire."
title: "[P0] "
labels: ["P0", "bug"]
body:
  - type: textarea
    id: context
    attributes:
      label: Contexte
      description: "URL Lovable preview + page(s) + ce qui a changé."
    validations:
      required: true
  - type: textarea
    id: repro
    attributes:
      label: Étapes de reproduction
      placeholder: |
        1) ...
        2) ...
        3) ...
    validations:
      required: true
  - type: textarea
    id: expected
    attributes:
      label: Attendu
    validations:
      required: true
  - type: textarea
    id: actual
    attributes:
      label: Observé
    validations:
      required: true
"@

Write-File ".github/ISSUE_TEMPLATE/p1_contenu.yml" @"
name: "P1 — Contenu (evidence/médias/guides)"
description: "Ajout/ajustement contenu (JSON strict, sources allowlist, guides standard)."
title: "[P1] "
labels: ["P1", "content"]
body:
  - type: textarea
    id: scope
    attributes:
      label: Scope
      description: "Slug(s) + livrables (sources, vidéos, guide 1 page, etc.)."
    validations:
      required: true
  - type: textarea
    id: acceptance
    attributes:
      label: Critères d'acceptation
      placeholder: |
        - Page V2 OK
        - 3–6 sources max
        - Red flags sourcés
        - 2 vidéos validées
        - Guide print/download OK
    validations:
      required: true
"@

Write-File "docs/QA_RELEASE_CHECKLIST.md" @"
# QA — Release Checklist

## Gate 0 — Build Clean (bloquant)
- [ ] CI GitHub Actions = ✅ (lint/typecheck/build/tests)

## Gate 1 — UX P0 (bloquant)
- [ ] ScrollToTop OK (navigations/CTA/footer)
- [ ] Cards vidéos/CTA : aucun clic ne redirige vers `/pathologies` par erreur
- [ ] Routing : V1 → V2 OK
- [ ] Disclaimer + urgence en footer bas-droite

## Gate 2 — Guides P0 (bloquant si guides touchés)
- [ ] 1 colonne, police lisible
- [ ] pas de page vide
- [ ] Print/Download OK (Chrome)
- [ ] sources visibles
"@

# 4) Scripts PowerShell (local gates + patch pack)
Write-File "scripts/run_gates.ps1" @"
param(
  [switch]`$SkipInstall,
  [switch]`$SkipTests
)

`$ErrorActionPreference = 'Stop'
`$repoRoot = Resolve-Path (Join-Path `$PSScriptRoot '..')
Set-Location `$repoRoot

`$timestamp = Get-Date -Format 'yyyyMMdd-HHmmss'
`$logDir = Join-Path `$repoRoot "_qa_logs\`$timestamp"
New-Item -ItemType Directory -Force -Path `$logDir | Out-Null

function Invoke-Step {
  param([string]`$Name, [string]`$Command)
  `$logFile = Join-Path `$logDir ("{0}.log" -f `$Name)
  "# `$Name`n`$Command`n" | Out-File -FilePath `$logFile -Encoding utf8
  try {
    cmd /c "`$Command" *>> `$logFile
    return @{ Name=`$Name; Ok=`$true; Log=`$logFile }
  } catch {
    "`n[ERROR] `$($_)`n" | Out-File -FilePath `$logFile -Append -Encoding utf8
    return @{ Name=`$Name; Ok=`$false; Log=`$logFile }
  }
}

`$results = @()

if (-not `$SkipInstall) {
  `$results += Invoke-Step -Name '01_npm_ci' -Command 'npm ci'
}

`$results += Invoke-Step -Name '02_lint' -Command 'npm run lint'
`$results += Invoke-Step -Name '03_typecheck' -Command 'npm run typecheck'
`$results += Invoke-Step -Name '04_build' -Command 'npm run build'

if (-not `$SkipTests) {
  `$results += Invoke-Step -Name '05_tests' -Command 'npm run test --if-present'
}

`$allOk = (`$results | Where-Object { -not `$_.Ok }).Count -eq 0
if (-not `$allOk) { exit 1 }

Write-Host "QA: PASS"
Write-Host "Logs: `$logDir"
"@

Write-File "scripts/make_patch_pack.ps1" @"
param([string[]]`$Paths)

`$ErrorActionPreference = 'Stop'
`$repoRoot = Resolve-Path (Join-Path `$PSScriptRoot '..')
Set-Location `$repoRoot

function Get-ChangedPaths {
  `$staged = (git diff --name-only --cached --diff-filter=ACMRT) 2>`$null
  if (`$staged -and `$staged.Length -gt 0) { return `$staged }
  `$unstaged = (git diff --name-only --diff-filter=ACMRT) 2>`$null
  if (`$unstaged -and `$unstaged.Length -gt 0) { return `$unstaged }
  return @()
}

`$pathsToPack = @()
if (`$Paths -and `$Paths.Count -gt 0) { `$pathsToPack = `$Paths } else { `$pathsToPack = Get-ChangedPaths }

if (-not `$pathsToPack -or `$pathsToPack.Count -eq 0) {
  Write-Host "Aucun fichier à packer. Stage tes changements puis relance." -ForegroundColor Yellow
  exit 1
}

`$patchDir = Join-Path `$repoRoot '_patch_pack'
if (Test-Path `$patchDir) { Remove-Item -Recurse -Force `$patchDir }
New-Item -ItemType Directory -Force -Path `$patchDir | Out-Null

function Copy-Rel([string]`$RelPath) {
  `$src = Join-Path `$repoRoot `$RelPath
  if (-not (Test-Path `$src)) { return }
  `$dst = Join-Path `$patchDir `$RelPath
  `$dstDir = Split-Path -Parent `$dst
  New-Item -ItemType Directory -Force -Path `$dstDir | Out-Null
  Copy-Item -Force `$src `$dst
}

foreach (`$p in `$pathsToPack) { Copy-Rel `$p }
Copy-Rel 'QA.md'
Copy-Rel 'public/data/video_library_validated.json'
Copy-Rel 'public/data/source_policy.json'

`$zipPath = Join-Path `$repoRoot 'patch_pack.zip'
if (Test-Path `$zipPath) { Remove-Item -Force `$zipPath }
Compress-Archive -Path (Join-Path `$patchDir '*') -DestinationPath `$zipPath -Force
Write-Host "OK: patch_pack.zip généré → `$zipPath"
"@

Write-File "scripts/qa_and_pack.ps1" @"
param([switch]`$SkipInstall, [switch]`$SkipTests)

`$ErrorActionPreference = 'Stop'
`$repoRoot = Resolve-Path (Join-Path `$PSScriptRoot '..')
Set-Location `$repoRoot

& (Join-Path `$PSScriptRoot 'run_gates.ps1') @(
  if (`$SkipInstall) { '-SkipInstall' }
  if (`$SkipTests) { '-SkipTests' }
)

if (`$LASTEXITCODE -ne 0) { exit 1 }

& (Join-Path `$PSScriptRoot 'make_patch_pack.ps1')
"@

Write-Host ""
Write-Host "OK: Infra CI installée. Prochaines étapes:"
Write-Host "1) GitHub Desktop: Commit + Push"
Write-Host "2) Ouvrir PR vers lovable-dev (ou main)"
Write-Host "3) GitHub > Actions: vérifier CI ✅"
