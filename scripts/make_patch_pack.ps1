param([string[]]$Paths)

$ErrorActionPreference = "Stop"
$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
Set-Location $repoRoot

function Get-ChangedPaths {
  $staged = (git diff --name-only --cached --diff-filter=ACMRT) 2>$null
  if ($staged -and $staged.Length -gt 0) { return $staged }

  $unstaged = (git diff --name-only --diff-filter=ACMRT) 2>$null
  if ($unstaged -and $unstaged.Length -gt 0) { return $unstaged }

  return @()
}

$pathsToPack = @()
if ($Paths -and $Paths.Count -gt 0) { $pathsToPack = $Paths } else { $pathsToPack = Get-ChangedPaths }

if (-not $pathsToPack -or $pathsToPack.Count -eq 0) {
  Write-Host "Aucun fichier à packer. Stage tes changements puis relance." -ForegroundColor Yellow
  exit 1
}

$patchDir = Join-Path $repoRoot "_patch_pack"
if (Test-Path $patchDir) { Remove-Item -Recurse -Force $patchDir }
New-Item -ItemType Directory -Force -Path $patchDir | Out-Null

function Copy-Rel([string]$RelPath) {
  $src = Join-Path $repoRoot $RelPath
  if (-not (Test-Path $src)) { return }
  $dst = Join-Path $patchDir $RelPath
  $dstDir = Split-Path -Parent $dst
  New-Item -ItemType Directory -Force -Path $dstDir | Out-Null
  Copy-Item -Force $src $dst
}

foreach ($p in $pathsToPack) { Copy-Rel $p }
Copy-Rel "QA.md"
Copy-Rel "public/data/video_library_validated.json"
Copy-Rel "public/data/source_policy.json"

$zipPath = Join-Path $repoRoot "patch_pack.zip"
if (Test-Path $zipPath) { Remove-Item -Force $zipPath }
Compress-Archive -Path (Join-Path $patchDir "*") -DestinationPath $zipPath -Force

Write-Host "OK: patch_pack.zip généré → $zipPath"
