import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'
import { version } from '../../../package.json'
import { loadVectorStore } from './../docs'

export async function createMcpServer() {
  const server = new McpServer({
    name: 'uni',
    version,
  })

  server.registerTool(
    'search-docs-by-Uniapp-official',
    {
      title: '搜索 Uniapp 官方文档',
      description: '在 Uniapp 文档知识库中进行搜索，可查找相关信息、代码示例、API参考文档和操作指南。当您需要解答关于Uniapp文档的问题、查找特定文档内容、了解功能运作原理或定位实现细节时，可使用此工具。搜索结果将返回带有标题的上下文相关内容，并附有直达文档页面的链接。',
      inputSchema: {
        query: z.string().describe('用于搜索内容的查询语句'),
      },
    },
    async ({ query }) => {
      const vectorStore = await loadVectorStore('uniapp')
      const result = await vectorStore.similaritySearch(query, 3)
      return {
        content: result.map(doc => ({
          type: 'text',
          text: JSON.stringify(doc),
        })),
      }
    },
  )

  return server
}
