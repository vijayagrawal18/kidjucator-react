import React, { Component } from 'react';
import {login} from '../DataStore';

class Login extends Component {
  authenticate = () => {
    login(this.props.authSuccessCallback);
  }

  render() {
    return (
      <div className="login-screen">
       <nav className="login-form">
         <h2> Edit Items </h2>
         <p> Please login </p>
         <button className="github" onClick={this.authenticate}>Login with Github</button>
       </nav>
      </div>
    );
  }
}

export default Login;
