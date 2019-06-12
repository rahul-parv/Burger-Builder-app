import React from 'react';
import styles from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerHamburgerMenu from '../SideDrawer/DrawerHamburgerMenu/DrawerHamburgerMenu';

const toolbar = (props) => (
    <header className={styles.Toolbar}>
        <DrawerHamburgerMenu clicked={props.hamburgerClicked} />
        <div className={styles.Logo}>
            <Logo />
        </div>
        <div className={styles.DesktopOnly}>
            <NavigationItems />
        </div>
    </header>
)

export default toolbar;