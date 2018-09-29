import Taro, { Component, Config } from "@tarojs/taro";
import { ScrollView, View, Text, Button } from "@tarojs/components";

import { Post, Comment, fetchPost } from "../..//models/post";

export default class PostPage extends Component<
  {},
  {
    post: Post;
    comments: Array<Comment>;
  }
> {
  constructor() {
    super(...arguments);
  }
  config: Config = {
    navigationBarTitleText: ""
  };
  async componentDidMount() {
    this.setState({ post: await fetchPost(this.$router.params.id) });
  }
  render() {
    return (
      <ScrollView className="post">
        <Text className="title">
          {this.state.post && this.state.post.title}
        </Text>
        <Text />
      </ScrollView>
    );
  }
}
