# WeChat Mini App 

## Goals

+ typescript
+ css module(on Taro's road map)
+ react
+ mobx
+ storybook
+ jest


## log 

### 2018-09-25

The project is created by Taro https://github.com/NervJS/taro

Using TS seems fine.

The project `.tsx`  code will be transformed into `.js` and `.wxss`, the process seems pretty straightforward:

+ expression in `render`  will be transformed to `.wxss` template, due to the limits of template, the stateless component is impossible (Why?), yet that is not a deal breaker.
+ other code in `.tsx`  just turn into plain js code


