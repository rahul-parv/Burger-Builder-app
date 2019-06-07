import React from 'react';

import styles from './Inputs.css';

const Inputs = (props) => {
    let inputsElem = null;
    const inputClasses = [styles.InputElem];

    if (props.invalid) {
        inputClasses.push(styles.Invalid);
    }


    switch (props.elementType) {
        case 'input':
            inputsElem = (
                <input
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed} />
            );
            break;

        case 'select':
            inputsElem = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayVal}
                        </option>
                    ))}

                </select>
            )
            break;

        default:
            inputsElem = (
                <input
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed} />
            );
            break;
    }

    return (
        <div className={styles.Input} >
            <label className={styles.Label}>{props.label}</label>
            {inputsElem}
        </div>
    );
}

export default Inputs;