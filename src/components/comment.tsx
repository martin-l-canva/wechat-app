import Taro, { Component } from "@tarojs/taro";
import { View, RichText } from "@tarojs/components";
import * as moment from "moment";
import { Comment } from "../models";
import "./comment.css";
type Props = {
  comment: Comment;
};

const formatTime = (time: number) => moment.unix(time).fromNow();

export class CommentItem extends Component<Props> {
  static defaultProps = {
    comment: {}
  };

  render() {
    const { comment } = this.props;
    const { text, by, kids, time } = comment;
    return (
      <View className="comment">
        <RichText className="text" nodes={text} />
        <View className="description">
          By {by} | {formatTime(time)} | {kids.length} Comments
        </View>
      </View>
    );
  }
}
