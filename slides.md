---
# try also 'default' to start simple
theme: seriph
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: https://source.unsplash.com/collection/94734566/1920x1080
# apply any windi css classes to the current slide
class: 'text-center'
# https://sli.dev/custom/highlighters.html
highlighter: Prism
# some information about the slides, markdown enabled
info: |
  ## React18
layout: cover
---

# React18 workshop

<h5 class="text-white-500">聊聊 react18</h5>

<p class="abs-br pb-20 pr-20 text-gray-500">冯博</p>
<p class="abs-br pb-12 pr-14 text-gray-500">2022/05/06</p>
<a href="https://github.com/phobal/react18-workshop.git" target="_blank" alt="GitHub"
  class="abs-br m-6 text-xl icon-btn opacity-50 !border-none !hover:text-white">
  <carbon-logo-github />
</a>
---

# 18 主要带来了哪些变化?


- 📝 **Concurrent Mode** - 并发模式
- 🎨 **non-Broken Change** - 一些没那么 “破坏性” 变化
- 🧑‍💻 **Third Party Package API** - 为第三方库设计的一些 API
- 🤹 **Coming Soon** - 即将发布的一些特性

<br>
<br>

Read more about [React v18.0](https://reactjs.org/blog/2022/03/29/react-v18.html)

<!--
You can have `style` tag in markdown to override the style for the current page.
Learn more: https://sli.dev/guide/syntax#embedded-styles
-->

<style>
h1 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>

---
class: 'text-center'
---

# Concurrent Mode

![](/docs/images/old-render.png)

老的渲染方式

<style>
  p img:first-child {
    width: 300px;
    height: 300px;
    position: absolute;
    left: 360px;
    top: 150px;
  }
</style>


---
class: 'text-center'
---

# Concurrent Mode

![](/docs/images/concurrent.png)

新的渲染方式

<style>
  p img:first-child {
    width: 600px;
    height: 340px;
    position: absolute;
    left: 200px;
    top: 150px;
  }
</style>



---
class: 'text-left'
---

# Concurrent Mode

我们需要关心的

* startTransition
* useTransition
* Suspense

---

# Concurrent Mode - startTransition

``` tsx
import { startTransition } from 'react'
// 紧急的
setInputValue(e.target.value);
// 非紧急的，对于渲染比较耗时的可以手动控制延迟渲染，先让最用户关心的内容渲染
startTransition(() => {
  setRenderValue(e.target.value / 1);
});

```

---

# Concurrent Mode - useTransition

``` tsx
import { useTransition } from 'react'

const [loading, startTransition] = useTransition()
// 紧急的
setInputValue(e.target.value);
// 非紧急的，对于渲染比较耗时的可以手动控制延迟渲染，先让最用户关心的内容渲染
startTransition(() => {
  setRenderValue(e.target.value / 1);
});

```
---

# Concurrent Mode - Suspense

``` tsx
<Suspense fallback="加载中">
  <UserList resource={resource} />
  <button
    className="button"
    type="button"
    onClick={() => {
      startTransition(() => {
        setResource(fetchMockData(2));
      });
    }}
  >
    下一页
  </button>
  {isPending && <div className="loading">加载中</div>}
</Suspense>
```

---

# non-Broken Change

* IE 兼容性问题
* createRoot
* StrictMode
* setState
* flushSync
* 已卸载的组件更新状态警告
* 组件返回 undefined
* Children
* 服务器流式渲染

---
class: 'text-center'
---

# non-Broken Change - IE 兼容性问题

react@18 不再支持 IE11，需要兼容 IE 的请使用 react@17

---
class: 'text-center'
---

# non-Broken Change - createRoot

<div grid="~ cols-2 gap-2" m="-t-2">

``` tsx
// 老的写法
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```

``` tsx
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
</div>

---

# non-Broken Change - StrictMode

<p class="text-blue-700">StrictMode = Fragment</p>

作用

* 识别不安全的生命周期
* 使用过时 ref API
* 关于使用废弃的 findDOMNode 方法的警告
.  
.  
.  


---

# non-Broken Change - setState

<p class="text-red-400">React 自动批处理 - 简单来说就是将多个状态的更新合并为一次重新渲染，以达到更新性能的目的。</p>

v18 之前：只能在生命周期和合成事件函数中进行批处理，默认情况下 Promise、setTimeout以及原生事件中不会进行批处理

``` jsx
  const onClick = () => {
    Promise.resolve().then(() => {
      setCount(count++)
    })
    setFlag(!flag)
  }
  // render 会渲染 2 次
```

v18 之后：会对所有的更新进行批处理操作，上面的代码只会执行 1 次 render。  
那如果我想在 React18 中退出批处理应该怎么做呢？官方提供了一个新的 API flushSync

---

# non-Broken Change - flushSync

``` jsx
import { flushSync } from 'react-dom';

function handleClick() {
  flushSync(() => {
    setCount(c => c + 1);
  });
  // React 更新一次 DOM
  flushSync(() => {
    setFlag(f => !f);
  });
  // React 更新一次 DOM
}

```

---

# non-Broken Change - flushSync

自动批处理对我们有什么影响呢？

目前只是在 Class 组件中，如果你在两次 setState 中间去读取 state 的值的时候会出现不兼容的情况。

``` jsx
onClick = () => {
  setTimeout(() => {
    this.setState(({ count }) => ({ count: count + 1 }));
    // 在 React17 及之前，打印出来是 { count: 1, flag: false }
    // 在 React18，打印出来是 { count: 0, flag: false }
    console.log('----this.state----', this.state);

    this.setState(({ flag }) => ({ flag: !flag }));
  }, 0);
};
```

---

# non-Broken Change - flushSync

解决也很简单，只需要 flushSync 来解决
``` jsx
onClick = () => {
  setTimeout(() => {
    ReactDOM.flushSync(() => {
      this.setState(({ count }) => ({count: count + 1}))
    })
    // 打印 {count: 1, flag: false}
    console.log('----this.state----', this.state)
    this.setState(({ flag }) => ({ flag: !flag }));
  }, 0);
}
```
---

# non-Broken Change - 已卸载的组件更新状态警告

在 React17 版本如下代码

``` jsx
async function handleSubmit() {
  setPending(true)
  await post('/someapi') // component might unmount while we're waiting
  setPending(false)
}
```
假如我们在请求过程中卸载了组件，就会报如下错误

![](/docs/images/react-error.png)

在 React18 中已经删除了这个警告


---

# non-Broken Change - 组件返回 undefined

在 React18 之前, 这样写

``` jsx
const Demo = () => {
  return undefined
}
```
会抛出如下错误：

![](/docs/images/undefined.png)

---

# non-Broken Change - 组件返回 undefined

但是在 React18 中不会有这个问题了，它把这个错误提醒给删除了。

为什么要删除这个提醒呢？  
主要原因：
* React18 Suspense fallback 会出现 undefined 的情况，为了保证 fallback 为 undefined 而不报错，故删除了这个警告。
* TS 类型系统和 ESLint 已经比较健壮了，这类错误可以在写代码的时候就会有提醒，完全可以避免掉这类问题。


---
class: 'text-center'
---

# non-Broken Change - Children

children 属性从 React.FunctionComponent (即 React.FC) 中移除了，需要显示定义

<div grid="~ cols-2 gap-2" m="-t-2">

``` tsx
// 18 之前
import * as React from 'react';

type Props = {};

const Component: React.FC<Props> = ({children}) => {...}

```

``` tsx
// 18 之后
type Props = {
  children?: React.ReactNode
};
const Component: React.FC<Props> = ({children}) => {...}
```

</div>

18 之后必须对 children 进行定义

---

# non-Broken Change - Children

**为什么要移除这个呢？**

看下面的例子：

``` tsx
const ComponentWithNoChildren: React.FC = () => <>Hello</>;

<ComponentWithNoChildren>
   // 传入了多余的 children，实际上父组件并没有 children, 但是在 18 之前也不会报错
   <UnusedChildrenSinceComponentHasNoChildren />
</ComponentWithNoChildren>

```

---

# non-Broken Change - 服务器流式渲染

![](/docs/images/ssr.png)

---

# non-Broken Change - 服务器流式渲染

``` tsx
const Comments = React.lazy(() => import('./Comments'))

// render
<Layout>
  <Header />
  <Sidebar />
  <RightPane>
    <Article />
      <Suspense feedback={<Loading />}>
        <Comments />
      </Suspense>
  </RightPane>
</Layout>
```

---

# Third Party Package API

* useSyncExternalStore
* useInsertionEffect
* useId

---

# Third Party Package API - useSyncExternalStore

语法

``` jsx

const state = useSyncExternalStore(subscribe, getSnapshot[, getServerSnapshot]);

```

应用场景

useSyncExternalStore 能够让 React 组件在 Concurrent Mode 下安全地有效地读取外接数据源。

---

# Third Party Package API - useInsertionEffect

**语法**

``` jsx
useInsertionEffect(didUpdate)
```
类似 useLayoutEffect, 但有些许不同，
* 它不能在 useInsertionEffect 中去访问 DOM 的 ref
* 执行时机是在 useLayoutEffect 之前，DOM 生成之后

**应用场景**

基于上面提到的第二点，它不能直接去操作 DOM，所以它只能够做一些插入 `<style>` 脚本的工作，  
所以该 API 主要是给 css-in-js 框架用的。

---

# Third Party Package API - useId

语法

``` jsx
const id = useId();
```
**应用场景**

一般用于服务器端渲染，支持在服务器端和客户端生成唯一的 ID，同时避免 `hydration` 的不兼容。

使用示例：

``` jsx
function Checkbox() {
  const id = useId();
  return (
    <div>
      <label htmlFor={id}>选择框</label>
      <input type="checkbox" name="sex" id={id} />
    </div>
  );
}
```

---

# Coming Soon

* Server Component
* OffScreen


---

# Coming Soon - Server Component

也叫服务端组件，目前(2022/05/06)还在开发中, 还没正式发布, Server Component 的本质就是由服务端生成 React 组件，返回一个 DSL 给客户端，客户端解析 DSL 并渲染该组件。

![](/docs/images/server-components.png)

---

# Coming Soon - Server Component
Server Component 带来的优势有：

1. **零客户端体积**，运行在服务端的组件只会返回最终的 DSL 信息，而不包含其他任何依赖。

``` tsx
// NoteWithMarkdown.js
import marked from 'marked'; // 35.9K (11.2K gzipped)
import sanitizeHtml from 'sanitize-html'; // 206K (63.3K gzipped)

function NoteWithMarkdown({text}) {
  const html = sanitizeHtml(marked(text));
  return (/* render */);
}
```
假设我们有一个 markdown 渲染组件，以前我们需要将依赖 marked和 sanitize-html打包到 JS 中。如果该组件在服务端运行，则最终返回给客户端的是转换完成的文本。

---

# Coming Soon - Server Component

Server Component 带来的优势有：

2. **组件拥有完整的服务端能力** 由于 Server Component 在服务端执行，拥有了完整的 NodeJS 的能力，可以访问任何服务端 API。

``` tsx
// Note.server.js - Server Component
import fs from 'react-fs';

function Note({id}) {
  const note = JSON.parse(fs.readFile(`${id}.json`));
  return <NoteWithMarkdown note={note} />;
}
```
---

# Coming Soon - Server Component

Server Component 带来的优势有：

3. **组件支持实时更新** 由于 Server Component 在服务端执行，理论上支持实时更新，类似动态 npm 包，这个还是有比较大的想象空间的。也许 React Component as a service 时代来了。

---

# Coming Soon - Server Component

当然说了这么多好处，Server Component 肯定也是有一些局限性的：

* 不能有状态，也就是不能使用 state、effect 等，那么更适合用在纯展示的组件，对性能要求较高的一些前台业务
* 不能访问浏览器的 API
* props 必须能被序列化


---

# Coming Soon - OffScreen

OffScreen 目前也在开发中，会在未来某个版本发布。OffScreen 支持只保存组件的状态，而删除组件的 UI 部分。可以很方便的实现预渲染，或者 Keep Alive。比如我们在从 tabA 切换到 tabB，再返回 tabA 时，React 会使用之前保存的状态恢复组件。


``` tsx
import { OffScreen } from 'react'

// render
<OffScreen>
  <List>
    {
      list.map(l => (<ListItem onClick={() => gotoDetail(l.id)} />))
    }
  </List>
</OffScreen>
```