import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import styles from './Layout.css';
import Toolbar from '../../components/Navigations/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigations/SideDrawer/SideDrawer';

class layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        });
    }

    render() {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    toggle={this.sideDrawerToggleHandler} />
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
};

export default layout;