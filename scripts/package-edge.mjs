#!/usr/bin/env node
/**
 * package-edge.mjs
 *
 * dist/ を Edge Add-ons 提出用の zip に固める。
 * npm run package:edge から呼ばれる（build 後に実行）。
 *
 * 出力: ai-selector-edge.zip
 */

import { existsSync, readdirSync, statSync, readFileSync } from 'fs'
import { join, relative } from 'path'
import { execSync } from 'child_process'

const root = new URL('..', import.meta.url).pathname.replace(/\/$/, '')
const distDir = join(root, 'dist')
const outZip = join(root, 'ai-selector-edge.zip')

if (!existsSync(distDir)) {
  console.error('❌ dist/ not found. Run `npm run build` first.')
  process.exit(1)
}

// 必須ファイルの存在確認
const required = ['manifest.json', 'index.html', 'icon.png']
const missing = required.filter(f => !existsSync(join(distDir, f)))
if (missing.length > 0) {
  console.error(`❌ Missing required files in dist/: ${missing.join(', ')}`)
  process.exit(1)
}

// zip 作成 (既存ファイルは上書き)
try {
  execSync(`cd "${distDir}" && zip -r "${outZip}" . --exclude "*.DS_Store" --exclude "._*"`, { stdio: 'inherit' })
} catch (e) {
  console.error('❌ zip command failed:', e.message)
  process.exit(1)
}

// 内容確認
console.log('\n📦 Package contents:')
execSync(`unzip -l "${outZip}"`, { stdio: 'inherit' })

console.log(`\n✅ Created: ${outZip}`)
