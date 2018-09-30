import { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./loading.css";

export class Loading extends Component {
  render() {
    return (
      <View className="loading-container">
        <View className="loading">
          <View />
          <View />
          <View />
        </View>
      </View>
    );
  }
}
