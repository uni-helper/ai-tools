import type { UniMcpOptions } from '@/types'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import c from 'ansis'
import consola from 'consola'
import fs from 'fs-extra'
import { CONSOLE_LOG_PREFIX } from '.'

export async function updateCursorConfig(root: string, sseUrl: string, _options: UniMcpOptions) {
  await fs.mkdir(join(root, '.cursor'), { recursive: true })
  const mcp = existsSync(join(root, '.cursor/mcp.json'))
    ? JSON.parse(await fs.readFile(join(root, '.cursor/mcp.json'), 'utf-8') || '{}')
    : {}
  mcp.mcpServers ||= {}
  mcp.mcpServers.uni = { url: sseUrl }
  await fs.writeFile(join(root, '.cursor/mcp.json'), `${JSON.stringify(mcp, null, 2)}\n`)
  consola.log(`${CONSOLE_LOG_PREFIX}${c.gray(`Updated config file ${join(root, '.cursor/mcp.json')}`)}`)
}
