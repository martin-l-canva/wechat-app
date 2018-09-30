import Taro, { Component, Config } from "@tarojs/taro";
import { ScrollView, View } from "@tarojs/components";
import { PostItem } from "../../components/post";
import { Nav } from "../../components/nav";
import { Loading } from "../../components/loading";

import { Post, fetchTopStrories, fetchItems } from "../../models";
import "./index.css";

type State = {
  start: number;
  idList: Array<number>;
  items: Array<Post>;
};

const SIZE = 10;

export default class IndexPage extends Component<{}, State> {
  constructor() {
    super(...arguments);
    this.state = {
      start: 0,
      idList: [],
      items: []
    };
  }

  config: Config = {
    navigationBarTitleText: "Hacker News"
  };
  async componentDidMount() {
    this.setState({ idList: await fetchTopStrories() }, () =>
      this.fetchMorePosts()
    );
  }

  async fetchMorePosts() {
    if (this.state.start < this.state.idList.length) {
      this.setState({
        items: this.state.items.concat(
          await fetchItems<Post>(
            this.state.idList.slice(this.state.start, this.state.start + SIZE)
          )
        ),
        start: this.state.start + SIZE
      });
    }
  }
  onItemClick(post: Post) {
    Taro.navigateTo({
      url: `/pages/post/post?id=${post.id}`
    });
  }

  render() {
    return (
      <View>
        <ScrollView
          className="index"
          scrollY={true}
          onScrollToLower={this.fetchMorePosts.bind(this)}
        >
          <View>
            {this.state.items.map((post, i) => (
              <View key={i} className="card">
                <PostItem post={post} onClick={this.onItemClick.bind(this)} />
              </View>
            ))}
          </View>
          {false && <Loading />}
        </ScrollView>
        <View className="nav">
          <Nav />
        </View>
      </View>
    );
  }
}
