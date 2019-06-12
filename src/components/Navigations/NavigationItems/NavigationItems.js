import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import Auth from '../../../containers/Auth/Auth';
import styles from './NavigationItems.css';

const navigationItems = () => (
    <div>
        <ul className={styles.NavigationItems}>
            <NavigationItem link="/burger-builder" exact > Burger Builder </NavigationItem>
            <NavigationItem link="/orders" > Orders </NavigationItem>
            <Auth><NavigationItem > Login </NavigationItem></Auth>
        </ul>
    </div>
);

export default navigationItems;