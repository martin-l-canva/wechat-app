import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import './index.css'

type State = {
  isClicked: boolean
}

export default class Index extends Component<{}, State>{
  constructor() {
    super(...arguments);
    this.state = {
      isClicked: false
    }
  }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  onClick() {
    this.setState({ isClicked: true });
  }
  render() {
    const greeting = this.state.isClicked ?
      <Text>isClicked</Text> :
      <Text>Please Click</Text>
    return (
      <View className='index'>
        {greeting}
        <Button onClick={this.onClick.bind(this)}>Click</Button>
      </View>
    )
  }
}

