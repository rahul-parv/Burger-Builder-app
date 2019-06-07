import React from 'react';
import styles from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let transformedIngrediets = Object.keys( props.ingredients )
        .map( igKey => {
            return [...Array( props.ingredients[igKey] )].map((_, i) => {
                    return <BurgerIngredient key={igKey + i} type={igKey} />
                })
        }).reduce((arr, el) => {
            return arr.concat(el);
        });
    if (transformedIngrediets.length === 0) {
        transformedIngrediets = <p>Please start adding ingredients.!</p>
    }

    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngrediets}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;