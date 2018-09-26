export const fetchTopStrories = () => {
    return new Promise<Array<number>>((resolve, reject) => {
        wx.request({
            url: 'https://hacker-news.firebaseio.com/v0/topstories.json',
            success: (response) => resolve(response.data as Array<number>),
            fail: reject
        });
    });
}

export type Post = {
    by: string,
    descendants: number,
    id: number,
    kids: Array<number>
    score: number,
    time: number,
    title: string,
    type: string,
    url: string
}

export const fetchItem = (id: number) => {
    return new Promise<Post>((resolve, reject) => {
        wx.request({
            url: `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
            success: (response) => resolve(response.data as Post),
            fail: reject
        });
    });
}

export const fetchItems = (ids: Array<number>) => {
    return Promise.all(ids.map((id) => fetchItem(id)))
}