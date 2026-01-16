import type { EmbeddingsInterface } from '@langchain/core/embeddings'

export type SupportedUpdateConfigType = 'cursor' | 'vscode' | 'windsurf' | 'claude-code' | 'trae-cn' | 'trae'

export interface UpdateConfigAdditionalServer {
  name: string
  url?: string
}

export type MaybeArray<T> = T | T[]

export interface UniMcpOptions {
  /**
   * 监听的端口，默认为 Vite 开发服务器的端口
   */
  port?: number

  /**
   * 在控制台打印 MCP 服务器 URL
   *
   * @default true
   */
  printUrl?: boolean

  /**
   * 自定义的 Embeddings 模型
   *
   * 内置模型为 Qwen3-Embedding-0.6B-ONNX
   *
   * 如果本地运行效率低，可自定义模型
   * - 确保模型支持 1024 维
   * - 支持 langchain 的 Embeddings 格式
   * @default
   * ```ts
   * new HuggingFaceTransformersEmbeddings({
   *   model: 'onnx-community/Qwen3-Embedding-0.6B-ONNX',
   *   pretrainedOptions: {
   *     dtype: 'int8',
   *     device: 'cpu',
   *   },
   * })
   * ```
   */
  embeddings?: EmbeddingsInterface

  /**
   * 要更新的配置类型
   *
   * - `auto` - 如果配置文件存在则自动更新
   * - `cursor` - 更新 Cursor 配置文件 `.cursor/mcp.json`
   * - `vscode` - 更新 VSCode 配置文件 `.vscode/settings.json`
   * - `windsurf` - 更新 Windsurf 配置文件 `~/.codeium/windsurf/mcp_config.json`
   * - `claude-code` - 更新 Claude Code 配置文件 `.mcp.json`
   * - `trae-cn` - 更新 Trae 配置文件 `~/trae CN/mcp.json`
   * - `trae` - 更新 Trae 配置文件 `.trae/mcp.json`
   *
   * @default false
   */
  updateConfig?: 'auto' | false | MaybeArray<SupportedUpdateConfigType>
}
