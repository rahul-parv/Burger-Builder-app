import React, { Component } from 'react';

import Auth0 from '../../shared/Auth';
const auth = new Auth0();

class Auth extends Component {
    
    loginHandler = () => {
        auth.login();
    }

    render() {
        return (
            <div onClick={this.loginHandler}>
                {this.props.children}
            </div>
        )
    }
}
export default Auth;