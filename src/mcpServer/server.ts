import type { ResolvedConfig } from 'vite'
import type { UniMcpOptions } from '@/types'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'
import { loadVectorStore } from '@/docs'
import { version } from '../../package.json'
import { analyzeProject } from './projectAnalyzer'

export async function createMcpServer(config: ResolvedConfig, options: UniMcpOptions) {
  const server = new McpServer({
    name: 'uni',
    version,
  })

  server.registerTool(
    'get-vite-config',
    {
      title: '获取 Vite 配置',
      description: '获取 Vite 配置摘要，包括根目录、解析配置、插件和环境名称。',
    },
    () => ({
      content: [{
        type: 'text',
        text: JSON.stringify({
          root: config.root,
          resolve: config.resolve,
          plugins: config.plugins.map(p => p.name).filter(Boolean),
          environmentNames: Object.keys(config.environments),
        }),
      }],
    }),
  )

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
      const vectorStore = await loadVectorStore('uniapp', options.embeddings)
      const result = await vectorStore.similaritySearch(query, 3)
      return {
        content: result.map(doc => ({
          type: 'text',
          text: JSON.stringify(doc),
        })),
      }
    },
  )

  server.registerTool(
    'get-project-overview',
    {
      title: '获取项目概览',
      description: '返回 Uniapp 项目的 pages.json 和 manifest.json 配置文件。',
    },
    async () => {
      const overview = await analyzeProject(config.root)
      return {
        content: [{
          type: 'text',
          text: JSON.stringify(overview, null, 2),
        }],
      }
    },
  )

  return server
}
