import React from 'react'
import styles from './Button.css'

export default (props) => (
    <button
        className={[styles.Button, styles[props.btnType]].join(' ')}
        disabled={props.disabled}
        onClick={props.clicked}>
            {props.children}
    </button>
);