import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import styles from './NavigationItems.css';

const navigationItems = () => (
    <div>
        <ul className={styles.NavigationItems}>
            <NavigationItem link="/burger-builder" exact > Burger Builder </NavigationItem>
            <NavigationItem link="/orders" > Orders </NavigationItem>
        </ul>
    </div>
);

export default navigationItems;