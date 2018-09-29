import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import "./nav.css";
import logo from "../assets/logo.svg";
import news from "../assets/newspaper-regular.svg";
import comments from "../assets/comments-regular.svg";
import show from "../assets/eye-regular.svg";
import ask from "../assets/question-circle-regular.svg";
import jobs from "../assets/suitcase-solid.svg";
export class Nav extends Component {
  static defaultProps = {
    comment: {}
  };

  render() {
    return (
      <View className="nav">
        <Image src={logo} className="logo" />
        <Image src={news} className="icon" />
        <Image src={comments} className="icon" />
        <Image src={show} className="icon" />
        <Image src={ask} className="icon" />
        <Image src={jobs} className="icon" />
      </View>
    );
  }
}
