import React from 'react';
import ReactDOM from 'react-dom';
import MyComponent from './hello.jsx';
import Clock from './clock.jsx';
import Login from './login.jsx';
// import Blog from './blog.jsx';
import Former from './former';

class MyDemo extends React.Component {
  render() {
    return (
      <div className="box">
        <MyComponent />
        <Clock />
        <Clock />
        <Login />
        <Former />
      </div>
    )
  }
}

ReactDOM.render(
<MyDemo />,
document.getElementById('app')
);

