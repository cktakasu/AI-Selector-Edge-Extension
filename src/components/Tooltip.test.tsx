import { render } from '@testing-library/react'
import { screen } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'
import { Tooltip } from './Tooltip'
import type { Link } from '../data/links'

const mockLink: Link = {
    id: 'test',
    name: 'TestName',
    description: 'Test Description',
    url: 'https://test.com',
    category: 'LLM'
}

describe('Tooltip', () => {
    it('visibleがfalseの場合、何もレンダリングしない', () => {
        const { container } = render(<Tooltip link={mockLink} visible={false} />)
        expect(container.firstChild).toBeNull()
    })

    it('リンク名と説明文が正しく表示されること', () => {
        render(<Tooltip link={mockLink} visible={true} />)
        expect(screen.getByText('TestName')).toBeInTheDocument()
        expect(screen.getByText('Test Description')).toBeInTheDocument()
    })

    it('カテゴリに基づく正しいCSSクラスが適用されること', () => {
        const devLink: Link = { ...mockLink, category: 'Dev' }
        render(<Tooltip link={devLink} visible={true} />)
        const categoryBadge = screen.getByText('Dev')
        expect(categoryBadge).toHaveClass('bg-amber-100')
    })
})
