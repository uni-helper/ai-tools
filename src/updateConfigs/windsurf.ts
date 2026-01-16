import type { UniMcpOptions } from '@/types'
import { existsSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
import c from 'ansis'
import consola from 'consola'
import fs from 'fs-extra'
import { CONSOLE_LOG_PREFIX } from '.'

export async function updateWindsurfConfig(sseUrl: string, _options: UniMcpOptions) {
  const windsurfDir = join(homedir(), '.codeium', 'windsurf')
  const windsurfConfigPath = join(windsurfDir, 'mcp_config.json')
  try {
    await fs.mkdir(windsurfDir, { recursive: true })
    const config = existsSync(windsurfConfigPath)
      ? JSON.parse(await fs.readFile(windsurfConfigPath, 'utf-8').catch(() => '{}') || '{}')
      : {}
    config.mcpServers ||= {}
    config.mcpServers.uni = { serverUrl: sseUrl }
    await fs.writeFile(windsurfConfigPath, `${JSON.stringify(config, null, 2)}\n`)
    consola.log(`${CONSOLE_LOG_PREFIX}${c.gray(`Updated config file ${windsurfConfigPath}`)}`)
  }
  catch (e) {
    consola.error(`${CONSOLE_LOG_PREFIX}${c.red(`Failed to update ${windsurfConfigPath}`)}${e}`)
  }
}
