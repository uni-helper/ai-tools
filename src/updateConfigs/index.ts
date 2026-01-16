import type { UniMcpOptions } from '@/types'
import { existsSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
import c from 'ansis'
import consola from 'consola'
import { updateClaudeConfig } from './claude'
import { updateCursorConfig } from './cursor'
import { mcpServersConfig } from './print'
import { updateTraeConfig } from './trae'
import { updateTraeCNConfig } from './trae-cn'
import { updateVSCodeConfig } from './vscode'
import { updateWindsurfConfig } from './windsurf'

export const CONSOLE_LOG_PREFIX = c.cyan.bold`[MCP] `

export async function updateConfigs(
  root: string,
  sseUrl: string,
  options: UniMcpOptions,
): Promise<void> {
  const {
    updateConfig = false,
  } = options

  if (updateConfig === false) {
    consola.log(`${CONSOLE_LOG_PREFIX}请手动配置mcpServers`)
    consola.box(mcpServersConfig(sseUrl))
  }

  const configs = updateConfig === 'auto'
    ? [
        existsSync(join(root, '.cursor')) ? 'cursor' as const : null,
        existsSync(join(root, '.vscode')) ? 'vscode' as const : null,
        existsSync(join(homedir(), '.codeium', 'windsurf')) ? 'windsurf' as const : null,
        existsSync(join(root, '.mcp.json')) ? 'claude-code' as const : null,
        existsSync(join(homedir(), '.trae-cn')) ? 'trae-cn' as const : null,
        existsSync(join(homedir(), '.trae')) ? 'trae' as const : null,
      ].filter(x => x !== null)
    : Array.isArray(updateConfig)
      ? updateConfig
      : []

  const configPromises = configs.map(async (config) => {
    switch (config) {
      case 'cursor':
        await updateCursorConfig(root, sseUrl, options)
        break
      case 'vscode':
        await updateVSCodeConfig(root, sseUrl, options)
        break
      case 'windsurf':
        await updateWindsurfConfig(sseUrl, options)
        break
      case 'claude-code':
        await updateClaudeConfig(root, sseUrl, options)
        break
      case 'trae-cn':
        await updateTraeCNConfig(sseUrl, options)
        break
      case 'trae':
        await updateTraeConfig(sseUrl, options)
        break
    }
  })

  await Promise.all(configPromises)
}
