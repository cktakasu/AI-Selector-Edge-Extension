import { render } from '@testing-library/react'
import { screen } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'
import App from './App'
import { links } from './data/links'

describe('App', () => {
  it('リンク数と同じ数のボタンを表示する', () => {
    render(<App />)

    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(links.length)
  })

  it('各リンクに対応するアクセシブル名を持つ', () => {
    render(<App />)

    for (const link of links) {
      expect(screen.getByRole('button', { name: `Open ${link.name}` })).toBeInTheDocument()
    }
  })

  it('メインコンテナが正しいCSSクラスでレンダリングされる', () => {
    const { container } = render(<App />)
    const mainElement = container.querySelector('main')

    expect(mainElement).not.toBeNull()
    expect(mainElement).toHaveClass('w-fit', 'min-w-max', 'bg-[var(--bg-popup)]')
  })
})
