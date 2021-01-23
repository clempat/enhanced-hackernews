import React from 'react'
import App from './App'
import { fetchNews, fetchItemById } from './utils/api'
import { render } from '@testing-library/react'
import { mockFetchItemById } from '../tests/utils'

jest.mock('./utils/api')

describe('Item List Hacker News', function () {
    it('should display all items', async function () {
        ;(fetchItemById as jest.Mock).mockImplementation((id) => mockFetchItemById(id))
        ;(fetchNews as jest.Mock).mockImplementationOnce(() => Promise.resolve(ids))
        const ids = [1, 2, 3]
        expect.assertions(ids.length)
        const { findByText } = render(<App />)

        expect(await findByText('This is item 1')).toBeInTheDocument()
        expect(await findByText('This is item 2')).toBeInTheDocument()
        expect(await findByText('This is item 3')).toBeInTheDocument()
    })
})
