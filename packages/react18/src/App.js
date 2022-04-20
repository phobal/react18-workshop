import { useState, useId } from 'react';
import { flushSync } from 'react-dom'
import logo from './logo.svg';
import SetStateDemo from './SetStateDemo';
import Error from './Error'
import './App.css';

function App() {
  const [count, setCount] = useState(0)
  const [flag, setFlag] = useState(false)
  const id = useId()
  console.log('---id----', id)
  const onClick = () => {
    flushSync(() => {
      setCount(c => c + 1)
      // 包在 promise 中又会变为批处理了
      // Promise.resolve().then(() => {
      //   setCount(c => c + 1)
      // })
    })
    console.log('---count----', count)
    setFlag(!flag)
  }
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={onClick}>测试 rerender</button>
        <br />
        <SetStateDemo />
        {!flag && <Error />}
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React 18
          {console.log('----rerender----')}
        </a>
      </header>
    </div>
  );
}

export default App;
