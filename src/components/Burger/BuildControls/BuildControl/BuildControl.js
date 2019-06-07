import React from 'react';
import styles from './BuildControl.css'

const BuildControl = (props) => {
    return (
        <div className={styles.BuildControl}>
            <div className={styles.Label}>{props.label}</div>
            <button
                className={styles.Less}
                onClick={props.remove}
                disabled={props.disabled} >
                    remove
            </button>
            <button className={styles.More} onClick={props.added} >add</button>
        </div>
    );
}

export default BuildControl;