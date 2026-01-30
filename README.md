# UniAPP MCP

> 访问[uni-helper/skills](https://github.com/uni-helper/skills)获取`skills`。

使用 `MCP + RAG` 方案来查询 uniapp 文档。

## 安装

```bash
pnpm add @uni-helper/mcp -D
```

## 配置 MCP 服务器
```json
{
  "mcpServers": {
    "uni-doc": {
      "command": "uni-mcp"
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
