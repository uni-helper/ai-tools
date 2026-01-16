import { join } from 'node:path'
import fs from 'fs-extra'

interface ProjectOverview {
  pagesJson: {
    exists: boolean
    path: string
    content?: string
  }
  manifestJson: {
    exists: boolean
    path: string
    content?: string
  }
}

async function readFileIfExists(path: string) {
  const content = await fs.readFile(path, 'utf-8').catch(() => undefined)
  return { exists: !!content, path, content }
}

export async function analyzeProject(rootPath: string): Promise<ProjectOverview> {
  const [pagesJson, manifestJson] = await Promise.all([
    readFileIfExists(join(rootPath, 'src/pages.json')),
    readFileIfExists(join(rootPath, 'src/manifest.json')),
  ])

  return { pagesJson, manifestJson }
}
