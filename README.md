# WeChat Mini App

## Goals

- typescript
- css module(on Taro's road map)
- react
- mobx
- storybook
- jest

## Log

### 2018-09-25

The project is created by Taro https://github.com/NervJS/taro

Using TS seems fine.

The project `.tsx` code will be transformed into `.js` and `.wxss`, the process seems pretty straightforward:

- expression in `render` will be transformed to `.wxss` template, due to the limits of template, the stateless component is impossible (Why?), yet that is not a deal breaker.
- other code in `.tsx` just turn into plain js code

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

let content: any = null;
if (this.state.items.length === 0) {
  content = <Text>Loading</Text>;
} else {
  content = (
    <View>
      {this.state.items.map(item => (
        <View key={item.id} className="title">
          {item.title}
        </View>
      ))}
    </View>
  );
}
```

Reason for this is the Wechat runtime is not support real component, the JSX will be complie into template by Taro. (Try to make component code as plain as possible)

### 2018-0927

sourcemap does not work

use `Taro.navigateTo` to navigate, pages need to be defined in `App.config.pages`

### 2018-0929

Basic flex layout works fine

ReactNative build don't support TS

HTML build don't support `async/await`（should not be big issue, just need a runtime added）

The Wechat app deal properties different, so in Taro, Props will be precompile so `defaultProps` is kinda need
see https://nervjs.github.io/taro/docs/best-practice.html#%E7%BB%99%E7%BB%84%E4%BB%B6%E8%AE%BE%E7%BD%AE-defaultprops

using optionel prop will calls error, avoid it ?

```javascript
onClick={onClick && onClick.bind(this, post)}
```

`Text` has wierd warp, `nowarp` not work, use `View` instead

flexbox is fine
svg is fine

### 2018-0930

annimation seem ok

`key-frame` adn `pseudo class` is ok, using normal css animation and style just replace `div` with `view`

There seems be warpper component , layout import component need to be aware

```javascript
<Container>
  <MyComponet />
</Container>
```

to:

```javascript
<Container>
  <Wrapper>
    <MyComponet class="realStyle" />
  </Wrapper>
</Container>
```

destructuring in tsx is not working

```javascript
<ListItem {...item} />
```

expression in tsx is not working

```javascript
{
  booleanVal && <MyComponet />;
}
```

Using variable in `render` function may causing conflict with keys in `state` (what about props?)
Itis a konwing issue of Taro, https://github.com/NervJS/taro/issues/411

```javascript
let post: any = null; // conflict with this.state.post
if (this.state.post !== undefined) {
  post = <Post />;
} else {
  post = <Loading />;
}
```
