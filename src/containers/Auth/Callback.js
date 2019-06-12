import React, { Component } from 'react';

import Spinner from '../../components/UI/Spinner/Spinner'
import Auth0 from '../../shared/Auth';

class Callback extends Component {

    componentDidMount() {
        const auth = new Auth0();
        auth.handleAuthentication();
    }

    render() {
        return <Spinner />
    }
}
export default Callback;