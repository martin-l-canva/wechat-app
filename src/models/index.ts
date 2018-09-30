export type Post = {
  by: string;
  descendants: number;
  id: number;
  kids: Array<number>;
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
};

export type Comment = {
  by: string;
  id: number;
  parent: number;
  kids: Array<number>;
  time: number;
  text: string;
  type: string;
};

export function fetchTopStrories(): Promise<Array<number>> {
  return new Promise<Array<number>>((resolve, reject) => {
    wx.request({
      url: "https://hacker-news.firebaseio.com/v0/topstories.json",
      success: response => resolve(response.data as Array<number>),
      fail: reject
    });
  });
}

export function fetchItem<T>(id: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    wx.request({
      url: `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
      success: response => {
        const data = response.data;
        if (data instanceof ArrayBuffer) {
          return resolve(JSON.parse(String(data)) as T);
        }
        if (typeof data === "string") {
          return resolve(JSON.parse(data) as T);
        }
        return resolve(Object(data) as T);
      },
      fail: reject
    });
  });
}

export function fetchItems<T>(ids: Array<number>): Promise<Array<T>> {
  return Promise.all(ids.map(id => fetchItem<T>(id)));
}
