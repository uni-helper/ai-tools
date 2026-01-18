# [WIP]UniAPP AI Tools

缓慢随缘更新中，欢迎贡献你的 uniapp 最佳实践来完善 [skills](./src/skills/uniapp)。

> 仅使用 MCP 即可按下方文档安装。使用 `MCP + RAG` 方案来查询 uniapp 文档。
<details>
<summary>点击查看安装和配置</summary>

## 安装

```bash
pnpm add @uni-helper/mcp -D
```

## 配置

在 `vite.config.ts` 中添加如下配置：

```ts
import mcp from '@uni-helper/mcp'
import uni from '@uni-helper/plugin-uni'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [uni(), mcp()],
})
```

## 配置 MCP 服务器
```json
{
  "mcpServers": {
    "uni": {
      "url": "http://localhost:2515/mcp"
    }
  }
}
```

## 注意如果使用pnpm，请在`pnpm-workspace.yaml`中添加如下配置：
确保能正确构建`@uni-helper/mcp`插件
```yaml
onlyBuiltDependencies:
  - hnswlib-node
  - '@uni-helper/mcp'
```

</details>
