import type { UniMcpOptions } from '@/types'
import { Buffer } from 'node:buffer'
import c from 'ansis'
import consola from 'consola'
import open from 'open'
import { CONSOLE_LOG_PREFIX } from '.'

export async function updateTraeCNConfig(sseUrl: string, _options: UniMcpOptions) {
  const config = Buffer.from(JSON.stringify({ url: sseUrl })).toString('base64')
  const SchemaLink = `trae-cn://trae.ai-ide/mcp-import?type=http&name=uni&config=${config}`
  await open(SchemaLink)
  consola.log(`${CONSOLE_LOG_PREFIX}${c.gray(`自动配置了trae-cn链接，请在trae-cn中确认`)}`)
}
