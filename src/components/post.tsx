import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import * as moment from "moment";
import { Post } from "../models/post";
import "./post.css";
type Props = {
  post: Post;
  onClick?(post: Post): void;
};

const formatTime = (time: number) => moment.unix(time).fromNow();

export class PostItem extends Component<Props> {
  static defaultProps = {
    post: {},
    onClick: () => void 0
  };

  onClick(post: Post) {
    this.props.onClick && this.props.onClick(post);
  }

  render() {
    const { post } = this.props;
    const { title, score, by, kids, time } = post;
    return (
      <View className="post" onClick={this.onClick.bind(this, post)}>
        <Text className="title">{title}</Text>
        <View className="description">
          {score} Point | By {by} | {formatTime(time)} | {kids.length} Comments
        </View>
      </View>
    );
  }
}
