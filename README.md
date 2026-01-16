# [WIP]uniapp MCP plugin

## 安装

```bash
pnpm add @uni-helper/mcp -D
```

## 配置

在 `vite.config.ts` 中添加如下配置：

```ts
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import mcp from '@uni-helper/mcp'

export default defineConfig({
  plugins: [uni(), mcp()],
})
```


