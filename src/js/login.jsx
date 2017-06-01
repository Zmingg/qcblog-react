import React from 'react';
export default class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    let button = null;
    if (this.state.isLoggedIn) {
      button = <LogoutButton click={this.handleLogoutClick} />;
    } else {
      button = <LoginButton click={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={this.state.isLoggedIn} />
        {button}
      </div>
    );
  }
}

let Greeting = (props)=>{
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

let UserGreeting = props => <h1>Welcome back!</h1>;
let GuestGreeting = props => <h1>Please sign up.</h1>;

let LoginButton = props =>
  <button onClick={props.click}>
    Login
  </button>
;
let LogoutButton = props =>
  <button onClick={props.click}>
    Logout
  </button>
;
