import type { UniMcpOptions } from '@/types'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import c from 'ansis'
import consola from 'consola'
import fs from 'fs-extra'
import { CONSOLE_LOG_PREFIX } from '.'

export async function updateVSCodeConfig(root: string, sseUrl: string, _options: UniMcpOptions) {
  await fs.mkdir(join(root, '.vscode'), { recursive: true })
  const mcp = existsSync(join(root, '.vscode/mcp.json'))
    ? JSON.parse(await fs.readFile(join(root, '.vscode/mcp.json'), 'utf-8') || '{}')
    : {}
  mcp.servers ||= {}
  mcp.servers.uni = {
    type: 'http',
    url: sseUrl,
  }
  await fs.writeFile(join(root, '.vscode/mcp.json'), `${JSON.stringify(mcp, null, 2)}\n`)
  consola.log(`${CONSOLE_LOG_PREFIX}${c.gray(`Updated config file ${join(root, '.vscode/mcp.json')}`)}`)
}
