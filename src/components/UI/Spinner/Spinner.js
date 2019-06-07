import React from 'react';

import styles from './Spinner.css';

const Spinner = () => (
    <div className={styles.Spinner}>
        <div className={styles.Bounce1}></div>
        <div className={styles.Bounce2}></div>
    </div>
);

export default Spinner;