import Taro, { Component, Config } from "@tarojs/taro";
import { ScrollView, View, Text, Button } from "@tarojs/components";
import { PostItem } from "../../components/post";
import { Post, fetchTopStrories, fetchPosts } from "../../models/post";
import "./index.css";

type State = {
  idList: Array<number>;
  items: Array<Post>;
};

export default class IndexPage extends Component<{}, State> {
  constructor() {
    super(...arguments);
    this.state = {
      idList: [],
      items: []
    };
  }

  config: Config = {
    navigationBarTitleText: "首页"
  };
  async componentDidMount() {
    const idList = await fetchTopStrories();
    const items = await fetchPosts(idList.splice(0, 10));
    this.setState({ idList, items });
  }
  onItemClick(post: Post) {
    console.log(post);
    Taro.navigateTo({
      url: `/pages/post/post?id=${post.id}`
    });
  }
  render() {
    let content: any = null;
    if (this.state.items.length === 0) {
      content = <Text>Loading</Text>;
    } else {
      content = (
        <View>
          {this.state.items.map((post, i) => (
            <PostItem
              key={i}
              post={post}
              onClick={this.onItemClick.bind(this)}
            />
          ))}
        </View>
      );
    }
    return <ScrollView className="index">{content}</ScrollView>;
  }
}
