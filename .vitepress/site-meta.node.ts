import { execSync } from 'node:child_process'
import type { SiteMeta } from './site-meta.shared'

function readGit(command: string): string {
  return execSync(command, { encoding: 'utf-8' }).trim()
}

export function readSiteMeta(): SiteMeta {
  try {
    const commitSha = readGit('git rev-parse HEAD')
    const lastUpdated = readGit('git log -1 --format=%cI')
    return {
      lastUpdated,
      commitSha,
      shortSha: commitSha.slice(0, 7),
    }
  } catch {
    const now = new Date().toISOString()
    return {
      lastUpdated: now,
      commitSha: '',
      shortSha: 'local',
    }
  }
}
