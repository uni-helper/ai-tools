import type { PretrainedOptions } from '@huggingface/transformers'
import type { EmbeddingsInterface } from '@langchain/core/embeddings'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { env } from '@huggingface/transformers'
import { HuggingFaceTransformersEmbeddings } from '@langchain/community/embeddings/huggingface_transformers'
import { HNSWLib } from '@langchain/community/vectorstores/hnswlib'

const __dirname = dirname(fileURLToPath(import.meta.url))
type VectorStoreName = 'uniapp'

export async function loadVectorStore(vectorName: VectorStoreName, _embeddings?: EmbeddingsInterface) {
  const vectorDirMap = {
    uniapp: join(__dirname, '../', 'vectorStore', 'uniapp'),
  }

  // 配置 ModelScope 镜像
  env.version = 'master'
  env.remoteHost = 'https://www.modelscope.cn/models'
  const embeddings = _embeddings ?? new HuggingFaceTransformersEmbeddings({
    model: 'onnx-community/Qwen3-Embedding-0.6B-ONNX',
    pretrainedOptions: {
      dtype: 'int8', // 这个最小
      device: 'cpu', // 只支持 CPU
    } as PretrainedOptions,
  })

  return await HNSWLib.load(vectorDirMap[vectorName], embeddings)
}
