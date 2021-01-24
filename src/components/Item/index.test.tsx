import React from 'react'
import Item from './index'
import { fetchItemById } from '../../utils/api'
import { mockFetchItemById } from '../../../tests/utils'
import { render } from '@testing-library/react'

jest.mock('../../utils/api')

describe('Item Hacker News Story', function () {
    beforeEach(function mockApi() {
        ;(fetchItemById as jest.Mock).mockImplementation((id) =>
            mockFetchItemById(id, {
                title: 'This is the title',
                by: 'cpatout',
                time: +new Date('2021-01-01T12:00:00') / 1000,
            }),
        )
    })
    it('should display the title', async function () {
        const { findByText } = render(<Item id={1} />)
        expect(await findByText('This is the title')).toBeInTheDocument()
    })
    it('should display the Author name', async function () {
        const { findByText } = render(<Item id={1} />)
        expect(await findByText(/by cpatout/)).toBeInTheDocument()
    })
    it('should display the Posted Time', async function () {
        Date.now = jest.fn(() => new Date('2021-01-01T12:30:00').valueOf())
        const { findByText } = render(<Item id={1} />)
        expect(await findByText(/30 min/)).toBeInTheDocument()
    })
})
