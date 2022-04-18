# React18

## 变更

### IE 兼容性问题

react@18 不再支持 IE11，需要兼容 IE 的请使用 react@17

### createRoot

react-dom@18 提供了 2 个根 API，一个是老的 ReactDOM.render(), 一个是新的 ReactDOM.createRoot()。

> react-dom.development.js:86 Warning: ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot

``` jsx
// 老的写法
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```

``` jsx
// 新的写法
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### StrictMode

### setState

### flushSync

### 已卸载的组件更新状态警告

### 组件返回 null

### 服务器渲染
## 新的 API

### useSyncExternalStore

### useInsertionEffect

### useId

### useDeferredValue


## Concurrent Mode

### useTransition

### Suspense

## v18 还未正式发布的新特性

### Server Component

### OffScreen


参考：

* https://reactjs.org/blog/2022/03/29/react-v18.html
* https://juejin.cn/post/7087486984146878494
* https://juejin.cn/post/7078511027091931167