import Taro, { Component, Config } from '@tarojs/taro'
import { ScrollView, View, Text, Button } from '@tarojs/components'
import './index.css'
import { Post, fetchTopStrories, fetchItems } from '../..//models/post';

export default class Index extends Component<{}, {
  idList: Array<number>,
  items: Array<Post>
}> {
  constructor() {
    super(...arguments);
    this.state = {
      idList: [],
      items: []
    }
  }

  config: Config = {
    navigationBarTitleText: '首页'
  }
  async componentDidMount() {
    const idList = await fetchTopStrories();
    const items = await fetchItems(idList.splice(0, 10))
    this.setState({ idList, items });
  }
  render() {
    // let content = this.state.items.length === 0 ?
    // <Text>Loading</Text> :
    // this.state.items.map((item) => (
    //   <View key={item.id} className="title">{item.title}</View>
    // ));

    let content: any = null;
    if (this.state.items.length === 0) {
      content = <Text>Loading</Text>;
    } else {
      content = <View>
        {this.state.items.map((item) => (
          <View key={item.id} className="title">{item.title}</View>
        ))}
      </View>;
    }
    return (
      <ScrollView className='index'>
        {content}
      </ScrollView>
    )
  }
}

