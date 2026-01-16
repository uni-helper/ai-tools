import type { UniMcpOptions } from '@/types'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import c from 'ansis'
import consola from 'consola'
import fs from 'fs-extra'
import { CONSOLE_LOG_PREFIX } from '.'

export async function updateClaudeConfig(root: string, sseUrl: string, _options: UniMcpOptions) {
  const mcp = existsSync(join(root, '.mcp.json'))
    ? JSON.parse(await fs.readFile(join(root, '.mcp.json'), 'utf-8') || '{}')
    : {}
  mcp.mcpServers ||= {}
  mcp.mcpServers.uni = {
    type: 'http',
    url: sseUrl,
  }
  await fs.writeFile(join(root, '.mcp.json'), `${JSON.stringify(mcp, null, 2)}\n`)
  consola.log(`${CONSOLE_LOG_PREFIX}${c.gray(`Updated config file ${join(root, '.mcp.json')}`)}`)
}
