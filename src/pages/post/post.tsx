import Taro, { Component, Config } from "@tarojs/taro";
import { ScrollView, View, Text } from "@tarojs/components";

import { Post, Comment, fetchItem, fetchItems } from "../../models";
import { PostItem } from "../../components/post";
import { CommentItem } from "../../components/comment";
import { Loading } from "../../components/loading";
import "./post.css";
type State = {
  post?: Post;
  comments: Array<Comment>;
  isLoading: boolean;
};

export default class PostPage extends Component<{}, State> {
  constructor() {
    super(...arguments);
    this.state = {
      post: undefined,
      comments: [],
      isLoading: true
    };
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
    let body: any = null;
    if (this.state.post !== undefined) {
      body = (
        <View className="title">
          <PostItem post={this.state.post} />
        </View>
      );
    } else {
      body = <Loading />;
    }
    return (
      <ScrollView
        className="post"
        onScrollToLower={this.fetchMoreComments.bind(this)}
      >
        {body}
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
