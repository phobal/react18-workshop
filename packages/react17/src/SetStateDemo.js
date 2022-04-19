import React from 'react'

class SetStateDemo extends React.PureComponent {
  state = {
    count: 0,
    flag: false,
  }
  onClick = () => {
    setTimeout(() => {
      this.setState(({ count }) => ({count: count + 1}))
      // 打印 {count: 1, flag: false}
      console.log('----this.state----', this.state)
      this.setState(({ flag }) => ({ flag: !flag }));
    });
  }
  render() {
    return (
      <button onClick={this.onClick}>测试 setState</button>
    )
  }
}

export default SetStateDemo
