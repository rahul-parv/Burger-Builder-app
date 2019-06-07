import React from 'react';
import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
    const ingredientSummery = Object.keys(props.ingredients)
        .map((key) => {
            return <li key={key}>
                <span style={{ textTransform: 'capitalize' }}>{key}</span>: {props.ingredients[key]}
            </li>
        });

    return (
        <Aux>
            <h1>Your Order</h1>
            <p>A dilicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummery}
            </ul>
            <p>Total Price : <strong>{props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled} >CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued} >CONTINUE</Button>
        </Aux>
    );
}
export default orderSummary;