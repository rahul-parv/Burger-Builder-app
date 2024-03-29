import React from 'react'
import styles from './Backdrop.css'

export default (props) => (
    props.show ? <div className={styles.Backdrop} onClick={props.clicked}></div> : null
);