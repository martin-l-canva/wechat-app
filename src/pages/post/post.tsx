import Taro, { Component, Config } from "@tarojs/taro";
import { ScrollView, View, Text, Button } from "@tarojs/components";

import { Post, Comment, fetchPost, fetchComments } from "../..//models/post";
import { PostItem } from "../../components/post";
import { CommentItem } from "../../components/comment";
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
    const post = await fetchPost(this.$router.params.id);
    if (post.kids && post.kids.length > 0) {
      const comments = await fetchComments(post.kids.slice(0, 10));
      this.setState({
        comments,
        post
      });
    } else {
      this.setState({
        post
      });
    }
  }
  render() {
    let title: any = null;
    if (this.state.post) {
      title = <PostItem post={this.state.post} />;
    } else {
      title = <Text>Loading</Text>;
    }
    return (
      <ScrollView className="post">
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
