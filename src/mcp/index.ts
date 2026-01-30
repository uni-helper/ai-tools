import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { Command } from 'commander'
import { createMcpServer } from './server'

export const mcp = new Command()
  .name('mcp')
  .description('start mcp server')
  .action(async () => {
    const server = await createMcpServer()
    const transport = new StdioServerTransport()
    await server.connect(transport)
  })
