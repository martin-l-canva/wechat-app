# WeChat Mini App 

## Goals

+ typescript
+ css module(on Taro's road map)
+ react
+ mobx
+ storybook
+ jest


## Log 

### 2018-09-25

The project is created by Taro https://github.com/NervJS/taro

Using TS seems fine.

The project `.tsx`  code will be transformed into `.js` and `.wxss`, the process seems pretty straightforward:

+ expression in `render`  will be transformed to `.wxss` template, due to the limits of template, the stateless component is impossible (Why?), yet that is not a deal breaker.
+ other code in `.tsx`  just turn into plain js code


### 2018-09-26

Add WeChat API typefile `@types/weixin-app`

All requests need to be in a domain whitelist 
https://developers.weixin.qq.com/miniprogram/dev/api/api-network.html

Wrap `wx.request` with Promise and then use `async/await` is fine.


When come to conditional rendering, need `if/else` instead of ternary operator. 
```javascript
    // let content = this.state.items.length === 0 ?
    // <Text>Loading</Text> :
    // this.state.items.map((item) => (
    //   <View key={item.id} className="title">{item.title}</View>
    // ));
    
    let content:any = null;
    if (this.state.items.length === 0) {
      content = <Text>Loading</Text>;
    } else {
      content = <View>
        {this.state.items.map((item) => (
          <View key={item.id} className="title">{item.title}</View>
        ))}
      </View>;
    }
```
Reason for this is the Wechat runtime is not support real component, the JSX will be complie into template by Taro. (Try to make component code as plain as possible)
