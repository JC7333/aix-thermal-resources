param([switch]$SkipInstall, [switch]$SkipTests)

$ErrorActionPreference = "Stop"
$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
Set-Location $repoRoot

& (Join-Path $PSScriptRoot "run_gates.ps1") @(
  if ($SkipInstall) { "-SkipInstall" }
  if ($SkipTests) { "-SkipTests" }
)

if ($LASTEXITCODE -ne 0) { exit 1 }

& (Join-Path $PSScriptRoot "make_patch_pack.ps1")
