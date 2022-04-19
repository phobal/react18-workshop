import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  let [count, setCount] = useState(0)
  const [flag, setFlag] = useState(false)
  const onClick = () => {
    Promise.resolve().then(() => {
      setCount(count++)
    })
    setFlag(!flag)
  }
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={onClick}>测试 rerender</button>
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
