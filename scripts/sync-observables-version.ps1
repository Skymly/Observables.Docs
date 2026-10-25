#Requires -Version 7.0
<#
.SYNOPSIS
    Syncs the Observables version referenced by this repository.

.DESCRIPTION
    Reads the current version from .vitepress/observables-version.ts (the
    single source of truth; markdown pages use the %%OBS_VERSION%% token),
    then rewrites every tracked file that still carries the old literal.

    Used by two callers:
    - Observables release.yml (sync-docs job) opens a bump PR after a stable
      release is published.
    - version-drift.yml verifies literals stay consistent.

.EXAMPLE
    pwsh scripts/sync-observables-version.ps1 -Version 0.5.0
#>
param(
    [Parameter(Mandatory = $true)]
    [string]$Version
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

if ($Version -notmatch '^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$') {
    throw "Invalid version '$Version' (expected semver like 0.5.0 or 0.5.0-preview1)."
}

$repoRoot = Split-Path -Parent $PSScriptRoot
Push-Location $repoRoot
try {
    $sourceFile = '.vitepress/observables-version.ts'
    $sourceText = [System.IO.File]::ReadAllText((Join-Path $repoRoot $sourceFile))
    $current = [regex]::Match($sourceText, "observablesVersion\s*=\s*'([^']+)'").Groups[1].Value
    if (-not $current) {
        throw "Could not read observablesVersion from $sourceFile."
    }

    if ($current -eq $Version) {
        Write-Host "Already at $Version; nothing to do."
        return
    }

    $files = @(git grep -lF $current --)
    if ($files.Count -eq 0) {
        throw "No tracked files contain the current version '$current'."
    }

    $utf8NoBom = [System.Text.UTF8Encoding]::new($false)
    $escaped = [regex]::Escape($current)
    foreach ($file in $files) {
        $path = Join-Path $repoRoot $file
        $text = [System.IO.File]::ReadAllText($path)
        [System.IO.File]::WriteAllText($path, [regex]::Replace($text, $escaped, $Version), $utf8NoBom)
        Write-Host "Updated $file"
    }
    Write-Host "Synced Observables version $current -> $Version ($($files.Count) file(s))."
}
finally {
    Pop-Location
}
