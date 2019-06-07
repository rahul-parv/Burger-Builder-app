import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Logo.css';
import burgerLogo from '../../assets/images/burger-logo.png';

export default props => (
    <Link to="/">
        <div className={styles.Logo}>
            <img src={burgerLogo} alt="My Burger Builder" />
        </div>
    </Link>
);