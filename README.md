# [WIP]uniapp MCP plugin

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
