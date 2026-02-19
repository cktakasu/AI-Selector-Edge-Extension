import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'

// model_updates.json のフェッチをモック（テスト環境にサーバーがないため）
beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    json: () => Promise.resolve({}),
  }))
})

afterEach(() => {
  vi.unstubAllGlobals()
  cleanup()
})
