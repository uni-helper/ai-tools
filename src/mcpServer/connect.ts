import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import type { UniMcpOptions } from '@/types'
import { serve } from '@hono/node-server'
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js'
import c from 'ansis'
import fkill from 'fkill'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

export function connectServer(server: McpServer, options: UniMcpOptions) {
  const { port = 2515, printUrl = true } = options

  const transport = new WebStandardStreamableHTTPServerTransport()
  const app = new Hono()
  app.use(
    '*',
    cors({
      origin: '*',
      allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
      allowHeaders: ['Content-Type', 'mcp-session-id', 'Last-Event-ID', 'mcp-protocol-version'],
      exposeHeaders: ['mcp-session-id', 'mcp-protocol-version'],
    }),
  )

  app.all('/mcp', c => transport.handleRequest(c.req.raw))

  fkill(port, { force: true, silent: true }).then(() => {
    server.connect(transport).then(() => {
      if (printUrl) {
        // eslint-disable-next-line no-console
        console.log(`${c.cyan`  ➜  MCP:   `}${c.gray(`server is running at ${c.green(`http://localhost:${port}/mcp`)}`)}`)
      }
      serve({
        fetch: app.fetch,
        port,
      })
    })
  })

  return `http://localhost:${port}/mcp`
}
