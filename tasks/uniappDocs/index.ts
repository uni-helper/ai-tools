import type { PretrainedOptions } from '@huggingface/transformers'
import { existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'
import { env } from '@huggingface/transformers'
import { HuggingFaceTransformersEmbeddings } from '@langchain/community/embeddings/huggingface_transformers'
import { HNSWLib } from '@langchain/community/vectorstores/hnswlib'
import { OllamaEmbeddings } from '@langchain/ollama'
import { MarkdownTextSplitter } from '@langchain/textsplitters'
import consola from 'consola'
import { WebToMarkdownLoader } from './MDfromWebLoader'

async function main() {
  // consola.start('加载模型')
  // env.remoteHost = 'https://hf-mirror.com'
  // const embeddings = new HuggingFaceTransformersEmbeddings({
  //   model: 'onnx-community/Qwen3-Embedding-0.6B-ONNX',
  //   pretrainedOptions: {
  //     dtype: 'fp32',
  //     device: 'cpu',
  //   } as PretrainedOptions,
  // })
  // await embeddings.embedQuery('warmup')
  // consola.success('模型加载完成')

  // 也可以使用 Ollama 模型 进行嵌入
  const embeddings = new OllamaEmbeddings({
    model: 'qwen3-embedding:0.6b',
    baseUrl: 'http://localhost:11434',
  })

  consola.start('加载文档')
  const contentSelector = '.content__default'
  const webLoader = new WebToMarkdownLoader(
    'https://uniapp.dcloud.net.cn/sitemap.xml',
    {
      selector: contentSelector,
    },
  )

  const allDocs = await webLoader.load()
  consola.success('文档加载完成')

  const splitter = new MarkdownTextSplitter({
    chunkSize: 2000,
    chunkOverlap: 300,
  })

  const vectorDir = join(process.cwd(), 'vectorStore', 'uniapp')

  if (!existsSync(vectorDir)) {
    mkdirSync(vectorDir, { recursive: true })
  }

  const vectorStore = await HNSWLib.fromDocuments([], embeddings)

  const BATCH_SIZE = 10
  for (let i = 0; i < allDocs.length; i += BATCH_SIZE) {
    const batch = allDocs.slice(i, i + BATCH_SIZE)
    const docsToAdd: typeof allDocs = []
    for (const doc of batch) {
      if (doc.pageContent.length >= 4000) {
        const splitDocs = await splitter.splitDocuments([doc])
        docsToAdd.push(...splitDocs)
      }
      else {
        docsToAdd.push(doc)
      }
    }
    consola.info(`处理批次 ${Math.min(i + BATCH_SIZE, allDocs.length)}/${allDocs.length}`)
    await vectorStore.addDocuments(docsToAdd)
  }

  consola.success('文档切分完成')
  await vectorStore.save(vectorDir)
  consola.success('向量数据库保存完成')
}
main()
