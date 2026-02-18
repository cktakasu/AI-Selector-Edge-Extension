#!/usr/bin/env node
/**
 * sync-from-chrome.mjs
 *
 * Chrome版をsource of truthとして、Edgeリポジトリを同期するスクリプト。
 *
 * 採用方式: 同期スクリプト方式
 * 理由: EdgeリポジトリとChromeリポジトリに共通祖先がなく (git merge-base が失敗)、
 *       upstream merge/rebase が使えないため。
 *       このスクリプトがChrome repoからファイルをコピーし、Edge固有ファイルは除外する。
 *
 * 使い方:
 *   node scripts/sync-from-chrome.mjs <Chrome repoのパス> [--check]
 *
 * オプション:
 *   --check  コピーせず、差分があれば非ゼロで終了する "チェックモード"
 *
 * 例:
 *   node scripts/sync-from-chrome.mjs ../AI-Selector-Chrome-Extension
 *   node scripts/sync-from-chrome.mjs ../AI-Selector-Chrome-Extension --check
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, existsSync, copyFileSync } from 'fs'
import { join, relative, dirname, basename } from 'path'
import { execSync } from 'child_process'

const [,, chromeRepoPath, flag] = process.argv
const CHECK_MODE = flag === '--check'

if (!chromeRepoPath) {
  console.error('Usage: node scripts/sync-from-chrome.mjs <chrome-repo-path> [--check]')
  process.exit(1)
}

const edgeRoot = new URL('..', import.meta.url).pathname.replace(/\/$/, '')
const chromeRoot = chromeRepoPath.startsWith('/')
  ? chromeRepoPath
  : join(process.cwd(), chromeRepoPath)

if (!existsSync(chromeRoot)) {
  console.error(`Chrome repo not found: ${chromeRoot}`)
  process.exit(1)
}

// --- Edge固有ファイル (上書き除外) ---
const EDGE_ONLY_EXACT = new Set([
  'README.md',
  'vitest.config.ts',
  'vite.config.ts',  // name/descriptionをEdge向けに維持するため除外
  'package.json',    // name・テスト系devDepsを維持するため除外
])

const EDGE_ONLY_DIRS = [
  'artifacts',
  'src/test',
  'scripts',
  'docs',
]

// macOSメタデータファイルパターン
const MAC_META_RE = /^\._/

function isEdgeOnly(relPath) {
  const file = basename(relPath)
  if (MAC_META_RE.test(file)) return true
  if (EDGE_ONLY_EXACT.has(relPath)) return true
  // テストファイル (src/**/*.test.tsx) は除外
  if (relPath.startsWith('src/') && relPath.endsWith('.test.tsx')) return true
  // Edge固有ディレクトリ
  for (const dir of EDGE_ONLY_DIRS) {
    if (relPath === dir || relPath.startsWith(dir + '/')) return true
  }
  return false
}

// --- ファイル収集 ---
function collectFiles(root, base = root) {
  const files = []
  for (const entry of readdirSync(root)) {
    if (entry === '.git' || entry === 'node_modules' || entry === 'dist') continue
    if (MAC_META_RE.test(entry)) continue
    const abs = join(root, entry)
    const rel = relative(base, abs)
    const st = statSync(abs)
    if (st.isDirectory()) {
      files.push(...collectFiles(abs, base))
    } else {
      files.push(rel)
    }
  }
  return files
}

const chromeFiles = collectFiles(chromeRoot)

let hasDiff = false
const actions = []

for (const relPath of chromeFiles) {
  if (isEdgeOnly(relPath)) {
    console.log(`  [skip]  ${relPath}`)
    continue
  }

  const src = join(chromeRoot, relPath)
  const dst = join(edgeRoot, relPath)

  const srcContent = readFileSync(src)

  if (existsSync(dst)) {
    const dstContent = readFileSync(dst)
    if (srcContent.equals(dstContent)) {
      console.log(`  [same]  ${relPath}`)
      continue
    }
    console.log(`  [diff]  ${relPath}`)
  } else {
    console.log(`  [new]   ${relPath}`)
  }

  hasDiff = true
  actions.push({ src, dst, relPath })
}

if (CHECK_MODE) {
  if (hasDiff) {
    console.error('\n❌ CHECK FAILED: Differences found between Chrome and Edge repos.')
    console.error('   Run without --check to apply changes.')
    process.exit(1)
  } else {
    console.log('\n✅ CHECK PASSED: Edge repo is in sync with Chrome repo.')
    process.exit(0)
  }
}

// --- 実際にコピー ---
if (actions.length === 0) {
  console.log('\n✅ Already in sync. No files to update.')
  process.exit(0)
}

for (const { src, dst, relPath } of actions) {
  mkdirSync(dirname(dst), { recursive: true })
  copyFileSync(src, dst)
  console.log(`  [copy]  ${relPath}`)
}

console.log(`\n✅ Synced ${actions.length} file(s) from Chrome repo.`)
console.log('   Review changes with: git diff')
console.log('   Then run: npm run test')
