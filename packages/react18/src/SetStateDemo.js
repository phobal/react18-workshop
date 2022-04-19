import React from 'react'
import ReactDOM from 'react-dom'

class SetStateDemo extends React.PureComponent {
  state = {
    count: 0,
    flag: false,
  }
  onClick = () => {
    setTimeout(() => {
      ReactDOM.flushSync(() => {
        this.setState(({ count }) => ({count: count + 1}))
      })
      // 打印 {count: 0, flag: false}
      console.log('----this.state----', this.state)
    }, 0);
  }
  render() {
    return (
      <button onClick={this.onClick}>测试 setState</button>
    )
  }
}

export default SetStateDemo
