import React from 'react';
import styles from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Aux from '../../../hoc/Aux/Aux'
import Backdrop from '../../UI/Backdrop/Backdrop'

const SideDrawer = (props) => {
    let attachedClasses = [styles.SideDrawer, styles.Close];
    if (props.open) {
        attachedClasses = [styles.SideDrawer, styles.Open];
    }
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.toggle} />
            <div className={attachedClasses.join(' ')}>
                <div className={styles.Logo}>
                    <Logo />
                </div>
                <div>
                    <NavigationItems />
                </div>
            </div>
        </Aux>
    );
}

export default SideDrawer;