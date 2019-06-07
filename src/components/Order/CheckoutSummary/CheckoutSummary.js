import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import styles from './CheckoutSummary.css';

const checkoutSummary = (props) => {
    return (
        <div className={styles.CheckoutSummary} >
            <h2>We hope it tests well..!</h2>
            <div style={{width:'100%', margin:'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button
                btnType='Danger'
                clicked={ props.checkoutCancelled }>
                Cancel
            </Button>
            <Button
                btnType='Success'
                clicked={ props.checkoutContinued }>
                Checkout
            </Button>
        </div>
    );
}

export default checkoutSummary;