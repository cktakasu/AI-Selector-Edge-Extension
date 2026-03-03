import { render } from '@testing-library/react'
import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { LinkCard } from './LinkCard'
import type { Link } from '../data/links'

const link: Link = {
  id: 'chatgpt',
  name: 'ChatGPT',
  description: 'Advanced conversational AI by OpenAI',
  url: 'https://chat.openai.com',
  category: 'LLM',
  icon: 'chatgpt.svg',
}

describe('LinkCard', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    Reflect.deleteProperty(globalThis, 'chrome')
  })

  it('chrome.tabs.create が利用可能なら新規タブを開く', async () => {
    const createMock = vi.fn()
    const chromeMock = { tabs: { create: createMock } } as unknown as typeof chrome
    Object.defineProperty(globalThis, 'chrome', {
      value: chromeMock,
      configurable: true,
    })
    const openSpy = vi.spyOn(window, 'open')

    render(<LinkCard link={link} index={0} />)
    await userEvent.click(screen.getByRole('button', { name: 'Open ChatGPT' }))

    expect(createMock).toHaveBeenCalledWith({ url: link.url })
    expect(openSpy).not.toHaveBeenCalled()
  })

  it('chrome.tabs.create が使えない場合は window.open にフォールバックする', async () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)

    render(<LinkCard link={link} index={0} />)
    await userEvent.click(screen.getByRole('button', { name: 'Open ChatGPT' }))

    expect(openSpy).toHaveBeenCalledWith(link.url, '_blank', 'noopener,noreferrer')
  })

  describe('NEW バッジ表示', () => {
    it('updatedAtが14日以内の場合、NEWバッジが表示される', () => {
      const recentDate = new Date()
      recentDate.setDate(recentDate.getDate() - 5) // 5日前
      const recentLink: Link = { ...link, updatedAt: recentDate.toISOString().split('T')[0] }

      const { container } = render(<LinkCard link={recentLink} index={0} />)
      expect(container.querySelector('.new-badge')).toBeInTheDocument()
    })

    it('updatedAtが15日以上前の場合、NEWバッジが表示されない', () => {
      const oldDate = new Date()
      oldDate.setDate(oldDate.getDate() - 20) // 20日前
      const oldLink: Link = { ...link, updatedAt: oldDate.toISOString().split('T')[0] }

      const { container } = render(<LinkCard link={oldLink} index={0} />)
      expect(container.querySelector('.new-badge')).not.toBeInTheDocument()
    })

    it('updatedAtが設定されていない場合、NEWバッジが表示されない', () => {
      const noDateLink: Link = { ...link, updatedAt: undefined }

      const { container } = render(<LinkCard link={noDateLink} index={0} />)
      expect(container.querySelector('.new-badge')).not.toBeInTheDocument()
    })
  })
})
