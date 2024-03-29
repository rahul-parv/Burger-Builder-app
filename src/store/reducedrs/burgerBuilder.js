import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: .04,
    bacon: 0.7,
    meat: 1.3
}

const initialState = {
    ingredients: null,
    totalPrice: 4,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_INGREDIETS:
            const updatedVal = {
                ingredients: action.ingredients,
                totalPrice: 4
            }
            return updateObject(state, updatedVal);

        case actionTypes.ADD_INGREDIENT:
            const updatedIngs = updateObject(state.ingredients, { [action.ingredientName]: +state.ingredients[action.ingredientName] + 1 });
            return updateObject(state, {
                ingredients: updatedIngs,
                totalPrice: +state.totalPrice + INGREDIENT_PRICE[action.ingredientName]
            });

        case actionTypes.REMOVE_INGREDIENT:
                return updateObject(state, {
                    ingredients: updateObject(state.ingredients, { [action.ingredientName]: +state.ingredients[action.ingredientName] - 1 }),
                    totalPrice: +state.totalPrice - INGREDIENT_PRICE[action.ingredientName]
                });

        default:
            return state
    }
}

export default reducer;