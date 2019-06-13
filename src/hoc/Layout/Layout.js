import React, { Component } from 'react';

import Aux from '../Aux/Aux';
import styles from './Layout.css';
import Toolbar from '../../components/Navigations/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigations/SideDrawer/SideDrawer';
import Auth0 from '../../containers/Auth/Auth0/Auth0';

class layout extends Component {
    state = {
        showSideDrawer: false,
        isAuthenticated: false
    }

    componentDidMount() {
        const auth = new Auth0();
        this.setState({isAuthenticated: auth.isAuthenticated()});

    }

    hamburgerClickHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        });
    }

    render() {
        return (
            <Aux>
                <Toolbar
                    isAuth={this.state.isAuthenticated}
                    hamburgerClicked={this.hamburgerClickHandler} />
                <SideDrawer
                    isAuth={this.state.isAuthenticated}
                    open={this.state.showSideDrawer}
                    toggle={this.hamburgerClickHandler} />
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
};

export default layout;