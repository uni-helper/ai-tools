import type { Plugin } from 'vite'
import type { UniMcpOptions } from './types'
import process from 'node:process'
import minimist from 'minimist'

import { searchForWorkspaceRoot } from 'vite'
import { connectServer } from './mcpServer/connect'
import { createMcpServer } from './mcpServer/server'
import { updateConfigs } from './updateConfigs'

export function isBuild() {
  const args = minimist(process.argv.slice(2))
  const isBuild = args._.includes('build')
  return isBuild
}

export default function uniMcp(options: UniMcpOptions = {}): Plugin | undefined {
  if (isBuild())
    return

  return {
    name: 'uni-mcp',
    enforce: 'post',
    async configResolved(config) {
      const mcp = await createMcpServer(config, options)
      const url = connectServer(mcp, options)

      const root = searchForWorkspaceRoot(config.root)
      await updateConfigs(root, url, options)
    },
  }
}
