const process = require('node:process')
const { env } = require('@huggingface/transformers')
const { HuggingFaceTransformersEmbeddings } = require('@langchain/community/embeddings/huggingface_transformers')

async function downloadModel() {
  env.remoteHost = 'https://hf-mirror.com'

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
