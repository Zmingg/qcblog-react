import React from 'react'
 
export default class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {isToggleOn: true};

    this.handleClick = () => {
      console.log('this is:', this);
    }
  }

  render() {
    return (
      <div className='app'>
        <p>这是一个组件！</p>
        <a onClick={this.handleClick}>点击</a>
      </div>
    )
  }
}