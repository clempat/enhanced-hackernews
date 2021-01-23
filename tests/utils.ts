import { Item } from '../src/utils/api'

export function mockFetchItemById(id: number, mockItem = {} as Partial<Item>) {
    return Promise.resolve(
        Object.assign(
            {
                id,
                kids: [],
                by: 'Clément P.',
                descendants: 0,
                score: 100,
                time: +new Date('2021-01-01T12:00:00'),
                title: `This is item ${id}`,
                type: 'story',
                url: 'https://doist.com',
            },
            mockItem,
        ) as Item,
    )
}

export function mockFetch(mockResponse: unknown) {
    return Promise.resolve(({
        json: () => Promise.resolve(mockResponse),
    } as unknown) as Response)
}
