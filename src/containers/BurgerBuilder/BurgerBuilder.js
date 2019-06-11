import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    isPurchasable = (ingredients) => {
        const sum = Object.keys(ingredients).map((key) => {
            return ingredients[key];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);

        return sum > 0;
    }

    purchaseToggleHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState((prevState) => {
                return { purchasing: !prevState.purchasing }
            });
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseContinueHandler = () => {
        this.props.onPurchaseBurgerInit();
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for (const key in disabledInfo) {
            if (disabledInfo.hasOwnProperty(key)) {
                disabledInfo[key] = disabledInfo[key] <= 0;
            }
        }

        let orderSummaryElm = <OrderSummary
            ingredients={this.props.ings}
            totalPrice={this.props.tPrice}
            purchaseCancelled={this.purchaseToggleHandler}
            purchaseContinued={this.purchaseContinueHandler} />
        if (this.state.loading || !this.props.ings) {
            orderSummaryElm = <Spinner />
        }

        let burger = this.state.error ?
            <p style={{ textAlign: 'center' }}>Ingredients cant be loaded.</p>
            : <Spinner />;
        if (this.props.ings) {
            burger = <Aux>
                <Burger ingredients={this.props.ings} />
                <BuildControls
                    ingredientRemoved={this.props.onIngredientRemoved}
                    ingredientAdded={this.props.onIngredientAdded}
                    ordering={this.purchaseToggleHandler}
                    disabled={disabledInfo}
                    totalPrice={this.props.tPrice}
                    purchasable={this.isPurchasable(this.props.ings)}
                    isAuth={this.props.isAuthenticated} />
            </Aux>
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modelClosed={this.purchaseToggleHandler} >
                    {
                        orderSummaryElm
                    }
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerState.ingredients,
        tPrice: state.burgerState.totalPrice,
        isAuthenticated: state.auth.idToken !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingsName) => dispatch(actions.addIngredient(ingsName)),
        onIngredientRemoved: (ingsName) => dispatch(actions.removeIngredient(ingsName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onPurchaseBurgerInit: () => dispatch(actions.purchaseBurgerInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));