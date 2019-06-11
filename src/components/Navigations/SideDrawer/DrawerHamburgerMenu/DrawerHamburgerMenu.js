import React from 'react';
import styles from './DrawerHamburgerMenu.css';

const DrawerHamburgerMenu = (props) => (
    <div className={styles.DrawerHamburgerMenu} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default DrawerHamburgerMenu;