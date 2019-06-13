import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Auth0 from '../Auth0/Auth0';

class Logout extends Component {
    componentDidMount() {
        const auth = new Auth0();
        auth.logout();
    }
    render() {
        return <Redirect to="/" />
    }
}

export default Logout;