import { fetchItemById, fetchNews, Item } from './api'
import { mockFetch } from '../../tests/utils'

describe('Api', function () {
    beforeEach(() => {
        ;(global.fetch as jest.Mock).mockClear()
    })

    it('should fetch list of news', async function () {
        const mockList = [1, 2, 3, 4, 5, 6]
        ;(global.fetch as jest.Mock).mockImplementationOnce(() => mockFetch(mockList))
        const list = await fetchNews()

        expect(global.fetch).toBeCalledWith('https://hacker-news.firebaseio.com/v0/newstories.json')
        expect(list).toBe(mockList)
    })

    it('should fetch the story by id', async function () {
        const mockItem = {
            by: 'dhouston',
            descendants: 71,
            id: 8863,
            kids: [8952, 9224],
            score: 111,
            time: 1175714200,
            title: 'My YC app: Dropbox - Throw away your USB drive',
            type: 'story',
            url: 'http://www.getdropbox.com/u/2/screencast.html',
        } as Item
        ;(global.fetch as jest.Mock).mockImplementationOnce(() => mockFetch(mockItem))
        const item = await fetchItemById(8863)

        expect(global.fetch).toBeCalledWith(
            expect.stringContaining('https://hacker-news.firebaseio.com/v0/item/'),
        )
        expect(item).toBe(mockItem)
    })
})
