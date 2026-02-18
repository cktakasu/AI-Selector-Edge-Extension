import { render, screen } from '@testing-library/react'
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
})
