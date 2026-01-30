import { execSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import which from 'which'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function linkGlobal() {
  const resolvedOrNull = await which('uni-mcp', { nothrow: true })
  if (resolvedOrNull) {
    return
  }

  const rootDir = join(__dirname, '..')

  console.log('🔧 正在将 uni-mcp 链接到全局...')

  try {
    execSync('npm link -y', {
      cwd: rootDir,
      stdio: 'inherit',
      shell: true,
    })
    console.log('✅ uni-mcp 已成功链接到全局')
  }
  catch (err) {
    console.error('❌ 全局链接失败:', err.message)
    process.exit(1)
  }
}

linkGlobal()
