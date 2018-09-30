import Taro, { Component, Config } from "@tarojs/taro";
import { ScrollView, View, Text } from "@tarojs/components";

import { Post, Comment, fetchItem, fetchItems } from "../../models";
import { PostItem } from "../../components/post";
import { CommentItem } from "../../components/comment";
import { Loading } from "../../components/loading";
import "./post.css";
type State = {
  post: Post;
  comments: Array<Comment>;
};

export default class PostPage extends Component<{}, State> {
  constructor() {
    super(...arguments);
  }
  config: Config = {
    navigationBarTitleText: ""
  };
  async componentDidMount() {
    const post = await fetchItem<Post>(this.$router.params.id);
    this.setState({
      post
    });
    if (post.kids && post.kids.length > 0) {
      this.setState({
        comments: await fetchItems<Comment>(post.kids.slice(0, 10))
      });
    }
  }
  async fetchMoreComments() {}
  render() {
    let title: any = null;
    if (this.state.post) {
      title = <PostItem post={this.state.post} />;
    } else {
      title = <Loading />;
    }
    return (
      <ScrollView
        className="post"
        onScrollToLower={this.fetchMoreComments.bind(this)}
      >
        <View className="title">{title}</View>
        <View>
          {this.state.comments.map((comment, i) => (
            <View key={i} className="comment">
              <CommentItem comment={comment} />
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }
}
