import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { LinkCard } from './LinkCard'
import type { Link } from '../data/links'

const link: Link = {
  id: 'chatgpt',
  name: 'ChatGPT',
  url: 'https://chat.openai.com',
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

    expect(openSpy).toHaveBeenCalledWith(link.url, '_blank')
  })
})
