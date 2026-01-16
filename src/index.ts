import type { Plugin } from 'vite'
import type { UniMcpOptions } from './types'
import { searchForWorkspaceRoot } from 'vite'
import { connectServer } from './mcpServer/connect'
import { createMcpServer } from './mcpServer/server'
import { updateConfigs } from './updateConfigs'

export default function uniMcp(options: UniMcpOptions = {}): Plugin {
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
