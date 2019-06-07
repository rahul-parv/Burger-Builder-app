import React from 'react'

import styles from './Order.css'

const Order = (props) => {
    let ingredientsArr = Object.keys(props.order.ingredients)
        .map(key => {
            return [...Array(props.order.ingredients[key])].map((_, i) => {
                return <span className={styles.OrderIngs} key={props.order.id}><strong>{key} : </strong>{props.order.ingredients[key]}</span>
            })
        })


    return (
        <div className={styles.Order}>
            <h4>{props.order.orderData ? props.order.orderData.name : null}</h4>
            <p>Ingredients: {ingredientsArr}</p>
            <p>Price: <strong>{props.order.price}</strong></p>
        </div>
    )
}

export default Order;