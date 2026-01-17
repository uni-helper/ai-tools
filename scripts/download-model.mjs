import process from 'node:process'
import { env } from '@huggingface/transformers'
import { HuggingFaceTransformersEmbeddings } from '@langchain/community/embeddings/huggingface_transformers'

async function downloadModel() {
  env.version = 'master'
  env.remoteHost = 'https://www.modelscope.cn/models'
  await new Promise(resolve => setTimeout(resolve, 1000))
  const embeddings = new HuggingFaceTransformersEmbeddings({
    model: 'onnx-community/Qwen3-Embedding-0.6B-ONNX',
    pretrainedOptions: {
      dtype: 'int8',
      device: 'cpu',
    },
  })

  await embeddings.embedQuery('warmup')
}

downloadModel().catch((err) => {
  console.error(err)
  process.exit(1)
})
