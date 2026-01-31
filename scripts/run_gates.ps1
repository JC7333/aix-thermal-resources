param(
  [switch]$SkipInstall,
  [switch]$SkipTests
)

$ErrorActionPreference = "Stop"
$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
Set-Location $repoRoot

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$logDir = Join-Path $repoRoot "_qa_logs\$timestamp"
New-Item -ItemType Directory -Force -Path $logDir | Out-Null

function Invoke-Step {
  param([string]$Name, [string]$Command)

  $logFile = Join-Path $logDir ("{0}.log" -f $Name)
  "# $Name`n$Command`n" | Out-File -FilePath $logFile -Encoding utf8

  try {
    cmd /c "$Command" *>> $logFile
    return @{ Name=$Name; Ok=$true; Log=$logFile }
  } catch {
    "`n[ERROR] $($PSItem.Exception.Message)`n" | Out-File -FilePath $logFile -Append -Encoding utf8
    return @{ Name=$Name; Ok=$false; Log=$logFile }
  }
}

$results = @()

if (-not $SkipInstall) { $results += Invoke-Step -Name "01_npm_ci" -Command "npm ci" }
$results += Invoke-Step -Name "02_lint" -Command "npm run lint"
$results += Invoke-Step -Name "03_typecheck" -Command "npm run typecheck"
$results += Invoke-Step -Name "04_build" -Command "npm run build"
if (-not $SkipTests) { $results += Invoke-Step -Name "05_tests" -Command "npm run test --if-present" }

if ( ($results | Where-Object { -not $_.Ok }).Count -gt 0 ) { exit 1 }

Write-Host "QA: PASS"
Write-Host "Logs: $logDir"
