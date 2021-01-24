import React from 'react'
import App from './App'
import { fetchNews, fetchItemById } from './utils/api'
import { render } from '@testing-library/react'
import { mockFetchItemById } from '../tests/utils'

jest.mock('./utils/api')

describe('Item List Hacker News', function () {
    it('should display all items', async function () {
        ;(fetchItemById as jest.Mock).mockImplementation((id) => mockFetchItemById(id))
        ;(fetchNews as jest.Mock).mockImplementation(() => Promise.resolve([3, 2, 1]))
        expect.assertions(3)
        const { findByText } = render(<App />)
        expect(await findByText('This is item 3')).toBeInTheDocument()
        expect(await findByText('This is item 2')).toBeInTheDocument()
        expect(await findByText('This is item 1')).toBeInTheDocument()
    })

    it('should prepend the new item with auto refresh', async function () {
        jest.useFakeTimers()
        ;(fetchItemById as jest.Mock).mockImplementation((id) => mockFetchItemById(id))
        ;(fetchNews as jest.Mock).mockImplementation(() => Promise.resolve([3, 2, 1]))
        expect.assertions(5)
        const { findByText, queryByText } = render(<App />)

        expect(await findByText('This is item 3')).toBeInTheDocument()
        expect(await findByText('This is item 2')).toBeInTheDocument()
        expect(await findByText('This is item 1')).toBeInTheDocument()
        expect(queryByText('This is item 4')).not.toBeInTheDocument()
        ;(fetchNews as jest.Mock).mockImplementation(() => Promise.resolve([4, 3, 2, 1]))
        jest.advanceTimersByTime(1000)

        expect(await findByText('This is item 4')).toBeInTheDocument()
    })
})
