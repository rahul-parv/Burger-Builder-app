import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import Aux from '../../hoc/Aux/Aux';

class Checkout extends Component {
    
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }


    render() {
        let summary = <Redirect to="/" />;
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
                <Aux>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler} />

                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData} />
                </Aux>
            );
        }
        return (
            <div>
                {summary}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerState.ingredients,
        purchased: state.orderState.purchased
    }
}

export default connect(mapStateToProps)(Checkout);