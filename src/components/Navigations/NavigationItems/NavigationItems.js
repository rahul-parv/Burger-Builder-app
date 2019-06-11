import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import styles from './NavigationItems.css';

const navigationItems = (props) => (
    <div>
        <ul className={styles.NavigationItems}>
            <NavigationItem link="/burger-builder" exact > Burger Builder </NavigationItem>
            {
                props.isAuthenticated
                    ? <NavigationItem link="/orders" > Orders </NavigationItem> : null }
            {
                !props.isAuthenticated
                    ? <NavigationItem link="/auth" > Login </NavigationItem>
                    : <NavigationItem link="/logout" > Logout </NavigationItem> }
        </ul>
    </div>
);

export default navigationItems;