export const fetchTopStrories = () => {
  return new Promise<Array<number>>((resolve, reject) => {
    wx.request({
      url: "https://hacker-news.firebaseio.com/v0/topstories.json",
      success: response => resolve(response.data as Array<number>),
      fail: reject
    });
  });
};

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
export const fetchPost = (id: number) => {
  return new Promise<Post>((resolve, reject) => {
    wx.request({
      url: `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
      success: response => resolve(response.data as Post),
      fail: reject
    });
  });
};

export const fetchPosts = (ids: Array<number>) => {
  return Promise.all(ids.map(id => fetchPost(id)));
};

export const fetchComment = (id: number) => {
  return new Promise<Comment>((resolve, reject) => {
    wx.request({
      url: `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
      success: response => resolve(response.data as Comment),
      fail: reject
    });
  });
};

export const fetchComments = (ids: Array<number>) => {
  return Promise.all(ids.map(id => fetchComment(id)));
};
