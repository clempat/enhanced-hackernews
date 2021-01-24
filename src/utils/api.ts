export interface Item {
    by: string
    descendants: number
    id: number
    kids: Array<number>
    score: number
    time: number
    title: string
    type: 'story' | 'job' | 'comment' | 'poll' | 'pollopt'
    // Sometime the API does not return an URL
    url?: string
    dead?: boolean
}

export async function fetchItemById(id: number): Promise<Item> {
    const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
    return ((await response.json()) as unknown) as Item
}

export async function fetchNews() {
    const response = await fetch('https://hacker-news.firebaseio.com/v0/newstories.json')
    return ((await response.json()) as unknown) as Array<number>
}
